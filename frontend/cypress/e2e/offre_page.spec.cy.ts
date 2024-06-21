const connexion = () => {
  cy.visit('/offres/');

  cy.origin('https://or-aus.eu.auth0.com', () => {

    cy.get('input[inputmode="email"]').type('candidat@aus.floless.fr');
    cy.get('input[type="password"]').type('Candidat123!');
    cy.get('button[type="submit"]').click();
  });
}

describe('Page offres', () => {
  beforeEach(() => {
    connexion();
    cy.get('a[href="/offres"]').click();
    cy.url().should('include', '/offres');
  });


  it('Select an offer and verify content', () => {
    cy.get('div.rounded-xl.border.text-card-foreground.shadow-md.w-full').first().click()
    cy.get('div.rounded-xl.border.text-card-foreground.shadow-md.w-full').should('have.class', 'bg-primary/30');
  });

  it('Verify offre content', () => {
    cy.get('div.rounded-xl.border.text-card-foreground.shadow-md.w-full').first().click()
    cy.get('p.font-light.pr-4.text-gray-500').within(() => {
      cy.get('p').should('have.length.greaterThan', 2);
    });
  });

  it('Verify favorite button', () => {
    cy.get('svg.lucide.lucide-heart').first().click();
    cy.get('svg.lucide.lucide-heart').first().should('have.class', 'fill-primary');
  });
  // rajouter verif pop up add favorite 
  // rajouter verif pop up remove favorite
});