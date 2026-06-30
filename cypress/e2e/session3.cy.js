// Séance 3 — Point de départ : la répétition (le problème à résoudre)
// Regarde ces 3 tests : le login est copié-collé partout.
// Question : si signin-submit change demain, combien d'endroits corriges-tu ?

import TransactionsPage from "../pages/TransactionsPage";

describe("APRES le refactor — Page Object + commande custom", () => {
  beforeEach(() => {
    cy.login();
    TransactionsPage.visit();
  });

  afterEach(() => {
    cy.logout();
  });

  it("affiche la liste des transactions", () => {
    TransactionsPage.items().should("have.length.greaterThan", 0);
  });

  it("affiche un état vide quand la recherche ne correspond à rien", () => {
    TransactionsPage.search("inexistant");
    TransactionsPage.emptyState().should("be.visible");
  });

  it("réduit la liste avec le filtre Envoyés", () => {
    TransactionsPage.items().its("length").as("initialCount");
    TransactionsPage.filterByType("sent");

    TransactionsPage.items()
      .its("length")
      .then((filteredCount) => {
        cy.get("@initialCount").then((initialCount) => {
          expect(filteredCount).to.be.at.most(initialCount);
        });
      });
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
