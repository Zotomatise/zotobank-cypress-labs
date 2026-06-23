// Exo 1 - fait ensemble en séance
describe("Protection des accès - ZotoBank", () => {
  // Analyser: une page privée ne doit pas être accessible sans connexion
  // Actions: visiter /dashboard sans être connecté
  // Prouver: on est redirigé vers /login et le bouton de connexion est visible
  it("renvoie vers /login si on ouvre le dashboard sans être connecté", () => {
    cy.visit("/dashboard");
    cy.url().should("include", "/login");
    cy.get('[data-testid="signin-submit"]').should("be.visible");
  });
});

// Exo 2 - réparer le test cassé (2 bugs à trouver)
// Bug 1 : signin-name n'existe pas, le bon testid est signin-username
// Bug 2 : il manquait le .click() sur le bouton de connexion
describe("Débug - connexion", () => {
  // Analyser: johndoe avec le bon mot de passe doit accéder au dashboard
  // Actions: remplir le formulaire et soumettre
  // Prouver: l'URL contient /dashboard
  it("se connecte avec johndoe", () => {
    cy.visit("/login");
    cy.get('[data-testid="signin-username"]').type("johndoe");
    cy.get('[data-testid="signin-password"]').type("s3cret");
    cy.get('[data-testid="signin-submit"]').click();
    cy.url().should("include", "/dashboard");
  });
});
