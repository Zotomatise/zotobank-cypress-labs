// Page Object — DashboardPage
// Page : /dashboard — vue d'ensemble du compte (solde, raccourcis, transactions récentes).

class DashboardPage {
  visit() {
    cy.visit("/dashboard");
    return this;
  }

  // Actions rapides
  clickSendMoney() {
    cy.get('[data-testid="dashboard-send-money"]').click();
    return this;
  }

  clickRequestMoney() {
    cy.get('[data-testid="dashboard-request-money"]').click();
    return this;
  }

  openDepositModal() {
    cy.get('[data-testid="dashboard-deposit"]').click();
    return this;
  }

  // Formulaire de dépôt (dans la modale)
  fillDepositAmount(amount) {
    cy.get('[data-testid="deposit-amount"]').clear().type(amount);
    return this;
  }

  submitDeposit() {
    cy.get('[data-testid="deposit-submit"]').click();
    return this;
  }

  cancelDeposit() {
    cy.get('[data-testid="deposit-cancel"]').click();
    return this;
  }

  // Formulaire de feedback
  selectFeedbackType(type) {
    // type = "suggestion" | "bug"
    cy.get(`[data-testid="feedback-type-${type}"]`).click();
    return this;
  }

  fillFeedbackMessage(message) {
    cy.get('[data-testid="feedback-message"]').clear().type(message);
    return this;
  }

  submitFeedback() {
    cy.get('[data-testid="feedback-submit"]').click();
    return this;
  }

  // Getters
  balance() {
    return cy.get('[data-testid="dashboard-balance"]');
  }

  balanceCard() {
    return cy.get('[data-testid="dashboard-balance-card"]');
  }

  depositModal() {
    return cy.get('[data-testid="deposit-modal"]');
  }

  depositSuccess() {
    return cy.get('[data-testid="deposit-success"]');
  }

  depositError() {
    return cy.get('[data-testid="deposit-error"]');
  }

  recentTransactions() {
    return cy.get('[data-testid="dashboard-recent-transactions"]');
  }

  transactionItem(id) {
    return cy.get(`[data-testid="transaction-item-${id}"]`);
  }

  feedbackSuccess() {
    return cy.get('[data-testid="feedback-success"]');
  }

  feedbackError() {
    return cy.get('[data-testid="feedback-error"]');
  }

  bankAccountsSection() {
    return cy.get('[data-testid="dashboard-bank-accounts"]');
  }

  noAccountsMessage() {
    return cy.get('[data-testid="dashboard-no-accounts"]');
  }
}

export default new DashboardPage();
