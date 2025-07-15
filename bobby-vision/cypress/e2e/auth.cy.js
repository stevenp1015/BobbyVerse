describe('Authentication', () => {
  it('should successfully log in a user', () => {
    // Visit the login page
    cy.visit('/login');

    // Type in test credentials
    cy.get('input[name="username"]').type('testuser');
    cy.get('input[name="password"]').type('testpassword');

    // Intercept the login API request
    cy.intercept('POST', '/api/login').as('loginRequest');

    // Click the submit button
    cy.get('button[type="submit"]').click();

    // Wait for the login API request to complete
    cy.wait('@loginRequest');

    // TODO: Assert that the user is redirected to a protected page
    // cy.url().should('include', '/dashboard');
  });

  // TODO: Add a test case for failed login
  // it('should display an error message on failed login', () => {
  //   cy.visit('/login');
  //   cy.get('input[name="username"]').type('invaliduser');
  //   cy.get('input[name="password"]').type('wrongpassword');
  //   cy.get('button[type="submit"]').click();
  //   // Assert that an error message is displayed
  //   // cy.contains('Invalid credentials');
  // });
});