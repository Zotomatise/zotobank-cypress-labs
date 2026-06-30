// =============================================================================
// Page Object — TransactionsPage
// Regroupe TOUTE la connaissance de la page /transactions à un seul endroit.
// Règle d'or : aucun data-testid ne doit apparaître dans les specs.
//              Tout passe par les méthodes de cette classe.
// =============================================================================

class TransactionsPage {

  // ============================================================
  // LES ACTIONS — elles font quelque chose sur la page
  // ============================================================
  //
  // Une action retourne "this" (l'objet lui-même) pour pouvoir
  // enchaîner les appels sans répéter le nom de la variable :
  //
  //   transactionsPage.visit().search("Loyer")
  //
  // Au lieu de :
  //   transactionsPage.visit()
  //   transactionsPage.search("Loyer")
  //
  // Si tu n'enchaînes jamais, pas de problème — return this
  // ne gêne pas, il est juste ignoré.
  // ============================================================

  // ACTION 1 — visiter la page (aucun paramètre)
  visit() {
    cy.visit("/transactions");
    return this;
  }

  // ACTION 2 — lancer une recherche (avec un paramètre)
  // Le sélecteur "transaction-search" est écrit UNE SEULE FOIS ici.
  // Demain s'il change, on corrige à un seul endroit.
  search(terme) {
    cy.get('[data-testid="transaction-search"]').clear().type(terme);
    return this;
  }

  // ============================================================
  // LES GETTERS — ils donnent accès à un élément de la page
  // ============================================================
  //
  // Un getter retourne cy.get(...) — l'élément lui-même.
  // Il n'asserte RIEN. C'est le test qui décide quoi vérifier.
  //
  // Pourquoi on ne fait PAS return this dans un getter ?
  // Parce que le getter doit retourner l'élément pour que le
  // test puisse l'utiliser. Si on retournait "this", le test
  // récupèrerait la page, pas l'élément, et .should() ne
  // fonctionnerait pas.
  //
  //   Mauvais  :  items() { cy.get(...).should("have.length", 10) }
  //   → le Page Object décide de l'assertion. Rigide, difficile à réutiliser.
  //
  //   Correct  :  items() { return cy.get('[data-testid^="transaction-item-"]') }
  //   → le test décide : .should("have.length", 10) ou .should("have.length", 5)
  //                      selon ce qu'on teste.
  // ============================================================

  // GETTER 1 — les lignes de la liste (retourne plusieurs éléments)
  items() {
    return cy.get('[data-testid^="transaction-item-"]');
  }

  // GETTER 2 — le message d'état vide
  emptyState() {
    return cy.get('[data-testid="transaction-empty-state"]');
  }

  // ============================================================
  // À TOI DE COMPLÉTER — même logique que les 4 exemples ci-dessus
  //
  // Sélecteurs disponibles :
  //   Filtre type    : transaction-filter-type   (all / sent / received)
  //   Filtre statut  : transaction-filter-status (all / complete / pending / rejected)
  //   Réinitialiser  : transaction-reset-filters
  //   Montant ligne  : [data-testid^="transaction-amount-"]
  // ============================================================

  filterByType(type) {
    // action → return this
  }

  filterByStatus(status) {
    // action → return this
  }

  reset() {
    // action → return this
  }

  firstAmount() {
    // getter → return cy.get(...)
  }
}

// ============================================================
// EXPORT — on exporte UNE instance, pas la classe.
// Dans les tests :
//   import transactionsPage from "../pages/TransactionsPage"
//   transactionsPage.visit()   ← pas besoin de "new"
// ============================================================
export default new TransactionsPage();

// =============================================================================
// COPILOT — une fois les 4 exemples compris, demande à Copilot de compléter :
//
// "Voici un Page Object Cypress pour la page /transactions.
//  Les méthodes visit(), search(), items() et emptyState() sont implémentées.
//  Complète filterByType(), filterByStatus(), reset() et firstAmount()
//  en suivant le même style :
//  - les actions font cy.get(...).action() et retournent this
//  - les getters retournent cy.get(...) sans asserter
//  Sélecteurs : transaction-filter-type, transaction-filter-status,
//  transaction-reset-filters, [data-testid^='transaction-amount-']"
//
// Relis, comprends, vérifie au vert avant de continuer.
// =============================================================================
