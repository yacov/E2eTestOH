const url = "https://tx.acceliqc.com"

beforeEach(function () {
    cy.fixture('pages')
        .then((pages) => {
            this.pages = pages
        });

});

    describe('Fill Annual meeting Forms on  ' + url, function () {

        it('Ener into created event', function () {
            cy.txqclLogin(url);
            cy.get('#plcContent_lblPageTitle').should('contain','Home');
          /*  cy.contains('Welcome to AcceliTrack provider area!', {timeout: 50000})*/
            cy.log('Open created Annual event');
            cy.visit(url + '/plan/Events/ViewEvent?eventId='+Cypress.env('eventURL'));
        });
        it('Fill Present Levels', function () {
            cy.get('span[data-sectionname=\'Present Levels\']').click();
            cy.get('[field-title=\'Review of previous IEP, including status update(s)\']').click({force: true});
            cy.get('[field-title=\'General Ed Teacher(s)\']').click({force: true});
            cy.get('.StudentIsYoungerThan18WithAppropriateParentalInvolvement label span').contains('Yes').click({force: true});
            cy.log('Should save Form changes');
            cy.get('a#btnUpdateForm').click();
        });
        it('Fill Curriculum and Learning Form', function () {
            cy.get('[title=\'Curriculum and Learning Environment\'] span.caption').click();
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
        });
        it('Fill Social or Emotional Behavior Form', function () {
            cy.get('[title=\'Curriculum and Learning Environment\'] span.caption').click();
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
        });
        it('Fill Independent Functioning Form', function () {
            cy.get('[title=\'Independent Functioning\'] span.caption').click();
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
        });

        it('Fill Health Care Form', function () {
            cy.get('[title=\'Health Care\'] span.caption').click();
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
        });

        it('Fill Communication Form', function () {
            cy.get('[title=\'Communication\'] span.caption').click();
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
        });
        it('Fill Data Form', function () {
            cy.get('span[data-sectionname=\'ARD Data\']').click();

            cy.get('a#btnUpdateForm').click();
        });

        it('Fill Assistive Technology Needs Form', function () {
            cy.get('span[data-sectionname=\'Assistive Technology Needs\']').click();
cy.get('[data-abbreviation=\'AT=Yes\'][field-key=\'RadioATYesNo\']').click({force: true});
cy.get('span.CheckboxThestudent label').click({force: true});
            cy.get('[data-bind=\'value: TextExplain\']').type('test text');
            cy.get('a#btnUpdateForm').click();
        });

        it('Fill Assistive Technology Form', function () {
            cy.get('span[data-sectionname=\'Assistive Technology\']').click();
            cy.get('[aria-owns=\'TypeId_listbox\']').click({force: true});
            cy.get('span.k-input').contains('High Tech').click({force: true});
            cy.get('select#NameId').select('Amplification Devices: Hearing Assistive Technology',{force: true});
            cy.get('select#SubjectIds').select('Athletics',{force: true});
            cy.get('input#IsClassroom').check({force: true});
            cy.get('[aria-controls=\'StartDate_dateview\'] span.k-i-calendar').click();

            cy.get('span.CheckboxThestudent label').click({force: true});
            cy.get('[data-bind=\'value: TextExplain\']').type('test text');
            cy.get('a#btnUpdateForm').click();
        });


    });