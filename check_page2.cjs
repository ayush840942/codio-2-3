const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();
        await page.goto('http://localhost:8080/levels', { waitUntil: 'networkidle0' });

        const content = await page.evaluate(() => {
            return {
                headings: Array.from(document.querySelectorAll('h1, h2')).map(h => h.innerText),
                cardsFound: document.querySelectorAll('.lucide-lock, .lucide-check, .lucide-star').length
            };
        });

        console.log("Page Content:", JSON.stringify(content));
        await browser.close();
    } catch (e) {
        console.error("Script error:", e);
    }
})();
