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
let nFormFieldDefinitionID;
let aFormFieldDefinitionID;
let nFormFieldDefinitionKey;
let aFormFieldDefinitionKey;
let ineb;
let iaeb;
let grabbedData;
let fullData = [];
const ids = require('../fixtures/dataId.json')
before(function () {

    cy.txProdLogin(url);
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
    //  datastr.push([openPL, openCurr, physicalFA]);
    cy.writeFile('cypress/fixtures/form.txt', '}', {flag: 'a+'});
    //  sendDatatoGoogle(datastr);

})

describe('Monitor Initial Event pages performance on  ' + url, function () {
    ids.forEach(id => {
        it('Open created event ang grab data', function () {
            let url = `https://tx.acceliplan.com/plan/Events/ViewEvent?eventId=${id.EventId}#LREServiceAlternatives&formId=${id.FormId}`;
            cy.visit(url)
            cy.wait('@openPage', {timeout: 180000}).then((xhr) => {
                //expect(xhr.status).to.equal(200);
            });
           // cy.get('#plcContent_lblPageTitle').should('contain', 'Home');
            /*  cy.contains('Welcome to AcceliTrack provider area!', {timeout: 50000})*/
            cy.log('Open created event');
            //cy.visit(url + '/plan/Events/ViewEvent?eventId=' + Cypress.env('eventURL') + '#EventOverview',{onBeforeLoad: spyOnAddEventListener
            //}).then(waitForAppStart);
            // cy.visit(url + '/plan/Events/ViewEvent?eventId=' + Cypress.env('eventURL')+ '#EventOverview');

            //  cy.visit('https://tx.acceliplan.com/plan/Events/ViewEvent?eventId=C04AC3F7-E0FB-4B2E-B27A-E472F2FD206D#LREServiceAlternatives&formId=ea8eaabd-0b7c-4290-ada4-3f28d1170ab3');
           // cy.seedAndVisit();
            cy.writeFile('cypress/fixtures/form.txt', '\{\"ea8eaabd-0b7c-4290-ada4-3f28d1170ab3\"\:\{', {flag: 'a+'})
            cy.xpath('//strong[contains(text(),\'Nonacademic Educational Benefit\')]/ancestor::div[contains(@class,"column")]').invoke('index').then((inebb) => {
                cy.log('Index of Nonacademic Educational Benefit is ' + inebb);
                ineb = inebb;
            });
            cy.xpath('//strong[contains(text(),\'Academic Educational Benefit\')]/ancestor::div[contains(@class,\"column"\)]').invoke('index').then((aebb) => {
                cy.log('Index of Academic Educational Benefit is ' + aebb);
                iaeb = aebb;
            });
            cy.xpath('//div[contains(@class,\'column\')][3]//span[@class=\'k-input\'][text()]//ancestor::div[contains(@class,\'clearfix\')]').each((elem, index, list) => {
                cy.get(elem).xpath('./div[contains(@class,\'column\')][1]//div[contains(@class,\'lblField\')]').then((rowName) => {
                    const field = rowName.text().trim();

                    cy.get(elem).xpath(`./div[contains(@class,\'column\')][${iaeb}]//span//span[@class='k-input']`).then((_aebValue) => {
                        const aebValue = _aebValue.text().trim();

                        cy.get(elem).xpath(`./div[contains(@class,\'column\')][${ineb}]//span//span[@class='k-input']`).then((_nebValue) => {
                            const nebValue = _nebValue.text().trim();


                            cy.log('For field ' + field + ' Nonacademic Educational Benefit is "' + nebValue + '",  and Academic Educational Benefit is "' + aebValue + '",')
                            if (index < list.length) {
                                grabbedData = `"${field}":{"Nonacademic Educational Benefit":{"Value":"${nebValue}"},"Academic Educational Benefit":{"Value":"${aebValue}"}},`
                            }
                            if (index === list.length) {
                                grabbedData = `"${field}":{"Nonacademic Educational Benefit":{"Value":"${nebValue}"},"Academic Educational Benefit":{"Value":"${aebValue}"}}}`
                            }
                            // cy.task('writeFile', { filename: 'cypress/fixtures/forms.json', data: grabbedData, flag: `{flag: 'a+'}` });
                            cy.writeFile('cypress/fixtures/form.txt', grabbedData, {flag: 'a+'});
                        });
                    });
                });

                //  fullData.push(grabbedData);
                //   cy.log('Data has now length ' +fullData.length)

            });
        });
    });

});