const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => console.log('PAGE ERROR:', error.message));

    console.log("Navigating...");
    await page.goto('http://localhost:8080/levels', { waitUntil: 'networkidle2' });
    console.log("Done checking.");
    await browser.close();
  } catch (e) {
    console.error("Script error:", e);
  }
})();
