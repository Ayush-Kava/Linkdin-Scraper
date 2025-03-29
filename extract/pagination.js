const {Actor} = require("apify");

module.exports = async function (page) {
    const {extractDetail} = require("./index");
    let hasNext = true;

    while (hasNext) {
        await page.waitForSelector(".artdeco-pagination__indicator--number.active", { timeout: 10000 });

        const currentPage = await page.evaluate(() => {
            const activePage = document.querySelector(".artdeco-pagination__indicator--number.active");
            return activePage ? parseInt(activePage.innerText.trim()) : 1;
        });

        console.log(`Scraping Page: ${currentPage}`);
        const data = await extractDetail(page);
        // console.log(data.url);
        // await Actor.pushData(data.filter);
        for (const job of data) {
            // console.log(job.url);
            if (job.url) {
                await Actor.pushData(job);
            }
        }

        let nextPageSelector = `[data-test-pagination-page-btn="${currentPage + 1}"] button`;
        let nextPageButton = await page.$(nextPageSelector);

        if (nextPageButton) {
            await page.evaluate((selector) => {
                document.querySelector(selector).scrollIntoView();
            }, nextPageSelector);
            await page.waitForSelector(nextPageSelector, { visible: true, timeout: 5000 });
            await nextPageButton.click();
            await page.waitForNavigation({ waitUntil: "domcontentloaded" });

        } else {
            const dotsButton = await page.$(`li button[aria-label="Page ${currentPage + 1}"]`);

            if (dotsButton) {
                console.log("Clicking '...' to reveal more pages.");
                await dotsButton.click();
            } else {
                hasNext = false; 
            }
        }
    }
}