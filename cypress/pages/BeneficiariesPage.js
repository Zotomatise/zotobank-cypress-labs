// =============================================================================
// Page Object — BeneficiariesPage (/beneficiaries)
//
// Objectif : zéro data-testid dans les specs.
// Créé pour le défi de la séance 3.
// =============================================================================

class BeneficiariesPage {
  // ============================================================
  // ACTIONS — font quelque chose sur la page, retournent this
  // ============================================================

  visit() {
    cy.visit("/beneficiaries");
    return this;
  }

  openForm() {
    cy.get('[data-testid="beneficiary-new"]').click();
    return this;
  }

  fillUsername(username) {
    cy.get('[data-testid="beneficiary-username-input"]').type(username);
    return this;
  }

  fillLabel(label) {
    cy.get('[data-testid="beneficiary-label-input"]').type(label);
    return this;
  }

  submit() {
    cy.get('[data-testid="beneficiary-submit"]').click();
    return this;
  }

  // ============================================================
  // GETTERS — donnent accès à un élément, retournent cy.get(...)
  // ============================================================

  list() {
    return cy.get('[data-testid="beneficiaries-list"]');
  }

  emptyState() {
    return cy.get('[data-testid="beneficiaries-empty"]');
  }

  items() {
    return cy.get('[data-testid^="beneficiary-item-"]');
  }

  form() {
    return cy.get('[data-testid="beneficiary-form"]');
  }

  submitButton() {
    return cy.get('[data-testid="beneficiary-submit"]');
  }

  error() {
    return cy.get('[data-testid="beneficiary-error"]');
  }
}

export default new BeneficiariesPage();
