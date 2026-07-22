// ============================================================
// LIVE — Séance 6 : GitHub Actions + Cypress Cloud + Tests E2E métier
//
// Ce soir on branche la CI et on écrit de vrais scénarios utilisateurs.
//
// Plan de la séance :
//   E1 — Reprendre les tests annotés de S5           → COLLECTIF
//   E2 — Créer .github/workflows/cypress.yml         → LIVE BUILD
//   E3 — Déclencher avec une Pull Request             → DÉMO
//   E4 — Ajouter le schedule (cron)                   → LIVE BUILD
//   E5 — Connecter Cypress Cloud                      → LIVE BUILD
//   E6 — Tests E2E métier ZotoBank                    → LIVE BUILD
// ============================================================

import TransactionsPage from "../pages/TransactionsPage";
import DashboardPage from "../pages/DashboardPage";
import NewTransactionPage from "../pages/NewTransactionPage";

// ============================================================
// E1 — REPRISE S5 : tests annotés avec cy.allure()
// Ces tests tournent tels quels. On les pousse dans la CI en E2.
// ============================================================

describe("E1 — Reprise S5 : suite annotée Allure", () => {
  beforeEach(function () {
    cy.fixture("users").as("user");
  });

  it("connexion via la fixture — pas de donnée codée en dur", function () {
    cy.allure()
      .tag("smoke", "authentification")
      .severity("critical")
      .story("Connexion utilisateur")
      .description(
        "Vérifie que le login avec fixture redirige vers /dashboard",
      );

    cy.login(this.user.username, this.user.password);
    cy.visit("/dashboard");
    cy.location("pathname").should("eq", "/dashboard");
  });

  it("recherche sans résultat affiche l'état vide", function () {
    cy.allure()
      .tag("smoke", "transactions")
      .severity("normal")
      .story("Recherche transactions")
      .description("Une recherche sans résultat affiche le message vide");

    cy.login(this.user.username, this.user.password);
    TransactionsPage.visit();
    TransactionsPage.search("inexistant");
    TransactionsPage.emptyState().should("be.visible");
  });

  it("le filtre Envoyés réduit la liste et Réinitialiser la restaure", function () {
    cy.allure()
      .tag("transactions", "filtres")
      .severity("normal")
      .story("Filtres transactions");

    cy.login(this.user.username, this.user.password);
    TransactionsPage.visit();
    TransactionsPage.items().should("have.length", 10);
    TransactionsPage.filterByType("sent");
    TransactionsPage.items().should("have.length", 5);
    TransactionsPage.reset();
    TransactionsPage.items().should("have.length", 10);
  });

  it("cliquer une transaction ouvre la page de détail", function () {
    cy.allure()
      .tag("transactions", "navigation")
      .severity("minor")
      .story("Détail transaction");

    cy.login(this.user.username, this.user.password);
    TransactionsPage.visit();
    TransactionsPage.clickFirst();
    TransactionsPage.detail().should("exist");
    TransactionsPage.detailAmount().should("be.visible");
  });
});

// ============================================================
// E2 — CRÉER LE WORKFLOW GITHUB ACTIONS (LIVE BUILD)
//
// 1. Créer le fichier :
//      mkdir -p .github/workflows
//      touch .github/workflows/cypress.yml
//
// 2. Coller le workflow :
//
//    name: Cypress Tests
//
//    on:
//      push:
//        branches: [main, develop]
//      pull_request:
//        branches: [main]
//
//    jobs:
//      cypress-run:
//        runs-on: ubuntu-latest
//        steps:
//          - uses: actions/checkout@v4
//          - uses: actions/setup-node@v4
//            with:
//              node-version: 20
//          - name: Run Cypress + résultats Allure
//            uses: cypress-io/github-action@v6
//            with:
//              config: baseUrl=https://zotobank.zotomatise.com
//            env:
//              CYPRESS_allure: true
//              CYPRESS_allureResultsPath: allure-results
//          - name: Générer le rapport Allure
//            if: always()
//            run: npx allure generate allure-results --clean -o allure-report
//          - name: Publier en artefact
//            if: always()
//            uses: actions/upload-artifact@v4
//            with:
//              name: allure-report
//              path: allure-report
//              retention-days: 7
//
// 3. Pusher et observer le run dans l'onglet Actions GitHub.
//
// POINT CLÉ : les steps Allure prennent if: always()
//   → Sans ça, le rapport n'est pas généré quand un test échoue.
// ============================================================

