const Helper = require('@codeceptjs/helper');
const { chromium} = require('playwright');
playwright = require('playwright');


class LanguagePickerHelper extends Helper {


  /*  async _startBrowser() {

       let browser = await chromium.launch({headless: false });
      return await chromium.launchPersistentContext('/tmp/playwright-tmp');
  }*/

    // before/after hooks
    /**
     * @protected
     */
    async _init() {
//
       const browser = await chromium.launch( {headless: false });
        //const browser = this._startBrowser()
        //const chromium = await playwright['chromium'];
       // const context = await chromium.launchPersistentContext('/tmp/playwright-tmp', { headless: false, locale: 'nl-NL' });
        const context = await browser.newContext({
            locale: 'nl-NL'
        });
        const page = await context.newPage();
        await page.goto('https://hedy-beta.herokuapp.com?lang=nl')
        await page.screenshot({path: "screenshot_hedy_nl.png"})
        await page.click(".dropdown button");
        await page.locator("#search_language").type("English")
        await Promise.all([
            page.waitForNavigation({url: '**/', waitUntil:"load"}),
            page.locator('//*[@id="main_container"]/div[4]/nav/div[2]/ul/a[1]').click(),// Triggers a navigation with a script redirect.
        ]);
        const url = page.url()
        console.log('url => ' + url);
        await page.screenshot({path: "screenshot_hedy_eng.png"})
        await page.locator('a:has-text("Hedy")').click();

        const tabHandle = await page.$('#adventures')
        await tabHandle.$eval('.tab', node => node.classList.add('tab-selected') )
        await tabHandle.$eval('div[data-tabtarget="level"]',(tab) => tab.classList.add('hidden') );
        await tabHandle.$eval('div[data-tabtarget="end"]',(tab) => tab.classList.remove('hidden') );
        await tabHandle.$eval('div[data-tabtarget="end"]',(tab) => tab.style.display='block');
       // await page.$eval('div[data-tabtarget="end"]',(tab) => tab.style.display='block');

        await page.screenshot({path: "screenshot_hedy_end.png"})
        await page.locator('input:has-text("Go to quiz")').click();
        const frame = await page.frame('#quiz-iframe')
        const locator = page.frameLocator('#quiz-iframe').locator('text="Go to question 1"');
        await locator.click();

        await page.screenshot({path: "screenshot_hedy.png"})
    }

/*    switchToContext(){
        hedyBrowser =  browser
        return hedyBrowser.switchToContext(context)
    }*/




    // add custom methods here
    // If you need to access other helpers
    // use: this.helpers['helperName']

}



module.exports = LanguagePickerHelper;
