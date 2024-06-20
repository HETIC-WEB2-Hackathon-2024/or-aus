const connexion = () => {
  cy.visit('/offres/');

  cy.origin('https://or-aus.eu.auth0.com', () => {

    cy.get('input[inputmode="email"]').type('candidat@aus.floless.fr');
    cy.get('input[type="password"]').type('Candidat123!');
    cy.get('button[type="submit"]').click();
  });
}

describe('Page offres', () => {
  it('Visit offre page', () => {
    connexion();
    cy.get('a[href="/offres"]').click();
    cy.url().should('include', '/offres');
    cy.get('div.rounded-xl.border.text-card-foreground.shadow-md.w-full').first().click().should('have.class', 'bg-primary/30');
  });
});