
let out;
let ineb;
let iaeb;
let grabbedData;
let fullData = [];
const ids = require('../fixtures/dataid/Forms19.json')
let i2 = 25;
let fileNametxt = `cypress/fixtures/Grab/Forms19.txt`;
let ind = 0;


before(function () {

    cy.txProdLogin('https://tx.acceliplan.com');
    //  cy.txDemoLogin('http://tx-demo.accelidemo.com');

    //cy.writeFile(fileNametxt, '{', {flag: 'a+'});
    Cypress.Cookies.preserveOnce('ASP.NET_SessionId', '.ASPHAUTH');
});
beforeEach(function () {

    Cypress.Cookies.preserveOnce('ASP.NET_SessionId', '.ASPHAUTH');
});

after(function () {
    //  datastr.push([openPL, openCurr, physicalFA]);
    //    cy.writeFile(fileNametxt, '}', {flag: 'a+'});
    //  sendDatatoGoogle(datastr);

})
afterEach(function () {
    out = fullData.join(" ");
    if (out.indexOf('Tier I:') > -1) {
        cy.writeFile(fileNametxt, out, {flag: 'a+'});
        cy.wait(1000)
    } else {
        cy.writeFile('cypress/fixtures/BadForm.txt', out, {flag: 'a+'});
        cy.wait(1000)
    }
    fullData.length = 0;
    out = "";
})

describe('Grab data', function () {
    ids.forEach((id, i, listt) => {
        //ind++;
        it('Open created event ang grab data for Form '+id.FormId, function () {
            ind++;
            let urlll = `https://tx.acceliplan.com/plan/Events/ViewEvent?eventId=${id.EventId}#LREServiceAlternatives&formId=${id.FormId}`;
            cy.log(urlll)
            //  let urlll = `http://tx-demo.accelidemo.com/plan/Events/ViewEvent?eventId=${id.EventId}#LREServiceAlternatives&formId=${id.FormId}`;
            cy.visit(urlll, {timeout: 180000})
            //   cy.wait('@openPage', {timeout: 180000}).then((xhr) => {
            //expect(xhr.status).to.equal(200);
            // });
            // cy.get('#plcContent_lblPageTitle').should('contain', 'Home');
            /*  cy.contains('Welcome to AcceliTrack provider area!', {timeout: 50000})*/
            cy.log('Open created event');

            // cy.writeFile('cypress/fixtures/form.txt', `"${id.FormId}":`, {flag: 'a+'});
            //cy.visit(url + '/plan/Events/ViewEvent?eventId=' + Cypress.env('eventURL') + '#EventOverview',{onBeforeLoad: spyOnAddEventListener
            //}).then(waitForAppStart);
            // cy.visit(url + '/plan/Events/ViewEvent?eventId=' + Cypress.env('eventURL')+ '#EventOverview');

            //  cy.visit('https://tx.acceliplan.com/plan/Events/ViewEvent?eventId=C04AC3F7-E0FB-4B2E-B27A-E472F2FD206D#LREServiceAlternatives&formId=ea8eaabd-0b7c-4290-ada4-3f28d1170ab3');
            // cy.seedAndVisit();
            cy.xpath('//strong[contains(text(),\'Nonacademic Educational Benefit\')]/ancestor::div[contains(@class,"column")]').invoke('index').then((inebb) => {
                cy.log('Index of Nonacademic Educational Benefit is ' + inebb);
                ineb = inebb;
            });
            cy.xpath('//strong[contains(text(),\'Academic Educational Benefit\')]/ancestor::div[contains(@class,\"column"\)]').invoke('index').then((aebb) => {
                cy.log('Index of Academic Educational Benefit is ' + aebb);
                iaeb = aebb;
            });
            fullData.push(`"${id.FormId}":{`);
            cy.wait(200)
            cy.xpath('//div[contains(@class,\'column\')][3]//span[@class=\'k-input\'][text()]//ancestor::div[contains(@class,\'clearfix\')]').each((elem, index, list) => {
                cy.get(elem).xpath('./div[contains(@class,\'column\')][1]//div[contains(@class,\'lblField\')]').then((_rowName) => {
                    const field = _rowName.text().trim();

                    cy.get(elem).xpath(`.//div[contains(@class,\'column\')][${iaeb}]//span//span[@class='k-input']`).then((_aebValue) => {
                        const aebValue = _aebValue.text().trim();

                        cy.get(elem).xpath(`.//div[contains(@class,\'column\')][${ineb}]//span//span[@class='k-input']`).then((_nebValue) => {
                            const nebValue = _nebValue.text().trim();


                            cy.log('For field ' + field + ' Nonacademic Educational Benefit is "' + nebValue + '",  and Academic Educational Benefit is "' + aebValue + '",')
                            // cy.task('writeFile', { filename: 'cypress/fixtures/forms.json', data: grabbedData, flag: `{flag: 'a+'}` });
                            if (index < (list.length - 1)) {
                                grabbedData = `"${field}":{"Nonacademic Educational Benefit":{"Value":"${nebValue}"},"Academic Educational Benefit":{"Value":"${aebValue}"}},`;

                            } else {
                                grabbedData = `"${field}":{"Nonacademic Educational Benefit":{"Value":"${nebValue}"},"Academic Educational Benefit":{"Value":"${aebValue}"}}},`;

                            }
                            fullData.push(grabbedData);
                            cy.wait(200)
                        });
                    });
                });
            });

            if (ind > 250) {
                cy.log(`${ind} forms grabbed, new outputData file is ${fileNametxt}`);
            } else {
                cy.log(`${ind} forms grabbed, outputData file is ${fileNametxt}`);
            }
        });

    });

});