---
mode: agent
description: Configurer Allure Report dans ce projet Cypress
---

Configure Allure Report dans ce projet Cypress ZotoBank.

Contexte :
- Plugin : `@shelex/cypress-allure-plugin`
- Fichiers à modifier : `cypress.config.js` et `cypress/support/e2e.js`
- Les scripts npm `test:allure`, `report:generate`, `report:open` sont déjà dans `package.json`

À faire :
1. Ajouter `allureWriter` dans `cypress.config.js` (import + `setupNodeEvents`)
2. Ajouter l'import du plugin en première ligne de `cypress/support/e2e.js`

Ne touche pas aux tests existants.
Montre les deux fichiers modifiés complets.
Termine par la commande à lancer pour vérifier : `npm run test:allure`
