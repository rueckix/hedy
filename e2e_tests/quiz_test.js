Feature('quiz start');

Scenario('visit the start page of the quiz', ( {I }) => {
    I.amOnPage('https://hedycode.com/quiz/start/1')
    //I.moveCursorTo('.dropdown button')
    //I.see('Nederlands', 'li')
    //I.click('//li[contains(.,"Nederlands")]' ) // select the Dutch language. To localize the quiz

    I.seeElement({css: '.center-picture'})
    I.see( 'Start quiz',{css: '.start-quiz-title'});
    I.see('Level 1', {css: '.start-quiz-subtitle'})
    I.click('.green-btn')

});
