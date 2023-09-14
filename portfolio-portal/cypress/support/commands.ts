// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('getStatusCode', (statusCode) => {
    cy.log('getStatusCodeReq:', JSON.stringify(statusCode));
    switch (statusCode) {
        case 503:
        case 504:
            cy.reload();
            break;
        default:
            break;
    }
});
  
/**
 * Adds custom command "cy.dataCy" to the global "cy" object
 *
 * @example cy.dataCy('greeting')
 */

// Cypress.Commands.add('exception', () => {
//     Cypress.on("fail", (err, runnable) => {
//         cy.log(err.message);
//         return false;
//     });
// });

Cypress.Commands.add('exception', () => {
    cy.on("uncaught:exception", (e, runnable) => {
        console.log("error", e);
        console.log("runnable", runnable);
        if (e.message.includes("Things went bad")) {
            return false;
        }
    });
});