// =============================================================================
// Page Object — TransactionsPage (/transactions)
//
// Objectif : zéro data-testid dans les specs.
// Quand ce fichier est complet, session2.cy.js et defi-session2.cy.js
// n'auront plus aucun cy.get('[data-testid="..."]') — tout passe ici.
// =============================================================================

class TransactionsPage {

  // ============================================================
  // LES ACTIONS — elles font quelque chose sur la page
  //
  // Retournent "this" pour pouvoir enchaîner :
  //   transactionsPage.filterByType("sent").search("inexistant")
  // ============================================================

  // ACTION 1 — visiter la page
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
    // cy.get('[data-testid="transaction-filter-type"]').select(type)
    // return this
  }

  filterByStatus(status) {
    // cy.get('[data-testid="transaction-filter-status"]').select(status)
    // return this
  }

  reset() {
    // cy.get('[data-testid="transaction-reset-filters"]').click()
    // return this
  }

  clickFirst() {
    // cy.get('[data-testid^="transaction-item-"]').first().click()
    // return this
  }

  // ============================================================
  // LES GETTERS — donnent accès à un élément de la page
  //
  // Retournent cy.get(...) — PAS return this.
  // Pourquoi ? Le test a besoin de l'élément, pas de la page.
  //   transactionsPage.items().should("have.length", 10)
  //                   ↑ retourne l'élément  ↑ le test asserte
  //
  // Si on retournait "this", .should() ne fonctionnerait pas.
  // ============================================================

  // GETTER 1 — toutes les lignes de la liste
  items() {
    return cy.get('[data-testid^="transaction-item-"]');
  }

  // GETTER 2 — le composant affiché quand la liste est vide
  emptyState() {
    return cy.get('[data-testid="transaction-empty-state"]');
  }

  firstAmount() {
    // return cy.get('[data-testid^="transaction-amount-"]').first()
  }

  detail() {
    // return cy.get('[data-testid="transaction-detail"]')
  }

  detailAmount() {
    // return cy.get('[data-testid="transaction-detail-amount"]')
  }

  detailSender() {
    // return cy.get('[data-testid="transaction-detail-sender"]')
  }

  detailStatus() {
    // return cy.get('[data-testid="transaction-detail-status"]')
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
// "Voici un Page Object Cypress pour /transactions de ZotoBank.
//  visit(), search(), items() et emptyState() sont implémentés.
//  Complète les méthodes vides en suivant le même style :
//  - actions : cy.get('[data-testid="..."]').action() puis return this
//  - getters : return cy.get('[data-testid="..."]') sans asserter
//  Sélecteurs :
//    transaction-filter-type, transaction-filter-status, transaction-reset-filters,
//    [data-testid^='transaction-item-'], [data-testid^='transaction-amount-'],
//    transaction-detail, transaction-detail-amount,
//    transaction-detail-sender, transaction-detail-status"
//
// Relis, comprends, vérifie au vert avant de continuer.
// =============================================================================
