// =============================================================================
// Page Object — TransactionsPage (/transactions)
//
// Objectif : zéro data-testid dans les specs.
// Quand ce fichier est complet, session2.cy.js et defi-session2.cy.js
// n'auront plus aucun cy.get('[data-testid="..."]') — tout passe ici.
// =============================================================================

class TransactionsPage {

  // ============================================================
  // LES SÉLECTEURS — déclarés UNE SEULE FOIS en haut de la classe
  //
  // Avantage : si un data-testid change demain, tu corriges ici
  // et toutes les méthodes qui l'utilisent sont automatiquement
  // à jour. Tu ne cherches pas dans tout le fichier.
  // ============================================================

  searchInput    = '[data-testid="transaction-search"]';
  emptyMessage   = '[data-testid="transaction-empty-state"]';

  // À TOI D'AJOUTER les sélecteurs manquants :
  //   transaction-filter-type
  //   transaction-filter-status
  //   transaction-reset-filters
  //   [data-testid^="transaction-item-"]
  //   [data-testid^="transaction-amount-"]
  //   transaction-detail
  //   transaction-detail-amount
  //   transaction-detail-sender
  //   transaction-detail-status

  // ============================================================
  // LES ACTIONS — elles font quelque chose sur la page
  //
  // Utilisent this.nomDuSelecteur au lieu d'écrire le data-testid
  // directement dans cy.get(). Retournent "this" pour enchaîner :
  //   transactionsPage.filterByType("sent").search("inexistant")
  // ============================================================

  // ACTION 1 — visiter la page (pas de sélecteur nécessaire ici)
  visit() {
    cy.visit("/transactions");
    return this;
  }

  // ACTION 2 — lancer une recherche
  // On utilise this.searchInput : si le data-testid change, on
  // corrige uniquement la propriété en haut, pas ici.
  search(terme) {
    cy.get(this.searchInput).clear().type(terme);
    return this;
  }

  filterByType(type) {
    // cy.get(this.filterType).select(type)
    // return this
  }

  filterByStatus(status) {
    // cy.get(this.filterStatus).select(status)
    // return this
  }

  reset() {
    // cy.get(this.resetButton).click()
    // return this
  }

  clickFirst() {
    // cy.get(this.listItems).first().click()
    // return this
  }

  // ============================================================
  // LES GETTERS — donnent accès à un élément de la page
  //
  // Retournent cy.get(this.nomDuSelecteur) — PAS return this.
  // Le test récupère l'élément et décide quoi vérifier :
  //   transactionsPage.emptyState().should("be.visible")
  //   transactionsPage.items().should("have.length", 10)
  // ============================================================

  // GETTER 1 — toutes les lignes de la liste
  items() {
    return cy.get(this.listItems);
  }

  // GETTER 2 — le composant affiché quand la liste est vide
  emptyState() {
    return cy.get(this.emptyMessage);
  }

  firstAmount() {
    // return cy.get(this.amounts).first()
  }

  detail() {
    // return cy.get(this.detailContainer)
  }

  detailAmount() {
    // return cy.get(this.detailAmountEl)
  }

  detailSender() {
    // return cy.get(this.detailSenderEl)
  }

  detailStatus() {
    // return cy.get(this.detailStatusEl)
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
//  visit(), search(), items() et emptyState() sont implémentés avec le
//  pattern : sélecteurs comme propriétés de classe, utilisés via this.
//  Complète les propriétés manquantes ET les méthodes vides en suivant
//  exactement le même style.
//  Méthodes actions (return this) : filterByType, filterByStatus, reset, clickFirst
//  Méthodes getters (return cy.get) : firstAmount, detail, detailAmount, detailSender, detailStatus
//  Sélecteurs :
//    transaction-filter-type, transaction-filter-status, transaction-reset-filters,
//    [data-testid^='transaction-item-'], [data-testid^='transaction-amount-'],
//    transaction-detail, transaction-detail-amount,
//    transaction-detail-sender, transaction-detail-status"
//
// Relis, comprends, vérifie au vert avant de continuer.
// =============================================================================
