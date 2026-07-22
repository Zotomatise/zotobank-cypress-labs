// =============================================================================
// Page Object — NewTransactionPage (/transactions/new)
//
// Objectif : zéro data-testid dans les specs.
// =============================================================================

class NewTransactionPage {
  visit() {
    cy.visit("/transactions/new");
    return this;
  }

  selectPayment() {
    cy.get('[data-testid="new-transaction-type-payment"]').click();
    return this;
  }

  searchUser(terme) {
    cy.get('[data-testid="new-transaction-user-search"]').type(terme);
    return this;
  }

  selectFirstResult() {
    cy.get('[data-testid^="new-transaction-user-item-"]').first().click();
    return this;
  }

  fillAmount(montant) {
    cy.get('[data-testid="new-transaction-amount"]').type(montant);
    return this;
  }

  submit() {
    cy.get('[data-testid="new-transaction-submit"]').click();
    return this;
  }

  confirm() {
    cy.get('[data-testid="new-transaction-confirm-submit"]').click();
    return this;
  }

  confirmModal() {
    return cy.get('[data-testid="new-transaction-confirm-modal"]');
  }

  confirmAmount() {
    return cy.get('[data-testid="confirm-amount"]');
  }

  successMessage() {
    return cy.get('[data-testid="new-transaction-success"]');
  }
}

export default new NewTransactionPage();
