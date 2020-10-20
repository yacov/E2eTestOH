//const url = "http://tx-demo.accelidemo.com"
const url = Cypress.env('baseURL')
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
    cy.writeFile('cypress/fixtures/forms.json', '{}')
})

describe('Fill Annual meeting Forms on  ' + url, function () {

    it('Enter into created event', function () {
cy.get('#plcContent_lblPageTitle').should('contain', 'Home');
        /*  cy.contains('Welcome to AcceliTrack provider area!', {timeout: 50000})*/
        cy.log('Open created Annual event');
       //cy.visit(url + '/plan/Events/ViewEvent?eventId=' + Cypress.env('eventURL') + '#EventOverview',{onBeforeLoad: spyOnAddEventListener
        //}).then(waitForAppStart);
       cy.visit(url + '/plan/Events/ViewEvent?eventId=' + Cypress.env('eventURL')+ '#EventOverview');
        cy.wait(5000);
       cy.wait('@openEvent', {timeout: 170000}).then((xhr) => {
            expect(xhr.status).to.equal(200);
            cy.writeFile('cypress/fixtures/forms.json', xhr.responseBody)
        });


    });

    it('Fill Present Levels', function () {
        formName = 'Present Levels';
        cy.openForm(formName);
        cy.get('[field-title=\'Review of previous IEP, including status update(s)\']').click({force: true});
        cy.get('[field-title=\'General Ed Teacher(s)\']').click({force: true});
        cy.get('.StudentIsYoungerThan18WithAppropriateParentalInvolvement label span').contains('Yes').click({force: true});
        cy.log('Should save Form changes');
        cy.get('a#btnUpdateForm').click();
        cy.wait('@savePage', {timeout: 170000}).then((xhr) => {
            expect(xhr.status).to.equal(200);
        });
    });

    it('Fill Curriculum and Learning Form', function () {
        formName = "Curriculum and Learning Environment";
        cy.openForm(formName);
   
        cy.get('textarea[field-title=\'Student strengths in Math\']').clear().type('test1');
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
        });
    });

    it('Fill Social or Emotional Behavior Form', function () {
        formName = "Social or Emotional Behavior";
        cy.openForm(formName);
        cy.get('textarea[field-title=\'The strengths of the student\']').clear().type('test text');
        cy.get('.DoesDisabilityAffectInvolvement label span').contains('Yes').click({force: true});
        cy.get('.DoesTheStudentRequireSocialCommunicationInstruction label span').contains('Yes').click({force: true});
        cy.get('.DoesTheStudentRequireSocialCommunicationInstructionLocations label span').contains('One service location').click({force: true});
        cy.get('textarea[data-bind=\'value: DoesTheStudentRequireSocialCommunicationInstructionDS\']').clear().type('test text');
        cy.get('.DoesTheStudentRequireSpecialEducationCounselingServices label span').contains('Yes').click({force: true});
        cy.get('.DoesTheStudentRequireSpecialEducationCounselingServicesDirect label').click({force: true});
        cy.get('.DoesTheStudentRequireSpecialEducationCounselingServicesLocations label span').contains('One service location').click({force: true});
        cy.get('textarea[data-bind=\'value: DoesTheStudentRequireSpecialEducationCounselingServicesDS\']').clear().type('test22');
//select random PEN
        cy.get('input[aria-describedby=\'cbxPens_taglist\']').click({force: true}).type('a');
        cy.get("#cbxPens[name='pens'] option").as("options")
        cy
            .get("@options")
            .its('length')
            .then(len => Math.floor(Math.random() * Math.floor(len-1)))
            .then((index) => {
                cy.get("@options").eq(index).scrollIntoView().click({force: true});
            })

        //cy.get('select#cbxPens[name=\'pens\']').selectNth(1);
        //cy.get('select#cbxPens[name=\'pens\']').selectNth(2);
        cy.get('a#btnUpdateForm').click();
        cy.wait('@savePage', {timeout: 170000}).then((xhr) => {
            expect(xhr.status).to.equal(200);
        });
    });

    it('Fill Independent Functioning Form', function () {
        formName = "Independent Functioning";
        cy.openForm(formName);
        cy.get('[field-title=\'The strengths of the student\']').type('test text');
        cy.get('.DoesDisabilityAffectInvolvement label span').contains('Yes').click({force: true});

        cy.get('.DoesStudentRequireAdaptedPhysicalEducation label span').contains('Yes').click({force: true});
        cy.get('.AdaptedPhysicalEducationSpecializedInstruction label').click({force: true});
        cy.get('.AdaptedPhysicalEducationSpecializedInstructionServicesOneOrTwo label span').contains('One service location').click({force: true});
        cy.get('textarea[data-bind=\'value: DescriptiveAdaptedPhysicalEducationSpecialized\']').clear().type('test text');
        //select PEN
        cy.get('input[aria-describedby=\'cbxPens_taglist\']').click({force: true}).type('a');
       /* cy.get("#cbxPens[name='pens'] option").as("options")
        cy
            .get("@options")
            .its('length')
            .then(len => Math.floor(Math.random() * Math.floor(len-1)))
            .then((index) => {
                cy.get("@options").eq(index).scrollIntoView().click({force: true});
            })*/
        cy.get('select#cbxPens[name=\'pens\']').selectNth(1);
        cy.get('a#btnUpdateForm').click();
        cy.wait('@savePage', {timeout: 170000}).then((xhr) => {
            expect(xhr.status).to.equal(200);
        });
    });

    it('Fill Health Care Form', function () {
        formName = "Health Care";
        cy.openForm(formName);
        cy.get('.DoesDisabilityAffectInvolvement label span').contains('Yes').click({force: true});
        cy.get('.HasPreviousGoals label span').contains('Yes').click({force: true});
        cy.get('textarea[data-bind=\'value: HasPreviousGoalsDescription\']').clear().type('testtext');

        cy.get('.RequireNursingServices label span').contains('Yes').click({force: true});
        cy.get('span.SkilledNursingServices label').click({force: true});
        cy.get('span.SkilledNursingServicesDirect label').click({force: true});

        cy.get('.SkilledNursingServicesOneTwo label span').contains('One service location').click({force: true});

        cy.get('textarea[data-bind=\'value: SkilledNursingServicesDescription\']').clear().type('test text');
        cy.get('select#cbxPens[name=\'pens\']').selectNth(0);
        cy.get('a#btnUpdateForm').click();
        cy.wait('@savePage', {timeout: 170000}).then((xhr) => {
            expect(xhr.status).to.equal(200);
        });
    });

    it('Fill Communication Form', function () {
        formName = "Communication";
        cy.openForm(formName);
        cy.get('textarea[field-title=\'The strengths of the student\']').clear().type('test text');
        cy.get('.DoesDisabilityAffectInvolvement label span').contains('Yes').click({force: true});

        //cy.get('.HasStudentHaAnyPreviousGoalsInThisDomain label span').contains('Yes').click({force: true});
      //  cy.get('[data-bind=\'value: HasStudentHadAnyPreviousGoalsInThisDomainDescriptiveSentence\']').type('testtext');

        cy.get('.DoesStudentRequireAuditoryImpairmentServices label span').contains('Yes').click({force: true});
        cy.get('.DoesStudentRequireAuditoryImpairmentServicesSpecializedInstruction label').click({force: true});
        cy.get('.SpecializedInstructionOneOrTwoServiceLocation label span').contains('One service location').click({force: true});
        cy.get('textarea[field-key=\'DoesStudentRequireAuditoryImpairmentServicesDescriptiveSentence\']').type('test text');
        cy.get('select#cbxPens[name=\'pens\']').selectNth(2);
        cy.get('a#btnUpdateForm').click();
        cy.wait('@savePage', {timeout: 170000}).then((xhr) => {
            expect(xhr.status).to.equal(200);
        });
    });

    it('Fill Assistive Technology Form', function () {
        formName = 'Assistive Technology';
        cy.openFormNoWait(formName);
       /* cy.get('a#btnAddAccommodations').click();
        cy.get('[aria-owns=\'.clear().typeId_listbox\']').click({force: true});
        cy.get('span.k-input').contains('High Tech').click({force: true});
        cy.get('select#NameId').select('Amplification Devices: Hearing Assistive Technology', {force: true});
        cy.get('select#SubjectIds').select('Athletics', {force: true});
        cy.get('input#IsClassroom').check({force: true});
        cy.get('[aria-controls=\'StartDate_dateview\'] span.k-i-calendar').click();
        cy.get('a.k-nav-today').click({force: true});
        cy.get('span[aria-controls=\'EndDate_dateview\']').click();
        cy.get('a.k-nav-today').click({force: true});
        cy.get('a#btnSaveAccommodation.k-button[.clear().type=\'submit\']');*/
    });

    it('Fill Assistive Technology Needs Form', function () {
        formName = 'Assistive Technology Needs';
        cy.openForm(formName);
       /* cy.get('[data-abbreviation=\'AT=Yes\'][field-key=\'RadioATYesNo\']').click({force: true});
        cy.get('span.CheckboxThestudent label').click({force: true});
        cy.get('[data-bind=\'value: TextExplain\']').clear().type('test text');*/
        cy.get('a#btnUpdateForm').click();
        cy.wait('@savePage', {timeout: 170000}).then((xhr) => {
            expect(xhr.status).to.equal(200);
        });
    });

    it('Fill ARD Data Form', function () {
        formName = 'ARD Data';
        cy.openForm(formName);
        cy.get('a#btnUpdateForm').click();
        cy.wait('@savePage', {timeout: 170000}).then((xhr) => {
            expect(xhr.status).to.equal(200);
        });
    });


    it('Fill Physical Fitness Assessment Form', function () {
        formName = 'Physical Fitness Assessment';
        cy.openForm(formName);
        cy.get('.RadioBrFHBsFIItJwEJAGsttuvGAHrJwtJGwF label span').contains('Yes').click({force: true});
        cy.get('input[field-key=\'CheckboxECAtJAwDFttwEEIDsDsuFGsAwtAHDHuD\']').check({force: true});
        cy.get('input[field-key=\'CheckboxJGrrJuCtuwBuEvrrIJArJFvHIuAAAuFJ\']').check({force: true});
       // cy.getIframeBody().clear().type('TEST TEXT', {force: true});
        cy.get('a#btnUpdateForm').click();
        cy.wait('@savePage', {timeout: 170000}).then((xhr) => {
            expect(xhr.status).to.equal(200);
        });
    });

    it('Fill STAAR Alternate 2 Participation Requirements Form', function () {
        formName = 'STAAR Alternate 2 Participation Requirements';
        cy.openForm(formName);
        cy.get('.IsStudentConsiderStaarAlt label span').contains('Yes').click({force: true});
        cy.get('span.NameAndPositionOfPerson').click();
        cy.get('select[field-key=\'NameAndPositionOfPerson\'][data-bind=\'value: NameAndPositionOfPerson\'] option').last().invoke('val').then(($val) => {

            cy.get('select[field-key=\'NameAndPositionOfPerson\'][data-bind=\'value: NameAndPositionOfPerson\']').select($val,{force: true});
        });


        cy.get('.IsStudentConsiderStaarAlt label span').contains('Yes').click({force: true});
        cy.get('.DoesTheStudentHaveSignificantCognitiveDisability label span').contains('Yes').click({force: true});
        cy.get('textarea[field-key=\'JustificationByIntellectualAndAdaptive\']').clear().type('TEXT TEST');
        cy.get('.DoesTheStudentRequireIntensiveInstruction label span').contains('Yes').click({force: true});
        cy.get('textarea[field-key=\'JustificationMustIncludeIEPProgressMonitoring\']').clear().type('TEXT TEST', {force: true});
        cy.get('.IsAssessmentBasedOnCognitiveDisability label span').contains('Yes').click({force: true});
        cy.get('textarea[field-key=\'JustificationMustIncludeIEPQuestion5\']').clear().type('TEXT TEST', {force: true});

        cy.get('a#btnUpdateForm').click();
        cy.wait('@savePage', {timeout: 170000}).then((xhr) => {
            expect(xhr.status).to.equal(200);
        });
    });

    it('Fill STAAR Participation Form', function () {
        formName = 'STAAR Participation';
        cy.openForm(formName);
        cy.get('select[field-key=\'CurrentYearGrade\']').select('2', {force: true});
        cy.get('select[field-key=\'FutureYearGrade\']').select('4', {force: true});

     /*   cy.get('select[field-key=\'CurrentYearDropDown\'] option').eq(-1).invoke('val').then((val) => {
            cy.get('select[field-key=\'CurrentYearDropDown\']').select(val,{force: true});
        });*/
        /*cy.get('select[field-key=\'FirstAlgebraIDropDown\']').select('Asylee/Refugee Exemption', {force: true});
        cy.get('select[field-key=\'FirstAlgebraIIDropDown\']').select('Passed', {force: true});
        cy.get('select[field-key=\'FirstBiologyDropDown\']').select('N/A', {force: true});
        cy.get('select[field-key=\'FirstEnglishIDropDown\']').select('Passed', {force: true});
        cy.get('select[field-key=\'FirstEnglishIIDropDown\']').select('Passed', {force: true});
        cy.get('select[field-key=\'FirstEnglishIIIDropDown\']').select('STAAR', {force: true});
        cy.get('select[field-key=\'FirstUSHistoryDropDown\']').select('STAAR Oline', {force: true});
        cy.get('select[field-key=\'FutureYearGrade\']').select('12', {force: true});
        cy.get('select[field-key=\'SecondAlgebraIDropDown\']').select('Asylee/Refugee Exemption', {force: true});
        cy.get('select[field-key=\'SecondAlgebraIIDropDown\']').select('N/A', {force: true});
        cy.get('select[field-key=\'SecondBiologyDropDown\']').select('STAAR', {force: true});
        cy.get('select[field-key=\'SecondEnglishIDropDown\']').select('Retake Not Required', {force: true});
        cy.get('select[field-key=\'SecondEnglishIIDropDown\']').select('STAAR Online', {force: true});
        cy.get('select[field-key=\'SecondEnglishIIIDropDown\']').select('Retake Not Required', {force: true});
        cy.get('select[field-key=\'SecondUSHistoryDropDown\']').select('STAAR Online', {force: true});*/
        cy.get('a#btnUpdateForm').click();
        cy.wait('@savePage', {timeout: 170000}).then((xhr) => {
            expect(xhr.status).to.equal(200);
        });
    });

    it('Fill TELPAS Alternate Participation Requirements Form', function () {
        formName = 'TELPAS Alternate Participation Requirements';
        cy.openForm(formName);

        cy.get('.YesNoStudentConsideredForTelpas label span').contains('Yes').click({force: true});
        cy.get('select[field-key=\'NameAndPositionOfPerson\'] option').last().invoke('val').then((val) => {
            cy.get('select[field-key=\'NameAndPositionOfPerson\']').select(val, {force: true});
        });

        cy.get('.IsStudentIdentifiedAsLEP label span').contains('Yes').click({force: true});
        cy.get('.DoesStudentHaveCognitiveDisability label span').contains('Yes').click({force: true});
        cy.get('input[field-key=\'JustificationFIEIntellectualAndAdaptiveEvaluation\']').clear().type('TEXT TEST', {force: true});
        cy.get('.DoesStudentRequireIntensiveIndividualizedInstruction label span').contains('Yes').click({force: true});
        cy.get('[field-key=\'FourthArticleJustificationFromIEPProgressMonitoringAndFIE\']').clear().type('TEXT TEST', {force: true});
        cy.get('.IsAssessmentDeterminationBasedOnNotExtenuatingFactorsRadio label span').contains('Yes').click({force: true});
        cy.get('input[field-key=\'SixthArticleJustificationFromIEPProgressMonitoringAndFIE\']').clear().type('TEXT TEST', {force: true});

        cy.get('a#btnUpdateForm').click();
        cy.wait('@savePage', {timeout: 170000}).then((xhr) => {
            expect(xhr.status).to.equal(200);
        });
    });

    it('Fill TELPAS Participation Form', function () {
        formName = 'TELPAS Participation';
        cy.openForm(formName);

        cy.get('.IsLEPStudentWhoInGradesK12 label span',{timeout:80000}).contains('Yes').click({force: true});
        cy.get('select[field-key=\'ReadingParticipation\']').select('TELPAS',{force:true});
        cy.get('[field-key=\'SpeakingParticipation\']').select('TELPAS',{force:true});
        cy.get('[field-key=\'WritingParticipation\']').select('TELPAS',{force:true});
        cy.get('[field-key=\'ListeningParticipation\']').select('TELPAS',{force:true});
cy.get('.StudentRequiresBrailleVersionWhichIsNotYetAvailable label').click({force: true});
cy.get('.StudentHasUniqueCircumstances label').click({force: true});
cy.get('[field-key=\'StudentHasUniqueCrcumstancesExplain\']').clear().type('TEXT TEST',{force:true});

        cy.get('a#btnUpdateForm').click();
        cy.wait('@savePage', {timeout: 170000}).then((xhr) => {
            expect(xhr.status).to.equal(200);
        });
    });

    it('Fill Prior Written Notice of Non-Consensus ARD Form', function () {
        formName = 'Prior Written Notice of Non-Consensus ARD';
        cy.openForm(formName);

       // cy.get('.AreaOfDisagreementDescriptionOfTheActionRefused label',{timeout:80000}).first().click({force: true});
        cy.get('.AreaOfDisagreementDescriptionOfTheActionRefused label',{timeout:80000}).eq(-1).click({force: true});
        cy.get('input[field-key=\'OtherTextBox\']').type('TEXT TEST',{force:true});
        cy.get('a#btnUpdateForm').click();
        cy.wait('@savePage', {timeout: 170000}).then((xhr) => {
            expect(xhr.status).to.equal(200);
        });
    });

    it('Fill Medicaid One-Time Parental Consent Form', function () {
        formName = 'Medicaid One-Time Parental Consent';
        cy.openForm(formName);

        cy.get('.RadioIHaveBeenProvidedThisInformation label span').contains('Yes').click({force:true});
        cy.get('.RadioIGiveMyConsent label span').contains('No').click({force:true});
        cy.get('input[field-key=\'TextNameofParentGuardianSurrogateParentorAdultStudent\']').type('TEXT TEST',{force:true});
        cy.get('input[field-key=\'DateNameofParentGuardianSurrogateParentorAdultStudent\'][field-title=\'Date\']').type('10/12/2020',{force:true});
        cy.get('a#btnUpdateForm').click();
        cy.wait('@savePage', {timeout: 170000}).then((xhr) => {
            expect(xhr.status).to.equal(200);
        });
    });

    it('Fill Notice of Procedural Safeguards Form', function () {
        formName = 'Notice of Procedural Safeguards';
        cy.openForm(formName);

        cy.get('.CopyWhichInformsAboutRights label',{timeout:80000}).click({force: true});
        cy.get('a#btnUpdateForm').click();
        cy.wait('@savePage', {timeout: 170000}).then((xhr) => {
            expect(xhr.status).to.equal(200);
        });
    });

    it('Fill Review of Committee Decisions Form', function () {
        formName = 'Review of Committee Decisions';
        cy.openForm(formName);

        cy.get('.AccommodationsConsidered label',{timeout:80000}).click({force: true});
        cy.get('.AccommodationsAccepted label').click({force: true});
        cy.get('.EvaluationReevaluationConsidered label').click({force: true});
        cy.get('input[field-key=\'EvaluationReevaluationAccepted\']').click({force: true});
        cy.get('a#btnUpdateForm').click();
        cy.wait('@savePage', {timeout: 170000}).then((xhr) => {
            expect(xhr.status).to.equal(200);
        });
    });

    it('Fill Behavior Intervention Plan (BIP) Form', function () {
        formName = 'Behavior Intervention Plan (BIP)';
        cy.openForm(formName);
cy.get('.RadiosYesNo span label span').contains('Yes').click({force:true});
cy.get('.js-checkbox-list label').first().click({force:true});
        cy.get('.js-checkbox-list label').eq(-1).click({force:true});
        cy.get('input[field-key=\'TextOther\']').type('TEXT TEST',{force:true});
        cy.get('a#btnUpdateForm').click();
        cy.wait('@savePage', {timeout: 170000}).then((xhr) => {
            expect(xhr.status).to.equal(200);
        });
    });

    it('Transportation', function () {
        formName = 'Transportation';
        cy.openForm(formName);
        cy.get('.RequireTransportationRadioButtons label span').contains('No').click({force:true});
        cy.get('a#btnUpdateForm').click();
        cy.wait('@savePage', {timeout: 170000}).then((xhr) => {
            expect(xhr.status).to.equal(200);
        });
    });


    it('Fill Skilled Nursing Services Form', function () {
        formName = 'Skilled Nursing Services';
        cy.openForm(formName);
cy.get('span.PhysicianNameText input[field-key=\'PhysicianNameText\']').type('TEXT TEST',{force:true});
cy.get('input[field-key=\'PhysicianContactInformationText\']').type('TEXT TEST',{force:true});
cy.get('.DoesTheStudentRequireMedicationAdministrationSchoolRadio label span').contains('No').click({force:true});
cy.get('.DoesTheStudentRequireMedicationAdministrationOutsideOfSchoolRadio label span').contains('No').click({force:true});
cy.get('.StudentMedicalTreatmentsOrProceduresSchoolRadio label span').contains('No').click({force:true});
        cy.get('a#btnUpdateForm').click();
        cy.wait('@savePage', {timeout: 170000}).then((xhr) => {
            expect(xhr.status).to.equal(200);
        });
    });
});