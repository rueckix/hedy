const {I} = inject();

Feature('quiz attempt');


// Define data table inside a test or load from another module
let attempts = new DataTable(['question', 'code', 'correct_answer', 'question_score', 'attempt']); //
attempts.add(['What\'s this programming language called?', 'none', 'A', 10, 'B,C,D']); // adding records to a table
attempts.add(['Which command makes text appear?', 'none', 'B', '10', 'A,B'])
attempts.add(['How do you ask what someone\'s favorite color is?', 'none', 'C', '10', 'C'])
attempts.add(['What is wrong with this code?','Hi Im Hedy!<br>ask Who are you?<br>echo Hi...', 'A', '10', 'B,A'])
attempts.add(['Which command is missing in line 2?', 'ask What is your favorite pet?<br>? So your favorite pet is..."', 'D', 10, 'A,C'])
attempts.add(['What\'s wrong with this code?', 'print Hi im Hedy!<br>aks Which football team do you support?<br>echo You support...<br>print Cool! Me too!', 'B', 10, 'B'])
attempts.add(['What\'s wrong with this code? ', 'print Welcome at Hedys restaurant!<br>ask What would you like to eat?<br>echo So you want to order ...<br>print Coming right up! Enjoy!"', 'D', 10., 'A,C,B' ])
attempts.add(['How do you use the echo command?', 'none', 'C', 10, 'B'])
attempts.add(['What\'s wrong with this code?', 'print Hello!<br>print How are you doing?<br>echo So you are doing..."', 'B', 10 , 'B'])
attempts.add(['Are you ready for level 2?', 'none', 'B', 10, 'A'])

function charToIndex(chosenOption){
    return chosenOption.charCodeAt(0)-65 //start with 1
}
function checkChosenOption(chosenOption){
    const index = charToIndex(chosenOption)
    let xpath_icon;
    switch(index){
        case 1:
            xpath_icon= '/html/body/div[3]/form/div/div/div[1]/div[1]/svg/polygon'
            break;
        case 2:
            xpath_icon = '/html/body/div[3]/form/div/div/div[1]/div[2]/svg/rect'
            break;
        case 3:
            xpath_icon = '/html/body/div[3]/form/div/div/div[2]/div[1]/svg/rect'
            break;
        case 4:
            xpath_icon = '/html/body/div[3]/form/div/div/div[2]/div[2]/svg/circle'
            break;
        case 5:
            xpath_icon = '/html/body/div[3]/form/div/div/div[3]/div[1]/svg/polygon'
        case 6:
            xpath_icon = '/html/body/div[3]/form/div/div/div[3]/div[2]/svg/polygon'
            break;
        default:
            break;
    }
    I.seeElement({xpath: xpath_icon})
}

function chooseOption(option) {

    const index = charToIndex(option)
    switch (index) {
        case 1:
            I.click(locate('.option-block').at(1), {'background-color': '#c6f6d5'})
            break;
        case 2:
            I.click(locate('.option-block').at(2), {'background-color': '#fae6a7'})
            break;
        case 3:
            I.click(locate('.option-block').at(3), {'background-color': '#bee3f8'})
            break;
        case 4:
            I.click(locate('.option-block').at(4), {'background-color': '#CC99C9'})
            break;
        case 5:
            I.click(locate('.option-block').at(4), {'background-color': '#FFBAD2'})
        case 6:
            I.click(locate('.option-block').at(5), {'background-color': 'rgba(201, 145, 77, 0.7)'})
            break;
        default:
            break;
    }
}

/*

Before(({I})=> {

    I.amOnPage('https://hedy-beta.herokuapp.com')
    session(
        'english browser',
        { /!* Playwright specific option *!/ locale: 'en-US'},
        () => {
            // in case language detection relies on the request header vs navigator.language(s)
            I.haveRequestHeaders({
                    'Accept-Language': 'nl-NL, nl;q=0.9, en-NL; q=0.8,en;q=0.7,en-US;q=0.6'
                },
            )
            I.amOnPage('https://hedy-beta.herokuapp.com')
            I.click('Hedy')
            I.click({xpath: '//!*[@id="adventures"]/div[1]/div[10]'})
            I.grabCurrentUrl().then(function (result) {
                console.log(result);

            });
            I.click('input.green-btn')
            I.switchTo('iframe');
        })
})
*/

Data(attempts).Scenario('Test quiz answer attempt',  ({I, current}) => {
    I.say('Yes')
    I.saveScreenshot("screenshot_hedy_quiz_attempt.png");
    //I.seeElement('img.rounded-full')
    I.see( 'Start quiz','.start-quiz-title');
    I.see('Level 1', '.start-quiz-subtitle')
    I.see('Go to question 1', {css: 'button.green-btn'})
    I.see('Hint?', {id: 'hint-button'})
    I.click('#hint-button')
    I.dontSee('Hint?', {id: 'hint-button'})
});
