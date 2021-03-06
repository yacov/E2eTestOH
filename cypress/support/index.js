// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import './fillForms'
import './events'
require('cypress-xpath')
const fs = require('fs');

module.exports = (on, config) => {
    on('task', {
        writeFile ({ filename, data, flag }) {
            fs.writeFileSync(filename, data, flag);
            return null;
        }
    })
}
// Alternatively you can use CommonJS syntax:
// require('./commands')

/*Cypress.on("window:before:load", win => {
  cy.stub(win.console, "error", msg => {
    cy.now("task", "error", msg);
  });
});*/
/*
    cy.stub(win.console, "warn", msg => {
        cy.now("task", "warn", msg);
    });
});*/
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
});