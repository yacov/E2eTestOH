//const url = "http://tx-demo.accelidemo.com"
const url = Cypress.env('baseURL')
let formLink;
let formName;
let appHasStarted;
let datastr = [];
let openPL;
let openCurr;
let physicalFA;
let openPL2;
let openCurr2;
let header;
function waitForAppStart() {
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
}

function sendDatatoGoogle(data) {
    // 1. Run npm install node-fetch
// 2. Import an HTTP client
    const fetch = require("node-fetch");

// 3. Declare spreadsheet and values to append
    const spreadsheetId = '1gvSJ7UXSR6Ob5IiYU_PskIoSv3TmU4_OcXXEO25p4U8'
   // const data = [["firstname", "lastname"]];


// 4. Send data with a POST request
    const baseUrl = "https://pushtogsheet.herokuapp.com";
    const query = `valueInputOption=RAW&pizzly_pkey=pope8Qy8qfYyppnHRMgLMpQ8MuEUKDGeyhfGCj`;
    const url = new URL(`/proxy/google-sheets/${spreadsheetId}/values/A1:append?${query}`, baseUrl);
    fetch(url.href, {
        method: "POST",
        body: JSON.stringify({ values: data }),
        headers: { 'Pizzly-Auth-Id': '2242dae0-1c45-11eb-85b5-6b70396ee5eb' }
    })
        .then((res) => res.text())
        .then(console.log)
        .catch(console.error);
}

function spyOnAddEventListener (win) {
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
}
before(function () {
    if(url.includes('demo'))
    {cy.txDemoLogin(url); }
    if(url.includes('qc'))
    {cy.txqclLogin(url); }
    if(url.includes('tx.acceliplan.com'))
    {cy.txProdLogin(url); }
    Cypress.Cookies.preserveOnce('ASP.NET_SessionId', '.ASPHAUTH');
});
beforeEach(function () {
    cy.server()
    cy.route('POST', '**/Events/ViewForm').as('openPage');
    cy.route('POST', '**/Events/UpdateForm').as('savePage');
    cy.route('POST', '**/Events/GetEventOverview').as('openEvent');
   Cypress.Cookies.preserveOnce('ASP.NET_SessionId', '.ASPHAUTH');
});

after(function (){
    datastr.push([openPL, openCurr, physicalFA]);
 //   cy.writeFile('cypress/fixtures/forms.json', '{}')
    sendDatatoGoogle(datastr);
})

