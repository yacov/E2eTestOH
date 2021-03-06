// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })


Cypress.Commands.add('manualLogin', (urll) => {
    return cy.fixture('pages').then((pages) => {
        const loginPage = pages.loginPage;
        cy.visit(urll + '/Login.aspx?ReturnUrl=%2fAcceliTrack/Home.aspx');
        cy.get(loginPage.usernameField).clear().type(Cypress.env('testUserName'));
        cy.get(loginPage.passwordField).clear().type(Cypress.env('testUsersPassword'));
        cy.get(loginPage.loginButton).click();
    })
});

Cypress.Commands.add('manualLoginTX', (urll) => {
    return cy.fixture('pages').then((pages) => {
        const loginPage = pages.loginPage;
        cy.visit(urll + '/Login.aspx?ReturnUrl=%2fAcceliTrack/Home.aspx');
        cy.get(loginPage.usernameField).clear().type('DTATester');
        cy.get(loginPage.passwordField).clear().type('Password!1');
        cy.get(loginPage.loginButton).click();
    })
});

Cypress.Commands.add('getIframeDocument', () => {
    const getIframeDocument = () => {
        return cy
            .get('iframe')
            // Cypress yields jQuery element, which has the real
            // DOM element under property "0".
            // From the real DOM iframe element we can get
            // the "document" element, it is stored in "contentDocument" property
            // Cypress "its" command can access deep properties using dot notation
            // https://on.cypress.io/its
            .its('0.contentDocument').should('exist')
    }
});

Cypress.Commands.add('getIframeBody', () => {
    const getIframeBody = () => {
        // get the document
        return cy.getIframeDocument()
            // automatically retries until body is loaded
            .its('body').should('not.be.undefined')
            // wraps "body" DOM element to allow
            // chaining more Cypress commands, like ".find(...)"
            .then(cy.wrap)
    }
});

Cypress.Commands.add('txQcLogin', (urll) => {
    return cy.fixture('pages').then((pages) => {
        const loginPage = pages.loginPage;
        cy.visit(urll + `/Login.aspx`, {timeout: 60000});
        cy.get(loginPage.usernameField).clear().type(Cypress.env('testQCUserName'));
        cy.get(loginPage.passwordField).clear().type(Cypress.env('testQCUserPassword'));
        cy.get(loginPage.loginButton).click();
    })
});

Cypress.Commands.add('txSSLogin', (urll) => {
    return cy.fixture('pages').then((pages) => {
        const loginPage = pages.loginPage;
        cy.visit(urll + `/Login.aspx`, {timeout: 60000});
        cy.get(loginPage.usernameField).clear().type(Cypress.env('testQCUserName'));
        cy.get(loginPage.passwordField).clear().type(Cypress.env('testQCUserPassword'));
        cy.get(loginPage.loginButton).click();
    })
});

Cypress.Commands.add('dadeQcLogin', (urll, studentId = Cypress.env('dadeQcStudentId')) => {
    return cy.fixture('pages').then((pages) => {
        const loginPage = pages.loginPage;
        cy.visit(urll + `/Login.aspx`);
        cy.get(loginPage.usernameField).clear().type(Cypress.env('testUserName'));
        cy.get(loginPage.passwordField).clear().type(Cypress.env('testUsersPassword'));
        cy.get(loginPage.loginButton).click();
    })
});



Cypress.Commands.add('txDemoLogin', (urll) => {
    return cy.fixture('pages').then((pages) => {
        const loginPage = pages.loginPage;
        cy.visit(urll + '/Login.aspx?ReturnUrl=%2fAcceliTrack/Home.aspx');
        cy.get(loginPage.usernameField).clear().type(Cypress.env('testUserName'));
        cy.get(loginPage.passwordField).clear().type(Cypress.env('testUsersPassword'));
        cy.get(loginPage.loginButton).click();
    })
});

