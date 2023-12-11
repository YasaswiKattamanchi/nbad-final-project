describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://174.138.61.21:3000/')
    cy.url().should('eq', 'http://174.138.61.21:3000/signin');
  })

  it('should look the same', () =>{
    cy.eyesOpen({
      appName: 'Budget',
      testName: 'Dashboard Check'
    });
    cy.eyesCheckWindow();
    cy.eyesClone();
  })
})