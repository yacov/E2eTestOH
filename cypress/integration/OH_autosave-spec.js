
let spy;
let schoolName1;
let schoolName2;

beforeEach(function () {
    cy.fixture('pages')
        .then((pages) => {
            this.pages = pages
        });

});

    describe.skip('Test OH autosave function', function () {

        it('Can set up autosave ON', function () {
            cy.manualLogin('https://oh.acceliqc.com');
            cy.visit('https://oh.acceliqc.com/plan/Administration/SettingsManager');
            cy.get('[type=\'checkbox\'][name=\'DistrictSettingModel.AllowFormAutoSave\']').check();
            cy.get('a#btnUpdateSettings').click();


            cy.server()
            cy.route('POST', '**/Administration/UpdateSettings/**').as('saveSetting');
            cy.wait('@saveSetting', {timeout: 170000}).then((xhr) => {
                expect(xhr.status).to.equal(200);
            });
            cy.visit('https://oh.acceliqc.com/plan/Events/ViewEvent?eventId=3dda32b8-d2f7-4650-bcfe-ab9e00a7c5b9');
cy.get('span[data-sectionname=\'PR-01 Prior Written Notice\']').click();
cy.get('input[field-key=\'Evaluation\'][type=\'checkbox\']').check();


        });
});