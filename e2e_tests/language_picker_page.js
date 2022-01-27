const I = actor(require('../steps_file')())

module.exports = {
  selectEnglishLanguage() {
      I.amOnPage('https://hedy-beta.herokuapp.com/hedy?lang=nl#end')
     session(
      'english browser',
      { /* Playwright specific option */ locale: 'en-US' },
      () => {
        // in case language detection relies on the request header vs navigator.language(s)
        I.haveRequestHeaders({
          'Accept-Language': 'nl-NL, nl;q=0.9, en-NL; q=0.8,en;q=0.7,en-US;q=0.6'},
        )
          I.amOnPage('/')
          I.click('Hedy')
          I.click({xpath: '//*[@id="adventures"]/div[1]/div[10]'})
          I.grabCurrentUrl().then(function (result) {
    console.log(result);
     I.click('input.green-btn')
    I.switchTo('iframe');
        });
      })
  }
}
