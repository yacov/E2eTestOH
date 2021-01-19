//todo correct Env variables for filling TX QC, TX Prod, TX Demo
//todo correct filling Goals
//todo Correct filling Accommodations
//todo correct filling Services

const url = Cypress.env('baseDadeProdURL')
//const url = Cypress.env('baseDemoURL')
let formLink;
let formName;
let appHasStarted
let eventId;


before(function () {
    if (url.includes('demo')) {
        cy.txDemoLogin(url);
    }
    if (url.includes('tx.acceliqc.com')) {
        cy.txQcLogin(url);
    }
    if (url.includes('tx.acceliplan.com')) {
        cy.txProdLogin(url);
    }
    if (url.includes('dade.acceliqc.com')) {
        cy.txProdLogin(url);
    }
    if (url.includes('dade.acceliplan.com')) {
        cy.dadeQcLogin(url);
    }
    Cypress.Cookies.preserveOnce('ASP.NET_SessionId', '.ASPHAUTH');
    cy.visit(`${url}/plan/Students/ViewStudent?commonStudentId=${Cypress.env('dadeQcStudentId')}&studentViewType=Events&programType=IEP`, {timeout:60000});
    cy.waitForLoading();
    cy.wait(2500);
});
beforeEach(function () {
    cy.server()
    cy.route('POST', '**/Events/ViewForm').as('openPage');
    cy.route('POST', '**/Events/UpdateForm').as('savePage');
    cy.route('POST', '**/Events/GetEventOverview').as('openEvent');
    Cypress.Cookies.preserveOnce('ASP.NET_SessionId', '.ASPHAUTH');
});

after(function () {
    // cy.writeFile('cypress/fixtures/forms.json', '{}')
 //   cy.writeFile('cypress/fixtures/fullUrl.txt', '')
})

describe('Smoke test of Annual meeting on  ' + url, function () {

    it('Delete existing events', function () {
        cy.events.deleteAllEvents();
    });

    it('Create new Annual event and Enter into created event', function () {
       cy.events.createEvent('ARD Annual Meeting');
    });
    it('Fill and Distribute documents', function () {
        formName = 'Distribution Manager';
        cy.openFormSmokeNoWait(formName);
        cy.fillForms.fillDM();
    });
    it('Fill Present Levels', function () {
        formName = 'Present Levels';
        cy.openFormSmoke(formName);
        cy.fillForms.fillPresentLevels();
        cy.fillForms.saveFormNormal();
    });

    it('Fill Curriculum and Learning Form', function () {
        formName = "Curriculum and Learning Environment";
        cy.openFormSmoke(formName);
        cy.fillForms.fillPLCurriculum();
        cy.fillForms.saveFormNormal();
    });

    it('Fill Social or Emotional Behavior Form', function () {
        formName = "Social or Emotional Behavior";
        cy.openFormSmoke(formName);
        cy.fillForms.fillPLSocialEmotional();
        cy.fillForms.saveFormNormal();
    });

    it('Fill Independent Functioning Form', function () {
        formName = "Independent Functioning";
        cy.openFormSmoke(formName);
        cy.fillForms.fillPLIndependent();
        cy.fillForms.saveFormNormal();
    });

    it('Fill Health Care Form', function () {
        formName = "Health Care";
        cy.openFormSmoke(formName);
        cy.fillForms.fillPLHealth();
        cy.fillForms.saveFormNormal();
    });

    it('Fill Communication Form', function () {
        formName = "Communication";
        cy.openFormSmoke(formName);
        cy.fillForms.fillPLCommmunication();
        cy.fillForms.saveFormNormal();
    });


    it('Fill Assistive Technology Form', function () {
        formName = 'Assistive Technology';
        cy.openFormSmokeNoWait(formName);
        cy.fillForms.fillAssistiveTech();
    });

    it('Transportation', function () {
        formName = 'Transportation';
        cy.openFormSmoke(formName);
        cy.fillForms.fillTransportation();
        cy.fillForms.saveFormNormal();
    });


    it('Fill Skilled Nursing Services Form', function () {
        formName = 'Skilled Nursing Services';
        cy.openFormSmoke(formName);
        cy.fillForms.fillSkilledNursingServices();
        cy.fillForms.saveFormNormal();
    });
});