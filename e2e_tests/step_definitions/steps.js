// use I and productPage via inject() function
const {I} = inject();

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


// you can provide RegEx to match corresponding steps
Given('I answer question {string} with these answers {string}',  (question,attempt ) => {
     console.log('The data: '+ question + ' ' + attempt )
});

When('I answer the question in several attempts', async (table) => {
 /*   let browser
    I.usePlaywrightTo('use open browser', async ({browser, browserContext, page}) => {

    });*/


    I.switchTo('iframe')
     for (const id in table.rows) {
        if (id < 1) {
            continue; // skip a header of a table
        }

        // go by row cells
        const cells = table.rows[id].cells;

        // take values
        const question = cells[0].value;
        const code = cells[1].value;
        const correct_answer = cells[2].value;
        const question_score = cells[3].value;
        const attempt = cells[4].value;


        const nr_questions = table.rows.length

        I.see(question, {xpath: '/html/body/div[3]/p'})

        I.see('Hint?', {id: '#hint-button'})


        I.click('#hint-button')
        I.dontSee('Hint?', {id: '#hint-button'})

        I.seeNumberOfVisibleElements('.option-block', 4) //assuming there are only 4 possible options

        I.seeCssPropertiesOnElements(locate('.option-block').at(1), {'background-color': '#c6f6d5'})
        I.seeCssPropertiesOnElements(locate('.option-block').at(2), {'background-color': '#fae6a7'})
        I.seeCssPropertiesOnElements(locate('.option-block').at(3), {'background-color': '#bee3f8'})
        I.seeCssPropertiesOnElements(locate('.option-block').at(4), {'background-color': '#CC99C9'})

        let option_array = attempt.split(",")
        let nr_attempts = option_array.length
        for(const nr in option_array)
        {
            //Check the status of the progress bar
            const step_text = "Vraag " + id
            I.see(step_text, {css: ".step-text"})

            const attempt_text = "Poging " + nr
            I.see(attempt_text, {css: ".step-text"})

            checkChosenOption(option_array[nr])

            chooseOption(option_array[nr])
        }

    }
})

// or a simple string
Then('I go to the results page', () => {
    I.wait(5);
});

// parameters are passed in via Cucumber expressions
Then('I should see score of the quiz', () => {
    I.wait(5);
});
