// ============================================================
// LIVE — Séance 4 : Données propres et session rapide
// Objectif : zéro credential dans les specs + login mis en cache
//
// Deux problèmes à régler ce soir :
//   1. Les données ("johndoe", "s3cret") sont codées dans le code
//   2. Le login est rejoué à chaque test → suite lente
//
// Plan de la séance :
//   1. Créer la fixture          → MANUEL (formateur)
//   2. Implémenter le test 1     → MANUEL (formateur, pose le pattern)
//   3. Implémenter les tests 2-4 → IA (à partir du prompt live/prompt-ia-session4.md)
//   4. Relire la sortie IA       → COLLECTIF (est-ce correct ?)
//   5. Upgrader cy.login()       → MANUEL (cy.session dans commands.js)
// ============================================================

import TransactionsPage from "../pages/TransactionsPage";

// ============================================================
// AVANT — le problème : données et login codés en dur
// Lire ensemble. Identifier les deux problèmes avant de toucher au code.
// ============================================================

describe("AVANT — données codées en dur", () => {
  beforeEach(() => {
    cy.login("johndoe", "s3cret"); // ← problème 1 : credential dans le code
    TransactionsPage.visit();      // ← problème 2 : login rejoué à chaque test
  });

  it("recherche sans résultat affiche l'état vide", () => {
    TransactionsPage.search("inexistant");
    TransactionsPage.emptyState().should("be.visible");
  });

  it("le filtre Envoyés réduit la liste à 5 éléments", () => {
    TransactionsPage.filterByType("sent");
    TransactionsPage.items().should("have.length", 5);
  });
});

// ============================================================
// ÉTAPE 1 — Créer le fichier de données (MANUEL)
// ============================================================
//
// Créer  cypress/fixtures/users.json  avec ce contenu :
//
//   {
//     "username": "johndoe",
//     "password": "s3cret",
//     "displayName": "John Doe"
//   }
//
// ============================================================

// ============================================================
// ÉTAPE 2 — Premier test implémenté à la main (le pattern)
// Ce test sert de référence pour le prompt IA qui suit.
// ============================================================

describe("APRÈS — fixture externalisée + cy.session()", () => {
  beforeEach(function () {
    cy.fixture("users").as("user"); // charge users.json, accessible via this.user
  });

  // ✅ IMPLÉMENTÉ EN LIVE PAR LE FORMATEUR — sert de pattern pour l'IA
  // Règles à retenir :
  //   - function() pas () =>  (sinon this.user est undefined)
  //   - cy.visit() après cy.login()  (cy.session laisse le navigateur sur page vide)
  it("connexion via la fixture — pas de donnée codée en dur", function () {
    cy.login(this.user.username, this.user.password);
    cy.visit("/dashboard");
    cy.location("pathname").should("eq", "/dashboard");
  });

  // ============================================================
  // ÉTAPE 3 — Tests 2, 3, 4 générés par l'IA
  // Ouvrir live/prompt-ia-session4.md, copier le prompt, soumettre.
  // Coller la réponse ici, puis relire ensemble (étape 4).
  // ============================================================

  it("recherche sans résultat affiche l'état vide", function () {
    cy.login(this.user.username, this.user.password);
    TransactionsPage.visit();
    TransactionsPage.search("inexistant");
    TransactionsPage.emptyState().should("be.visible");
    TransactionsPage.emptyState().should("contain", "Aucune transaction trouvée");
  });

  it("le filtre Envoyés réduit la liste et Réinitialiser la restaure", function () {
    cy.login(this.user.username, this.user.password);
    TransactionsPage.visit();
    TransactionsPage.items().should("have.length", 10);
    TransactionsPage.filterByType("sent");
    TransactionsPage.items().should("have.length", 5);
    TransactionsPage.firstAmount().should("contain", "-");
    TransactionsPage.reset();
    TransactionsPage.items().should("have.length", 10);
  });

  it("cliquer une transaction ouvre la page de détail", function () {
    cy.login(this.user.username, this.user.password);
    TransactionsPage.visit();
    TransactionsPage.clickFirst();
    TransactionsPage.detail().should("exist");
    TransactionsPage.detailAmount().should("be.visible");
    TransactionsPage.detailSender().should("be.visible");
    TransactionsPage.detailStatus().should("be.visible");
  });
});

// ============================================================
// BONUS — cy.fixture().then() : arrow function sans piège this
// À montrer si le temps le permet ou en défi pour les rapides.
// ============================================================

describe("Bonus — cy.fixture().then() sans piège this", () => {
  it("connexion avec arrow function — pas de problème this", () => {
    cy.fixture("users").then((user) => {
      cy.login(user.username, user.password);
      cy.visit("/dashboard");
      cy.location("pathname").should("eq", "/dashboard");
    });
  });
});
