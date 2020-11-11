//todo correct Env variables for filling TX QC, TX Prod, TX Demo
//todo correct filling Goals
//todo Correct filling Accommodations
//todo correct filling Services

//const url = "http://tx-demo.accelidemo.com"
const url = Cypress.env('baseDemoURL')
let formLink;
let formName;
let appHasStarted


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
    if (url.includes('qc')) {
        cy.txqclLogin(url);
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
    //cy.writeFile('cypress/fixtures/forms.json', '{}')
})

describe('Fill Annual meeting Forms on  ' + url, function () {

    it.only('Enter into created event', function () {
        cy.get('#plcContent_lblPageTitle').should('contain', 'Home');
        /*  cy.contains('Welcome to AcceliTrack provider area!', {timeout: 50000})*/
        cy.log('Open created Annual event');
        //cy.visit(url + '/plan/Events/ViewEvent?eventId=' + Cypress.env('eventURL') + '#EventOverview',{onBeforeLoad: spyOnAddEventListener
        //}).then(waitForAppStart);
        cy.visit(url + '/plan/Events/ViewEvent?eventId=' + Cypress.env('eventURL') + '#EventOverview');
        //  cy.wait(5000);
        cy.wait('@openEvent', {timeout: 170000}).then((xhr) => {
            expect(xhr.status).to.equal(200);
            cy.writeFile('cypress/fixtures/forms.json', xhr.responseBody)
        });


    });

    it('Fill Present Levels', function () {
        formName = 'Present Levels';
        cy.openForm(formName, url);
        cy.fillForms.fillPresentLevels();
        cy.fillForms.saveFormNormal();
    });

    it('Fill Curriculum and Learning Form', function () {
        formName = "Curriculum and Learning Environment";
        cy.openForm(formName, url);
        cy.fillForms.fillPLCurriculum();
        cy.fillForms.saveFormNormal();
    });

    it('Fill Social or Emotional Behavior Form', function () {
        formName = "Social or Emotional Behavior";
        cy.openForm(formName, url);
        cy.fillForms.fillPLSocialEmotional();
        cy.fillForms.saveFormNormal();
    });

    it('Fill Independent Functioning Form', function () {
        formName = "Independent Functioning";
        cy.openForm(formName, url);
        cy.fillForms.fillPLIndependent();
        cy.fillForms.saveFormNormal();
    });

    it('Fill Health Care Form', function () {
        formName = "Health Care";
        cy.openForm(formName, url);
        cy.fillForms.fillPLHealth();
        cy.fillForms.saveFormNormal();
    });

    it('Fill Communication Form', function () {
        formName = "Communication";
        cy.openForm(formName, url);
        cy.fillForms.fillPLCommmunication();
        cy.fillForms.saveFormNormal();
    });

    it.only('Fill Goals Form', function () {
        formName = 'Goals';
        cy.openFormNoWait(formName, url);
        cy.fillForms.fillSaveGoals();
    });

    it('Fill Assistive Technology Form', function () {
        formName = 'Assistive Technology';
        cy.openFormNoWait(formName, url);
        cy.fillForms.fillAssistiveTech();
    });

    it('Fill Assistive Technology Needs Form', function () {
        formName = 'Assistive Technology Needs';
        cy.openForm(formName, url);
        cy.fillForms.fillAssistiveTechNeeds();
        cy.fillForms.saveFormNormal();
    });

    it('Fill ARD Data Form', function () {
        formName = 'ARD Data';
        cy.openForm(formName, url);
        cy.fillForms.fillData();
        cy.fillForms.saveFormNormal();
    });


    it('Fill Physical Fitness Assessment Form', function () {
        formName = 'Physical Fitness Assessment';
        cy.openForm(formName, url);
        cy.fillForms.fillPhysicalFitnessAssesment();
        cy.fillForms.saveFormNormal();
    });

    it('Fill STAAR Alternate 2 Participation Requirements Form', function () {
        formName = 'STAAR Alternate 2 Participation Requirements';
        cy.openForm(formName, url);
        cy.fillForms.fillSTAARAlternate2ParticipationRequirements();
        cy.fillForms.saveFormNormal();
    });


    it('Fill STAAR Participation Form', function () {
        formName = 'STAAR Participation';
        cy.openForm(formName, url);
        cy.fillForms.fillSTAARParticipation();
        cy.fillForms.saveFormNormal();
    });

    it('Fill TELPAS Alternate Participation Requirements Form', function () {
        formName = 'TELPAS Alternate Participation Requirements';
        cy.openForm(formName, url);
        cy.fillForms.fillTELPASAlternateParticipationRequirements();
        cy.fillForms.saveFormNormal();
    });

    it('Fill TELPAS Participation Form', function () {
        formName = 'TELPAS Participation';
        cy.openForm(formName, url);
        cy.fillForms.fillTELPASParticipation();
        cy.fillForms.saveFormNormal();
    });

    it('Fill Prior Written Notice of Non-Consensus ARD Form', function () {
        formName = 'Prior Written Notice of Non-Consensus ARD';
        cy.openForm(formName, url);
        cy.fillForms.fillPriorWrittenNoticeofNonConsensusARD();
        cy.fillForms.saveFormNormal();
    });

    it('Fill Medicaid One-Time Parental Consent Form', function () {
        formName = 'Medicaid One-Time Parental Consent';
        cy.openForm(formName, url);
        cy.fillForms.fillMedicaidOneTimeParentalConsent();
        cy.fillForms.saveFormNormal();
    });

    it('Fill Notice of Procedural Safeguards Form', function () {
        formName = 'Notice of Procedural Safeguards';
        cy.openForm(formName, url);
        cy.fillForms.fillNoticeOfProceduralSafeguards();
        cy.fillForms.saveFormNormal();
    });

    it('Fill Review of Committee Decisions Form', function () {
        formName = 'Review of Committee Decisions';
        cy.openForm(formName, url);
        cy.fillForms.fillReviewOfCommitteeDecisions();
        cy.fillForms.saveFormNormal();
    });

    it('Fill Behavior Intervention Plan (BIP) Form', function () {
        formName = 'Behavior Intervention Plan (BIP)';
        cy.openForm(formName, url);
        cy.fillForms.fillBehaviorInterventionPlan();
        cy.fillForms.saveFormNormal();
    });

    it('Transportation', function () {
        formName = 'Transportation';
        cy.openForm(formName, url);
        cy.fillForms.fillTransportation();
        cy.fillForms.saveFormNormal();
    });


    it('Fill Skilled Nursing Services Form', function () {
        formName = 'Skilled Nursing Services';
        cy.openForm(formName, url);
        cy.fillForms.fillSkilledNursingServices();
        cy.fillForms.saveFormNormal();
    });
});