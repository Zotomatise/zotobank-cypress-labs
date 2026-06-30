// Page Object — NewTransactionPage
// Page : /transactions/new — formulaire d'envoi ou de demande d'argent.

class NewTransactionPage {
  visit() {
    cy.visit("/transactions/new");
    return this;
  }

  selectType(type) {
    // type = "payment" | "request"
    cy.get(`[data-testid="new-transaction-type-${type}"]`).click();
    return this;
  }

  // Sélectionner un bénéficiaire enregistré
  selectBeneficiary(id) {
    cy.get(`[data-testid="new-transaction-beneficiary-${id}"]`).click();
    return this;
  }

  // Chercher un utilisateur par nom ou username
  searchUser(query) {
    cy.get('[data-testid="new-transaction-user-search"]').clear().type(query);
    return this;
  }

  selectUserFromList(name) {
    cy.get('[data-testid="new-transaction-user-list"]').contains(name).click();
    return this;
  }

  fillAmount(amount) {
    cy.get('[data-testid="new-transaction-amount"]').clear().type(amount);
    return this;
  }

  fillDescription(description) {
    cy.get('[data-testid="new-transaction-description"]').clear().type(description);
    return this;
  }

  submit() {
    cy.get('[data-testid="new-transaction-submit"]').click();
    return this;
  }

  // Dans la modale de confirmation
  confirm() {
    cy.get('[data-testid="new-transaction-confirm-submit"]').click();
    return this;
  }

  cancelConfirm() {
    cy.get('[data-testid="new-transaction-confirm-cancel"]').click();
    return this;
  }

  // Envoie un paiement complet en une seule chaîne
  pay(username, amount, description = "") {
    return this
      .searchUser(username)
      .selectUserFromList(username)
      .fillAmount(amount)
      .fillDescription(description)
      .submit()
      .confirm();
  }

  // Getters
  submitButton() {
    return cy.get('[data-testid="new-transaction-submit"]');
  }

  confirmModal() {
    return cy.get('[data-testid="new-transaction-confirm-modal"]');
  }

  confirmReceiver() {
    return cy.get('[data-testid="confirm-receiver"]');
  }

  confirmAmount() {
    return cy.get('[data-testid="confirm-amount"]');
  }

  successMessage() {
    return cy.get('[data-testid="new-transaction-success"]');
  }

  errorMessage() {
    return cy.get('[data-testid="new-transaction-error"]');
  }

  userList() {
    return cy.get('[data-testid="new-transaction-user-list"]');
  }
}

export default new NewTransactionPage();
