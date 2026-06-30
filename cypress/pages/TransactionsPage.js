// =============================================================================
// Page Object — TransactionsPage
// Regroupe TOUTE la connaissance de la page /transactions à un seul endroit.
// Règle d'or : aucun data-testid ne doit apparaître dans les specs.
//              Tout passe par les méthodes de cette classe.
// =============================================================================

class TransactionsPage {

  // --------------------------------------------------------------------------
  // ACTIONS — chaque méthode fait UNE chose précise sur la page
  // On retourne "this" à la fin pour pouvoir chaîner :
  //   transactionsPage.visit().search("Loyer").filterByType("sent")
  // --------------------------------------------------------------------------

  visit() {
    // à compléter : cy.visit("/transactions")
    // return this
  }

  search(terme) {
    // à compléter : récupère transaction-search et tape le terme
    // return this
  }

  filterByType(type) {
    // à compléter : sélectionne transaction-filter-type
    // valeurs possibles : all / sent / received
    // return this
  }

  filterByStatus(status) {
    // à compléter : sélectionne transaction-filter-status
    // valeurs possibles : all / complete / pending / rejected
    // return this
  }

  reset() {
    // à compléter : clique sur transaction-reset-filters
    // return this
  }

  // --------------------------------------------------------------------------
  // GETTERS — renvoient l'élément sans asserter
  // C'est le TEST qui décide quoi vérifier, pas le Page Object.
  //
  // Mauvais  :  emptyState() { cy.get(...).should("be.visible") }
  // Correct  :  emptyState() { return cy.get('[data-testid="transaction-empty-state"]') }
  //
  // Dans le test : transactionsPage.emptyState().should("be.visible")
  //               (c'est le test qui asserte, le getter renvoie juste l'élément)
  // --------------------------------------------------------------------------

  items() {
    // à compléter : retourner cy.get('[data-testid^="transaction-item-"]')
  }

  emptyState() {
    // à compléter : retourner cy.get('[data-testid="transaction-empty-state"]')
  }

  list() {
    // à compléter : retourner cy.get('[data-testid="transaction-list"]')
  }

  firstAmount() {
    // à compléter : retourner le premier élément transaction-amount-*
  }
}

// --------------------------------------------------------------------------
// EXPORT — on exporte UNE instance, pas la classe elle-même.
// Comme ça dans les tests on écrit :
//   import transactionsPage from "../pages/TransactionsPage"
//   transactionsPage.visit()   <-- pas besoin de "new"
// --------------------------------------------------------------------------
export default new TransactionsPage();
