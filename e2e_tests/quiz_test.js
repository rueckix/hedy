Feature('quiz start');

//use preferred browser language (navigator.locale) to redirect the url, en -> /'
Before(({ I }) => { // or Background
   I.amOnPage('https://hedy-beta.herokuapp.com/hedy?lang=nl#end')

});

Scenario(
  'Change the language of of the Hedy site from Dutch to English',
  ({I}) => {
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
      })

  }
)


