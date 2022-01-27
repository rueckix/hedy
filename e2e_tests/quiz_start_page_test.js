Feature('Quiz start page');
Scenario('Verify the elements on the start page and go to the question page', ({ I , LanguagePicker}) => {
    LanguagePicker.selectEnglishLanguage()
    I.click('input.green-btn')
    I.switchTo('#quiz-iframe');
    I.seeElement({css: '.center-picture'})
    I.see( 'Start quiz',{css: '.start-quiz-title'});
    I.see('Level 1', {css: '.start-quiz-subtitle'})
    I.see('Go to question 1', {css: 'button.green-btn'})

});