// ============================================================
// E3 — TRIGGER PULL REQUEST (DÉMO)
//
//   git checkout -b feature/e2e-metier
//   git add .
//   git commit -m "test: ajout tests E2E métier S6"
//   git push -u origin feature/e2e-metier
//   gh pr create --title "Test: E2E métier" --body "Démo PR trigger"
//
// Observer : un run apparaît sur la PR (section "Checks").
// Fermer la PR après vérification : gh pr close <numéro>
// ============================================================

// ============================================================
// E4 — SCHEDULE CRON (LIVE BUILD)
//
// Ajouter dans le bloc "on:" du workflow :
//
//   schedule:
//     - cron: '0 6 * * 1-5'  # lundi-vendredi à 6h UTC (8h Paris)
//
// Syntaxe cron : minute heure jour-du-mois mois jour-semaine
//   0 6 * * 1-5  →  lundi au vendredi à 6h UTC
//   0 */6 * * *  →  toutes les 6 heures
//
// Le schedule s'exécute toujours sur la branche par défaut (main).
// ============================================================

// ============================================================
// E5 — CYPRESS CLOUD (LIVE BUILD)
//
// 1. Aller sur cloud.cypress.io → créer un projet
// 2. Récupérer projectId + recordKey
//
// cypress.config.js — ajouter projectId :
//   module.exports = defineConfig({
//     projectId: "abc123",
//     e2e: { ... }
//   });
//
// GitHub → Settings → Secrets → New secret :
//   Nom   : CYPRESS_RECORD_KEY
//   Valeur: ta clé Cypress Cloud
//
// Workflow — modifier le step Cypress :
//   - name: Run Cypress + résultats Allure
//     uses: cypress-io/github-action@v6
//     with:
//       config: baseUrl=https://zotobank.zotomatise.com
//       record: true
//     env:
//       CYPRESS_RECORD_KEY: ${{ secrets.CYPRESS_RECORD_KEY }}
//       CYPRESS_allure: true
//       CYPRESS_allureResultsPath: allure-results
//
// Pusher → observer le dashboard Cypress Cloud.
// ============================================================

// ============================================================
// E6 — TESTS E2E MÉTIER (LIVE BUILD)
// Scénarios complets : login → action → assertion.
// Chaque test représente un vrai parcours utilisateur.
// ============================================================

describe("E6 — Scénario A : consultation du solde", () => {
  beforeEach(function () {
    cy.fixture("users").as("user");
  });

  it("l'utilisateur voit son solde affiché sur le dashboard", function () {
    cy.allure()
      .tag("e2e", "dashboard")
      .severity("critical")
      .story("Consultation solde")
      .description(
        "Après connexion, le solde est visible et contient une valeur numérique",
      );

    cy.login(this.user.username, this.user.password);
    DashboardPage.visit();

    DashboardPage.balance().should("be.visible");
    DashboardPage.balance()
      .invoke("text")
      .should("match", /[\d\s,.]+/);
  });
});

describe("E6 — Scénario B : effectuer un virement", () => {
  beforeEach(function () {
    cy.fixture("users").as("user");
  });

  it("l'utilisateur peut envoyer de l'argent à un autre compte", function () {
    cy.allure()
      .tag("e2e", "virement")
      .severity("critical")
      .story("Nouveau virement")
      .description(
        "Login → /transactions/new → sélection destinataire → montant → confirmation",
      );

    cy.login(this.user.username, this.user.password);
    NewTransactionPage.visit();
    NewTransactionPage.selectPayment();
    NewTransactionPage.searchUser(this.user.recipient);
    NewTransactionPage.selectFirstResult();
    NewTransactionPage.fillAmount(this.user.transferAmount);
    NewTransactionPage.submit();

    NewTransactionPage.confirmModal().should("be.visible");
    NewTransactionPage.confirmAmount().should("contain", this.user.transferAmount);
    NewTransactionPage.confirm();

    NewTransactionPage.successMessage().should("be.visible");
  });
});

// ============================================================
// BONUS — Scénario C : inscription d'un nouveau compte
// À faire si le temps le permet.
// Utilise un username unique pour éviter les conflits entre runs.
// ============================================================

// ============================================================
// BONUS — Scénario C : inscription nouvel utilisateur
// À faire si le temps le permet.
// Créer SignupPage dans cypress/pages/ avant d'écrire ce test.
// Données générées dynamiquement — jamais codées en dur.
// ============================================================
