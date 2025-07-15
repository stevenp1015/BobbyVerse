wait describe('Homepage', () => {
  it('should load the homepage', () => {
    // Visit the root URL of the application (configured in cypress.json)
    cy.visit('/');

    // Assert that the title contains 'React App' (default CRA title)
    cy.title().should('contain', 'React App');

    // Or assert that an element with specific text exists
    // cy.contains('Learn React');
  });
});