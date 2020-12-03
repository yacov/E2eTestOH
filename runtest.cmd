@ECHO OFF
git pull
npm install cypress --save-dev
npx cypress run --spec "cypress/integration/TxSmoke-spec.js" --reporter "teamcity" --record --key "c8c65de2-1a95-4302-8142-727f46d444ba
" --tag "TxSmoke"
@pause