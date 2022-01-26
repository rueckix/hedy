Feature('quiz start');


Scenario(
  'use preferred browser language (navigator.locale) to rediect the url, en -> /',
  ({I}) => {

     I.amOnPage('https://hedycode.com/quiz/start/1?lang=nl')
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
        I.dontSeeInCurrentUrl('?lang=nl') // not redirected to Dutch url
        I.dontSee('Nederlands') // language picker does not show Dutch
      })
        I.seeElement({css: '.center-picture'})
        I.see( 'Start quiz',{css: '.start-quiz-title'});
        I.see('Level 1', {css: '.start-quiz-subtitle'})
        I.see('Go to question 1', {css: 'button.green-btn'})

        I.click('button.green-btn')
  }
)


