describe("Manipuler la page de transaction", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get('[data-testid="signin-username"]').type("johndoe");
    cy.get('[data-testid="signin-password"]').type("s3cret");
    cy.get('[data-testid="signin-submit"]').click();
    cy.url().should("include", "/dashboard");
    cy.visit("/transactions");
  });

  // Analyser: une recherche sans résultat doit afficher un état vide explicite
  // Actions: taper un terme inexistant dans la recherche
  // Prouver: le composant état vide est visible et contient le bon message
  it("recherche sans résultat affiche l'état vide", () => {
    cy.get('[data-testid="transaction-search"]').type("inexistant");
    cy.get('[data-testid="transaction-empty-state"]').should("be.visible");
    cy.get('[data-testid="transaction-empty-state"]').should(
      "contain",
      "Aucune transaction trouvée",
    );
  });

  // Analyser: le filtre Envoyés réduit la liste et les montants doivent être négatifs
  // Actions: sélectionner le filtre, vérifier le signe du premier montant, puis réinitialiser
  // Prouver: la liste est plus courte, le montant contient "-", et revient à 10 après reset
  it("le filtre Envoyés réduit la liste et Réinitialiser la restaure", () => {
    cy.get('[data-testid^="transaction-item-"]').should("have.length", 10);
    cy.get('[data-testid="transaction-filter-type"]').select("sent");
    cy.get('[data-testid^="transaction-item-"]').should("have.length", 5);
    cy.get('[data-testid^="transaction-amount-"]').first().should("contain", "-");
    cy.get('[data-testid="transaction-reset-filters"]').click();
    cy.get('[data-testid^="transaction-item-"]').should("have.length", 10);
  });

  // Analyser: un filtre type et une recherche doivent s'appliquer en même temps
  // Actions: sélectionner Envoyés puis taper un terme inexistant
  // Prouver: l'état vide s'affiche avec les deux critères actifs
  it("combiner filtre Envoyés et recherche inexistante donne état vide", () => {
    cy.get('[data-testid="transaction-filter-type"]').select("sent");
    cy.get('[data-testid="transaction-search"]').type("inexistant");
    cy.get('[data-testid="transaction-empty-state"]').should("be.visible");
  });

  // Analyser: cliquer une transaction doit ouvrir sa page détail avec les bonnes infos
  // Actions: cliquer la première ligne de la liste
  // Prouver: la page détail s'affiche avec montant, expéditeur et statut visibles
  it("cliquer une transaction ouvre la page détail", () => {
    cy.get('[data-testid^="transaction-item-"]').first().click();
    cy.get('[data-testid="transaction-detail"]').should("exist");
    cy.get('[data-testid="transaction-detail-amount"]').should("be.visible");
    cy.get('[data-testid="transaction-detail-sender"]').should("be.visible");
    cy.get('[data-testid="transaction-detail-status"]').should("be.visible");
  });
});
