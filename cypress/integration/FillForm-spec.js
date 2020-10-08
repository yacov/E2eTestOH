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
beforeEach(function () {
    cy.server()
    cy.route('POST', '**/plan/Events/ViewForm/**').as('openPage');
    cy.route('POST', '**/Events/UpdateForm/**').as('savePage');
    cy.route('POST', '**/Events/GetEventOverview').as('openEvent');
});

describe('Fill Annual meeting Forms on  ' + url, function () {


    it('Enter into created event', function () {
        if(url.includes('demo'))
         {cy.txDemoLogin(url); }
        if(url.includes('qc'))
        {cy.txqclLogin(url); }

        cy.get('#plcContent_lblPageTitle').should('contain', 'Home');
        /*  cy.contains('Welcome to AcceliTrack provider area!', {timeout: 50000})*/
        cy.log('Open created Annual event');
       cy.visit(url + '/plan/Events/ViewEvent?eventId=' + Cypress.env('eventURL')+ '#PresentLevels',{onBeforeLoad: spyOnAddEventListener
        }).then(waitForAppStart);
     //   cy.visit(url + '/plan/Events/ViewEvent?eventId=' + Cypress.env('eventURL')+ '#PresentLevels');
        cy.wait(5000);

    });



    it('Fill Present Levels', function () {
     //   cy.get('a[title=\'Present Levels\']').click();
     /*  cy.wait('@openPage', {timeout: 170000}).then((xhr) => {
            expect(xhr.status).to.equal(200);
        });*/
        formName = 'Present Levels';
       // cy.get(`[data-title=\'${formName}\'] span a.k-link`).invoke('attr', 'href').then(href => {
         //   formLink = href.toString();
           // cy.log('link is '+formLink);
        //});
        //cy.visit(url + formLink);
        cy.get('[field-title=\'Review of previous IEP, including status update(s)\']').click({force: true});
        cy.get('[field-title=\'General Ed Teacher(s)\']').click({force: true});
        cy.get('.StudentIsYoungerThan18WithAppropriateParentalInvolvement label span').contains('Yes').click({force: true});
        cy.log('Should save Form changes');
        cy.get('a#btnUpdateForm').click();
       /* cy.wait('@savePage', {timeout: 170000}).then((xhr) => {
            expect(xhr.status).to.equal(200);
        });*/
    });


    it.skip('Fill Curriculum and Learning Form', function () {
        cy.get('[title=\'Curriculum and Learning Environment\'] .k-link span.caption').click();
        cy.wait('@openPage', {timeout: 170000}).then((xhr) => {
            expect(xhr.status).to.equal(200);
        });
        cy.get('textarea[field-title=\'Student strengths in Math\']').type('test1');
        cy.get('textarea[field-title=\'Student strengths in Science\']').type('test2');
        cy.get('textarea[field-title=\'Student strengths in Reading/Written Expression\']').type('test3');
        cy.get('textarea[field-title=\'Student strengths in Social Studies\']').type('test4');
        cy.get('.DoesDisabilityAffectInvolvement label span').contains('Yes').click({force: true});
        cy.get('label').contains('Effects of the disability in Math').click({force: true});
        cy.get('textarea[data-bind=\'value: DomainAEffectsOfTheDisabilityInMathDescription\']').type('test11');
        cy.get('label').contains('Effects of the disability in Reading/Written Expression').click({force: true});
        cy.get('textarea[data-bind=\'value: DomainAEffectsOfTheDisabilityInReadingWrittenExpressionDescription\']').type('test22');
        cy.get('.HasTheStudentHadGoals label span').contains('Yes').click({force: true});
        cy.get('textarea[[data-bind=\'value: HasTheStudentHadGoalsDescriptiveSentence\']').type('test text');
        cy.get('.NeedAccommodationsSupports label span').contains('Yes').click({force: true});
        cy.get('textarea[data-bind=\'value: DomainAQAAssessmentDS\']').type('test text');
        cy.get('input[aria-owns=\'cbxPens_taglist cbxPens_listbox\']').click({force: true});
        cy.get('[name=\'pens\'] option').contains('Alt Academic & Life Skills - Academics: Math').click({force: true});
        cy.get('a#btnUpdateForm').click();
        cy.wait('@savePage', {timeout: 170000}).then((xhr) => {
            expect(xhr.status).to.equal(200);
        });
    });

    it.skip('Fill Social or Emotional Behavior Form', function () {
        cy.get('[title=\'Curriculum and Learning Environment\'] span.caption').click();
        cy.wait('@openPage', {timeout: 170000}).then((xhr) => {
            expect(xhr.status).to.equal(200);
        });
        cy.get('textarea[field-title=\'The strengths of the student\']').type('test text');
        cy.get('.DoesDisabilityAffectInvolvement label span').contains('Yes').click({force: true});
        cy.get('.DoesTheStudentRequireSocialCommunicationInstruction label span').contains('Yes').click({force: true});
        cy.get('.DoesTheStudentRequireSocialCommunicationInstructionLocations label span').contains('One service location').click({force: true});
        cy.get('textarea[data-bind=\'value: DoesTheStudentRequireSocialCommunicationInstructionDS\']').type('test text');
        cy.get('.DoesTheStudentRequireSpecialEducationCounselingServices label span').contains('Yes').click({force: true});
        cy.get('.DoesTheStudentRequireSpecialEducationCounselingServicesDirect label').click({force: true});
        cy.get('.DoesTheStudentRequireSpecialEducationCounselingServicesLocations label span').contains('One service location').click({force: true});
        cy.get('textarea[data-bind=\'value: DoesTheStudentRequireSpecialEducationCounselingServicesDS\']').type('test22');
        cy.get('input[aria-owns=\'cbxPens_taglist cbxPens_listbox\']').click({force: true});
        cy.get('[name=\'pens\'] option').contains('Autism/Related disorders - Following Directions').click({force: true});
        cy.get('[name=\'pens\'] option').contains('Autism/Related disorders - Play Skills').click({force: true});
        cy.get('a#btnUpdateForm').click();
        cy.wait('@savePage', {timeout: 170000}).then((xhr) => {
            expect(xhr.status).to.equal(200);
        });
    });

    it.skip('Fill Independent Functioning Form', function () {
        cy.get('[title=\'Independent Functioning\'] span.caption').click();
        cy.wait('@openPage', {timeout: 170000}).then((xhr) => {
            expect(xhr.status).to.equal(200);
        });
        cy.get('textarea[field-title=\'The strengths of the student\']').type('test text');
        cy.get('.QDoesStudentRequireAssistiveTechnologyIndependentFunctioning label span').contains('Yes').click({force: true});
        cy.get('.EquipmentDeviceAssistiveTechnologyIndependentFunctioning label').contains('Equipment/Device').click({force: true});
        cy.get('textarea[data-bind=\'value: DescriptiveSentenceAssistiveTechnologyIndependentFunctioning\']').type('test text');

        cy.get('.DoesStudentRequireAdaptedPhysicalEducation label span').contains('Yes').click({force: true});
        cy.get('.AdaptedPhysicalEducationSpecializedInstruction label').click({force: true});
        cy.get('.AdaptedPhysicalEducationSpecializedInstructionServicesOneOrTwo label span').contains('One service location').click({force: true});
        cy.get('textarea[data-bind=\'value: DescriptiveAdaptedPhysicalEducationSpecialized\']').type('test text');

        cy.get('input[aria-owns=\'cbxPens_taglist cbxPens_listbox\']').click({force: true});
        cy.get('[name=\'pens\'] option').contains('Adapted PE - Locomotor').click({force: true});
        cy.get('[name=\'pens\'] option').contains('Adapted PE - Stability').click({force: true});
        cy.get('a#btnUpdateForm').click();
        cy.wait('@savePage', {timeout: 170000}).then((xhr) => {
            expect(xhr.status).to.equal(200);
        });
    });

    it.skip('Fill Health Care Form', function () {
        cy.get('[title=\'Health Care\'] span.caption').click();
        cy.wait('@openPage', {timeout: 170000}).then((xhr) => {
            expect(xhr.status).to.equal(200);
        });
        cy.get('.DoesDisabilityAffectInvolvement label span').contains('Yes').click({force: true});
        cy.get('.HasPreviousGoals label span').contains('Yes').click({force: true});
        cy.get('textarea[data-bind=\'value: HasPreviousGoalsDescription\']').type('testtext');

        cy.get('.RequireNursingServices label span').contains('Yes').click({force: true});
        cy.get('span.SkilledNursingServices label').click({force: true});
        cy.get('span.SkilledNursingServicesDirect label').click({force: true});

        cy.get('.SkilledNursingServicesOneTwo label span').contains('One service location').click({force: true});

        cy.get('textarea[data-bind=\'value: SkilledNursingServicesDescription\']').type('test text');

        cy.get('input[aria-owns=\'cbxPens_taglist cbxPens_listbox\']').click({force: true});
        cy.get('[name=\'pens\'] option').contains('Health Related Needs').click({force: true});
        cy.get('a#btnUpdateForm').click();
        cy.wait('@savePage', {timeout: 170000}).then((xhr) => {
            expect(xhr.status).to.equal(200);
        });
    });

    it.skip('Fill Communication Form', function () {
        cy.get('[title=\'Communication\'] span.caption').click();
        cy.wait('@openPage', {timeout: 170000}).then((xhr) => {
            expect(xhr.status).to.equal(200);
        });
        cy.get('textarea[field-title=\'The strengths of the student\']').type('test text');
        cy.get('.DoesDisabilityAffectInvolvement label span').contains('Yes').click({force: true});

        cy.get('.HasStudentHaAnyPreviousGoalsInThisDomain label span').contains('Yes').click({force: true});
        cy.get('[data-bind=\'value: HasStudentHadAnyPreviousGoalsInThisDomainDescriptiveSentence\']').type('testtext');

        cy.get('.DoesStudentRequireAuditoryImpairmentServices label span').contains('Yes').click({force: true});
        cy.get('.DoesStudentRequireAuditoryImpairmentServicesSpecializedInstruction label').click({force: true});
        cy.get('.SpecializedInstructionOneOrTwoServiceLocation label span').contains('One service location').click({force: true});
        cy.get('[data-bind=\'value: DoesStudentRequireAuditoryImpairmentServicesDescriptiveSentence\']').type('test text');

        cy.get('input[aria-owns=\'cbxPens_taglist cbxPens_listbox\']').click({force: true});
        cy.get('[name=\'pens\'] option').contains('Alt Academic & Life Skills - Self Expression').click({force: true});
        cy.get('[name=\'pens\'] option').contains('Deaf/Hard of Hearing - Social Communication').click({force: true});
        cy.get('a#btnUpdateForm').click();
        cy.wait('@savePage', {timeout: 170000}).then((xhr) => {
            expect(xhr.status).to.equal(200);
        });
    });

    it.skip('Fill Assistive Technology Needs Form', function () {
        formName = 'Assistive Technology Needs';
        //cy.get(`a.row-link[title='${formName}']`).click();
        // cy.get(`.event-name span`).contains(formName).click({force: true});
        formLink = cy.get(`[data-title=\'${formName}\'] span a.k-link`).invoke('attr', 'href').toString();
        cy.visit(url + formLink);
        //cy.visit(url + formLink);
        cy.wait('@openPage', {timeout: 170000}).then((xhr) => {
            expect(xhr.status).to.equal(200);
        });
        cy.get('[data-abbreviation=\'AT=Yes\'][field-key=\'RadioATYesNo\']').click({force: true});
        cy.get('span.CheckboxThestudent label').click({force: true});
        cy.get('[data-bind=\'value: TextExplain\']').type('test text');
        cy.get('a#btnUpdateForm').click();
        cy.wait('@savePage', {timeout: 170000}).then((xhr) => {
            expect(xhr.status).to.equal(200);
        });
    });

    it('Fill Data Form', function () {
        cy.get('span[data-sectionname=\'ARD Data\']').click();

        cy.get('a#btnUpdateForm').click();
        cy.wait('@savePage', {timeout: 170000}).then((xhr) => {
            expect(xhr.status).to.equal(200);
        });
    });

    it('Fill Assistive Technology Form', function () {
        cy.get('span[data-sectionname=\'Assistive Technology\']').click();
        cy.wait('@openPage', {timeout: 170000}).then((xhr) => {
            expect(xhr.status).to.equal(200);
        });
        cy.get('a#btnAddAccommodations').click();
        cy.get('[aria-owns=\'TypeId_listbox\']').click({force: true});
        cy.get('span.k-input').contains('High Tech').click({force: true});
        cy.get('select#NameId').select('Amplification Devices: Hearing Assistive Technology', {force: true});
        cy.get('select#SubjectIds').select('Athletics', {force: true});
        cy.get('input#IsClassroom').check({force: true});
        cy.get('[aria-controls=\'StartDate_dateview\'] span.k-i-calendar').click();
        cy.get('a.k-nav-today').click({force: true});
        cy.get('span[aria-controls=\'EndDate_dateview\']').click();
        cy.get('a.k-nav-today').click({force: true});
        cy.get('a#btnSaveAccommodation.k-button[type=\'submit\']');
    });

    it('Fill Physical Fitness Assessment Form', function () {
        cy.get('span[data-sectionname=\'Physical Fitness Assessment\']').click();
        cy.wait('@openPage', {timeout: 170000}).then((xhr) => {
            expect(xhr.status).to.equal(200);
        });
        cy.get('.RadioBrFHBsFIItJwEJAGsttuvGAHrJwtJGwF label span').contains('Yes').click({force: true});
        cy.get('input[field-key=\'CheckboxECAtJAwDFttwEEIDsDsuFGsAwtAHDHuD\']').check({force: true});
        cy.get('input[field-key=\'CheckboxJGrrJuCtuwBuEvrrIJArJFvHIuAAAuFJ\']').check({force: true});
        cy.getIframeBody().type('TEST TEXT', {force: true});
        cy.get('a#btnUpdateForm').click();
        cy.wait('@savePage', {timeout: 170000}).then((xhr) => {
            expect(xhr.status).to.equal(200);
        });
    });

    it('Fill STAAR Alternate 2 Participation Requirements Form', function () {
        cy.get('span[data-sectionname=\'STAAR Alternate 2 Participation Requirements\']').click();
        cy.wait('@openPage', {timeout: 170000}).then((xhr) => {
            expect(xhr.status).to.equal(200);
        });
        cy.get('.IsStudentConsiderStaarAlt label span').contains('Yes').click({force: true});
        cy.get('span.NameAndPositionOfPerson').click();
        cy.get('select[field-key=\'NameAndPositionOfPerson\'][data-bind=\'value: NameAndPositionOfPerson\'] option').last().invoke('val').then((val) => {

            cy.get('select[field-key=\'NameAndPositionOfPerson\'][data-bind=\'value: NameAndPositionOfPerson\']').select(val);
        })


        cy.get('.IsStudentConsiderStaarAlt label span').contains('Yes').click({force: true});
        cy.get('.DoesTheStudentHaveSignificantCognitiveDisability label span').contains('Yes').click({force: true});
        cy.get('textarea[field-key=\'JustificationByIntellectualAndAdaptive\']').type('TEXT TEST');
        cy.get('.DoesTheStudentRequireIntensiveInstruction label span').contains('Yes').click({force: true});
        cy.get('textarea[field-key=\'JustificationMustIncludeIEPProgressMonitoring\']').type('TEXT TEST', {force: true});
        cy.get('.IsAssessmentBasedOnCognitiveDisability label span').contains('Yes').click({force: true});
        cy.get('textarea[field-key=\'JustificationMustIncludeIEPQuestion5\']').type('TEXT TEST', {force: true});

        cy.get('a#btnUpdateForm').click();
        cy.wait('@savePage', {timeout: 170000}).then((xhr) => {
            expect(xhr.status).to.equal(200);
        });
    });

    it('Fill STAAR Participation Form', function () {
        cy.get('span[data-sectionname=\'STAAR Participation\']').click();
        cy.wait('@openPage', {timeout: 170000}).then((xhr) => {
            expect(xhr.status).to.equal(200);
        });
        cy.get('select[field-key=\'CurrentYearGrade\']').select('11', {force: true});
        cy.get('select[field-key=\'CurrentYearDropDown\'] option').eq(-1).invoke('val').then((val) => {
            cy.get('select[field-key=\'CurrentYearDropDown\']').select(val);
        });
        cy.get('select[field-key=\'FirstAlgebraIDropDown\']').select('Asylee/Refugee Exemption', {force: true});
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
        cy.get('select[field-key=\'SecondUSHistoryDropDown\']').select('STAAR Online', {force: true});
        cy.get('a#btnUpdateForm').click();
        cy.wait('@savePage', {timeout: 170000}).then((xhr) => {
            expect(xhr.status).to.equal(200);
        });
    });

    it('Fill TELPAS Alternate Participation Requirements Form', function () {
        cy.get('span[data-sectionname=\'TELPAS Alternate Participation Requirements\']').click();
        cy.wait('@openPage', {timeout: 170000}).then((xhr) => {
            expect(xhr.status).to.equal(200);
        });

        cy.get('.YesNoStudentConsideredForTelpas label span').contains('Yes').click({force: true});
        cy.get('select[field-key=\'NameAndPositionOfPerson\'] option').last().invoke('val').then((val) => {
            cy.get('select[field-key=\'NameAndPositionOfPerson\']').select(val, {force: true});
        });

        cy.get('.IsStudentIdentifiedAsLEP label span').contains('Yes').click({force: true});
        cy.get('.DoesStudentHaveCognitiveDisability label span').contains('Yes').click({force: true});
        cy.get('input[field-key=\'JustificationFIEIntellectualAndAdaptiveEvaluation\']').type('TEXT TEST', {force: true});
        cy.get('.DoesStudentRequireIntensiveIndividualizedInstruction label span').contains('Yes').click({force: true});
        cy.get('[field-key=\'FourthArticleJustificationFromIEPProgressMonitoringAndFIE\']').type('TEXT TEST', {force: true});
        cy.get('.IsAssessmentDeterminationBasedOnNotExtenuatingFactorsRadio label span').contains('Yes').click({force: true});
        cy.get('input[field-key=\'SixthArticleJustificationFromIEPProgressMonitoringAndFIE\']').type('TEXT TEST', {force: true});

        cy.get('a#btnUpdateForm').click();
        cy.wait('@savePage', {timeout: 170000}).then((xhr) => {
            expect(xhr.status).to.equal(200);
        });
    });

    it('Fill TELPAS Participation Form', function () {
        cy.get('span[data-sectionname=\'TELPAS Participation\']').click();
        cy.wait('@openPage', {timeout: 170000}).then((xhr) => {
            expect(xhr.status).to.equal(200);
        });

        cy.get('.IsLEPStudentWhoInGradesK12 label span').contains('Yes').click({force: true});
        cy.get('select[field-key=\'ReadingParticipation\']').select('TELPAS',{force:true});
        cy.get('[field-key=\'SpeakingParticipation\']').select('TELPAS',{force:true});
        cy.get('[field-key=\'WritingParticipation\']').select('TELPAS',{force:true});
        cy.get('[field-key=\'ListeningParticipation\']').select('TELPAS',{force:true});
cy.get('.StudentRequiresBrailleVersionWhichIsNotYetAvailable label').click({force: true});
cy.get('.StudentHasUniqueCircumstances label').click({force: true});
cy.get('[field-key=\'StudentHasUniqueCrcumstancesExplain\']').type('TEXT TEST',{force:true});

        cy.get('a#btnUpdateForm').click();
        cy.wait('@savePage', {timeout: 170000}).then((xhr) => {
            expect(xhr.status).to.equal(200);
        });
    });
});