// Page Object — BeneficiariesPage
// Page : /beneficiaries — gestion des bénéficiaires enregistrés.

class BeneficiariesPage {
  visit() {
    cy.visit("/beneficiaries");
    return this;
  }

  // Ouvre le formulaire d'ajout
  openForm() {
    cy.get('[data-testid="beneficiary-new"]').click();
    return this;
  }

  fillUsername(username) {
    cy.get('[data-testid="beneficiary-username-input"]').clear().type(username);
    return this;
  }

  fillLabel(label) {
    cy.get('[data-testid="beneficiary-label-input"]').clear().type(label);
    return this;
  }

  submit() {
    cy.get('[data-testid="beneficiary-submit"]').click();
    return this;
  }

  // Ajoute un bénéficiaire en une seule ligne
  add(username, label) {
    return this.openForm().fillUsername(username).fillLabel(label).submit();
  }

  delete(id) {
    cy.get(`[data-testid="beneficiary-delete-${id}"]`).click();
    return this;
  }

  // Getters
  list() {
    return cy.get('[data-testid="beneficiaries-list"]');
  }

  items() {
    return cy.get('[data-testid^="beneficiary-item-"]');
  }

  emptyState() {
    return cy.get('[data-testid="beneficiaries-empty"]');
  }

  errorMessage() {
    return cy.get('[data-testid="beneficiary-error"]');
  }

  form() {
    return cy.get('[data-testid="beneficiary-form"]');
  }
}

export default new BeneficiariesPage();
