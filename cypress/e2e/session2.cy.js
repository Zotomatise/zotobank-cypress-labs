describe("Manipuler les transactions - Séance 2", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get('[data-testid="signin-username"]').type("johndoe");
    cy.get('[data-testid="signin-password"]').type("s3cret");
    cy.get('[data-testid="signin-submit"]').click();
    cy.url().should("include", "/dashboard");
    cy.visit("/transactions");
  });

  // M1 : on asserte le composant d'état vide, pas juste le texte
  it("recherche sans résultat affiche l'état vide", () => {
    cy.get('[data-testid="transaction-search"]').type("zzznope");
    cy.get('[data-testid="transaction-empty-state"]').should("be.visible");
    cy.get('[data-testid="transaction-empty-state"]').should("contain", "Aucune transaction trouvée");
    cy.get('[data-testid^="transaction-item-"]').should("have.length", 0);
  });

  // M2 : filtre → compte → vérifie le signe → reset → recompte
  it("filtre Envoyés réduit la liste avec montants négatifs, Réinitialiser restaure", () => {
    cy.get('[data-testid^="transaction-item-"]').should("have.length", 10);
    cy.get('[data-testid="transaction-filter-type"]').select("sent");
    cy.get('[data-testid^="transaction-item-"]').should("have.length", 5);
    cy.get('[data-testid^="transaction-amount-"]').first().should("contain", "-");
    cy.get('[data-testid="transaction-reset-filters"]').click();
    cy.get('[data-testid^="transaction-item-"]').should("have.length", 10);
  });

  // M3 : les deux critères s'appliquent en même temps
  it("combiner filtre Envoyés + recherche inexistante donne état vide", () => {
    cy.get('[data-testid="transaction-filter-type"]').select("sent");
    cy.get('[data-testid="transaction-search"]').type("zzznope");
    cy.get('[data-testid="transaction-empty-state"]').should("be.visible");
  });

  // M4 : tester la navigation, pas juste les listes
  it("cliquer une transaction ouvre la page détail avec les bonnes infos", () => {
    cy.get('[data-testid^="transaction-item-"]').first().click();
    cy.get('[data-testid="transaction-detail"]').should("exist");
    cy.get('[data-testid="transaction-detail-amount"]').should("be.visible");
    cy.get('[data-testid="transaction-detail-sender"]').should("be.visible");
    cy.get('[data-testid="transaction-detail-status"]').should("be.visible");
  });
});
