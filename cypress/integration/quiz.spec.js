const allQuizData = require('../fixtures/quiz_data.json')
const {iframe} = require('../support/commands.js')
/*
const getIframeBody = () => {
    // get the iframe > document > body
    // and retry until the body element is not empty
    return cy
        .get('iframe[id="quiz-iframe"]')
        .its('0.contentDocument.body').should('not.be.empty')
        // wraps "body" DOM element to allow
        // chaining more Cypress commands, like ".find(...)"
        // https://on.cypress.io/wrap
        .then(cy.wrap)
}
*/

// sanity check
expect(allQuizData, 'list of quiz questions').to.be.an('array')

describe('Quiz navigation', () => {
    beforeEach('Navigate to quiz iframe', () => {
        cy.fixture('quiz_data.json').as('quiz_data')

    })




    it('Iterates over the questions', () => {
        cy.visit('https://hedy-beta.herokuapp.com/hedy')
        cy.get('div[data-tab="end"]').click()
        cy.get('#adventures-tab > div:nth-child(10) > div > div > input').should('have.value', 'Go to quiz').click()
        cy.switchToIframe('#quiz-iframe').find('div.p-10.button-bar.border-t-8.border-green-600 > button.green-btn').should('have.text', '\n                Go to question 1\n            ').click()
        cy.screenshot()
        cy.get('@quiz_data').then((quiz_data) => {
            for (const question of quiz_data) {
                expect(quiz_data).to.be.an('array').and.to.have.have.length(2)
                cy.switchToIframe('#quiz-iframe').find('div > p').contains(question['question'])
                cy.switchToIframe('#quiz-iframe').find('.option-block').contains('Heddy').click()
                cy.switchToIframe('#quiz-iframe').find('[value="B"]').contains('Answer question 1').click()
                cy.screenshot()
            }
        })
    })
})
