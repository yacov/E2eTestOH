cy.fillForms = {
    makeUniqueUsername: () => {
        return 'cypress-test-' + Cypress.moment().format("YYMMDD-HHmmss");
    },
    saveFormNormal: () => {
        cy.log('Should save Form changes');
        cy.get('a#btnUpdateForm').click();

        cy.wait('@savePage', {timeout: 170000}).then((xhr) => {
           // expect(xhr.status).to.equal(200);
            expect(xhr, 'has duration in ms').to.have.property('duration').and.be.a('number');
            expect(xhr, 'has duration in ms').to.have.property('duration').and.not.to.be.greaterThan(15000);
        });

       // cy.contains('.k-notification[data-role=\'alert\']','Form has been updated successfully').should('be.visible');
    },
    fillDM: () => {
        cy.get('#pnlDistributeTo table input.includeTemplate').eq(1).check({force: true});
        cy.get('#pnlEventOtherForms input.selector-checkbox').eq(5).check({force: true});
        cy.get('#btnDistribute').click({force: true});
//check distr pop-up
        cy.contains('strong.slideIn','Distribution ready',{timeout: 60000});
        //check distr attempts
        cy.get('#pnlDistributionAttempt a.k-pager-refresh').click();
        cy.wait(1500)
        cy.get('#pnlDistributionAttempt',{timeout: 20000}).should('not.contain','No items to display');

    },
    fillPresentLevels: () => {
        cy.get('[field-title=\'Review of previous IEP, including status update(s)\']').click({force: true});
        cy.get('[field-title=\'General Ed Teacher(s)\']').click({force: true});
        cy.get('.StudentIsYoungerThan18WithAppropriateParentalInvolvement label span').contains('Yes').click({force: true});

    },
    fillPLCurriculum: () => {
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
        cy.fillForms.fillPLSelectRandomPEN();
    },
    fillPLSocialEmotional: () => {
        cy.get('textarea[field-title=\'The strengths of the student\']').clear().type('test text');
        cy.get('.DoesDisabilityAffectInvolvement label span').contains('Yes').click({force: true});
        cy.get('.DoesTheStudentRequireSocialCommunicationInstruction label span').contains('Yes').click({force: true});
        cy.get('.DoesTheStudentRequireSocialCommunicationInstructionLocations label span').contains('One service location').click({force: true});
        cy.get('textarea[data-bind=\'value: DoesTheStudentRequireSocialCommunicationInstructionDS\']').clear().type('test text');
        cy.get('.DoesTheStudentRequireSpecialEducationCounselingServices label span').contains('Yes').click({force: true});
        cy.get('.DoesTheStudentRequireSpecialEducationCounselingServicesDirect label').click({force: true});
        cy.get('.DoesTheStudentRequireSpecialEducationCounselingServicesLocations label span').contains('One service location').click({force: true});
        cy.get('textarea[data-bind=\'value: DoesTheStudentRequireSpecialEducationCounselingServicesDS\']').clear().type('test22');
        cy.fillForms.fillPLSelectRandomPEN();
    },
    fillPLIndependent: () => {
        cy.get('[field-title=\'The strengths of the student\']').type('test text');
        cy.get('.DoesDisabilityAffectInvolvement label span').contains('Yes').click({force: true});

        cy.get('.DoesStudentRequireAdaptedPhysicalEducation label span').contains('Yes').click({force: true});
        cy.get('.AdaptedPhysicalEducationSpecializedInstruction label').click({force: true});
        cy.get('.AdaptedPhysicalEducationSpecializedInstructionServicesOneOrTwo label span').contains('One service location').click({force: true});
        cy.get('textarea[data-bind=\'value: DescriptiveAdaptedPhysicalEducationSpecialized\']').clear().type('test text');
        //select random PEN
        cy.get('input[aria-describedby=\'cbxPens_taglist\']').type('a').type('{downarrow}').type('{enter}');
        cy.fillForms.fillPLSelectRandomPEN();
    },
    fillPLSelectRandomPEN: () => {
        //select random PEN
        cy.get('input[aria-describedby=\'cbxPens_taglist\']').type('a').type('{downarrow}').type('{enter}');
    },
    fillPLHealth: () => {
        cy.get('.DoesDisabilityAffectInvolvement label span').contains('Yes').click({force: true});
        cy.get('.HasPreviousGoals label span').contains('Yes').click({force: true});
        cy.get('textarea[data-bind=\'value: HasPreviousGoalsDescription\']').clear().type('testtext');

        cy.get('.RequireNursingServices label span').contains('Yes').click({force: true});
        cy.get('span.SkilledNursingServices label').click({force: true});
        cy.get('span.SkilledNursingServicesDirect label').click({force: true});

        cy.get('.SkilledNursingServicesOneTwo label span').contains('One service location').click({force: true});

        cy.get('textarea[data-bind=\'value: SkilledNursingServicesDescription\']').clear().type('test text');
        cy.fillForms.fillPLSelectRandomPEN();
    },
    fillPLCommmunication: () => {
        cy.get('textarea[field-title=\'The strengths of the student\']').clear().type('test text');
        cy.get('.DoesDisabilityAffectInvolvement label span').contains('Yes').click({force: true});

        //cy.get('.HasStudentHaAnyPreviousGoalsInThisDomain label span').contains('Yes').click({force: true});
        //  cy.get('[data-bind=\'value: HasStudentHadAnyPreviousGoalsInThisDomainDescriptiveSentence\']').type('testtext');

        cy.get('.DoesStudentRequireAuditoryImpairmentServices label span').contains('Yes').click({force: true});
        cy.get('.DoesStudentRequireAuditoryImpairmentServicesSpecializedInstruction label').click({force: true});
        cy.get('.SpecializedInstructionOneOrTwoServiceLocation label span').contains('One service location').click({force: true});
        cy.get('textarea[field-key=\'DoesStudentRequireAuditoryImpairmentServicesDescriptiveSentence\']').type('test text');

    },
    fillSaveGoals: () => {
        const todaysDate = Cypress.moment().format('MM/DD/YYYY');
        cy.log('Today is '+todaysDate);
        cy.get('a[title=\'Modify\']').eq(0).click({force: true});
        cy.get('textarea#GoalDescription').type('Test test');
         cy.get('select#goalEvaluationProcedureSelectedIds option').eq(0).invoke('val').then((val)=>{
                     cy.get('select#goalEvaluationProcedureSelectedIds').select(val,{force:true});
                     })
         cy.get('select#measuredByIds option').eq(0).invoke('val').then((val)=>{
                     cy.get('select#measuredByIds').select(val,{force:true});
                     })

       // cy.get('[aria-describedby=\'goalEvaluationProcedureSelectedIds_taglist\']').click({force: true}).type('{downarrow}').type('{enter}').blur();
      //  cy.get('[aria-describedby=\'measuredByIds_taglist\']').click({force: true}).type('{downarrow}').type('{enter}').blur();
        cy.get('select#GoalEvaluationProcedure_HowOftenId option').eq(1).invoke('val').then((val) => {
            cy.get('select#GoalEvaluationProcedure_HowOftenId').select(val, {force: true});
        });

        cy.get('#StartDate').click({force: true}).clear().focus().type(todaysDate).blur();
        cy.get('input#RelatedServices').click({force: true});
        cy.get('a#btnSaveMiamiGoal').click({force: true});
        cy.contains('.k-notification-error','An error has occurred').should('not.exist');
    },
    fillSaveAccomodations: () => {
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
    },
    fillAssistiveTech: () => {
        /* cy.get('[data-abbreviation=\'AT=Yes\'][field-key=\'RadioATYesNo\']').click({force: true});
               cy.get('span.CheckboxThestudent label').click({force: true});
               cy.get('[data-bind=\'value: TextExplain\']').clear().type('test text');*/
    },
    fillAssistiveTechNeeds: () => {

    },
    fillData: () => {

    },
    fillPhysicalFitnessAssesment: () => {
        cy.get('.RadioBrFHBsFIItJwEJAGsttuvGAHrJwtJGwF label span').contains('Yes').click({force: true});
        cy.get('input[field-key=\'CheckboxECAtJAwDFttwEEIDsDsuFGsAwtAHDHuD\']').check({force: true});
        cy.get('input[field-key=\'CheckboxJGrrJuCtuwBuEvrrIJArJFvHIuAAAuFJ\']').check({force: true});
        // cy.getIframeBody().clear().type('TEST TEXT', {force: true});
    },
    fillSTAARAlternate2ParticipationRequirements: () => {
        cy.get('.IsStudentConsiderStaarAlt label span').contains('Yes').click({force: true});
        cy.get('span.NameAndPositionOfPerson').click({force: true});
        cy.get('select[field-key=\'NameAndPositionOfPerson\'][data-bind=\'value: NameAndPositionOfPerson\'] option').last().invoke('val').then(($val) => {

            cy.get('select[field-key=\'NameAndPositionOfPerson\'][data-bind=\'value: NameAndPositionOfPerson\']').select($val, {force: true});
        });
        cy.get('.IsStudentConsiderStaarAlt label span').contains('Yes').click({force: true});
        cy.get('.DoesTheStudentHaveSignificantCognitiveDisability label span').contains('Yes').click({force: true});
        cy.get('textarea[field-key=\'JustificationByIntellectualAndAdaptive\']').clear().type('TEXT TEST');
        cy.get('.DoesTheStudentRequireIntensiveInstruction label span').contains('Yes').click({force: true});
        cy.get('textarea[field-key=\'JustificationMustIncludeIEPProgressMonitoring\']').clear().type('TEXT TEST', {force: true});
        cy.get('.IsAssessmentBasedOnCognitiveDisability label span').contains('Yes').click({force: true});
        cy.get('textarea[field-key=\'JustificationMustIncludeIEPQuestion5\']').clear().type('TEXT TEST', {force: true});
    },
    fillSTAARParticipation: () => {
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
    },
    fillTELPASAlternateParticipationRequirements: () => {
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

    },
    fillTELPASParticipation: () => {
        cy.get('.IsLEPStudentWhoInGradesK12 label span', {timeout: 80000}).contains('Yes').click({force: true});
        cy.get('select[field-key=\'ReadingParticipation\']').select('TELPAS', {force: true});
        cy.get('[field-key=\'SpeakingParticipation\']').select('TELPAS', {force: true});
        cy.get('[field-key=\'WritingParticipation\']').select('TELPAS', {force: true});
        cy.get('[field-key=\'ListeningParticipation\']').select('TELPAS', {force: true});
        cy.get('.StudentRequiresBrailleVersionWhichIsNotYetAvailable label').click({force: true});
        cy.get('.StudentHasUniqueCircumstances label').click({force: true});
        cy.get('[field-key=\'StudentHasUniqueCrcumstancesExplain\']').clear().type('TEXT TEST', {force: true});
    },
    fillPriorWrittenNoticeofNonConsensusARD: () => {
        // cy.get('.AreaOfDisagreementDescriptionOfTheActionRefused label',{timeout:80000}).first().click({force: true});
        cy.get('.AreaOfDisagreementDescriptionOfTheActionRefused label', {timeout: 80000}).eq(-1).click({force: true});
        cy.get('input[field-key=\'OtherTextBox\']').type('TEXT TEST', {force: true});
    },
    fillMedicaidOneTimeParentalConsent: () => {
        cy.get('.RadioIHaveBeenProvidedThisInformation label span').contains('Yes').click({force: true});
        cy.get('.RadioIGiveMyConsent label span').contains('No').click({force: true});
        cy.get('input[field-key=\'TextNameofParentGuardianSurrogateParentorAdultStudent\']').type('TEXT TEST', {force: true});
        cy.get('input[field-key=\'DateNameofParentGuardianSurrogateParentorAdultStudent\'][field-title=\'Date\']').type('10/12/2020', {force: true});
    },
    fillNoticeOfProceduralSafeguards: () => {
        cy.get('.CopyWhichInformsAboutRights label', {timeout: 80000}).click({force: true});
    },
    fillReviewOfCommitteeDecisions: () => {
        cy.get('.AccommodationsConsidered label', {timeout: 80000}).click({force: true});
        cy.get('.AccommodationsAccepted label').click({force: true});
        cy.get('.EvaluationReevaluationConsidered label').click({force: true});
        cy.get('input[field-key=\'EvaluationReevaluationAccepted\']').click({force: true});
    },
    fillBehaviorInterventionPlan: () => {
        cy.get('.RadiosYesNo span label span').contains('Yes').click({force: true});
        cy.get('.js-checkbox-list label').first().click({force: true});
        cy.get('.js-checkbox-list label').eq(-1).click({force: true});
        cy.get('input[field-key=\'TextOther\']').type('TEXT TEST', {force: true});
    },
    fillTransportation: () => {
        cy.get('.RequireTransportationRadioButtons label span').contains('No').click({force: true});
    },
    fillSkilledNursingServices: () => {
        cy.get('span.PhysicianNameText input[field-key=\'PhysicianNameText\']').type('TEXT TEST',{force:true});
        cy.get('input[field-key=\'PhysicianContactInformationText\']').type('TEXT TEST',{force:true});
        cy.get('.DoesTheStudentRequireMedicationAdministrationSchoolRadio label span').contains('No').click({force:true});
        cy.get('.DoesTheStudentRequireMedicationAdministrationOutsideOfSchoolRadio label span').contains('No').click({force:true});
        cy.get('.StudentMedicalTreatmentsOrProceduresSchoolRadio label span').contains('No').click({force:true});
    }
}