// Comptes seed disponibles : johndoe (connecté), janesmith, alice_dupont, bob_martin

describe("Nouvelle transaction", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get('[data-testid="signin-username"]').type("johndoe");
    cy.get('[data-testid="signin-password"]').type("s3cret");
    cy.get('[data-testid="signin-submit"]').click();
    cy.url().should("include", "/dashboard");
    cy.visit("/transactions/new");
  });

  // Analyser: le bouton soumettre ne doit pas être cliquable sans destinataire ni montant
  // Actions: arriver sur la page sans rien remplir
  // Prouver: l'attribut disabled est présent sur le bouton
  it("le bouton soumettre est désactivé sans destinataire", () => {
    cy.get('[data-testid="new-transaction-submit"]').should("be.disabled");
  });

  // Analyser: chercher un contact par nom doit le faire apparaître et permettre de le sélectionner
  // Actions: taper "jane" dans la recherche et cliquer Jane Smith
  // Prouver: le champ de recherche disparaît et le contact sélectionné s'affiche
  it("chercher 'jane' et sélectionner Jane Smith", () => {
    cy.get('[data-testid="new-transaction-user-search"]').type("jane");
    cy.get('[data-testid="new-transaction-user-list"]').contains("Jane Smith").click();
    cy.get('[data-testid="new-transaction-user-search"]').should("not.exist");
    cy.get('[data-testid="new-transaction-submit"]').should("exist");
  });

  // Analyser: la modale de confirmation doit afficher exactement ce qu'on a saisi
  // Actions: sélectionner Jane Smith, saisir 25, soumettre
  // Prouver: la modale affiche "Jane Smith" et "25"
  it("la modale de confirmation affiche le bon destinataire et le bon montant", () => {
    cy.get('[data-testid="new-transaction-user-search"]').type("jane");
    cy.get('[data-testid="new-transaction-user-list"]').contains("Jane Smith").click();
    cy.get('[data-testid="new-transaction-amount"]').type("25");
    cy.get('[data-testid="new-transaction-submit"]').click();
    cy.get('[data-testid="new-transaction-confirm-modal"]').should("be.visible");
    cy.get('[data-testid="confirm-receiver"]').should("contain", "Jane Smith");
    cy.get('[data-testid="confirm-amount"]').should("contain", "25");
  });

  // Analyser: annuler dans la modale doit revenir au formulaire sans envoyer
  // Actions: ouvrir la modale puis cliquer Annuler
  // Prouver: la modale disparaît et le champ montant est toujours présent
  it("annuler la modale ferme la modale sans envoyer", () => {
    cy.get('[data-testid="new-transaction-user-search"]').type("jane");
    cy.get('[data-testid="new-transaction-user-list"]').contains("Jane Smith").click();
    cy.get('[data-testid="new-transaction-amount"]').type("25");
    cy.get('[data-testid="new-transaction-submit"]').click();
    cy.get('[data-testid="new-transaction-confirm-cancel"]').click();
    cy.get('[data-testid="new-transaction-confirm-modal"]').should("not.exist");
    cy.get('[data-testid="new-transaction-amount"]').should("exist");
  });

  // Analyser: basculer sur "Demander" doit changer le libellé du bouton soumettre
  // Actions: cliquer le bouton type "Demander"
  // Prouver: le bouton contient le mot "demande"
  it("basculer sur 'Demander' change le libellé du bouton soumettre", () => {
    cy.get('[data-testid="new-transaction-type-request"]').click();
    cy.get('[data-testid="new-transaction-submit"]').should("contain", "demande");
  });

  // Analyser: un paiement complet doit afficher un message de succès avec le nom du destinataire
  // Actions: sélectionner Alice Dupont, saisir 10, confirmer
  // Prouver: le message de succès est visible et contient "Alice"
  it("envoyer un paiement affiche le message de succès", () => {
    cy.get('[data-testid="new-transaction-user-search"]').type("alice");
    cy.get('[data-testid="new-transaction-user-list"]').contains("Alice Dupont").click();
    cy.get('[data-testid="new-transaction-amount"]').type("10");
    cy.get('[data-testid="new-transaction-description"]').type("test cypress");
    cy.get('[data-testid="new-transaction-submit"]').click();
    cy.get('[data-testid="new-transaction-confirm-submit"]').click();
    cy.get('[data-testid="new-transaction-success"]').should("be.visible");
    cy.get('[data-testid="new-transaction-success"]').should("contain", "Alice");
  });
});
