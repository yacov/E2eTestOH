@ECHO OFF
npx cypress run --spec "cypress/integration/GrabDataForm-spec.js"
npx cypress run --spec "cypress/integration/DTA_Smoke-spec.js" --record --key c8c65de2-1a95-4302-8142-727f46d444ba --tag DTA_Smoke
@pause