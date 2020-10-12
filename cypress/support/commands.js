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

Cypress.Commands.add('getIframeDocument', () => {
    const getIframeDocument = () => {
        return cy
            .get('iframe')
            // Cypress yields jQuery element, which has the real
            // DOM element under property "0".
            // From the real DOM iframe element we can get
            // the "document" element, it is stored in "contentDocument" property
            // Cypress "its" command can access deep properties using dot notation
            // https://on.cypress.io/its
            .its('0.contentDocument').should('exist')
    }
});

Cypress.Commands.add('getIframeBody', () => {
    const getIframeBody = () => {
        // get the document
        return cy.getIframeDocument()
            // automatically retries until body is loaded
            .its('body').should('not.be.undefined')
            // wraps "body" DOM element to allow
            // chaining more Cypress commands, like ".find(...)"
            .then(cy.wrap)
    }
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

Cypress.Commands.add('txDemoLogin', (urll) => {
    return cy.fixture('pages').then((pages) => {
        const loginPage = pages.loginPage;
        cy.visit(urll + '/Login.aspx?ReturnUrl=%2fAcceliTrack/Home.aspx');
        cy.get(loginPage.usernameField).clear().type(Cypress.env('testUserName'));
        cy.get(loginPage.passwordField).clear().type(Cypress.env('testUsersPassword'));
        cy.get(loginPage.loginButton).click();
    })
});


Cypress.Commands.add('loginif', () => {
    if(cy.url().contains('login.aspx')){
        cy.get('#UserName').clear().type(Cypress.env('testUserName'));
        cy.get('#Password').clear().type(Cypress.env('testUsersPassword'));
        cy.get('#lnkLogin').click();
    }
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

Cypress.Commands.add('openForm', (formFullName) => {
    return cy.fixture('forms').then((forms) => {
        for (var i = 0; i < forms.Items.length; i++) {
            if(forms.Items[i].Name === formFullName) {
                cy.log('Form '+formFullName+' found in the list.')
                const formdid = forms.Items[i].FormId;
                const sectionName = forms.Items[i].EventSection;
                const uurl = Cypress.env('baseURL') + '/plan/Events/ViewEvent?eventId=' + Cypress.env('eventURL') + '#' + sectionName + '&formId=' + formdid;
                cy.log('url of the form '+ formFullName+ 'is '+uurl);
                cy.server()
                cy.route('POST', '**/Events/ViewForm').as('openPage');
                cy.visit(uurl);
                cy.wait('@openPage', {timeout: 270000}).then((xhr) => {
                    expect(xhr.status).to.equal(200);
                });
            }
        }
    })
});

Cypress.Commands.add('getFormLink', (urll) => {

        const link = cy.get(`[data-title=\'${urll}\'] span a.k-link`).invoke('attr', 'href');
    cy.log(link)
    return link;

});