Cypress.Commands.add('txProdLogin', (urll) => {
    return cy.fixture('pages').then((pages) => {
        const loginPage = pages.loginPage;
        cy.visit(urll + '/Login.aspx?ReturnUrl=%2fplanng/Students/ViewStudent/289193/Events/IEP');
        cy.get(loginPage.usernameField).clear().type(Cypress.env('testUserName'));
        cy.get(loginPage.passwordField).clear().type(Cypress.env('testUsersPassword'));
        cy.get(loginPage.loginButton).click();
    })
});

Cypress.Commands.add('loginif', () => {
    if (cy.url().contains('login.aspx')) {
        cy.get('#UserName').clear().type(Cypress.env('testUserName'));
        cy.get('#Password').clear().type(Cypress.env('testUsersPassword'));
        cy.get('#lnkLogin').click();
    }
});

Cypress.Commands.add('login', (urll) => {
    return cy.fixture('pages').then((pages) => {
        const loginPage = pages.loginPage;
        cy.visit(urll + '/Login.aspx');
        cy.get(loginPage.usernameField).clear().type(Cypress.env('testUserName'));
        cy.get(loginPage.passwordField).clear().type(Cypress.env('testUsersPassword'));
        cy.get(loginPage.loginButton).click();
    })
});

Cypress.Commands.add('openForm', (formFullName, uurll) => {
    return cy.fixture('forms').then((forms) => {
        for (var i = 0; i < forms.Items.length; i++) {
            if (forms.Items[i].Name === formFullName) {
                cy.log('Form ' + formFullName + ' found in the list.')
                const formdid = forms.Items[i].FormId;
                const sectionName = forms.Items[i].EventSection;
                const uurl = uurll + '/plan/Events/ViewEvent?eventId=' + Cypress.env('eventURL') + '#' + sectionName + '&formId=' + formdid;
                cy.log('url of the form ' + formFullName + 'is ' + uurl);
                cy.server();
                cy.route('POST', '**/Events/ViewForm').as('openPage');
                cy.visit(uurl);
                cy.wait('@openPage', {timeout: 270000}).then((xhr) => {
                    expect(xhr.status).to.equal(200);
                    expect(xhr, 'has duration in ms').to.have.property('duration').and.be.a('number');
                    //  expect(xhr, 'has duration in ms').to.have.property('duration').and.not.to.be.greaterThan(25000);
                });
                cy.contains('.k-notification-error', 'An error has occurred').should('not.exist');
            }
        }
    })
});
Cypress.Commands.add('checkRes', (namr, link = 'Grab/Forms1.json') => {
    return cy.fixture(link).then((forms) => {
        for (var i = 0; i < forms.Items.length; i++) {
            if (forms.Items[i].namr.its.length) {
                cy.log('Form ' + namr + ' exists')
                return true;
            } else {
                return false;
            }
        }
    })
});
Cypress.Commands.add('getFullUrl', () => {
    cy.fixture('fullUrl.txt').then((fullUrl) => {
        return fullUrl;
    })
});

Cypress.Commands.add('openFormSmoke', (formFullName) => {
    return cy.fixture('forms').then((forms) => {
        for (var i = 0; i < forms.Items.length; i++) {
            if (forms.Items[i].Name === formFullName) {
                cy.log('Form ' + formFullName + ' found in the list.')
                const formdid = forms.Items[i].FormId;
                const sectionName = forms.Items[i].EventSection;
                cy.readFile('cypress/fixtures/fullUrl.txt').then(u => {
                    const uurl = u + '#' + sectionName + '&formId=' + formdid;
                    cy.log('url of the form ' + formFullName + 'is ' + uurl);
                    cy.server();
                    cy.route('POST', '**/Events/ViewForm').as('openPage');
                    cy.visit(uurl);
                    cy.wait('@openPage', {timeout: 270000}).then((xhr) => {
                        expect(xhr.status).to.equal(200);
                        expect(xhr, 'has duration in ms').to.have.property('duration').and.be.a('number');
                        expect(xhr, 'has duration in ms').to.have.property('duration').and.not.to.be.greaterThan(25000);
                    });
                    cy.contains('.k-notification-error', 'An error has occurred').should('not.exist');
                });
            }

        }
    })

});

