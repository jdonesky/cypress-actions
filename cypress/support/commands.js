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

import '@testing-library/cypress/add-commands'


Cypress.Commands.add("login", (email="jdonesky@gmail.com") => {
    cy.window().then(() => { 
            // cy.visit('/')
            cy.request({
                method: "POST",
                url: "https://mysite.com",
                body: {
                    user: "Jon", 
                    email
                }
            }).then(res => {
                /// if local strategy, do something with response
                // whatever you're authentication flow, do that
                Cypress.log({
                    name: "logged in"
                })
            })
    })
})