@ECHO OFF
git pull
npm install cypress --save-dev
npx cypress run --spec "cypress/integration/FillForm-spec.js" --reporter "progress" --env eventURL=79955cb7-244b-4a0e-8f75-ac5a00c618cb