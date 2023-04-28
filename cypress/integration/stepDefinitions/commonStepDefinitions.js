const { Given } = require('@badeball/cypress-cucumber-preprocessor');
import commonElements from '../testElements/commonElements';
const commonElementObj = new commonElements();

Given('the user is on the Home page', () => {
    //take the URL from the command line/cypress config file and then open it in the browser
    cy.visit(Cypress.env('url'));
    //validate whether the current page is the home page or not
    cy.title().then((currentPageTitle) => {
        expect(currentPageTitle).to.equal('Signature Designer Light Fixtures | Experience Visual Comfort & Co.');
    });
    //wait till the page gets loaded
    commonElementObj.getHomePageTitleText().should('be.visible');
    commonElementObj.getHomePageBody().should('be.visible');
    cy.wait(2000);
});

Given('the user is not logged-in', () => {
    //validate whether the login icon button gets displayed or not
    commonElementObj.getLoginButton().should('exist');
});