import TransactionsPage from "../pages/TransactionsPage";

describe("Manipuler la page de transaction", () => {
  beforeEach(() => {
    cy.login();

    TransactionsPage.visit();
  });

  // Analyser: une recherche sans résultat doit afficher un état vide explicite
  // Actions: taper un terme inexistant dans la recherche
  // Prouver: le composant état vide est visible et contient le bon message
  it("recherche sans résultat affiche l'état vide", () => {
    TransactionsPage.search("inexistant");
    TransactionsPage.emptyState().should("be.visible");
    TransactionsPage.emptyState().should(
      "contain",
      "Aucune transaction trouvée",
    );
  });

  // Analyser: le filtre Envoyés réduit la liste et les montants doivent être négatifs
  // Actions: sélectionner le filtre, vérifier le signe du premier montant, puis réinitialiser
  // Prouver: la liste est plus courte, le montant contient "-", et revient à 10 après reset
  it("le filtre Envoyés réduit la liste et Réinitialiser la restaure", () => {
    TransactionsPage.items().should("have.length", 10);
    TransactionsPage.filterByType("sent");
    TransactionsPage.items().should("have.length", 5);
    TransactionsPage.firstAmount().should("contain", "-");
    TransactionsPage.reset();
    TransactionsPage.items().should("have.length", 10);
  });

  // Analyser: un filtre type et une recherche doivent s'appliquer en même temps
  // Actions: sélectionner Envoyés puis taper un terme inexistant
  // Prouver: l'état vide s'affiche avec les deux critères actifs
  it("combiner filtre Envoyés et recherche inexistante donne état vide", () => {
    TransactionsPage.filterByType("sent").search("inexistant");
    TransactionsPage.emptyState().should("be.visible");
  });

  // Analyser: cliquer une transaction doit ouvrir sa page détail avec les bonnes infos
  // Actions: cliquer la première ligne de la liste
  // Prouver: la page détail s'affiche avec montant, expéditeur et statut visibles
  it("cliquer une transaction ouvre la page détail", () => {
    TransactionsPage.clickFirst();
    TransactionsPage.detail().should("exist");
    TransactionsPage.detailAmount().should("be.visible");
    TransactionsPage.detailSender().should("be.visible");
    TransactionsPage.detailStatus().should("be.visible");
  });
});
