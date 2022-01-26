Feature('quiz start');


Scenario(
  'use preferred browser language (navigator.locale) to rediect the url, en -> /',
  ({I}) => {

     I.amOnPage('https://hedy-beta.herokuapp.com/hedy?lang=nl#end')
    // switch browser to english localizaton
    // set browser local to english
    session(
      'english browser',
      { /* Playwright specific option */ locale: 'en-US' },
      () => {
        // in case language detection relies on the request header vs navigator.language(s)
        I.haveRequestHeaders({
          'Accept-Language': 'nl-NL, nl;q=0.9, en-NL; q=0.8,en;q=0.7,en-US;q=0.6'},
        )
          I.amOnPage('/')
          I.see('English') // language picker shows english
          I.dontSeeInCurrentUrl('/hedy?lang=nl#end') // not redirected to Dutch url
          I.dontSee('Nederlands') // language picker does not show Dutch
          I.click('Hedy')
          I.click({xpath: '//*[@id="adventures"]/div[1]/div[10]'})
          I.grabCurrentUrl().then(function (result) {
    console.log(result);

        });

          I.click('input.green-btn')
          I.switchTo('iframe');
          I.saveScreenshot('debug')
          I.seeElement({css: '.center-picture'})
          I.see( 'Start quiz',{css: '.start-quiz-title'});
          I.see('Level 1', {css: '.start-quiz-subtitle'})
          I.see('Go to question 1', {css: 'button.green-btn'})

          I.click('button.green-btn')

          I.seeElement({xpath: '/html/body/div[3]/p'}) // check if the question text is visible
          I.see('Hint?', {css: '#hint-button'})
          I.click('#hint-button')
          I.dontSee('Hint?', {css: '#hint-button'})
      })

  }
)


