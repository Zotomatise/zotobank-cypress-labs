// =============================================================================
// Page Object — TransactionsPage
// Regroupe TOUTE la connaissance de la page /transactions à un seul endroit.
// Règle d'or : aucun data-testid ne doit apparaître dans les specs.
//              Tout passe par les méthodes de cette classe.
// =============================================================================

class TransactionsPage {

  // --------------------------------------------------------------------------
  // EXEMPLE 1 — action simple : visiter la page
  // On retourne "this" pour pouvoir chaîner les appels :
  //   transactionsPage.visit().search("Loyer")
  // --------------------------------------------------------------------------
  visit() {
    cy.visit("/transactions");
    return this;
  }

  // --------------------------------------------------------------------------
  // EXEMPLE 2 — action avec paramètre : lancer une recherche
  // Le sélecteur est ici, une seule fois. Si demain il change,
  // on corrige à UN seul endroit au lieu de toucher tous les tests.
  // --------------------------------------------------------------------------
  search(terme) {
    cy.get('[data-testid="transaction-search"]').clear().type(terme);
    return this;
  }

  // --------------------------------------------------------------------------
  // EXEMPLE 3 — getter : renvoyer un élément SANS asserter
  // C'est le TEST qui décide quoi vérifier, pas le Page Object.
  //
  // Mauvais  :  items() { cy.get(...).should("have.length", 10) }
  // Correct  :  items() { return cy.get('[data-testid^="transaction-item-"]') }
  //
  // Dans le test :
  //   transactionsPage.items().should("have.length", 10)   <-- le test asserte
  // --------------------------------------------------------------------------
  items() {
    return cy.get('[data-testid^="transaction-item-"]');
  }

  // --------------------------------------------------------------------------
  // À TOI DE COMPLÉTER (même logique que les 3 exemples ci-dessus)
  // Sélecteurs disponibles :
  //   Filtre type    : transaction-filter-type   (all / sent / received)
  //   Filtre statut  : transaction-filter-status (all / complete / pending / rejected)
  //   Réinitialiser  : transaction-reset-filters
  //   État vide      : transaction-empty-state
  //   Montant ligne  : transaction-amount-tx-... (pattern : [data-testid^="transaction-amount-"])
  // --------------------------------------------------------------------------

  filterByType(type) {
    // à compléter
  }

  filterByStatus(status) {
    // à compléter
  }

  reset() {
    // à compléter
  }

  emptyState() {
    // à compléter — getter, return cy.get(...)
  }

  firstAmount() {
    // à compléter — getter, premier élément transaction-amount-*
  }
}

// --------------------------------------------------------------------------
// EXPORT — on exporte UNE instance, pas la classe.
// Dans les tests :  import transactionsPage from "../pages/TransactionsPage"
//                   transactionsPage.visit()   <- pas besoin de "new"
// --------------------------------------------------------------------------
export default new TransactionsPage();

// =============================================================================
// COPILOT — une fois les 3 exemples compris, demande à Copilot de compléter :
//
// "Voici un Page Object Cypress pour la page /transactions de ZotoBank.
//  Les méthodes visit(), search() et items() sont déjà implémentées.
//  Complète les méthodes filterByType(), filterByStatus(), reset(),
//  emptyState() et firstAmount() en suivant exactement le même style :
//  - les actions retournent this
//  - les getters retournent cy.get(...) sans asserter
//  Sélecteurs : transaction-filter-type, transaction-filter-status,
//  transaction-reset-filters, transaction-empty-state,
//  [data-testid^='transaction-amount-']"
//
// Ensuite : relis, comprends, et vérifie au vert avant de continuer.
// =============================================================================
