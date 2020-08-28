const url = "https://tx.acceliqc.com"

beforeEach(function () {
    cy.fixture('pages')
        .then((pages) => {
            this.pages = pages
        });

});

    describe('Fill Annual meeting Forms on  ' + url, function () {

        it('Fill Present levels', function () {
            cy.manualLogin(url);
          /*  cy.contains('Welcome to AcceliTrack provider area!', {timeout: 50000})*/
            cy.log('Open created Annual  event');
            cy.visit(url + '/plan/Events/ViewEvent?eventId='+Cypress.env('eventURL'));
            cy.get('span[data-sectionname=\'Present Levels\']').click();
            cy.server()
            cy.route('POST', '*/PLAN/Events/ViewForm/*').as('getForm');
            cy.wait('@getForm', {timeout: 170000}).then((xhr) => {
                expect(xhr.status).to.equal(200);
            });
            cy.get('[field-title=\'Review of previous IEP, including status update(s)\']').click();
            cy.get('textarea[field-key=\'StatementOfEligibilityPresentLevels\']').type('results of the initial evaluation')
            cy.get('textarea[field-key=\'SummaryParentConcern\']').type(' parent input received');
            cy.get('span.StudentIsYoungerThan18WithAppropriateParentalInvolvement label span').contains('No').click();
            cy.get('.StudentAtLeast18AndAppropriateParentalInvolvementWasRequested label span').contains('No').click();
            cy.get('.StudentHasBeenInformedAtLeastOneYearBeforeTurning18OfTransferOfRights label span').contains('No').click();
            cy.log('Should save Form changes');
            cy.get('a#btnUpdateForm').click();
            cy.server()
            cy.route('POST', '*/PLAN/Events/UpdateForm/*').as('updateForm');
            cy.wait('@updateForm', {timeout: 170000}).then((xhr) => {
                expect(xhr.status).to.equal(200);
            });
        });
    });