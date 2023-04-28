before(() => {
    cy.log('-- Before All Test --');
    
    //handle uncaught exceptions to make execution smooth
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from failing the test
        return false
    });
});

beforeEach(() => { 
    cy.log('-- Before Each Test --');
});

afterEach(() => { 
    cy.log('-- After Each Test --');
});

after(() => {
    cy.log('-- After All Test --');
});