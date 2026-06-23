describe("Robustesse de la connexion - Défi séance 1", () => {
  // Analyser: les champs ont required, le navigateur bloque avant même d'appeler l'API
  // Actions: cliquer soumettre sans rien saisir
  // Prouver: on reste sur /login et aucun message d'erreur serveur n'apparaît
  it("champs vides : on reste sur /login, aucun appel API", () => {
    cy.visit("/login");
    cy.get('[data-testid="signin-submit"]').click();
    cy.url().should("include", "/login");
    cy.get('[data-testid="signin-error"]').should("not.exist");
  });

  // Analyser: SQLite compare en binaire, JOHNDOE et johndoe sont deux utilisateurs différents
  // Actions: saisir JOHNDOE avec le bon mot de passe
  // Prouver: un message d'erreur s'affiche et on reste sur /login
  it("JOHNDOE en majuscules est refusé", () => {
    cy.visit("/login");
    cy.get('[data-testid="signin-username"]').type("JOHNDOE");
    cy.get('[data-testid="signin-password"]').type("s3cret");
    cy.get('[data-testid="signin-submit"]').click();
    cy.get('[data-testid="signin-error"]').should("be.visible");
    cy.get('[data-testid="signin-error"]').should(
      "contain.text",
      "Nom d'utilisateur ou mot de passe incorrect",
    );
    cy.url().should("include", "/login");
  });

  // Analyser: l'API ne fait pas .trim(), " johndoe " ne matche pas "johndoe" en base
  // Actions: saisir le nom avec un espace avant et après
  // Prouver: un message d'erreur s'affiche et on reste sur /login
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
  // Analyser: le lien d'inscription doit mener vers la page de création de compte
  // Actions: cliquer signup-link
  // Prouver: l'URL contient /signup
  it("signup-link mène vers /signup", () => {
    cy.visit("/login");
    cy.get('[data-testid="signup-link"]').click();
    cy.url().should("include", "/signup");
  });

  // Analyser: le lien mot de passe oublié doit mener vers la bonne page
  // Actions: cliquer forgot-password-link
  // Prouver: l'URL contient /forgot-password
  it("forgot-password-link mène vers /forgot-password", () => {
    cy.visit("/login");
    cy.get('[data-testid="forgot-password-link"]').should(
      "contain.text",
      "Mot de passe oublié ?",
    );
    cy.get('[data-testid="forgot-password-link"]').click();
    cy.url().should("include", "/forgot-password");
    cy.get('[data-testid="forgot-submit"]').should("be.visible");
  });
});
