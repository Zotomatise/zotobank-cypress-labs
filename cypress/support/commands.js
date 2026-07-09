// Commande personnalisée cy.login()
// Séance 3   : extraite du copier-coller pour ne vivre qu'à un seul endroit
// Séance 4  : cy.session() ajouté — le formulaire ne se rejoue qu'une fois par suite
// Utilisation : cy.login() ou cy.login("autrecompte", "motdepasse")
Cypress.Commands.add("login", (username = "johndoe", password = "s3cret") => {
  cy.session(username, () => {
    cy.visit("/login");
    cy.get('[data-testid="signin-username"]').type(username);
    cy.get('[data-testid="signin-password"]').type(password);
    cy.get('[data-testid="signin-submit"]').click();
    cy.location("pathname").should("eq", "/dashboard");
  });
});

Cypress.Commands.add("logout", () => {
  cy.get('[data-testid="nav-logout"]').click();
  cy.location("pathname").should("eq", "/login");
});
