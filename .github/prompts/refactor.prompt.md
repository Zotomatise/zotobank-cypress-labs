---
description: Extraire la connexion répétée en commande custom cy.login()
---
# À placer dans : .github/prompts/refactor.prompt.md  (réglage chat.promptFiles activé)
# Usage : dans Copilot Chat, tape /refactor

Refactore mes tests Cypress pour supprimer la répétition de la connexion.

1. Crée une commande custom `cy.login()` dans `cypress/support/commands.js` qui se connecte
   avec johndoe / s3cret via les data-testid `signin-username`, `signin-password`, `signin-submit`.
2. Remplace les connexions répétées dans les tests par `cy.login()`.
3. Garde les `data-testid`. Explique brièvement ce que tu changes et pourquoi (lisibilité, DRY).
4. Termine par : "Relance la suite pour vérifier que tout est encore au vert."
