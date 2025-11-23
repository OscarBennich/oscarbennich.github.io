import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const consoleMessages = [];
  const errors = [];
  
  page.on('console', msg => {
    consoleMessages.push({
      type: msg.type(),
      text: msg.text()
    });
  });
  
  page.on('pageerror', error => {
    errors.push(error.message);
  });
  
  try {
    await page.goto('http://localhost:5174/blog/azure-function-app-logging-setup-guide', {
      waitUntil: 'networkidle',
      timeout: 30000
    });
    
    await page.waitForTimeout(2000);
    
    console.log('\n=== Console Messages ===');
    consoleMessages.forEach(msg => {
      console.log(`[${msg.type.toUpperCase()}] ${msg.text}`);
    });
    
    console.log('\n=== Page Errors ===');
    if (errors.length > 0) {
      errors.forEach(err => console.log(err));
    } else {
      console.log('No page errors detected');
    }
    
  } catch (error) {
    console.error('Error loading page:', error.message);
  }
  
  await browser.close();
})();
