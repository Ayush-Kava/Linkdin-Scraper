const { Actor }= require("apify");
const { Input } = require("chromium-bidi/lib/cjs/protocol/protocol");
const {
    launchPuppeteer,
    FileDownload
} = require("crawlee");
const {paginationData} = require("../extract/index");

Actor.main(async() =>{
    const browser = await launchPuppeteer({
        launchOptions:{
            headless: false,
        }
    });
    const page = await browser.newPage();
    const dataSet = await Actor.openDataset(); 
    const input = await Actor.getInput();
    const url = input?.url ||  "https://example.com";
    console.log(url);
    await page.goto(url, { waitUntil: "domcontentloaded" });

    await page.click("[data-test-id='home-hero-sign-in-cta']")

    console.log(input.password);
    console.log(input.email);

    // typing the login details
    await page.waitForSelector('#username',{timeout: 1000});
    await page.type('#username',input.email);
    await page.type('#password',input.password);

    // await page.click("[aria-label='Sign in']");

    await Promise.all([
        page.waitForNavigation({ waitUntil: "domcontentloaded", timeout: 60000 }),
        page.click("[aria-label='Sign in']")
    ]);
    
    // searching or typing the Filed
    await page.waitForSelector('.search-global-typeahead__input',{timeout: 60000});
    await page.type(".search-global-typeahead__input",input.category);
    await page.keyboard.press('Enter');

    //click show result to get location input field
    await page.waitForSelector(".search-results__cluster-bottom-banner", { timeout: 10000 });
    await page.click(".search-results__cluster-bottom-banner a");

    // clear the input field where india is written 
    await page.waitForSelector('[aria-label="City, state, or zip code"]',{timeout: 60000});
    await page.click('[aria-label="City, state, or zip code"]', { clickCount: 3 });
    await page.keyboard.press("Backspace");

    // typing the location and click enter 
    await page.type('[aria-label="City, state, or zip code"]',input.city);
    await page.keyboard.press('Enter');

    //getting data
    await paginationData(page);

    await browser.close();
})