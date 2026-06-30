// Page Object — CardsPage
// Page : /cards — gestion des cartes bancaires.

class CardsPage {
  visit() {
    cy.visit("/cards");
    return this;
  }

  // Ouvre le formulaire de création de carte
  openForm() {
    cy.get('[data-testid="card-new"]').click();
    return this;
  }

  selectBrand(brand) {
    // brand = "Visa" | "Mastercard" | "American Express"
    cy.get('[data-testid="card-brand"]').select(brand);
    return this;
  }

  submit() {
    cy.get('[data-testid="card-submit"]').click();
    return this;
  }

  // Crée une carte en une seule ligne
  create(brand = "Visa") {
    return this.openForm().selectBrand(brand).submit();
  }

  // Bascule l'état d'une carte (bloquer / débloquer)
  toggle(id) {
    cy.get(`[data-testid="card-toggle-${id}"]`).click();
    return this;
  }

  // Getters
  list() {
    return cy.get('[data-testid="cards-list"]');
  }

  items() {
    return cy.get('[data-testid^="card-item-"]');
  }

  emptyState() {
    return cy.get('[data-testid="cards-empty"]');
  }

  status(id) {
    return cy.get(`[data-testid="card-status-${id}"]`);
  }

  number(id) {
    return cy.get(`[data-testid="card-number-${id}"]`);
  }

  errorMessage() {
    return cy.get('[data-testid="card-error"]');
  }
}

export default new CardsPage();
