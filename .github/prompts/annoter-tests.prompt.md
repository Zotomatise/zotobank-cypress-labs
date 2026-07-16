---
mode: assistant
description: Ajouter les annotations Allure sur les tests du bloc E3
---

Ajoute les annotations `cy.allure()` sur les tests du describe `E3 — APRÈS` dans `cypress/e2e/session5.cy.js`.

Règles :
- Chaque `it()` doit avoir `cy.allure()` en première ligne du corps
- Utilise `.tag()`, `.severity()` et `.story()` sur chaque test
- Choisis la sévérité selon l'importance du test : `critical` pour le login, `normal` pour les filtres, `minor` pour la navigation
- Ne modifie pas les assertions existantes
- Ne touche pas au describe `E1/E2 — AVANT`

Les niveaux de sévérité disponibles : `blocker` `critical` `normal` `minor` `trivial`

Montre le fichier modifié uniquement pour le bloc E3.
Termine par : "Lance `npm run test:allure` puis `npm run report` pour voir les annotations dans le rapport."
