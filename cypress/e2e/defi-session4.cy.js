// =============================================================================
// Défi séance 4 — E5 : Gérer plusieurs utilisateurs dans une fixture
//
// Deux stratégies, un même objectif : zéro credential dans le code.
//
// STRATÉGIE A — Objet nommé par rôle (recommandée)
//   Fichier : cypress/fixtures/users-multi.json
//   Accès  : this.users.principal  /  this.users.beneficiaire
//   Quand  : rôles connus à l'avance, accès direct par nom
//
// STRATÉGIE B — Tableau + find() (pour boucler sur N comptes)
//   Fichier : cypress/fixtures/users-array.json
//   Accès  : users.find(u => u.role === "principal")
//   Quand  : même scénario à rejouer avec plusieurs comptes
// =============================================================================

import BeneficiariesPage from "../pages/BeneficiariesPage";
import TransactionsPage from "../pages/TransactionsPage";

// =============================================================================
// STRATÉGIE A — Objet nommé par rôle
// cy.fixture("users-multi").as("users") → this.users.principal / this.users.beneficiaire
// Règle : function() obligatoire pour que this soit défini
// =============================================================================

describe("E5 — Stratégie A : objet nommé par rôle (users-multi.json)", () => {
  beforeEach(function () {
    cy.fixture("users-multi").as("users");
  });

  it("johndoe voit janesmith dans sa liste de bénéficiaires", function () {
    cy.login(this.users.principal.username, this.users.principal.password);
    BeneficiariesPage.visit();
    BeneficiariesPage.list().should("exist");
    BeneficiariesPage.items().should("contain", this.users.beneficiaire.username);
  });

  it("ajouter janesmith une 2e fois affiche une erreur de doublon", function () {
    cy.login(this.users.principal.username, this.users.principal.password);
    BeneficiariesPage.visit();
    BeneficiariesPage.openForm();
    BeneficiariesPage.fillUsername(this.users.beneficiaire.username);
    BeneficiariesPage.fillLabel("Test doublon");
    BeneficiariesPage.submit();
    BeneficiariesPage.error().should("be.visible");
    BeneficiariesPage.error().should("contain", "déjà enregistré");
  });

  it("johndoe accède à son dashboard, janesmith aussi", function () {
    // Test avec le compte principal
    cy.login(this.users.principal.username, this.users.principal.password);
    cy.visit("/dashboard");
    cy.location("pathname").should("eq", "/dashboard");

    // Test avec le compte bénéficiaire
    cy.login(this.users.beneficiaire.username, this.users.beneficiaire.password);
    cy.visit("/dashboard");
    cy.location("pathname").should("eq", "/dashboard");
  });
});

// =============================================================================
// STRATÉGIE B — Tableau + find()
// cy.fixture("users-array").then((users) => { ... })
// Arrow function possible ici : pas de cy.as(), pas de piège this
// =============================================================================

describe("E5 — Stratégie B : tableau + find() (users-array.json)", () => {
  it("connexion avec le compte principal via find()", () => {
    cy.fixture("users-array").then((users) => {
      const principal = users.find((u) => u.role === "principal");
      cy.login(principal.username, principal.password);
      cy.visit("/dashboard");
      cy.location("pathname").should("eq", "/dashboard");
    });
  });

  it("connexion avec le compte bénéficiaire via find()", () => {
    cy.fixture("users-array").then((users) => {
      const beneficiaire = users.find((u) => u.role === "beneficiaire");
      cy.login(beneficiaire.username, beneficiaire.password);
      cy.visit("/dashboard");
      cy.location("pathname").should("eq", "/dashboard");
    });
  });

  it("chaque compte du tableau peut se connecter au dashboard", () => {
    // forEach : le même scénario joué pour tous les comptes
    cy.fixture("users-array").then((users) => {
      users.forEach((user) => {
        cy.login(user.username, user.password);
        cy.visit("/dashboard");
        cy.location("pathname").should("eq", "/dashboard");
      });
    });
  });
});

// =============================================================================
// COMPARAISON — Accès au tableau via this (piège supplémentaire)
// Quand on utilise cy.as() avec un tableau, this.users est un tableau.
// Accès par index ou par find().
// =============================================================================

describe("E5 — Piège : cy.as() avec un tableau", () => {
  beforeEach(function () {
    cy.fixture("users-array").as("users"); // this.users sera un tableau
  });

  it("accès par index — this.users[0] est le premier élément", function () {
    // this.users[0] = johndoe (premier élément du tableau)
    cy.login(this.users[0].username, this.users[0].password);
    cy.visit("/dashboard");
    cy.location("pathname").should("eq", "/dashboard");
  });

  it("accès par find() — plus lisible qu'un index", function () {
    const principal = this.users.find((u) => u.role === "principal");
    cy.login(principal.username, principal.password);
    cy.visit("/dashboard");
    cy.location("pathname").should("eq", "/dashboard");
  });
});
