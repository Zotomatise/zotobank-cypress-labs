// Page Object — TransactionsPage
// Regroupe toute la connaissance de la page /transactions à un seul endroit.
// Les sélecteurs ne doivent plus apparaître dans les specs — ils passent par ici.

class TransactionsPage {
  visit() {
    // à compléter : cy.visit(...)
  }

  search(terme) {
    // à compléter : récupère le champ de recherche et tape le terme
  }

  filterByType(type) {
    // à compléter : sélectionne le filtre type (all / sent / received)
  }

  reset() {
    // à compléter : clique sur le bouton Réinitialiser
  }

  // Getter : renvoie les lignes de la liste. Le test décide de l'assertion.
  items() {
    // à compléter : retourner les éléments transaction-item-*
  }

  // Getter : renvoie le composant état vide.
  emptyState() {
    // à compléter : retourner transaction-empty-state
  }
}

export default new TransactionsPage();
