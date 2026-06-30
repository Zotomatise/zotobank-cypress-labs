import TransactionsPage from "../pages/TransactionsPage";

// Défi séance 2 — Partie 1 : filtres avancés (/transactions)

describe("Défi S2 — Partie 1 : filtres avancés", () => {
  beforeEach(() => {
    cy.login();
    TransactionsPage.visit();
  });

  // Analyser: le filtre Reçus ne doit montrer que les entrées d'argent (montants positifs)
  // Actions: sélectionner received, vérifier le signe du premier montant
  // Prouver: la liste a au moins 1 élément et le montant contient "+"
  it("le filtre Reçus affiche des montants positifs", () => {
    TransactionsPage.filterByType("received");
    TransactionsPage.items().its("length").should("be.gt", 0);
    TransactionsPage.firstAmount().should("contain", "+");
  });

  // Analyser: une recherche sur un terme présent dans les données doit retourner des résultats
  // Actions: taper un terme connu dans la recherche
  // Prouver: au moins 1 transaction s'affiche
  it("une recherche sur un terme présent retourne au moins 1 résultat", () => {
    TransactionsPage.search("Loyer");
    TransactionsPage.items().its("length").should("be.gte", 1);
  });

  // Analyser: Réinitialiser doit effacer tous les filtres et restaurer la liste complète
  // Actions: appliquer un filtre puis cliquer Réinitialiser
  // Prouver: on retrouve les 10 transactions de départ
  it("Réinitialiser après filtre restaure la liste complète", () => {
    TransactionsPage.filterByType("sent");
    TransactionsPage.reset();
    TransactionsPage.items().should("have.length", 10);
  });

  // Analyser: le filtre statut doit changer la valeur sélectionnée
  // Actions: sélectionner pending
  // Prouver: le filtre est actif et affiche l'état vide ou des transactions pending
  it("le filtre statut En attente est actif après sélection", () => {
    TransactionsPage.filterByStatus("pending");
    TransactionsPage.statusFilter().should("have.value", "pending");
  });
});

// =============================================================================
// Défi séance 2 — Partie 2 : nouvelle transaction (/transactions/new)
// =============================================================================

describe("Défi S2 — Partie 2 : nouvelle transaction", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/transactions/new");
  });

  // Analyser: le bouton soumettre ne doit pas être cliquable sans destinataire ni montant
  // Actions: arriver sur la page sans rien remplir
  // Prouver: l'attribut disabled est présent sur le bouton
  it("le bouton soumettre est désactivé sans destinataire", () => {
    cy.get('[data-testid="new-transaction-submit"]').should("be.disabled");
  });

  // Analyser: la modale de confirmation doit afficher exactement ce qu'on a saisi
  // Actions: chercher jane, sélectionner Jane Smith, saisir 25, soumettre
  // Prouver: la modale affiche "Jane Smith" et "25"
  it("la modale de confirmation affiche le bon destinataire et le bon montant", () => {
    cy.get('[data-testid="new-transaction-user-search"]').type("jane");
    cy.get('[data-testid="new-transaction-user-list"]')
      .contains("Jane Smith")
      .click();
    cy.get('[data-testid="new-transaction-amount"]').type("25");
    cy.get('[data-testid="new-transaction-submit"]').click();
    cy.get('[data-testid="new-transaction-confirm-modal"]').should(
      "be.visible",
    );
    cy.get('[data-testid="confirm-receiver"]').should("contain", "Jane Smith");
    cy.get('[data-testid="confirm-amount"]').should("contain", "25");
  });

  // Analyser: annuler dans la modale doit revenir au formulaire sans envoyer
  // Actions: ouvrir la modale puis cliquer Annuler
  // Prouver: la modale disparaît et le champ montant est toujours présent
  it("annuler la modale ferme la modale sans envoyer", () => {
    cy.get('[data-testid="new-transaction-user-search"]').type("jane");
    cy.get('[data-testid="new-transaction-user-list"]')
      .contains("Jane Smith")
      .click();
    cy.get('[data-testid="new-transaction-amount"]').type("25");
    cy.get('[data-testid="new-transaction-submit"]').click();
    cy.get('[data-testid="new-transaction-confirm-cancel"]').click();
    cy.get('[data-testid="new-transaction-confirm-modal"]').should("not.exist");
    cy.get('[data-testid="new-transaction-amount"]').should("exist");
  });
});
