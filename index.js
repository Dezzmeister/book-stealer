const {Builder, By, until} = require('selenium-webdriver');
const fs = require('fs');

async function main() {
    let driver = await new Builder().forBrowser('firefox').build();

    await driver.get('https://archive.org/account/login');
    await driver.findElement(By.name('username')).sendKeys('[email]');
    await driver.findElement(By.name('password')).sendKeys('[password]');
    await driver.findElement(By.name('submit-to-login')).click();
    await driver.wait(until.urlIs('https://archive.org/'), 3000);
    await driver.get('https://archive.org/details/onoriginofinequa00rous/page/n5/mode/2up?view=theater');
    
    setTimeout(() => stealPages(driver), 7000);

    
}

async function stealPages(driver) {
    const nextPageBtn = await driver.findElement(By.xpath(`//button[@title='Flip right']`));

    for (let page = 2; page <= 166; page+=2) {
        nextPageBtn.click();
        await sleep(5000);
        const screenshot = await driver.takeScreenshot();
        fs.writeFile(`pages/${page}.png`, screenshot, 'base64', (err) => err ? console.log(err):console.log(`saved page ${page}`));
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

main();