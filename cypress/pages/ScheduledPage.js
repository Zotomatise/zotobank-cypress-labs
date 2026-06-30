// Page Object — ScheduledPage
// Page : /scheduled — virements programmés et récurrents.

class ScheduledPage {
  visit() {
    cy.visit("/scheduled");
    return this;
  }

  selectReceiver(username) {
    cy.get('[data-testid="scheduled-receiver"]').select(username);
    return this;
  }

  fillAmount(amount) {
    cy.get('[data-testid="scheduled-amount"]').clear().type(amount);
    return this;
  }

  fillDate(date) {
    // format attendu : YYYY-MM-DD
    cy.get('[data-testid="scheduled-date"]').type(date);
    return this;
  }

  selectRecurrence(recurrence) {
    // recurrence = "once" | "weekly" | "monthly"
    cy.get('[data-testid="scheduled-recurrence"]').select(recurrence);
    return this;
  }

  fillDescription(description) {
    cy.get('[data-testid="scheduled-description"]').clear().type(description);
    return this;
  }

  submit() {
    cy.get('[data-testid="scheduled-submit"]').click();
    return this;
  }

  // Annule un virement programmé
  cancel(id) {
    cy.get(`[data-testid="scheduled-cancel-${id}"]`).click();
    return this;
  }

  // Programme un virement en une seule ligne
  schedule(receiver, amount, date, recurrence = "once", description = "") {
    return this
      .selectReceiver(receiver)
      .fillAmount(amount)
      .fillDate(date)
      .selectRecurrence(recurrence)
      .fillDescription(description)
      .submit();
  }

  // Getters
  list() {
    return cy.get('[data-testid="scheduled-list"]');
  }

  items() {
    return cy.get('[data-testid^="scheduled-item-"]');
  }

  emptyState() {
    return cy.get('[data-testid="scheduled-empty"]');
  }

  successMessage() {
    return cy.get('[data-testid="scheduled-success"]');
  }

  errorMessage() {
    return cy.get('[data-testid="scheduled-error"]');
  }
}

export default new ScheduledPage();