describe('Monitor Initial Event pages performance on  ' + url, function () {

    it('Open created event', function () {
cy.get('#plcContent_lblPageTitle').should('contain', 'Home');
        /*  cy.contains('Welcome to AcceliTrack provider area!', {timeout: 50000})*/
        cy.log('Open created event');
       //cy.visit(url + '/plan/Events/ViewEvent?eventId=' + Cypress.env('eventURL') + '#EventOverview',{onBeforeLoad: spyOnAddEventListener
        //}).then(waitForAppStart);
        cy.visit(url + '/plan/Events/ViewEvent?eventId=' + Cypress.env('eventURL')+ '#EventOverview');
        cy.wait(5000);
        cy.wait('@openEvent', {timeout: 170000}).then((xhr) => {
            expect(xhr.status).to.equal(200);
            cy.writeFile('cypress/fixtures/forms.json', xhr.responseBody)
        });
    });

    it('Measure Present Levels open time', function () {
        formName = 'Present Levels';
       // cy.openForm(formName);
      // openPL = cy.openFormAndMeasure(formName);
        cy.visit("https://tx.acceliplan.com/plan/Events/ViewEvent?eventId=cca6d61c-e1e3-482e-b0e9-ac66008f14c1#PresentLevels&formId=de3165bc-2f7d-4753-b097-ac66008f1573", {
            onBeforeLoad: (win) => {
                win.performance.mark('start-loading')
            },
            onLoad: (win) => {
                win.performance.mark('end-loading')
            },
        }).its('performance').then((p) => {
            p.measure('pageLoad', 'start-loading', 'end-loading')
            const measure = p.getEntriesByName('pageLoad')[0]
            openPL = measure.duration;

            // assert.isAtMost(measure.duration, 1000)
        });


       // cy.log('PL duration is '+openPL)
       // openPL = parseFloat(openPL);
       /* cy.get('[field-title=\'Review of previous IEP, including status update(s)\']').click({force: true});
        cy.get('[field-title=\'General Ed Teacher(s)\']').click({force: true});
        cy.get('.StudentIsYoungerThan18WithAppropriateParentalInvolvement label span').contains('Yes').click({force: true});*/
       /* cy.log('Should save Form changes');
        cy.get('a#btnUpdateForm').click();
        cy.wait('@savePage', {timeout: 170000}).then((xhr) => {
            expect(xhr.status).to.equal(200);
        });*/

    });

    it('Measure Curriculum and Learning open time', function () {
        formName = "Curriculum and Learning Environment";
      //  openCurr = cy.openFormAndMeasure(formName);
        cy.visit("https://tx.acceliplan.com/plan/Events/ViewEvent?eventId=cca6d61c-e1e3-482e-b0e9-ac66008f14c1#PresentLevels&formId=2c8d1c9f-892f-45a4-b953-ac66008f1573", {
            onBeforeLoad: (win) => {
                win.performance.mark('start-loading')
            },
            onLoad: (win) => {
                win.performance.mark('end-loading')
            },
        }).its('performance').then((p) => {
            p.measure('pageLoad', 'start-loading', 'end-loading')
            const measure = p.getEntriesByName('pageLoad')[0]
            openCurr = measure.duration;

            // assert.isAtMost(measure.duration, 1000)
        });
        //cy.log('Curr duration is '+openCurr)
        //openCurr = parseFloat(openCurr);
       /* cy.get('textarea[field-title=\'Student strengths in Math\']').clear().type('test1');
        cy.get('textarea[field-title=\'Student strengths in Science\']').clear().type('test2');
        cy.get('textarea[field-title=\'Student strengths in Reading/Written Expression\']').clear().type('test3');
        cy.get('textarea[field-title=\'Student strengths in Social Studies\']').clear().type('test4');
        cy.get('.DoesDisabilityAffectInvolvement label span').contains('Yes').click({force: true});
        cy.get('label').contains('Effects of the disability in Math').click({force: true});
        cy.get('textarea[data-bind=\'value: DomainAEffectsOfTheDisabilityInMathDescription\']').clear().type('test11');
        cy.get('label').contains('Effects of the disability in Reading/Written Expression').click({force: true});
        cy.get('textarea[data-bind=\'value: DomainAEffectsOfTheDisabilityInReadingWrittenExpressionDescription\']').clear().type('test22');
        cy.get('.HasTheStudentHadGoals label span').contains('Yes').click({force: true});
        cy.get('textarea[data-bind=\'value: HasTheStudentHadGoalsDescriptiveSentence\']').clear().type('test text');
        cy.get('.NeedAccommodationsSupports label span').contains('Yes').click({force: true});
        cy.get('textarea[data-bind=\'value: DomainAQAAssessmentDS\']').clear().type('test text');
//        cy.get('input[aria-owns=\'cbxPens_taglist cbxPens_listbox\']').click({force: true});
 //       cy.get('[name=\'pens\'] option').contains('Alt Academic & Life Skills - Academics: Math').click({force: true});
        cy.get('a#btnUpdateForm').click();
        cy.wait('@savePage', {timeout: 170000}).then((xhr) => {
            expect(xhr.status).to.equal(200);
        });*/


    });

    it('Measure Physical Fitness Assessment form open time', function () {
        formName = 'Physical Fitness Assessment';
        // cy.openForm(formName);
        // openPL = cy.openFormAndMeasure(formName);
        cy.visit("https://tx.acceliplan.com/plan/Events/ViewEvent?eventId=cca6d61c-e1e3-482e-b0e9-ac66008f14c1#PhysicalFitnessAssessment&formId=958d5928-d59b-4f8a-878d-ac66008f1581", {
            onBeforeLoad: (win) => {
                win.performance.mark('start-loading')
            },
            onLoad: (win) => {
                win.performance.mark('end-loading')
            },
        }).its('performance').then((p) => {
            p.measure('pageLoad', 'start-loading', 'end-loading')
            const measure = p.getEntriesByName('pageLoad')[0]
            physicalFA = measure.duration;

            // assert.isAtMost(measure.duration, 1000)
        });
});

});