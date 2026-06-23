describe("Manipuler la page de transaction", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get('[data-testid="signin-username"]').type("johndoe");
    cy.get('[data-testid="signin-password"]').type("s3cret");
    cy.get('[data-testid="signin-submit"]').click();
    cy.url().should("include", "/dashboard");
    cy.visit("/transactions");
  });

  it("recherche sans resultat", () => {
    cy.get('[data-testid="transaction-search"]').type("inexistant");
    cy.get('[data-testid="transaction-empty-state"]').should("be.visible");
    cy.get('[data-testid="transaction-empty-state"]').should(
      "contain",
      "Aucune transaction trouvée",
    );
  });
});
