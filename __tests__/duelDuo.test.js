const { Builder, Browser, By, until } = require("selenium-webdriver");
const browserSync = require('browser-sync').create();
const chromedriver = require('chromedriver');
const chrome = require('selenium-webdriver/chrome')

let driver;

/*  -Each time a test runs it opens a new window. beforeAll resolves this
beforeEach(async () => {
  const chromeOptions = new chrome.Options();

  driver = await new Builder()
  .forBrowser(Browser.CHROME)
  .setChromeOptions(chromeOptions)  
  .build();
}); */

beforeAll(async () => {
  const chromeOptions = new chrome.Options();
  driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(chromeOptions)
    .build();
});

afterAll(async () => {
  await driver.quit();
});

describe("Duel Duo tests", () => {
  test("page loads with title", async () => {
    await driver.get("http://localhost:8080/");
    //await driver.get("https://www.google.com/");
    // -passed. Looks like my settings are good. 
    //issue was the server not having an endpoint for the index html.
    await driver.wait(until.titleIs("Duel Duo"), 3000); // Changed title and timeout
  });

   test("element with ID 'win' exists", async () => {
    await driver.get("http://localhost:8080");
    const element = await driver.findElement(By.id("wins"));
    expect(element).toBeTruthy();
  });

  test("click with ID 'draw'", async () => {
    await driver.findElement(By.id("draw")).click();
    const choiceBar = await driver.findElement(By.id("choices"))
    await driver.wait(until.elementIsVisible(choiceBar), 1000)

  });

  test("click with 'add to duo' to add a bot", async () => {
    const addButton = await driver.wait(until.elementLocated(By.xpath("/html/body/section[1]/div/div[1]/button")), 10000);
    await addButton.click();
  });
  
  test("click 'remove from duo' to remove bot from your selection", async () => {
    const playerDuo = await driver.wait(until.elementLocated(By.id("player-duo")), 10000);
    await playerDuo.findElement(By.xpath("/html/body/section[2]/section[1]/div/div[1]/button")).click();
  });

  test("bot returns to selection pool after clicking 'remove from duo", async () => {
    await driver.findElement(By.xpath("/html/body/section[1]/div/div[5]"))
  });

});
