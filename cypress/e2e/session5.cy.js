// ============================================================
// LIVE — Séance 5 : Rapports visuels et suite automatisée
// Objectif : Allure Report local + pipeline GitHub Actions
//
// Deux problèmes à régler ce soir :
//   1. Les résultats Cypress = 500 lignes de logs, illisibles
//   2. La suite ne tourne que sur ta machine
//
// Plan de la séance :
//   E1 — Installer et configurer Allure     → MANUEL (formateur)
//   E2 — Générer et lire le rapport         → COLLECTIF
//   E3 — Annoter les tests avec cy.allure() → LIVE BUILD
//   E4 — Créer le workflow GitHub Actions   → MANUEL (formateur)
//   E5 — Comprendre if: always()            → DÉMO
// ============================================================

import TransactionsPage from "../pages/TransactionsPage";

// ============================================================
// E1/E2 — AVANT : le problème (résultats CLI bruts)
// Lire ensemble. Question : « tu envoies ça à ton PO ? »
// ============================================================

describe("E1/E2 — AVANT : résultats CLI bruts", () => {
  beforeEach(function () {
    cy.fixture("users").as("user");
  });

  it("connexion réussie", function () {
    // Pas d'annotation → sortie terminal uniquement
    
    cy.login(this.user.username, this.user.password);
    cy.visit("/dashboard");
    cy.location("pathname").should("eq", "/dashboard");
  });

  it("recherche sans résultat", function () {
    cy.login(this.user.username, this.user.password);
    TransactionsPage.visit();
    TransactionsPage.search("inexistant");
    TransactionsPage.emptyState().should("be.visible");
  });
});

// ============================================================
// E1 — INSTALLATION (faire en live, fichier ouvert ici)
//
// TERMINAL :
//   npm install --save-dev @shelex/cypress-allure-plugin
//
// cypress.config.js — ajouter en haut :
//   const allureWriter = require('@shelex/cypress-allure-plugin/writer');
//
// cypress.config.js — dans setupNodeEvents :
//   allureWriter(on, config);
//   return config;
//
// cypress/support/e2e.js — ajouter en première ligne :
//   import '@shelex/cypress-allure-plugin';
// ============================================================

// ============================================================
// E2 — GÉNÉRER LE PREMIER RAPPORT (collectif)
//
//   npx cypress run --env allure=true
//   npx allure generate allure-results --clean -o allure-report
//   npx allure open allure-report
//
// Explorer ensemble : vue donut, cliquer un test, voir les étapes.
// ============================================================

// ============================================================
// E3 — APRÈS : annoter les tests (LIVE BUILD)
// Même structure qu'avant. Ajouter cy.allure() sur chaque test.
// ============================================================

describe("E3 — APRÈS : suite annotée Allure", () => {
  beforeEach(function () {
    cy.fixture("users").as("user");
  });

  // LIVE BUILD — implémenter cy.allure() ici en direct
  // cy.allure()
  //   .tag("smoke", "authentification")
  //   .severity("critical")
  //   .story("Connexion utilisateur")
  //   .description("Vérifie que le login avec fixture redirige vers /dashboard");
  it("connexion via la fixture — pas de donnée codée en dur", function () {
    cy.login(this.user.username, this.user.password);
    cy.visit("/dashboard");
    cy.location("pathname").should("eq", "/dashboard");
  });

  // cy.allure()
  //   .tag("smoke", "transactions")
  //   .severity("normal")
  //   .story("Recherche transactions");
  it("recherche sans résultat affiche l'état vide", function () {
    cy.login(this.user.username, this.user.password);
    TransactionsPage.visit();
    TransactionsPage.search("inexistant");
    TransactionsPage.emptyState().should("be.visible");
    TransactionsPage.emptyState().should(
      "contain",
      "Aucune transaction trouvée",
    );
  });

  // cy.allure()
  //   .tag("transactions", "filtres")
  //   .severity("normal")
  //   .story("Filtres transactions");
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

  // cy.allure()
  //   .tag("transactions", "navigation")
  //   .severity("minor")
  //   .story("Détail transaction");
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
// E4/E5 — Créer .github/workflows/cypress.yml
//
// Voir le fichier .github/workflows/cypress.yml à la racine.
// Push → onglet Actions GitHub → observer le run → télécharger l'artefact.
//
// E5 — Tester if: always() :
//   1. Retirer if: always() du step Allure
//   2. Casser un test, pusher
//   3. Observer : rapport non généré
//   4. Remettre if: always(), repusher
// ============================================================

// ============================================================
// E4 SUITE — Exécution planifiée (schedule)
//
// Ajouter dans le bloc "on:" du workflow :
//
//   schedule:
//     - cron: '0 6 * * 1-5'  # Lundi-vendredi à 6h UTC (8h Paris)
//
// Syntaxe cron : minute heure jour_mois mois jour_semaine
//   0 6 * * 1-5  →  lundi au vendredi à 6h UTC
//   0 22 * * 0   →  dimanche à 22h UTC
//   0 */6 * * *  →  toutes les 6 heures
//
// Points clés :
//   - Le schedule tourne toujours sur la branche par défaut (main)
//   - UTC uniquement — Paris = UTC+1 hiver, UTC+2 été
//   - Le rapport Allure est généré comme sur un run normal
//   - Visible dans l'onglet Actions → onglet "Scheduled"
// ============================================================

// ============================================================
// BONUS — Cypress Cloud (si le temps le permet)
//
// Activer l'enregistrement dans le workflow :
//
//   - name: Run Cypress + Allure + Cloud
//     uses: cypress-io/github-action@v6
//     with:
//       config: baseUrl=https://zotobank.zotomatise.com
//       record: true
//     env:
//       CYPRESS_RECORD_KEY: ${{ secrets.CYPRESS_RECORD_KEY }}
//       GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
//       CYPRESS_allure: true
//       CYPRESS_allureResultsPath: allure-results
//
// Comparaison :
//   Rapport natif → local, zéro config, pour toi seul
//   Allure        → rapport partageable, annotations, gratuit
//   Cypress Cloud → historique, replay vidéo, flaky detection, intégration PR
//
// Voir bonus/BONUS_CYPRESS_DASHBOARD.md pour la table complète.
// ============================================================
