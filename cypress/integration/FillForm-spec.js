const url = "https://tx.acceliqc.com"

beforeEach(function () {
    cy.fixture('pages')
        .then((pages) => {
            this.pages = pages
        });

});

    describe('Fill Annual meeting Forms on  ' + url, function () {

        it('Fill Present levels', function () {
            cy.txqclLogin(url);
            cy.get('#plcContent_lblPageTitle').should('contain','Home');
          /*  cy.contains('Welcome to AcceliTrack provider area!', {timeout: 50000})*/
            cy.log('Open created Annual event');
            cy.visit(url + '/plan/Events/ViewEvent?eventId='+Cypress.env('eventURL'));
            cy.get('span[data-sectionname=\'Present Levels\']').click();
            cy.get('[field-title=\'Review of previous IEP, including status update(s)\']').check({force: true});
            cy.get('textarea[field-key=\'StatementOfEligibilityPresentLevels\']').type('results of the initial evaluation')
            cy.get('textarea[field-key=\'SummaryParentConcern\']').type(' parent input received');
            cy.get('span.StudentIsYoungerThan18WithAppropriateParentalInvolvement label span').contains('No').click({force: true});
            cy.get('.StudentAtLeast18AndAppropriateParentalInvolvementWasRequested label span').contains('No').click({force: true});
            cy.get('.StudentHasBeenInformedAtLeastOneYearBeforeTurning18OfTransferOfRights label span').contains('No').click({force: true});
            cy.log('Should save Form changes');
            cy.get('a#btnUpdateForm').click();
           /* cy.server()
            cy.route('POST', '*!/PLAN/Events/UpdateForm').as('updateForm');
            cy.wait('@updateForm', {timeout: 100000}).then((xhr) => {
                expect(xhr.status).to.equal(200);
            });*/
        });
    });