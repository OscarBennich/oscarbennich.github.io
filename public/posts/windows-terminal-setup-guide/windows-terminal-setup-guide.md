> This text was originally written in [this repo](https://github.com/OscarBennich/git-tips-and-tricks)

![image](windows_terminal_setup_1.png)

- Oh My Posh theme
- Custom font
- Custom icons
- Auto-complete & command history
  
These instructions are based on [this video](https://www.youtube.com/watch?v=TY_YKz1uvws) but slightly modified and updated.

## Prerequisites

> Note that you previously had to install `Windows Terminal` itself, but it is now [included in Windows 11](https://devblogs.microsoft.com/commandline/windows-terminal-is-now-the-default-in-windows-11/). 

### Install `PowerShell 7+`  (i.e. the cross-platform “pwsh”, not the legacy "Windows PowerShell")
- Run this `winget` command:

  ```
  winget install --id Microsoft.PowerShell --source winget
  ```
- OR go to the Microsoft store and search for "PowerShell" > Install.
- OR you can install it from [here](https://github.com/PowerShell/PowerShell/releases) ([more info](https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-windows?view=powershell-7.5)).

### Install `Oh My Posh`
- Run this `winget` command:

  ```
  winget install JanDeDobbeleer.OhMyPosh --source winget
  ```
- OR go to the Microsoft store and search for "Oh My Posh" > Install.
- OR you can install it from [here](https://ohmyposh.dev/docs/installation/windows).

## 1 - Configure `Windows Terminal`
- Open up Windows Terminal
- Go to Settings
- Click "Open JSON file" in the lower left corner
- Replace the contents of that file with the contents of [terminal-settings.json](/terminal-settings.json)
- Save the file

OR

- Follow the steps below to set it up yourself

### 1.1 - Set PowerShell as the default profile
- Go to Startup
- Set default profile to `PowerShell`
  
### 1.2 - Set Windows Terminal as the default terminal
- Go to Startup
- Set default terminal application to `Windows Terminal`
  
### 1.3 - Hide other terminals
- Click on `Open JSON file`
- Go to "profiles"
- Set "hidden" to `true` for every terminal except `PowerShell`

### 1.4 - [OPTIONAL] Modify "new instance behavior"
- Go to Startup
- Set it to "attach to the most recently used window"

## 2 - Install a compatible font
### 2.1 - Download a Nerd Font
- Go to the [Nerd Fonts website](https://www.nerdfonts.com/font-downloads)
- Download the [Hack Nerd font](https://github.com/ryanoasis/nerd-fonts/releases/download/v3.0.2/Hack.zip)
- Unzip the folder
- Open up the "Font settings" (search for "fonts" in Windows)
- Drag and drop all the `.ttf` files from the unzipped hack folder into the "Add fonts" square:

  ![image](windows_terminal_setup_2.png)

### 2.2 - Set the terminal font in Windows Terminal
- Open up `Windows Terminal`
- Go to Settings
- Go to Profiles > PowerShell
- Go to Additional Settings > Appearance
- Go to Font face
- Choose `Hack Nerd Font`, save

### 2.3 - Set the terminal font in VS Code
- Open up VS Code
- Go to Settings
- Go to Features > Terminal
- Scroll down to `Terminal › Integrated: Font Family`
- Write "Hack Nerd Font", save and exit

![image](windows_terminal_setup_3.png)
 
## 3 - Create a PowerShell profile file
PowerShell will look for a profile file to initialize each time you open the terminal in the path that gets printed if you run his command: `echo $profile`. This file does not exist by default, so we need to create it.

- To create this file, simply run this command in your terminal `New-Item -Path $PROFILE -Type File -Force`
- Run the command `code $PROFILE` to open up the newly created file in VS Code
- Add the command `oh-my-posh init pwsh | Invoke-Expression` to the file, save
- Refresh your profile by running the command `. $PROFILE` in the terminal
- Your terminal should now look like this:

![image](windows_terminal_setup_4.png)
- These settings will be automatically initalized whenever you start the terminal from now on

## 4 - Add an "Oh My Posh" theme
- Open up the PowerShell profile file by running command `code $PROFILE` in your terminal
- Replace the command you just added with this (adding the `--config` part):
  - `oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH/jandedobbeleer.omp.json" | Invoke-Expression`
- If you save and refresh your terminal, you should see that the theme changed
- You can now go to the [theme page](https://ohmyposh.dev/docs/themes) on the Oh My Posh website and look for whatever theme you want to try
- When you've found one, take the name and replace the `"jandedobbeleer"` part of the expression above, save, and refresh the terminal
- For example, I like the ["amro"](https://ohmyposh.dev/docs/themes#amro) theme, so the full expression would be:
  - `oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH/amro.omp.json" | Invoke-Expression`
- My terminal now looks like this:

![image](windows_terminal_setup_5.png)
- It is also possible to [adjust themes](https://ohmyposh.dev/docs/installation/customize#adjust-a-theme) if you want to read more about that.

## 5 - Customize the PowerShell profile
### 5.1 - Add custom icons to the terminal
- Add the [`Terminal-Icons`](https://www.powershellgallery.com/packages/Terminal-Icons) package
  - Open your terminal and run the command `Install-Module -Name Terminal-Icons`
- Go to your profile file (run the command `code $PROFILE`)
- Under the `oh-my-posh init` line, add this code:
  - `Import-Module -Name Terminal-Icons`
- Save and refresh your terminal
- You should now have custom icons in your terminal
- Before:

![image](windows_terminal_setup_6.png)

- After:

![image](windows_terminal_setup_7.png)

### 5.2 - Add auto-complete and history functionality
- Add the [`PSReadLine`](https://www.powershellgallery.com/packages/PSReadLine) package
  - Open your terminal and run the command `Install-Module -Name PSReadLine -AllowPrerelease -Force`
- Go to your profile file (run the command `code $PROFILE`)
- Under the `Import-Module` line, add this code:
  - `Import-Module -Name PSReadLine`

- Add these lines under that:

```ps1
Set-PSReadLineOption -PredictionSource History
Set-PSReadLineOption -PredictionViewStyle ListView
Set-PSReadLineOption -EditMode Windows
```

- Save and refresh your terminal
- You should now have auto-complete and see a list of previous commands you've run in the terminal

![image](windows_terminal_setup_7.png)

- The updated profile file should now look the same as [Microsoft.PowerShell_profile.ps1](/Microsoft.PowerShell_profile.ps1)
  - Note that this profile file *also* contains a custom `GitPrune` command that you can choose to keep or not
 
## 6 - Updating packages
- To update the version of your installed packages, run this command:

```ps1
Update-Module -Name {NAME OF PACKAGE}
```

e.g: 

```ps1
Update-Module -Name PSReadLine
Update-Module -Name Terminal-Icons
```

- Then press "A" to check the "Yes to All" option if you get this warning:

![image](windows_terminal_setup_8.png)

- You can check what versions of packages you are using by running this command:

```ps1
Get-InstalledModule
```

### 6.1 - Troubleshooting when updating packages
- Even though the process above 👆 should work for updating packages, you might have to do some troubleshooting if it does not:
  
1. If you are not able to run the command in WT, then try running it in the normal "Command prompt" instead (`cmd.exe`), potentially starting the program as an administrator if you get any errors related to that
3. If you have updated the package but running the `Get-InstalledModule` only returns the previous un-updated package version, try this:
   - Go to the folder where PowerShell profile is (`echo $profile`)
   - Go into the "Modules" folder
   - Go into the folder for the package you are trying to update, there should be multiple folders in here, one for each version
   - **Delete the previous version(s)**
   - Reload the PS profile
   - Check again using `Get-InstalledModule`, the updated version should be the one that is being used now
