const urls = ["https://washoe.acceliplan.com/", "https://broward.acceliplan.com/", "https://santa-rosa.acceliplan.com/"];
let urll;
let spy;
let schoolName1;
let schoolName2;

beforeEach(function () {
    cy.fixture('pages')
        .then((pages) => {
            this.pages = pages
        });

});


describe('Test DTA System Availability', function () {
    urls.forEach((url) => {
        it('DTA system check on ' + url, function () {

                cy.manualLogin(url);
                cy.log('Should display DTA site');
                cy.visit(url + 'sreport')
                cy.server()
                cy.route('POST', '**/jaql').as('getReports');
                cy.wait('@getReports', {timeout: 170000}, {multiple: true}).then((xhr) => {
                    expect(xhr.status).to.equal(200);
                });
                cy.get('.toolbox-min-user div').contains('Dashboards', {timeout: 170000}).should('be.visible');
                cy.get('.highcharts-point', {multiple: true}).should('be.visible');
                cy.log('Should display the listing of dashboards available');
                cy.get('.toolbox-min-user div').contains('Dashboards').click();
                cy.get('div.search').should('be.visible');
                cy.log('Should display Filters');
                cy.get('.toolbox-min-menu').contains('Filters', {timeout: 170000}).should('be.visible');

        });
    });

    it('DTA system check on https://tx.acceliplan.com/', function () {

            urll = 'https://tx.acceliplan.com/'
            cy.manualLogin(urll);
            cy.log('Should display DTA site');
            cy.visit(urll + 'sreport')
            cy.server()
            cy.route('POST', '**/jaql').as('getReports');
            cy.wait('@getReports', {timeout: 50000}, {multiple: true}).then((xhr) => {
                expect(xhr.status).to.equal(200);
            });
            //cy.get('.toolbox-min-user div').contains('Dashboards', {timeout: 270000}).should('be.visible');

            cy.get('.highcharts-background.widget-body', {multiple: true}, {timeout: 270000}).should('be.visible');

            cy.log('Should display the listing of dashboards available');
            cy.log('Should display Filters');


    });
    it('DTA system check on https://dc.acceliplan.com/', function () {

        urll = 'https://dc.acceliplan.com/'
        cy.manualLogin(urll);
        /*  cy.contains('Welcome to AcceliTrack provider area!', {timeout: 50000})*/
        cy.log('Should display DTA site');
        cy.visit(urll + 'sreport')
        cy.server()
        cy.route('POST', '**/jaql').as('getReports');
        cy.wait('@getReports', {timeout: 50000}, {multiple: true}).then((xhr) => {
            expect(xhr.status).to.equal(200);
        });
        cy.get('.toolbox-min-user div').contains('Dashboards').click();
        cy.get('[title=\'Provider Productivity\'] span').click();
        cy.get('.highcharts-background.widget-body', {multiple: true}, {timeout: 270000}).should('be.visible');
        cy.wait('@getReports', {timeout: 50000}, {multiple: true}).then((xhr) => {
            expect(xhr.status).to.equal(200);
        });
        cy.log('Should display the listing of dashboards available');
        cy.log('Should display Filters');

    });
    it('DTA system check on https://dade.acceliplan.com/', function () {

            urll = 'https://dade.acceliplan.com/'
            cy.manualLogin(urll);
            cy.log('Should display DTA site');
            cy.visit(urll + 'sreport')
            cy.server()
            cy.route('POST', '**/jaql').as('getReports');
            cy.wait('@getReports', {timeout: 60000}).then((xhr) => {
                expect(xhr.status).to.equal(200);
            });
            cy.get('.toolbox-min-user div').contains('Dashboards', {timeout: 170000}).should('be.visible');
        cy.get('.highcharts-background.widget-body', {multiple: true}, {timeout: 270000}).should('be.visible');

            cy.log('Should display the listing of dashboards available');
            cy.get('.toolbox-min-user div').contains('Dashboards').click();
            cy.get('div.search').should('be.visible');
            cy.log('Should display Filters');
            cy.get('.toolbox-min-menu').contains('Filters', {timeout: 170000}).should('be.visible');

    });

});