Cypress.Commands.add('openFormPerf', () => {
    let datastr1 = [];
     cy.fixture('forms').then(forms => {
        for (var i = 0; i < forms.Items.length; i++) {
            cy.readFile('cypress/fixtures/fullUrl.txt').then(u => {
                const uurl = u + '#' + forms.Items[i].sectionName + '&formId=' + forms.Items[i].formdid;
                cy.log('url of the form ' + forms.Items[i].formFullName + ' is ' + uurl);
                cy.visit(uurl,{
                    onBeforeLoad: (win) => {
                        win.performance.mark('start-loading')
                    },
                    onLoad: (win) => {
                        win.performance.mark('end-loading')
                    },
                }).its('performance').then((p) => {
                    p.measure('pageLoad', 'start-loading', 'end-loading')
                    var measure = p.getEntriesByName('pageLoad')[0]
                    var openPL = measure.duration.toFixed(2);
                    datastr1.push(forms.Items[i].formFullName, openPL)
                    cy.log(datastr1[0].toString())
                    cy.log(datastr1[1].toString())
                    // assert.isAtMost(measure.duration, 1000)
                });
                cy.contains('.k-notification-error', 'An error has occurred').should('not.exist');
            });

            cy.get('body').then(($body) => {
                if ($body.find('btnUpdateForm').length > -1) {
                    cy.get('a#btnUpdateForm').click();
                    cy.wait('@savePage', {timeout: 170000}).then((xhr) => {
                        // expect(xhr.status).to.equal(200);
                        expect(xhr, 'has duration in ms').to.have.property('duration').and.not.to.be.greaterThan(15000);
                        const savePerf = xhr.duration.toFixed(2);
                        datastr1.push([savePerf]);
                        // datastr1.length.should.equal(3);
                        //cy.log(datastr1[2])
                    });
                    cy.contains('.k-notification-error', 'An error has occurred').should('not.exist');
                    // cy.getCurrentBuild()
                } else {
                    cy.log(`Form ${formFullName} cannot be saved`);
                    datastr1.push("N/A");
                }
                cy.writeFile('cypress/fixtures/FormPerf.json', {
                    name: datastr1[0],
                    openTime: datastr1[1],
                    savetime: datastr1[2]
                }, {flag: 'a+'});
                cy.writeFile('cypress/fixtures/FormPerf.json', ",", {flag: 'a+'});
                // sendDatatoGoogle(datastr);
                datastr1.length = 0;
            });
        }
        });
});

Cypress.Commands.add('openFormSmokeNoWait', (formFullName) => {
    return cy.fixture('forms').then((forms) => {
        for (var i = 0; i < forms.Items.length; i++) {
            if (forms.Items[i].Name === formFullName) {
                cy.log('Form ' + formFullName + ' found in the list.')
                const formdid = forms.Items[i].FormId;
                const sectionName = forms.Items[i].EventSection;
                cy.readFile('cypress/fixtures/fullUrl.txt').then(u => {
                    const uurl = u + '#' + sectionName + '&formId=' + formdid;
                    cy.log('url of the form ' + formFullName + 'is ' + uurl);
                    cy.visit(uurl);
                    cy.contains('.k-notification-error', 'An error has occurred').should('not.exist');
                });
            }

        }
    });
});

Cypress.Commands.add('getFormLink', (urll) => {

    const link = cy.get(`[data-title=\'${urll}\'] span a.k-link`).invoke('attr', 'href');
    cy.log(link)
    return link;

});


Cypress.Commands.add('selectNth', {prevSubject: 'element'}, (subject, pos) => {
    cy.wrap(subject)
        .children('option')
        .eq(pos)
        .then(e => {
            cy.wrap(subject).select(e.val(), {force: true})
        })
});

