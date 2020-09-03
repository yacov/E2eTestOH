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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add('manualLogin', (urll) => {
    return cy.fixture('pages').then((pages) => {
        const loginPage = pages.loginPage;
        cy.visit(urll + '/Login.aspx?ReturnUrl=%2fAcceliTrack/Home.aspx');
        cy.get(loginPage.usernameField).clear().type(Cypress.env('testUserName'));
        cy.get(loginPage.passwordField).clear().type(Cypress.env('testUsersPassword'));
        cy.get(loginPage.loginButton).click();
    })
});

Cypress.Commands.add('manualLoginTX', (urll) => {
    return cy.fixture('pages').then((pages) => {
        const loginPage = pages.loginPage;
        cy.visit(urll + '/Login.aspx?ReturnUrl=%2fAcceliTrack/Home.aspx');
        cy.get(loginPage.usernameField).clear().type('DTATester');
        cy.get(loginPage.passwordField).clear().type('Password!1');
        cy.get(loginPage.loginButton).click();
    })
});

Cypress.Commands.add('txqclLogin', (urll) => {
    return cy.fixture('pages').then((pages) => {
        const loginPage = pages.loginPage;
        cy.visit(urll + '/Login.aspx?ReturnUrl=%2fAcceliTrack/Home.aspx');
        cy.get(loginPage.usernameField).clear().type(Cypress.env('testUserName'));
        cy.get(loginPage.passwordField).clear().type(Cypress.env('qcUsersPassword'));
        cy.get(loginPage.loginButton).click();
    })
});

Cypress.Commands.add('login', (urll) => {
    return cy.fixture('pages').then((pages) => {
        const loginPage = pages.loginPage;
        cy.visit(urll + '/Login.aspx');
        cy.get(loginPage.usernameField).clear().type(Cypress.env('testUserName'));
        cy.get(loginPage.passwordField).clear().type(Cypress.env('testUsersPassword'));
        cy.get(loginPage.loginButton).click();
    })
});