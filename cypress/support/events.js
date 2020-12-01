cy.events = {

     waitForAppStart:() => {
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

 spyOnAddEventListener:  (win) => {
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
    deleteAllEvents:  () => {
        cy.waitForLoading();
        cy.get('accelify-student-in-progress-events-grid table').then(($body) => {
            if ($body.find('span.k-i-close').length) {
            cy.get('span.k-i-close').each(() => {
                    cy.get('span.k-i-close').eq(0).click();
                    cy.get('.ng-trigger-dialogSlideInAppear button').contains('Ok').click();
                    cy.waitForLoading();
                    cy.wait(2500);
                   // cy.getCurrentBuild();
            });

        }

            else{
cy.log('Current events table is empty, proceed to next step.');
            }
        });

       // cy.contains('No records available.')
    },
    createEvent: (eventName) => {
         let a;
    cy.contains('accelify-create-student-event-modal button', 'Create Event').click();
    cy.get('accelify-create-student-event-modal kendo-dropdownlist').click();
cy.contains(eventName).click();
        cy.waitForLoading();
        cy.contains('accelify-create-student-event-modal button','Save').click();
        cy.server()
        cy.route('POST', '**/events').as('createEvent');
        cy.wait('@createEvent', {timeout: 270000}).then((xhr) => {
           // expect(xhr.status).to.equal(200);
            expect(xhr, 'has duration in ms').to.have.property('duration').and.be.a('number').and.not.to.be.greaterThan(40000);
            // cy.writeFile('cypress/fixtures/forms.json', xhr.responseBody)

        });
        cy.waitForLoading();
           cy.get('accelify-student-in-progress-events-grid table').contains('a',eventName).should('have.attr', 'href').then((href) => {
                   cy.visit(Cypress.env('baseURL') + href+ + '#EventOverview');
               cy.server()
               cy.route('POST', '**/Events/GetEventOverview').as('openEvent');
               cy.wait('@openEvent', {timeout: 170000}).then((xhr) => {
                 //  expect(xhr.status).to.equal(200);
                   expect(xhr, 'has duration in ms').to.have.property('duration').and.be.a('number').and.not.to.be.greaterThan(25000);
               });
               })
        return a;
}


}