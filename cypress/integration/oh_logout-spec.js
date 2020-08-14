describe('Test on logout function', function () {

    it('Should require login after logout from Student Landing page', function () {
        cy.visit('https://oh-idm-prod.acceliqc.com/');
        cy.get('#Username').clear().type('IDMTestV2');
        cy.get('#Password').clear().type('@IDMTestV2');
        cy.get('button[type=\'submit\']').click();
        cy.log('Loggin in');
        cy.get('h1.page-title').contains('Students', {timeout:240000}).should('be','visible');
        cy.get('.sk--user-name.fa-angle-down-after').click();
        cy.get('a.sk--logout[href=\'#\']').click();
        cy.log('Loggin out');
        cy.contains('You are signed out.').should('be','visible');
        cy.log('Attempt to open Student Landing page without re-login');
        cy.visit('https://oh-idm-prod.acceliqc.com/plan/Students/Landing');
        cy.get('#Username', {timeout:240000}).should('be','visible');
        cy.url().should('not','contain','Students/Landing');

        cy.visit('https://oh-idm-prod.acceliqc.com/app/home');


    });
    it('Should require login after logout from Home page', function () {
        cy.visit('https://oh-idm-prod.acceliqc.com/');
        cy.get('#Username').clear().type('IDMTestV2');
        cy.get('#Password').clear().type('@IDMTestV2');
        cy.get('button[type=\'submit\']').click();
        cy.log('Loggin in');
        cy.get('h1.page-title').contains('Students', {timeout:240000}).should('be','visible');
        cy.log('Open home page');
        cy.visit('https://oh-idm-prod.acceliqc.com/app/home');
        cy.get('h1.page-title').contains('Home', {timeout:240000}).should('be','visible');
        cy.get('.sk--user-name.fa-angle-down-after').click();
        cy.get('a.sk--logout[href=\'#\']').click();
        cy.log('Loggin out');
        cy.contains('You are signed out.').should('be','visible');
        cy.log('Attempt to open Home page without re-login');
        cy.visit('https://oh-idm-prod.acceliqc.com/app/home');
        cy.get('#Username', {timeout:240000}).should('be','visible');
        cy.url().should('not','contain','app/home');




    });
});