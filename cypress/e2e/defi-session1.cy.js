describe("Robustesse de la connexion - Défi séance 1", () => {

  // les champs ont required → le navigateur bloque avant même d'appeler l'API
  it("champs vides : on reste sur /login, aucun appel API", () => {
    cy.visit("/login");
    cy.get('[data-testid="signin-submit"]').click();
    cy.url().should("include", "/login");
    cy.get('[data-testid="signin-error"]').should("not.exist");
  });

  // SQLite compare en binaire, JOHNDOE et johndoe sont deux utilisateurs différents
  it("JOHNDOE en majuscules est refusé", () => {
    cy.visit("/login");
    cy.get('[data-testid="signin-username"]').type("JOHNDOE");
    cy.get('[data-testid="signin-password"]').type("s3cret");
    cy.get('[data-testid="signin-submit"]').click();
    cy.get('[data-testid="signin-error"]').should("be.visible");
    cy.url().should("include", "/login");
  });

  // l'API ne fait pas .trim(), donc " johndoe " ne matche pas "johndoe" en base
  it("nom avec espaces autour est refusé", () => {
    cy.visit("/login");
    cy.get('[data-testid="signin-username"]').type(" johndoe ");
    cy.get('[data-testid="signin-password"]').type("s3cret");
    cy.get('[data-testid="signin-submit"]').click();
    cy.get('[data-testid="signin-error"]').should("be.visible");
    cy.url().should("include", "/login");
  });

});

describe("Bonus - Liens de la page de connexion", () => {

  it("signup-link mène vers /signup", () => {
    cy.visit("/login");
    cy.get('[data-testid="signup-link"]').click();
    cy.url().should("include", "/signup");
  });

  it("forgot-password-link mène vers /forgot-password", () => {
    cy.visit("/login");
    cy.get('[data-testid="forgot-password-link"]').click();
    cy.url().should("include", "/forgot-password");
  });

});
