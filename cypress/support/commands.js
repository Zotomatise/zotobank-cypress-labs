// Commande personnalisée cy.login() — Séance 3
// Encapsule la connexion à ZotoBank en une seule ligne, utilisable dans n'importe quel test.
// Utilisation : cy.login() ou cy.login("autrecompte", "motdepasse")
Cypress.Commands.add("login", (username = "johndoe", password = "s3cret") => {
  cy.visit("/login");
  cy.get('[data-testid="signin-username"]').type(username);
  cy.get('[data-testid="signin-password"]').type(password);
  cy.get('[data-testid="signin-submit"]').click();
  cy.location("pathname").should("eq", "/dashboard");
});