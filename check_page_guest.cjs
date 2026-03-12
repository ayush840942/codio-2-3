const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();

        page.on('console', msg => {
            if (msg.type() === 'error') console.log('PAGE ERROR LOG:', msg.text());
        });
        page.on('pageerror', error => console.log('PAGE EXCEPTION:', error.message));

        await page.goto('http://localhost:8080');
        await page.evaluate(() => {
            localStorage.setItem('codio_onboarding_complete', 'true');
            localStorage.setItem('codio_guest_mode', 'true');
        });

        await page.goto('http://localhost:8080/levels', { waitUntil: 'networkidle0' });

        const content = await page.evaluate(() => {
            return {
                headings: Array.from(document.querySelectorAll('h1, h2, h3')).map(h => h.innerText),
                cardsFound: document.querySelectorAll('.lucide-play, .lucide-lock, .lucide-check, .lucide-book-open').length,
                bodyText: document.body.innerText.substring(0, 200)
            };
        });

        console.log("Page Content:", JSON.stringify(content, null, 2));
        await browser.close();
    } catch (e) {
        console.error("Script error:", e);
    }
})();
