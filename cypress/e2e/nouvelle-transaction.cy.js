// Scénarios sur la page /transactions/new
// Comptes seed disponibles : johndoe (connecté), janesmith, alice_dupont, bob_martin...

describe("Nouvelle transaction", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get('[data-testid="signin-username"]').type("johndoe");
    cy.get('[data-testid="signin-password"]').type("s3cret");
    cy.get('[data-testid="signin-submit"]').click();
    cy.url().should("include", "/dashboard");
    cy.visit("/transactions/new");
  });

  // le bouton est disabled tant qu'il n'y a pas de destinataire ET montant
  it("le bouton soumettre est désactivé sans destinataire", () => {
    cy.get('[data-testid="new-transaction-submit"]').should("be.disabled");
  });

  // rechercher un contact puis le sélectionner
  it("chercher 'jane' et sélectionner Jane Smith", () => {
    cy.get('[data-testid="new-transaction-user-search"]').type("jane");
    cy.get('[data-testid="new-transaction-user-list"]').contains("Jane Smith").click();
    // la liste de recherche disparaît, le contact sélectionné s'affiche
    cy.get('[data-testid="new-transaction-user-search"]').should("not.exist");
    cy.get('[data-testid="new-transaction-submit"]').should("exist");
  });

  // la modale affiche exactement ce qu'on a saisi avant de confirmer
  it("la modale de confirmation affiche le bon destinataire et le bon montant", () => {
    cy.get('[data-testid="new-transaction-user-search"]').type("jane");
    cy.get('[data-testid="new-transaction-user-list"]').contains("Jane Smith").click();
    cy.get('[data-testid="new-transaction-amount"]').type("25");
    cy.get('[data-testid="new-transaction-submit"]').click();
    cy.get('[data-testid="new-transaction-confirm-modal"]').should("be.visible");
    cy.get('[data-testid="confirm-receiver"]').should("contain", "Jane Smith");
    cy.get('[data-testid="confirm-amount"]').should("contain", "25");
  });

  // annuler la modale revient au formulaire sans envoyer
  it("annuler la modale ferme la modale sans envoyer", () => {
    cy.get('[data-testid="new-transaction-user-search"]').type("jane");
    cy.get('[data-testid="new-transaction-user-list"]').contains("Jane Smith").click();
    cy.get('[data-testid="new-transaction-amount"]').type("25");
    cy.get('[data-testid="new-transaction-submit"]').click();
    cy.get('[data-testid="new-transaction-confirm-cancel"]').click();
    cy.get('[data-testid="new-transaction-confirm-modal"]').should("not.exist");
    // on est toujours sur le formulaire
    cy.get('[data-testid="new-transaction-amount"]').should("exist");
  });

  // basculer entre Envoyer et Demander change le libellé du bouton
  it("basculer sur 'Demander' change le libellé du bouton soumettre", () => {
    cy.get('[data-testid="new-transaction-type-request"]').click();
    cy.get('[data-testid="new-transaction-submit"]').should("contain", "demande");
  });

  // envoi complet et vérification du message de succès
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
