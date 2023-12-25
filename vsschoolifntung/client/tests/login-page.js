const puppeteer = require("puppeteer");

const Homepage = async () => {
  const browser = await puppeteer.launch({ headless: false, slowMo: true });
  const page = await browser.newPage();

  await page.goto("http://localhost:3000/login");

  await page.setViewport({ width: 1080, height: 1024 });

  await page.waitForSelector("input[type='email']");

  await page.type("input[type='email']", "oleh-teacher@gmail.com");
  await page.type("input[type='password']", "oleh");

  (await page.$("button[type='submit']")).click();

  await page.waitForNavigation();

  await browser.close();
};

module.exports = Homepage;