Cypress.Commands.add("selectNth2", (select, pos) => {
    cy.get(`${select} option +option`)
        .eq(pos)
        .then(e => {
            cy.get(select)
                .select(e.val(), {force: true})
        })
})

Cypress.Commands.add("getCurrentBuild", () => {
    let build = cy.get('span.version').text();
    build = build.replace(/\D/g, '');
    cy.log('current build is ' + build);
    return build;

})

Cypress.Commands.add('openFormAndMeasure', (formFullName) => {
    cy.fixture('forms').then((forms) => {
        var measuret;
        for (var i = 0; i < forms.Items.length; i++) {
            if (forms.Items[i].Name === formFullName) {
                cy.log('Form ' + formFullName + ' found in the list.')
                const formdid = forms.Items[i].FormId;
                const sectionName = forms.Items[i].EventSection;
                const uurl = Cypress.env('baseURL') + '/plan/Events/ViewEvent?eventId=' + Cypress.env('eventURL') + '#' + sectionName + '&formId=' + formdid;
                cy.log('url of the form ' + formFullName + 'is ' + uurl);
                cy.server();
                cy.route('POST', '**/Events/ViewForm').as('openPage');
                cy.visit(uurl, {
                    onBeforeLoad: (win) => {
                        win.performance.mark('start-loading')
                    },
                    onLoad: (win) => {
                        win.performance.mark('end-loading')
                    },
                }).its('performance').then((p) => {
                    p.measure('pageLoad', 'start-loading', 'end-loading')
                    const measure = p.getEntriesByName('pageLoad')[0]
                    measuret = measure.duration;

                    // assert.isAtMost(measure.duration, 1000)
                });
            }
        }
        return measuret;
    })
});

Cypress.Commands.add('openPageAndMeasure', (uurl) => {
    cy.fixture('forms').then((forms) => {
        let measuret;
        cy.visit(uurl, {timeout: 170000}, {
            onBeforeLoad: (win) => {
                win.performance.mark('start-loading')
            },
            onLoad: (win) => {
                win.performance.mark('end-loading')
            },
        }).its('performance').then((p) => {
            p.measure('pageLoad', 'start-loading', 'end-loading')
            const measure = p.getEntriesByName('pageLoad')[0]
            measuret = measure.duration;
            cy.log('Page load time is ' + measuret)
            // assert.isAtMost(measure.duration, 1000)
        });
        return measuret;
    })
});

Cypress.Commands.add('getColumnIndex', (uurl) => {
    let indexx = 0;
    cy.get('div.lblField [style=\'text-align:center;\']').then(($el) => {
        // $el is a wrapped jQuery element
        const teext = $el.invoke('text');
        if (teext === uurl) {
            cy.log('Index of column ' + uurl + ' is ' + $el)
            return index;
        } else {
            cy.log('Index of column ' + teext + ' is ' + index)
        }
    });
});

Cypress.Commands.add('seedAndVisit', (seedData = 'fixture:dataId') => {
    let url = `https://tx.acceliplan.com/plan/Events/ViewEvent?eventId=${seedData.EventId}#LREServiceAlternatives&formId=${seedData.FormId}`;
    cy.visit(url)
    cy.wait('@openPage', {timeout: 180000}).then((xhr) => {
        expect(xhr.status).to.equal(200);
    });
})

Cypress.Commands.add('waitForLoading', () => {
    cy.get('.loader-circle.k-i-loading').should('not.exist', {timeout: 120000});
})

Cypress.Commands.add('isElementExists', (loc) => {
    let a;
    cy.get("body").then($body => {
        if ($body.find(loc).length > 0) {   //evaluates as true
            a = true;
            cy.log('Element found')
        } else {
            a = false;
            cy.log('Element is not found')
        }
        return a;
    });
});

Cypress.Commands.add('clearArray', (loc) => {
    return loc = [];
});