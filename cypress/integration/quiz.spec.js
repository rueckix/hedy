const YAML = require('yamljs')

function convertIndexToChar(index) {
    return String.fromCharCode(index + 65)
}

function convertCharToIndex(char) {
    return (char.charCodeAt(0) - 65);
}

describe('YAML file object', () => {
    beforeEach('Read YAML file content into object', () => {


        cy.readFile('./cypress/fixtures/quiz_en.yaml').then((str) => {
            // parse the string into object literal
            cy.wrap(YAML.parse(str)).as('quiz_data') // use a alias to make the quiz data available for all

        })
    })


    it('Iterates over the questions', () => {
        cy.get('@quiz_data').then(quiz => {
            cy.visit('http://127.0.0.1:8080/hedy', {
                onBeforeLoad(win) {
                    Object.defineProperty(win.navigator, 'language', {
                        value: 'en-US'
                    })
                }
            }).its('navigator.language') // yields window.navigator.language
                .should('equal', 'en-US') // asserts the expected value

            cy.get('div[data-tab="end"]').click()
            cy.get('input#goto-quiz-btn').contains('Go to quiz').click()
            cy.switchToIframe('#quiz-iframe').find('button.start-quiz-btn').contains('Go to question 1').click()

            cy.screenshot()

            let total_score = 0;
            let quiz_data = quiz[1]
            for (let q_nr = 1; q_nr < Object.keys(quiz_data).length + 1; q_nr++) {
                let question = quiz_data[q_nr]
                let attempt_nr = 0;
                cy.log(question)

                for (const attempt of question['attempt']) {
                    let attempt_index = convertCharToIndex(attempt)
                    expect(question['attempt']).to.be.an('array').to.have.length.of.at.most(6) // the number of options can't be bigger than 6
                    cy.wait(5)
                    cy.switchToIframe('#quiz-iframe').find('.question-text').contains(question['question_text'])

                    const hasKeyCode = 'code' in question
                    if (hasKeyCode && (question['code'] != '...'))
                        cy.switchToIframe('#quiz-iframe').find('.question-code').contains(`${question['code']}`)

                    const hasKeyOptionText = 'option_text' in question.mp_choice_options[attempt_index]
                    const hasKeyCodeText = 'code' in question.mp_choice_options[attempt_index]
                    if (hasKeyOptionText)
                        cy.switchToIframe('#quiz-iframe').find(`.option-block.option-${attempt}`).contains(`${question['mp_choice_options'][attempt_index]['option_text']}`).click()
                    else if (hasKeyCodeText)
                        cy.switchToIframe('#quiz-iframe').find(`.option-block.option-${attempt}`).contains(`${question['mp_choice_options'][attempt_index]['code']}`).click()

                    if (attempt_nr < 2) // max 3 attempts for each question
                        cy.switchToIframe('#quiz-iframe').find(`[value="${attempt}"]`).contains(`Answer question ${q_nr}`).click()
                    else
                        cy.switchToIframe('#quiz-iframe').find(`[value="${attempt}"]`).contains(`Go to answer`).click() // for the last attempt
                    cy.wait(10)
                    cy.screenshot()
                    attempt_nr++;
                }
                cy.wait(10)

                cy.switchToIframe('#quiz-iframe').find('.question-nr-length').contains(`Question ${q_nr} / 10`)
                cy.switchToIframe('#quiz-iframe').find('.question-text-feedback').contains(question['question_text'])
                if (question['attempt'][question['attempt'].length - 1] === question['correct_answer']) {
                    cy.switchToIframe('#quiz-iframe').find('.feedback-circle-success').contains("Good!")
                    total_score += 10;
                } else {
                    cy.switchToIframe('#quiz-iframe').find('.feedback-circle-failure').contains("Wrong!")
                }

                cy.log(question['mp_choice_options'][convertCharToIndex(question['attempt'][question['attempt'].length - 1])]['feedback'])

                const hasKeyTextAsOption = 'option_text' in question['mp_choice_options'][convertCharToIndex(question['correct_answer'])]
                if (hasKeyTextAsOption)
                    cy.switchToIframe('#quiz-iframe').find('.correct-answer-text').contains(`${question['mp_choice_options'][convertCharToIndex(question['correct_answer'])]['option_text']}`)
                const hasKeyCodeAsOption = 'code' in question['mp_choice_options'][convertCharToIndex(question['correct_answer'])]
                if (hasKeyCodeAsOption)
                    cy.switchToIframe('#quiz-iframe').find('.correct-answer-text').contains(`${question['mp_choice_options'][convertCharToIndex(question['correct_answer'])]['code']}`)

                if (q_nr === Object.keys(quiz_data).length) // go to result page for the quiz page else go feedback page when the quiz hasn't ended yet
                {
                    cy.switchToIframe('#quiz-iframe').find('.goto-question-btn').contains(`Go to quiz result`).click()
                    cy.wait(10)
                    cy.screenshot()
                    cy.switchToIframe('#quiz-iframe').find('h1.end-quiz-text').contains('Quiz end')
                    cy.switchToIframe('#quiz-iframe').find('.score-text').contains('Score')
                    cy.switchToIframe('#quiz-iframe').find('.total-score-number').contains(total_score)
                } else {
                    cy.switchToIframe('#quiz-iframe').find('.goto-question-btn').contains(`Go to question ${q_nr + 1}`).click()
                    cy.wait(10)
                }
            }
        })
    })
})
