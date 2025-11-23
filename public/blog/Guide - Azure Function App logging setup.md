> [!info]
> Note that this guide is written with Function Apps using the [isolated worker model](https://learn.microsoft.com/en-us/azure/azure-functions/dotnet-isolated-in-process-differences) in mind, not the [soon-to-be unsupported in-process model](https://azure.microsoft.com/en-us/updates?id=retirement-support-for-the-inprocess-model-for-net-apps-in-azure-functions-ends-10-november-2026).

The purpose of this document is mainly these two things:
1. To gather the most important info on this topic in one easy-to-read place combined with some findings of my own, largely because the documentation I've looked up is surprisingly spread out and unintuitive.
2. To help me learn and test my assumptions as I was writing this.
## TL;DR
### Clean up
In Azure, go to the Function App > Settings > Environment variables. Double-check if you have an app setting key in your Function App named `AzureFunctionsJobHost__logging__logLevel__default` (or similar). In which case, **remove it**.

If you register a service like this in your Function App project:

```cs
.AddScoped<TelemetryClient>()
```

then also remove that.

### Install packages
Add references to these two packages from your Function App project:

```
dotnet add package Microsoft.ApplicationInsights.WorkerService
dotnet add package Microsoft.Azure.Functions.Worker.ApplicationInsights
```

### Modify `Program.cs`

Add this to your service registration:

```cs
services.AddApplicationInsightsTelemetryWorkerService(); services.ConfigureFunctionsApplicationInsights();
```

and then this to your service configuration:

```cs
builder.ConfigureLogging(logging =>
{
    // Disable default behavior of the Application Insights SDK that adds a logging filter that
    // instructs the logger to capture only warnings and more severe logs
    // See: https://learn.microsoft.com/en-us/azure/azure-functions/dotnet-isolated-process-guide?tabs=hostbuilder%2Cwindows#managing-log-levels
    logging.Services.Configure<LoggerFilterOptions>(options =>
    {
        var defaultRule = options.Rules.FirstOrDefault(rule => rule.ProviderName == "Microsoft.Extensions.Logging.ApplicationInsights.ApplicationInsightsLoggerProvider");

        if (defaultRule is not null)
        {
            options.Rules.Remove(defaultRule);
        }
    });

    // Set log level for EF Core and HttpClient to Warning to reduce noise.
    // Note that these log categories cannot be configured independently in `host.json` as
    // they are surfaced using the category of the specific function from which the logs are written.
    // This means this behavior is controlled by the "Function" category in `host.json`, together with all other logs from the functions.
    logging.AddFilter("Microsoft.EntityFrameworkCore", LogLevel.Warning);
    logging.AddFilter("System.Net.Http.HttpClient", LogLevel.Warning);
});
```

(the additional filters can be excluded if your Function App doesn't use HttpClient or EF Core).

### Modify `host.json`
Finally, add this to the `host.json` file of your Function App:

```json
{
  //...
  "logging": {
    "logLevel": {
      "default": "Warning",
      "Host.Aggregator": "Trace",
      "Host.Results": "Information",
      "Function": "Information"
    },
    "applicationInsights": {
      "samplingSettings": {
        "isEnabled": true,
        "maxTelemetryItemsPerSecond" : 20,
        "excludedTypes": "Request;Exception"
      },
    }
  }
}
```

---
## Initial setup
### In Azure
1. Go to the Application Insights resource you want the Function App to log to and grab the Connection string from the Overview page
2. Go to the Function App > Settings > Environment variables
3. Add a new key with the name [APPLICATIONINSIGHTS_CONNECTION_STRING](https://learn.microsoft.com/en-us/azure/azure-functions/functions-app-settings#applicationinsights_connection_string) and paste the value from step 1

**⚠️ Warning ⚠️**
If you have already set this up earlier, then double-check if you have an app setting key in your Function App named `AzureFunctionsJobHost__logging__logLevel__default` (or similar). In which case, **remove it**. This value will [override](https://learn.microsoft.com/en-us/azure/azure-functions/configure-monitoring?tabs=v2#overriding-monitoring-configuration-at-runtime) anything set in `host.json` and will therefore make the logging behavior unintuitive and potentially different across environments.

It is only recommended to use this app setting in cases where you [[#Overriding log levels at runtime|temporarily need to adjust the log levels without redeploying the app]].

### In the Function App project (C#)
Unless you're using [Aspire](https://learn.microsoft.com/en-us/azure/azure-functions/dotnet-isolated-process-guide?tabs=hostbuilder%2Cwindows#aspire-preview), the recommended way to configure logging to [Application Insights](https://learn.microsoft.com/en-us/azure/azure-monitor/app/app-insights-overview?tabs=net) is by emitting the logs directly instead of [relaying logs through the host](https://learn.microsoft.com/en-us/azure/azure-functions/configure-monitoring#custom-application-logs).

First, add references to these two packages from your Function App project:

```
dotnet add package Microsoft.ApplicationInsights.WorkerService
dotnet add package Microsoft.Azure.Functions.Worker.ApplicationInsights
```

Next, add calls to these two methods during service registration in `Program.cs`:

```cs
services.AddApplicationInsightsTelemetryWorkerService(); services.ConfigureFunctionsApplicationInsights();
```

**⚠️ Warning ⚠️**
If you have registered something like a `TelemetryClient` in your Function App:

```cs
.AddScoped<TelemetryClient>()
```

make sure **this is removed**.

The call to `AddApplicationInsightsTelemetryWorkerService()` is supposed to be responsible for wiring up the necessary logging services but the registration of the `TelemetryClient` service actually stops this process from successfully adding the necessary registrations. Removing it makes the `AddApplicationInsightsTelemetryWorkerService()` call work as intended.

If your Function App is integrating with some legacy .NET Framework code that doesn't use `Microsoft.Extensions.Logging` and the [`ILogger` interface](https://learn.microsoft.com/en-us/dotnet/api/microsoft.extensions.logging.ilogger) for logging but rather the [old ASP.NET Trace logger setup](https://learn.microsoft.com/en-us/azure/azure-monitor/app/dotnet?tabs=net%2Cnet-1%2Cserver%2Cportal%2Ccsharp%2Cenqueue%2Capi-net#install-logging-on-your-app) then you will have to install the `Microsoft.ApplicationInsights.TraceListener` package and  add this to `Program.cs` as well:

```cs
Trace.Listeners.Add(new ApplicationInsightsTraceListener());
```

This will make sure calls like this get picked up and ingested into Application Insights:

```cs
Trace.TraceInformation("Legacy information log");
```

Note however that using the `Trace` class is **not** recommended and the best way to handle this is to refactor the existing code to use `Microsoft.Extensions.Logging` (if possible). This package is already included in modern .NET versions but is also supported as a [separate NuGet package](https://www.nuget.org/packages/microsoft.extensions.logging/#supportedframeworks-body-tab) for .NET Framework projects.

---
## Accessing the `ILogger` interface

There are 3 ways to access the ILogger interface to produce user logs in the Function App:
- Injecting `ILogger<T>` through DI
- Injecting `ILoggerFactory<T>` through DI
- Using `FunctionContext.GetLogger()`
### Injecting `ILogger<T>` or `ILoggerFactory` through DI
The call to `ConfigureFunctionsWorkerDefaults()` in `Program.cs` registers the Functions worker and its default logging pipeline. This will enable dependency injection of the `ILogger<T>` and `ILoggerFactory` interfaces into your code.

For example:

```cs
public class MyFunction {
    
    private readonly ILogger<MyFunction> _logger;
    
    public MyFunction(ILogger<MyFunction> logger) {
        _logger = logger;
    }
    
    [Function(nameof(MyFunction))]
    public void Run([BlobTrigger("samples-workitems/{name}", Connection = "")] string myBlob, string name)
    {
        _logger.LogInformation($"C# Blob trigger function Processed blob\n Name: {name} \n Data: {myBlob}");
    }
}
```

When using the `ILogger<T>` interface, the type will map to the name of the [log category in Application Insights](https://learn.microsoft.com/en-us/azure/azure-functions/configure-monitoring?tabs=v2#configure-categories). You can use the `ILoggerFactory` interface in exactly the same way:

```cs
    public MyFunction(ILoggerFactory loggerFactory) {
        _logger = loggerFactory.CreateLogger<MyFunction>();
    }
```

but you can also use it to specify a custom log category name (that doesn't have to match an existing type):

```cs
    public MyFunction(ILoggerFactory loggerFactory) {
        _logger = loggerFactory.CreateLogger("MyCustomLogCategory");
    }
```

### Using `FunctionContext.GetLogger()` 
The isolated process will pass a [FunctionContext](https://learn.microsoft.com/en-us/dotnet/api/microsoft.azure.functions.worker.functioncontext?view=azure-dotnet&preserve-view=true) object to your function methods. This object lets you get an [`ILogger`](https://learn.microsoft.com/en-us/dotnet/api/microsoft.extensions.logging.ilogger) instance to write to the logs by calling the [GetLogger](https://learn.microsoft.com/en-us/dotnet/api/microsoft.azure.functions.worker.functioncontextloggerextensions.getlogger) method and supplying a `categoryName` string. You can use this context to obtain an [`ILogger`](https://learn.microsoft.com/en-us/dotnet/api/microsoft.extensions.logging.ilogger) without having to use dependency injection:

```cs
    [Function(nameof(MyFunction))]
    public void Run([BlobTrigger("samples-workitems/{name}", Connection = "")] string myBlob, string name, FunctionContext executionContext)
    {
	    var logger = executionContext.GetLogger("MyCustomLogCategory");
        logger.LogInformation($"C# Blob trigger function Processed blob\n Name: {name} \n Data: {myBlob}");
    }
```

---
## Filtering logs and managing log levels

### Configuration via `host.json`
The main way to filter logs and manage the log levels in your Function App is by adjusting the `host.json` file. In it are two sections related to this:
- `logLevel`
- `applicationInsights`

The `logLevel` section allows you to control the minimum [log level](https://learn.microsoft.com/en-us/azure/azure-functions/configure-monitoring?tabs=v2#configure-log-levels) for [different categories](https://learn.microsoft.com/en-us/azure/azure-functions/configure-monitoring?tabs=v2#configure-categories) while the `applicationInsights` section allows you to control different options specific for Application Insights.

Although it is possible to configure [multiple different things using this section](https://learn.microsoft.com/en-us/azure/azure-functions/functions-host-json#applicationinsights), the one I know about and recommend is the [Application Insights sampling feature](https://learn.microsoft.com/en-us/azure/azure-functions/configure-monitoring?tabs=v2#configure-sampling). This feature can protect you from producing too much telemetry data on completed executions at times of peak load. When the rate of incoming executions exceeds a specified threshold, Application Insights starts to randomly ignore some of the incoming executions.

Note that it is also possible to control the `logLevel` *inside* the `applicationInsights` section, i.e.:

```json
{
  //...
  "logging": {
    "logLevel": {
      "default": "Information",
    },
    "applicationInsights": {
      "logLevel": {
        "default": "Warning",
      },
    }
  }
}
```

The outer `logLevel` decides what gets logged at all and the inner `applicationInsights.logLevel` decides what of that ends up in Application Insights. But unless you specifically need to use this, it's much simpler to keep it in one place and just use the outer `logLevel`.

Taking all this into account, a sensible default `host.json` setup could look like this:

```json
{
  //...
  "logging": {
    "logLevel": {
      "default": "Warning",
      "Host.Aggregator": "Trace",
      "Host.Results": "Information",
      "Function": "Information"
    },
    "applicationInsights": {
      "samplingSettings": {
        "isEnabled": true,
        "maxTelemetryItemsPerSecond" : 20,
        "excludedTypes": "Request;Exception"
      },
    }
  }
}
```

Two things to note here:
1. It's better to leave the *default* log level to Warning and then adjust specific log categories based on your needs, otherwise it's easy to drown in logs
2. You can exclude certain types of telemetry from sampling. In this example, data of type `Request` and `Exception` is excluded from sampling. It ensures that _all_ function executions (requests) and exceptions are logged while other types of telemetry remain subject to sampling.
### Adjusting the default logging filter
By default, the Application Insights SDK adds a logging filter that instructs the logger to capture *only warnings and more severe logs*. Meaning that if you have user logs (`ILogger<T>`) like this:

```cs
_logger.LogInformation("Info log");
```

they will **not show up in Application Insights**!

If you want to be able to send logs to Application Insights at the "Information" log level, you need to disable this behavior by configuing the logging service and removing the filter rule:

```cs
    .ConfigureLogging(logging =>
    {
        logging.Services.Configure<LoggerFilterOptions>(options =>
        {
            LoggerFilterRule defaultRule = options.Rules.FirstOrDefault(rule => rule.ProviderName
                == "Microsoft.Extensions.Logging.ApplicationInsights.ApplicationInsightsLoggerProvider");
            if (defaultRule is not null)
            {
                options.Rules.Remove(defaultRule);
            }
        });
    })
```

### Adjusting log levels per function
You can specify minimum log levels for user generated logs (i.e. `ILogger<T>` calls inside your code) for each individual function using the `Function.<YOUR_FUNCTION_NAME>.User` [category](https://learn.microsoft.com/en-us/azure/azure-functions/configure-monitoring?tabs=v2#configure-categories) in `host.json`.

For example:

```json
    "logLevel": {
	  "default": "Warning",
	  "Function": "Information",
      "Function.MyCoolFunction1.User": "Warning",
      "Function.MyCoolFunction1.User": "Error"
    }
```

### Configuring additional log filters
You can also specify additional log filters using `AddFilter()` calls when configuring logging in `Program.cs`, filtering out any logs below the set log level for the specified log category (like in `host.json`):

```cs
.ConfigureLogging(logging => {
	logging.AddFilter("MyLogCategory", LogLevel.Warning);
})
```

This is especially useful when trying to configure the logging behavior of underlying services that have been wired up, such as `EntityFrameworkCore` or an `IHttpClientFactory`. This is because you cannot control this by configuring the category in `host.json`, i.e:

```json
    "logLevel": {
      "Microsoft.EntityFrameworkCore": "Warning"
    }
```

as these logs are surfaced using the category of the specific function from which the logs are written (if I understand correctly). This means this behavior is controlled by the "Function" category in `host.json`. So if you want to keep the minimum log level of your Function logs at "Information" while setting the minimum log level for these services to "Warning", you cannot do this when managing the levels in `host.json`. Instead, you need to specify this in the `ConfigureLogging` call.

Two [recommended](https://learn.microsoft.com/en-us/azure/azure-functions/dotnet-isolated-process-guide?tabs=hostbuilder%2Cwindows#logging) categories to configure are "Microsoft.EntityFrameworkCore" and "System.Net.Http.HttpClient", if your Function App uses these, as they produce a lot of information-level logs:

```cs
.ConfigureLogging(logging => {
    logging.AddFilter("Microsoft.EntityFrameworkCore", LogLevel.Warning);
    logging.AddFilter("System.Net.Http.HttpClient", LogLevel.Warning);
})
```

(*there are probably a lot more similar examples*).

### Overriding log levels at runtime
You can override the log levels set in the `host.json` file at runtime, allowing you to adjust the logging setup of the Function App without requiring a code change and a redeployment.

To do this, add [these app setting values](https://learn.microsoft.com/en-us/azure/azure-functions/configure-monitoring?tabs=v2#overriding-monitoring-configuration-at-runtime) to the Function App under Settings > Environment variables.

### Adjusting the minimum log level below "Information" (not recommended)
Even with the default logging filter removed, the *minimum* log level of the worker process is still "Information", regardless of what is set in `host.json`. Even though it is [*not recommended*](https://learn.microsoft.com/en-us/azure/azure-functions/functions-monitoring#log-levels-and-categories) to log at the "Trace" or "Debug" levels in a production environment:

![[Pasted image 20251106000718.png]]
 
 *if* you have calls like this:

```cs
_logger.LogTrace("My trace log");
_logger.LogDebug("My debug log");
```

and you need to collect and send these logs to Application Insights then you *can* enable this by explicitly lowering the [minimum log level](https://github.com/Azure/azure-functions-host/issues/8901#issuecomment-1309248882) in the `ConfigureLogging` call:

```cs
.ConfigureLogging(logging => {
	logging.SetMinimumLevel(LogLevel.Trace);
})
```

and then matching that level in `host.json`:

```json
    "logLevel": {
	  "default": "Warning",
	  "Function": "Trace"
    }
```

---
## Misc.

### Analyzing what logs to filter out 
To check what log categories are the biggest offenders, you can run this KQL query in Monitoring > Logs for the specific Application Insights resource:
  
```
traces
| extend CategoryNameFromLog = tostring(customDimensions.CategoryName)
| extend CategoryFromLog = tostring(customDimensions.Category)
| extend Category = iff(isempty(CategoryNameFromLog), CategoryFromLog, CategoryNameFromLog)
| extend CategoryToDisplay = iff(isempty(Category), "Uncategorized", Category)
| summarize Count = count() by CategoryToDisplay
| order by Count desc
```

### "Traces" nomenclature
**All** application logs ingested into Application Insights are [stored in the "traces" table](https://learn.microsoft.com/en-us/azure/azure-monitor/app/application-insights-faq#where-does-telemetry-collected-with-traditional-logging-frameworks-go), but this should not be confused with the `Trace` *log level*! This is just unfortunate naming.

### Configuring error logging
According to [this part of the documentation](https://learn.microsoft.com/en-us/azure/azure-functions/dotnet-isolated-process-guide?tabs=hostbuilder%2Cwindows#logging:~:text=how%20errors%20are%20surfaced%20to%20your%20logs), you need to specifically set this `EnableUserCodeException` flag to `true`:

```cs
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Hosting;

var host = new HostBuilder()
    .ConfigureFunctionsWorkerDefaults(builder => {}, options =>
    {
        options.EnableUserCodeException = true;
    })
    .Build();

host.Run();
```

Otherwise exceptions thrown by your code can end up wrapped in an `RpcException`.

But as of 2025-11-03, this option is flagged as deprecated and the default value is now `true`, meaning this is redundant.

![[Pasted image 20251103224159.png]]

---
## Sources
- [Microsoft Learn | Guide for running C# Azure Functions in the isolated worker model](https://learn.microsoft.com/en-us/azure/azure-functions/dotnet-isolated-process-guide?tabs=hostbuilder%2Cwindows)
	- [Start-up and configuration](https://learn.microsoft.com/en-us/azure/azure-functions/dotnet-isolated-process-guide?tabs=hostbuilder%2Cwindows#start-up-and-configuration)
	- [Application Insights](https://learn.microsoft.com/en-us/azure/azure-functions/dotnet-isolated-process-guide?tabs=hostbuilder%2Cwindows#application-insights)
		- [Install packages](https://learn.microsoft.com/en-us/azure/azure-functions/dotnet-isolated-process-guide?tabs=hostbuilder%2Cwindows#install-packages)
		- [Configure startup](https://learn.microsoft.com/en-us/azure/azure-functions/dotnet-isolated-process-guide?tabs=hostbuilder%2Cwindows#configure-startup)
		- [Managing log levels](https://learn.microsoft.com/en-us/azure/azure-functions/dotnet-isolated-process-guide?tabs=hostbuilder%2Cwindows#managing-log-levels)
		- [Logging](https://learn.microsoft.com/en-us/azure/azure-functions/dotnet-isolated-process-guide?tabs=hostbuilder%2Cwindows#logging)
- [Microsoft Learn | Monitor executions in Azure Functions](https://learn.microsoft.com/en-us/azure/azure-functions/functions-monitoring)
	- [Log levels and categories](https://learn.microsoft.com/en-us/azure/azure-functions/functions-monitoring#log-levels-and-categories)
- [Microsoft Learn | How to configure monitoring for Azure Functions](https://learn.microsoft.com/en-us/azure/azure-functions/configure-monitoring?tabs=v2)
- https://github.com/Azure/azure-functions-host/issues/8901#issuecomment-1309248882
- https://stackoverflow.com/a/67565084