declare namespace Cypress {
    interface Chainable {
        /**
         * Custom command to select DOM element by data-cy attribute.
         * @example cy.dataCy('greeting')
         */
        
        // Popup
        exception(): Chainable<Element>
        getStatusCode(statusCode: number): Chainable<Element>
    }
}