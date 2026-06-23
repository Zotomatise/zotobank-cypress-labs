describe("Protection des accès - ZotoBank", () => {
  it("renvoie vers /login si on ouvre le dashboard sans être connecté", () => {
    cy.visit("/dashboard");
    cy.url().should("include", "/login");
    cy.get('[data-testid="signin-submit"]').should("be.visible");
  });
});
