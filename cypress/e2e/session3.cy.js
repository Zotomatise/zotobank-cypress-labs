// Séance 3 — Point de départ : la répétition (le problème à résoudre)
// Regarde ces 3 tests : le login est copié-collé partout.
// Question : si signin-submit change demain, combien d'endroits corriges-tu ?

describe("AVANT le refactor — la répétition (à améliorer)", () => {
  it("affiche la liste des transactions", () => {
    cy.visit("/login");
    cy.get('[data-testid="signin-username"]').type("johndoe");
    cy.get('[data-testid="signin-password"]').type("s3cret");
    cy.get('[data-testid="signin-submit"]').click();
    cy.location("pathname").should("eq", "/dashboard");

    cy.visit("/transactions");
    cy.get('[data-testid="transaction-list"]').should("be.visible");
  });

  it("affiche un état vide quand la recherche ne correspond à rien", () => {
    cy.visit("/login");
    cy.get('[data-testid="signin-username"]').type("johndoe");
    cy.get('[data-testid="signin-password"]').type("s3cret");
    cy.get('[data-testid="signin-submit"]').click();
    cy.location("pathname").should("eq", "/dashboard");

    cy.visit("/transactions");
    cy.get('[data-testid="transaction-search"]').type("zzz-introuvable-zzz");
    cy.get('[data-testid="transaction-empty-state"]').should("be.visible");
  });

  it("réduit la liste avec le filtre Envoyés", () => {
    cy.visit("/login");
    cy.get('[data-testid="signin-username"]').type("johndoe");
    cy.get('[data-testid="signin-password"]').type("s3cret");
    cy.get('[data-testid="signin-submit"]').click();
    cy.location("pathname").should("eq", "/dashboard");

    cy.visit("/transactions");
    cy.get('[data-testid="transaction-filter-type"]').select("sent");
    cy.get('[data-testid^="transaction-item-"]').should("have.length.greaterThan", 0);
  });
});

// -----------------------------------------------------------------------------
// À TOI DE JOUER (E1 + E2 + E3 de la fiche)
//
// E1 : implémente cy.login() dans cypress/support/commands.js
//      puis remplace les 3 blocs de login ci-dessus par cy.login() dans un beforeEach
//
// E2 : crée cypress/pages/TransactionsPage.js (squelette fourni)
//      remplis chaque méthode avec le bon sélecteur
//
// E3 : réécris les 3 tests avec cy.login() + TransactionsPage
//      critère : aucun data-testid dans les tests, tout passe par le Page Object
// -----------------------------------------------------------------------------
