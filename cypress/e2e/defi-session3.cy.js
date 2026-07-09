// Défi séance 3 — Page Object : BeneficiariesPage
// Même démarche que TransactionsPage en séance, appliquée à /beneficiaries.
// Méthode ATAP : Analyser → Traduire → Automatiser → Prouver

import BeneficiariesPage from "../pages/BeneficiariesPage";

describe("Défi S3 — Gestion des bénéficiaires", () => {
  beforeEach(() => {
    cy.login();
    BeneficiariesPage.visit();
  });

  // Analyser : la page /beneficiaries doit afficher la liste dès le chargement
  // Traduire : le conteneur de liste doit exister sans action de l'utilisateur
  // Automatiser : voir ci-dessous
  // Prouver : le conteneur de liste est présent
  it("affiche le conteneur de la liste au chargement", () => {
    BeneficiariesPage.list().should("exist");
  });

  // Analyser : cliquer sur "Ajouter un bénéficiaire" doit révéler le formulaire
  // Traduire : openForm() clique le bouton, form() doit devenir visible
  // Automatiser : voir ci-dessous
  // Prouver : le formulaire avec les champs est visible
  it("cliquer Ajouter révèle le formulaire", () => {
    BeneficiariesPage.openForm();
    BeneficiariesPage.form().should("be.visible");
  });

  // Analyser : le bouton Ajouter doit être désactivé sans nom d'utilisateur
  // Traduire : ouvrir le formulaire sans rien saisir, vérifier l'état du bouton
  // Automatiser : voir ci-dessous
  // Prouver : le bouton de validation est grisé
  it("le bouton valider est désactivé sans nom d'utilisateur", () => {
    BeneficiariesPage.openForm();
    BeneficiariesPage.submitButton().should("be.disabled");
  });

  // Analyser : ajouter quelqu'un déjà dans la liste doit afficher un message d'erreur
  // Traduire : remplir avec janesmith (déjà présent), soumettre, lire l'erreur
  // Automatiser : voir ci-dessous
  // Prouver : le message d'erreur est visible et contient "déjà enregistré"
  it("ajouter un bénéficiaire déjà présent affiche un message d'erreur", () => {
    BeneficiariesPage.openForm();
    BeneficiariesPage.fillUsername("janesmith");
    BeneficiariesPage.fillLabel("Jane test");
    BeneficiariesPage.submit();
    BeneficiariesPage.error().should("be.visible");
    BeneficiariesPage.error().should("contain", "déjà enregistré");
  });
});
