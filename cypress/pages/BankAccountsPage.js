// Page Object — BankAccountsPage
// Page : /bank-accounts — comptes bancaires externes liés.

class BankAccountsPage {
  visit() {
    cy.visit("/bank-accounts");
    return this;
  }

  openForm() {
    cy.get('[data-testid="bank-account-new"]').click();
    return this;
  }

  fillName(name) {
    cy.get('[data-testid="bank-account-name-input"]').clear().type(name);
    return this;
  }

  fillNumber(number) {
    cy.get('[data-testid="bank-account-number-input"]').clear().type(number);
    return this;
  }

  fillRouting(routing) {
    cy.get('[data-testid="bank-account-routing-input"]').clear().type(routing);
    return this;
  }

  submit() {
    cy.get('[data-testid="bank-account-submit"]').click();
    return this;
  }

  // Ajoute un compte en une seule ligne
  add(name, number, routing) {
    return this.openForm().fillName(name).fillNumber(number).fillRouting(routing).submit();
  }

  delete(id) {
    cy.get(`[data-testid="bank-account-delete-${id}"]`).click();
    return this;
  }

  // Getters
  list() {
    return cy.get('[data-testid="bank-accounts-list"]');
  }

  items() {
    return cy.get('[data-testid^="bank-account-item-"]');
  }

  name(id) {
    return cy.get(`[data-testid="bank-account-name-${id}"]`);
  }

  number(id) {
    return cy.get(`[data-testid="bank-account-number-${id}"]`);
  }
}

export default new BankAccountsPage();
