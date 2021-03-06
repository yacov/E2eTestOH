cy.events = {

    waitForAppStart: () => {
        // keeps rechecking "appHasStarted" variable
        return new Cypress.Promise((resolve, reject) => {
            const isReady = () => {
                if (appHasStarted) {
                    return resolve()
                }
                setTimeout(isReady, 0)
            }
            isReady()
        })
    },

    spyOnAddEventListener: (win) => {
        // win = window object in our application
        const addListener = win.EventTarget.prototype.addEventListener
        win.EventTarget.prototype.addEventListener = function (name) {
            if (name === 'change') {
                // web app added an event listener to the input box -
                // that means the web application has started
                appHasStarted = true
                // restore the original event listener
                win.EventTarget.prototype.addEventListener = addListener
            }
            return addListener.apply(this, arguments)
        }
    },
    deleteAllEvents: () => {
        cy.waitForLoading();
        cy.get('accelify-student-in-progress-events-grid table').then(($body) => {
            if ($body.find('span.k-i-close').length > -1) {
                cy.get('span.k-i-close').each(() => {
                    cy.get('span.k-i-close').eq(0).scrollIntoView().click({force: true});
                    cy.get('.ng-trigger-dialogSlideInAppear button').contains('Ok').click();
                    cy.waitForLoading();
                    cy.wait(2500);
                    // cy.getCurrentBuild();
                });

            } else {
                cy.log('Current events table is empty, proceed to next step.');
            }
        });

        // cy.contains('No records available.')
    },
    createEvent: (eventName) => {
        cy.contains('accelify-create-student-event-modal button', 'Create Event').click();
        cy.get('accelify-create-student-event-modal kendo-dropdownlist').click();
        cy.contains(eventName).click();
        cy.waitForLoading();
        cy.contains('accelify-create-student-event-modal button', 'Save').click();
cy.contains('Error creating an event on the server side.').should('not.exist')
        cy.server()
        cy.route('POST', '**/events').as('createEvent');
        cy.wait('@createEvent', {timeout: 270000}).then((xhr) => {
            expect(xhr.status).to.equal(200);
           // expect(xhr, 'has duration in ms').to.have.property('duration').and.be.a('number');
          //  expect(xhr, 'has duration in ms').to.have.property('duration').and.not.to.be.greaterThan(25000);

        });
        cy.waitForLoading();
        cy.get('accelify-student-in-progress-events-grid table').contains('a', eventName).should('have.attr', 'href').then((href) => {
            const a = Cypress.env('baseURL') + href
            cy.log('Url generated is' + a)
            cy.writeFile('cypress/fixtures/fullUrl.txt', a)
           cy.visit(a + '#EventOverview');
        })
            cy.server()
            cy.route('POST', '**/Events/GetEventOverview').as('openEvent');
            cy.wait('@openEvent', {timeout: 170000}).then((xhr) => {
                //  expect(xhr.status).to.equal(200);
                expect(xhr, 'has duration in ms').to.have.property('duration').and.be.a('number');
                 expect(xhr, 'has duration in ms').to.have.property('duration').and.not.to.be.greaterThan(25000);
                cy.writeFile('cypress/fixtures/forms.json', xhr.responseBody)
            });

    },
    visitEvent: (eventName) => {
        cy.visit(`${Cypress.env('baseURL')}/planng/Students/ViewStudent/${Cypress.env('txStudentId')}/Events/IEP`);
        cy.waitForLoading();
        cy.wait(2500);
        cy.get('accelify-student-in-progress-events-grid table').contains('a', eventName).should('have.attr', 'href').then((href) => {
            const a = Cypress.env('baseURL') + href
            cy.log('Url generated is' + a)
            cy.writeFile('cypress/fixtures/fullUrl.txt', a)
            cy.visit(a + '#EventOverview');
        })
        cy.server()
        cy.route('POST', '**/Events/GetEventOverview').as('openEvent');
        cy.wait('@openEvent', {timeout: 170000}).then((xhr) => {
            //  expect(xhr.status).to.equal(200);
            expect(xhr, 'has duration in ms').to.have.property('duration').and.be.a('number');
            expect(xhr, 'has duration in ms').to.have.property('duration').and.not.to.be.greaterThan(25000);
            cy.writeFile('cypress/fixtures/forms.json', xhr.responseBody)
        });

    },
    getFullUrl: () => {
        cy.readFile('cypress/fixtures/fullUrl.txt').then(u =>{
            return u;
        })
    }


}