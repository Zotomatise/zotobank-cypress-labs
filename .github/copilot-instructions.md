# Instructions Copilot — projet de tests Cypress ZotoBank
# À placer dans : .github/copilot-instructions.md (à la racine du dépôt)
# Copilot lit ce fichier automatiquement pour chaque demande dans ce projet.

Contexte : projet de tests end-to-end Cypress pour ZotoBank (application bancaire de démonstration).
La baseUrl est configurée sur https://zotobank.zotomatise.com, donc utilise des chemins relatifs
(ex. `cy.visit("/login")`).

Quand tu génères ou corriges un test :
- Cible les éléments par leur attribut `data-testid`
  (ex. `cy.get('[data-testid="signin-submit"]')`). N'utilise jamais de classe CSS ni de
  sélection par texte fragile.
- Structure : `describe` / `it`. Un `it` = un seul scénario, avec un nom explicite en français.
- Applique la méthode ATAP : commente l'intention (Analyser), puis écris les actions, puis les
  assertions (Prouver).
- Connexion de test : utilisateur `johndoe`, mot de passe `s3cret`, via les data-testid
  `signin-username`, `signin-password`, `signin-submit`. Après connexion, on arrive sur `/dashboard`.
- Code en JavaScript, fichiers `*.cy.js`.
- Quand on te demande de corriger une erreur : explique d'abord la CAUSE, puis propose le correctif.
- Termine toujours par un rappel : relancer le test pour vérifier qu'il passe au vert.

Réponds en français.
