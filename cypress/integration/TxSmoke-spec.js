//todo correct Env variables for filling TX QC, TX Prod, TX Demo
//todo correct filling Goals
//todo Correct filling Accommodations
//todo correct filling Services

const url = Cypress.env('baseURL')
//const url = Cypress.env('baseDemoURL')
let eventLink;
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
    Cypress.Cookies.preserveOnce('ASP.NET_SessionId', '.ASPHAUTH');
    const addr = `${url}/planng/Students/ViewStudent/${Cypress.env('txStudentId')}/Events/IEP`
    cy.visit(addr);
    cy.waitForLoading();
    cy.wait(2500);
});
beforeEach(function () {
    cy.server()
    cy.route('POST', '**/Events/ViewForm').as('openPage');
    cy.route('POST', '**/Events/UpdateForm').as('savePage');
    cy.route('POST', '**/Events/GetEventOverview').as('openEvent');
    Cypress.Cookies.preserveOnce('ASP.NET_SessionId', '.ASPHAUTH');
    eventLink = cy.getFullUrl();
});

after(function () {
    // cy.writeFile('cypress/fixtures/forms.json', '{}')
 //   cy.writeFile('cypress/fixtures/fullUrl.txt', '')
})

describe('Smoke test of Annual meeting on  ' + url, function () {

    it.only('Delete existing events', function () {
        cy.events.deleteAllEvents();
    });

    it.only('Create new Annual event and Enter into created event', function () {
//cy.events.visitEvent('ARD Annual Meeting');
       cy.events.createEvent('ARD Annual Meeting');
    });
    it.only('Fill and Distribute documents', function () {
        formName = 'Distribution Manager';
        cy.openFormSmokeNoWait(formName);
        cy.fillForms.fillDM();
    });
    it.only('Fill Present Levels', function () {
        formName = 'Present Levels';
        cy.openFormSmoke(formName);
        cy.fillForms.fillPresentLevels();
        cy.fillForms.saveFormNormal();
    });

    it.only('Fill Curriculum and Learning Form', function () {
        formName = "Curriculum and Learning Environment";
        cy.openFormSmoke(formName);
        cy.fillForms.fillPLCurriculum();
        cy.fillForms.saveFormNormal();
    });

    it.only('Fill Social or Emotional Behavior Form', function () {
        formName = "Social or Emotional Behavior";
        cy.openFormSmoke(formName);
        cy.fillForms.fillPLSocialEmotional();
        cy.fillForms.saveFormNormal();
    });

    it.only('Fill Independent Functioning Form', function () {
        formName = "Independent Functioning";
        cy.openFormSmoke(formName);
        cy.fillForms.fillPLIndependent();
        cy.fillForms.saveFormNormal();
    });

    it.only('Fill Health Care Form', function () {
        formName = "Health Care";
        cy.openFormSmoke(formName);
        cy.fillForms.fillPLHealth();
        cy.fillForms.saveFormNormal();
    });

    it.only('Fill Communication Form', function () {
        formName = "Communication";
        cy.openFormSmoke(formName);
       cy.fillForms.fillPLCommmunication();
        cy.fillForms.saveFormNormal();
    });

    it('Fill Goals Form', function () {
        formName = 'Goals';
        cy.openFormSmokeNoWait(formName);
        cy.fillForms.fillSaveGoals();
    });

    it('Fill Assistive Technology Form', function () {
        formName = 'Assistive Technology';
        cy.openFormSmokeNoWait(formName);
        cy.fillForms.fillAssistiveTech();
    });

    it('Fill Assistive Technology Needs Form', function () {
        formName = 'Assistive Technology Needs';
        cy.openFormSmoke(formName);
        cy.fillForms.fillAssistiveTechNeeds();
        cy.fillForms.saveFormNormal();
    });

    it.only('Fill ARD Data Form', function () {
        formName = 'ARD Data';
        cy.openFormSmoke(formName);
       // cy.fillForms.fillData();
        cy.fillForms.saveFormNormal();
    });


    it('Fill Physical Fitness Assessment Form', function () {
        formName = 'Physical Fitness Assessment';
        cy.openFormSmoke(formName);
        cy.fillForms.fillPhysicalFitnessAssesment();
        cy.fillForms.saveFormNormal();
    });

    it('Fill STAAR Alternate 2 Participation Requirements Form', function () {
        formName = 'STAAR Alternate 2 Participation Requirements';
        cy.openFormSmoke(formName);
        cy.fillForms.fillSTAARAlternate2ParticipationRequirements();
        cy.fillForms.saveFormNormal();
    });


    it.only('Fill STAAR Participation Form', function () {
        formName = 'STAAR Participation';
        cy.openFormSmoke(formName);
        cy.fillForms.fillSTAARParticipation();
        cy.fillForms.saveFormNormal();
    });

    it('Fill TELPAS Alternate Participation Requirements Form', function () {
        formName = 'TELPAS Alternate Participation Requirements';
        cy.openFormSmoke(formName);
        cy.fillForms.fillTELPASAlternateParticipationRequirements();
        cy.fillForms.saveFormNormal();
    });

    it('Fill TELPAS Participation Form', function () {
        formName = 'TELPAS Participation';
        cy.openFormSmoke(formName);
        cy.fillForms.fillTELPASParticipation();
        cy.fillForms.saveFormNormal();
    });

    it('Fill Prior Written Notice of Non-Consensus ARD Form', function () {
        formName = 'Prior Written Notice of Non-Consensus ARD';
        cy.openFormSmoke(formName);
        cy.fillForms.fillPriorWrittenNoticeofNonConsensusARD();
        cy.fillForms.saveFormNormal();
    });

    it('Fill Medicaid One-Time Parental Consent Form', function () {
        formName = 'Medicaid One-Time Parental Consent';
        cy.openFormSmoke(formName);
        cy.fillForms.fillMedicaidOneTimeParentalConsent();
        cy.fillForms.saveFormNormal();
    });

    it('Fill Notice of Procedural Safeguards Form', function () {
        formName = 'Notice of Procedural Safeguards';
        cy.openFormSmoke(formName);
        cy.fillForms.fillNoticeOfProceduralSafeguards();
        cy.fillForms.saveFormNormal();
    });

    it('Fill Review of Committee Decisions Form', function () {
        formName = 'Review of Committee Decisions';
        cy.openFormSmoke(formName);
        cy.fillForms.fillReviewOfCommitteeDecisions();
        cy.fillForms.saveFormNormal();
    });

    it('Fill Behavior Intervention Plan (BIP) Form', function () {
        formName = 'Behavior Intervention Plan (BIP)';
        cy.openFormSmoke(formName);
        cy.fillForms.fillBehaviorInterventionPlan();
        cy.fillForms.saveFormNormal();
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