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
let out;
var ids = require('../fixtures/formsTX.json')

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
    const spreadsheetId = '1e6uzph3GY4Yuj5wQvryneekZw6d8oaow6B8urG6D6MY'
    // const data = [["firstname", "lastname"]];


// 4. Send data with a POST request
    const baseUrl = "https://pushtogsheet.herokuapp.com";
    const query = `valueInputOption=RAW&pizzly_pkey=pope8Qy8qfYyppnHRMgLMpQ8MuEUKDGeyhfGCj`;
    const url = new URL(`/proxy/google-sheets/${spreadsheetId}/values/A1:append?${query}`, baseUrl);
    fetch(url.href, {
        method: "POST",
        body: JSON.stringify({values: data}),
        headers: {'Pizzly-Auth-Id': '2242dae0-1c45-11eb-85b5-6b70396ee5eb'}
    })
        .then((res) => res.text())
        .then(console.log)
        .catch(console.error);
}

function spyOnAddEventListener(win) {
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
    if (url.includes('demo')) {
        cy.txDemoLogin(url);
    }
    if (url.includes('tx.acceliqc.com')) {
        cy.txQcLogin(url);
        const addr = `${url}/planng/Students/ViewStudent/${Cypress.env('txStudentId')}/Events/IEP`
        cy.visit(addr);
        cy.waitForLoading();
        cy.wait(2500);
    }
    if (url.includes('tx.acceliplan.com')) {
        cy.txProdLogin(url);
    }
    if (url.includes('dade.acceliqc.com')) {
        cy.txProdLogin(url);
        const addr = `${url}/plan/Students/ViewStudent?commonStudentId=${Cypress.env('dadeQcStudentId')}&studentViewType=Events&programType=IEP`
        cy.visit(addr);
        cy.waitForLoading();
        cy.wait(2500);
    }
    Cypress.Cookies.preserveOnce('ASP.NET_SessionId', '.ASPHAUTH');

});
beforeEach(function () {
    cy.server()
    cy.route('POST', '**/Events/ViewForm').as('openPage');
    cy.route('POST', '**/Events/UpdateForm').as('savePage');
    cy.route('POST', '**/Events/GetEventOverview').as('openEvent');
    Cypress.Cookies.preserveOnce('ASP.NET_SessionId', '.ASPHAUTH');
});

after(function () {
  //  cy.writeFile('cypress/fixtures/forms.json', '{}')
    //   sendDatatoGoogle(datastr);
})

describe('Monitor Event pages performance on  ' + url, function () {

    it('Delete existing events', function () {
        cy.events.deleteAllEvents();
    });

    it('Create new Annual event and Enter into created event', function () {
        cy.events.createEvent('ARD Annual Meeting');

    });

        it(`Measure forms open/save time for ${url}`, function () {
            cy.openFormPerf();
        });



});