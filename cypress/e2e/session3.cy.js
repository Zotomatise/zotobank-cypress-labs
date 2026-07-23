// Séance 3 — Structurer ses tests : cy.login() + Page Object
// Exercices faits ensemble pendant la séance.
// Méthode ATAP : Analyser → Traduire → Automatiser → Prouver

import TransactionsPage from "../pages/TransactionsPage";

// =============================================================================
// AVANT — le problème : login copié-collé dans chaque test
//
// Question posée en séance :
// Si data-testid="signin-submit" change demain, combien d'endroits à corriger ?
// =============================================================================

describe("AVANT — login copié-collé dans chaque test", () => {
  // Analyser : accéder à /transactions nécessite d'être connecté
  // Traduire : visiter /login, remplir le formulaire, puis visiter /transactions
  // Automatiser : voir ci-dessous
  // Prouver : la liste de transactions est visible
  it("affiche la liste des transactions", () => {
    cy.visit("/login");
    cy.get('[data-testid="signin-username"]').type("johndoe");
    cy.get('[data-testid="signin-password"]').type("s3cret");
    cy.get('[data-testid="signin-submit"]').click();
    cy.location("pathname").should("eq", "/dashboard");
    cy.visit("/transactions");
    cy.get('[data-testid^="transaction-item-"]').should("have.length.greaterThan", 0);
  });

  // Analyser : une recherche sans résultat doit afficher un état vide explicite
  // Automatiser : même login recopié,
  //  puis chercher un terme inexistant
  it("affiche un état vide quand la recherche ne correspond à rien", () => {
    cy.visit("/login");
    cy.get('[data-testid="signin-username"]').type("johndoe");
    cy.get('[data-testid="signin-password"]').type("s3cret");
    cy.get('[data-testid="signin-submit"]').click();
    cy.location("pathname").should("eq", "/dashboard");
    cy.visit("/transactions");
    cy.get('[data-testid="transaction-search"]').type("inexistant");
    cy.get('[data-testid="transaction-empty-state"]').should("be.visible");
  });

  // Analyser : le filtre Envoyés ne doit montrer que les sorties d'argent
  // Automatiser : même login recopié une troisième fois — c'est le problème
  it("réduit la liste avec le filtre Envoyés", () => {
    cy.visit("/login");
    cy.get('[data-testid="signin-username"]').type("johndoe");
    cy.get('[data-testid="signin-password"]').type("s3cret");
    cy.get('[data-testid="signin-submit"]').click();
    cy.location("pathname").should("eq", "/dashboard");
    cy.visit("/transactions");
    cy.get('[data-testid="transaction-filter-type"]').select("sent");
    cy.get('[data-testid^="transaction-item-"]').should("have.length", 5);
  });
});

// =============================================================================
// APRÈS — la solution : cy.login() dans commands.js + Page Object
//
// E1 — cy.login() extrait dans cypress/support/commands.js
// E2 — TransactionsPage créé dans cypress/pages/TransactionsPage.js
// E3 — les 3 mêmes tests réécrits : zéro data-testid dans les specs
// =============================================================================

describe("APRÈS — cy.login() + Page Object (la solution)", () => {
  beforeEach(() => {
    cy.login();
    TransactionsPage.visit();
  });

  // Analyser : accéder à /transactions nécessite d'être connecté
  // Traduire : cy.login() gère la connexion, TransactionsPage.visit() gère la navigation
  // Automatiser : voir ci-dessous
  // Prouver : la liste est visible sans aucun data-testid dans le test
  it("affiche la liste des transactions", () => {
    TransactionsPage.items().should("have.length.greaterThan", 0);
  });

  // Analyser : une recherche sans résultat doit afficher un état vide explicite
  // Traduire : .search() encapsule le cy.get + .type, .emptyState() encapsule le cy.get
  // Automatiser : voir ci-dessous
  // Prouver : le composant état vide est visible
  it("affiche un état vide quand la recherche ne correspond à rien", () => {
    TransactionsPage.search("inexistant");
    TransactionsPage.emptyState().should("be.visible");
    TransactionsPage.emptyState().should("contain", "Aucune transaction trouvée");
  });

  // Analyser : le filtre Envoyés ne doit montrer que les sorties d'argent (montants négatifs)
  // Traduire : .filterByType() encapsule le select, .firstAmount() retourne le premier montant
  // Automatiser : voir ci-dessous
  // Prouver : la liste est réduite à 5 éléments et le premier montant contient "-"
  it("réduit la liste avec le filtre Envoyés", () => {
    TransactionsPage.items().should("have.length", 10);
    TransactionsPage.filterByType("sent");
    TransactionsPage.items().should("have.length", 5);
    TransactionsPage.firstAmount().should("contain", "-");
  });
});
