// =============================================================================
// Page Object — DashboardPage (/dashboard)
//
// Objectif : zéro data-testid dans les specs.
// =============================================================================

class DashboardPage {
  visit() {
    cy.visit("/dashboard");
    return this;
  }

  balance() {
    return cy.get('[data-testid="dashboard-balance"]');
  }

  balanceCard() {
    return cy.get('[data-testid="dashboard-balance-card"]');
  }

  recentTransactions() {
    return cy.get('[data-testid="dashboard-recent-transactions"]');
  }
}

export default new DashboardPage();
