const allQuizData = require('../fixtures/quiz_data.json')

function convertIndexToChar(index){
    return String.fromCharCode(index+65)
}

function convertCharToIndex(char){
    return char.charCodeAt(0)-65;
}


// sanity check
expect(allQuizData, 'list of quiz questions').to.be.an('array')

describe('Quiz navigation', () => {
    beforeEach('Navigate to quiz iframe', () => {
        cy.fixture('quiz_data.json').as('quiz_data')

    })


    it('Iterates over the questions', () => {
        cy.visit('http://127.0.0.1:8080/hedy', {
            onBeforeLoad(win) {
                Object.defineProperty(win.navigator, 'language', {
                    value: 'en-US'
                })
            }
        }) .its('navigator.language') // yields window.navigator.language
          .should('equal', 'en-US') // asserts the expected value

        cy.get('div[data-tab="end"]').click()
        cy.get('input#goto-quiz-btn').contains('Go to quiz').click()
        cy.switchToIframe('#quiz-iframe').find('button#start-quiz-btn').contains('Go to question 1').click()

        cy.screenshot()
        cy.get('@quiz_data').then((quiz_data) => {
            let q_nr = 1
            for (const question of quiz_data) {
                let attempt_nr = 0;
                const attempt_array = question['attempt'].split(',')
                for(const attempt of attempt_array) {
                    let attempt_index = convertCharToIndex(attempt)
                    expect(attempt_array).to.be.an('array').to.have.length.of.at.most(6) // the number of options can't be bigger than 6
                    cy.switchToIframe('#quiz-iframe').find('#question-text').contains(question['question_text'])
                    cy.switchToIframe('#quiz-iframe').find(`.option-block.option-${attempt}`).contains(question['mp_choice_options'][attempt_index]['option_text']).click()

                    if(attempt_nr < 2) // max 3 attempts for each question
                        cy.switchToIframe('#quiz-iframe').find(`[value="${attempt}"]`).contains(`Answer question ${q_nr}`).click()
                    else
                        cy.switchToIframe('#quiz-iframe').find(`[value="${attempt}"]`).contains(`Go to answer`).click() // for the last attempt
                    cy.screenshot()
                    attempt_nr++;
                }
                q_nr++;
            }
        })
    })
})
