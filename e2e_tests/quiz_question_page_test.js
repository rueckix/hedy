Feature('Quiz question page');

Scenario('Verify all the elements on the question page en choose for question 1 option 1', ({ I , LanguagePicker}) => {
    LanguagePicker.selectEnglishLanguage()
    I.click('input.green-btn')
    I.switchTo('#quiz-iframe');
    I.saveScreenshot('debug1')
    I.click('.green-btn')
    I.saveScreenshot('debug2')
    I.waitForElement({xpath: '/html/body/div[3]/p'}, 5)
    I.seeElement({xpath: '/html/body/div[3]/p'}) // check if the question text is visible
    I.see('Hint?', {css: '#hint-button'})
    I.click('#hint-button')

    I.dontSee('Hint?', {css: '#hint-button'})
});
