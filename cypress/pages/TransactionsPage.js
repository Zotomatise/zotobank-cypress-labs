// =============================================================================
// Page Object — TransactionsPage (/transactions)
//
// Objectif : zéro data-testid dans les specs.
// Quand ce Page Object est complet, session2.cy.js et defi-session2.cy.js
// n'auront plus aucun cy.get('[data-testid="..."]') — tout passe ici.
// =============================================================================

class TransactionsPage {

  // ============================================================
  // LES ACTIONS — elles font quelque chose sur la page
  //
  // Retournent "this" pour pouvoir enchaîner :
  //   transactionsPage.filterByType("sent").search("inexistant")
  // ============================================================

  // ACTION 1 — visiter la page (aucun paramètre)
  visit() {
    cy.visit("/transactions");
    return this;
  }

  // ACTION 2 — lancer une recherche
  // .clear() avant .type() au cas où le champ a déjà une valeur
  search(terme) {
    cy.get('[data-testid="transaction-search"]').clear().type(terme);
    return this;
  }

  filterByType(type) {
    // action : cy.get('[data-testid="transaction-filter-type"]').select(type)
    // return this
  }

  filterByStatus(status) {
    // action : cy.get('[data-testid="transaction-filter-status"]').select(status)
    // return this
  }

  reset() {
    // action : cy.get('[data-testid="transaction-reset-filters"]').click()
    // return this
  }

  clickFirst() {
    // action : cliquer la première ligne de la liste
    // cy.get('[data-testid^="transaction-item-"]').first().click()
    // return this
  }

  // ============================================================
  // LES GETTERS — donnent accès à un élément de la page
  //
  // Retournent cy.get(...) — PAS return this.
  // Pourquoi ? Parce que le test a besoin de l'élément, pas de la page.
  //   transactionsPage.items().should("have.length", 10)
  //   ↑ retourne cy.get(...)    ↑ le test asserte
  //
  // Si on retournait "this", .should() ne fonctionnerait pas —
  // TransactionsPage n'a pas de méthode .should().
  // ============================================================

  // GETTER 1 — toutes les lignes de la liste
  items() {
    return cy.get('[data-testid^="transaction-item-"]');
  }

  // GETTER 2 — le message affiché quand la liste est vide
  emptyState() {
    return cy.get('[data-testid="transaction-empty-state"]');
  }

  firstAmount() {
    // getter : return cy.get('[data-testid^="transaction-amount-"]').first()
  }

  detail() {
    // getter : return cy.get('[data-testid="transaction-detail"]')
  }

  detailAmount() {
    // getter : return cy.get('[data-testid="transaction-detail-amount"]')
  }

  detailSender() {
    // getter : return cy.get('[data-testid="transaction-detail-sender"]')
  }

  detailStatus() {
    // getter : return cy.get('[data-testid="transaction-detail-status"]')
  }
}

// ============================================================
// EXPORT — une instance, pas la classe.
// import transactionsPage from "../pages/TransactionsPage"
// transactionsPage.visit()   ← pas besoin de "new"
// ============================================================
export default new TransactionsPage();

// =============================================================================
// COPILOT — une fois les 4 exemples compris, demande-lui de compléter :
//
// "Voici un Page Object Cypress pour la page /transactions de ZotoBank.
//  Les méthodes visit(), search(), items() et emptyState() sont implémentées.
//  Complète les méthodes suivantes en suivant le même style :
//  - filterByType(type), filterByStatus(status), reset(), clickFirst() → actions, return this
//  - firstAmount(), detail(), detailAmount(), detailSender(), detailStatus() → getters, return cy.get(...)
//  Sélecteurs :
//    transaction-filter-type, transaction-filter-status, transaction-reset-filters,
//    [data-testid^='transaction-item-'], [data-testid^='transaction-amount-'],
//    transaction-detail, transaction-detail-amount, transaction-detail-sender, transaction-detail-status"
//
// Relis, comprends, vérifie au vert avant de continuer.
// =============================================================================
