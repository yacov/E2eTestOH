cy.fillForms = {
    makeUniqueUsername: () => {
        return 'cypress-test-' + Cypress.moment().format("YYMMDD-HHmmss");
    }
}