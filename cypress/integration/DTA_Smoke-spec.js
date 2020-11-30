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
                /*  cy.contains('Welcome to AcceliTrack provider area!', {timeout: 50000})*/
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
                /*cy.get('div.search').type('Events by Student');
                cy.log('Should display `Events by student` dashboard');
                cy.get('[title=\'Events by Student\'] span').should('be.visible');
                cy.get('[title=\'Events by Student\'] span').click();
                /!* Cypress.on('window:before:load', (win) => {
                     spy = cy.spy(win.console, "error")
                 });
                //cy.server()
                // cy.route('GET', '*!/jaql').as('getEventByStudent');
                cy.wait('@getReports', {timeout: 170000}).then((xhr) => {
                    expect(xhr.status).to.equal(200);
                    // expect(spy).not.to.be.called;
                });*/
                cy.log('Should display Filters');
                cy.get('.toolbox-min-menu').contains('Filters', {timeout: 170000}).should('be.visible');
                /* cy.get('.toolbox-min-menu').contains('Filters').click();
                 cy.log('Should display List of schools');

                 cy.get('div.f-wrapper').contains('School Name').find('[data-translate-attr-title=\'we.actions.editfilter\']').then(($editFilter) => {
                     should('be.visible');
                     cy.get($editFilter).click();
                 });


                 cy.get('div.subtitle').contains('Edit Filter').should('be.visible');
                 cy.get('.checkmode-toggle.select-all').should('be.visible');
                 cy.log('All schools in the list should be checked');
                 cy.get('[data-ng-class=\'selectModeClass()\']').should('not.have.attr', 'class', 'uc-chk-icon-empty').and('have.attr', 'class', ' uc-chk-icon-check');
                 cy.get('.checkmode-toggle.select-all').click();
                 cy.log('All schools in the list should be unchecked');
                 cy.get('[data-ng-class=\'selectModeClass()\']').should('have.attr', 'class', 'uc-chk-icon-empty').and('not.have.attr', 'class', ' uc-chk-icon-check');
                 cy.get('div.uc-checker').then(($resp) => {
                     if ($resp.length) {
                         cy.log('Found ' + $resp.length + ' schools in the list');
                         cy.get($resp.eq(1)).then(($firstRow) => {
                             schoolName1 = normalizeText($firstRow.text().trim());
                             cy.get($firstRow).click();
                             cy.log('Click to first school in the list, ' + schoolName1 + ', verify, that it is checked.');
                             cy.get($firstRow).should('have.attr', 'class', 'uc-checked')
                         });
                         cy.get($resp.eq(2)).then(($secondRow) => {
                             schoolName1 = normalizeText($secondRow.text().trim());
                             cy.get($secondRow).click();
                             cy.log('Click to second school in the list, ' + schoolName2 + ',verify, that it is checked.');
                             cy.get($secondRow).should('have.attr', 'class', 'uc-checked')
                         });
                     }
                 });
                 cy.log('Click OK, wait dashboard to load.');
                 cy.get('div.uc-ok').click();
                 cy.wait('@getReports', {timeout: 170000}).then((xhr) => {
                     expect(xhr.status).to.equal(200);
                     // expect(spy).not.to.be.called;
                 });*/
                /*  cy.log('Click Logout button.');
                  cy.get('div.header-button').click();
                  cy.get('#UserName').should('be.visible');*/

        });
    });
    it('DTA system check on https://tx.acceliplan.com/', function () {

            urll = 'https://tx.acceliplan.com/'
            cy.manualLogin(urll);
            /*  cy.contains('Welcome to AcceliTrack provider area!', {timeout: 50000})*/
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
            // cy.get('.toolbox-min-user div').contains('Dashboards').click();
            // cy.get('div.search').should('be.visible');
            cy.log('Should display Filters');
            //  cy.get('.toolbox-min-menu').contains('Filters', {timeout: 170000}).should('be.visible');


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
        //cy.get('.toolbox-min-user div').contains('Dashboards', {timeout: 270000}).should('be.visible');
        cy.get('.toolbox-min-user div').contains('Dashboards').click();
        cy.get('[title=\'Provider Productivity\'] span').click();
        cy.get('.highcharts-background.widget-body', {multiple: true}, {timeout: 270000}).should('be.visible');
        cy.wait('@getReports', {timeout: 50000}, {multiple: true}).then((xhr) => {
            expect(xhr.status).to.equal(200);
        });
        cy.log('Should display the listing of dashboards available');
        //
        // cy.get('div.search').should('be.visible');
        cy.log('Should display Filters');
        //  cy.get('.toolbox-min-menu').contains('Filters', {timeout: 170000}).should('be.visible');


    });
    it('DTA system check on https://dade.acceliplan.com/', function () {

            urll = 'https://dade.acceliplan.com/'
            cy.manualLogin(urll);
            /*  cy.contains('Welcome to AcceliTrack provider area!', {timeout: 50000})*/
            cy.log('Should display DTA site');
            cy.visit(urll + 'sreport')
            cy.server()
            cy.route('POST', '**/jaql').as('getReports');
            cy.wait('@getReports', {timeout: 60000}).then((xhr) => {
                expect(xhr.status).to.equal(200);
            });
            cy.get('.toolbox-min-user div').contains('Dashboards', {timeout: 170000}).should('be.visible');
        cy.get('.highcharts-background.widget-body', {multiple: true}, {timeout: 270000}).should('be.visible');
//            cy.get('svg.hmw-half-year', {multiple: true}).should('be.visible');

            cy.log('Should display the listing of dashboards available');
            cy.get('.toolbox-min-user div').contains('Dashboards').click();
            cy.get('div.search').should('be.visible');
            cy.log('Should display Filters');
            cy.get('.toolbox-min-menu').contains('Filters', {timeout: 170000}).should('be.visible');

    });

});
