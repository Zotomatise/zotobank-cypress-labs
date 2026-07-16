---
description: Scaffolder un test Cypress ZotoBank avec la méthode ATAP
---
# À placer dans : .github/prompts/nouveau-test.prompt.md
# Activer d'abord le réglage VS Code : "chat.promptFiles": true
# Ensuite, dans Copilot Chat, tape /nouveau-test

Génère un test Cypress pour ZotoBank en suivant la méthode ATAP.

- Si je ne t'ai pas donné le scénario, demande-le-moi d'abord.
- Cible les éléments par `data-testid` uniquement.
- Structure `describe` / `it`, nom du test explicite en français.
- Commente l'intention (Analyser) avant le code.
- Si le test a besoin d'être connecté, propose un `beforeEach` de connexion (johndoe / s3cret).
- Termine par : "Relance le test pour vérifier qu'il passe au vert."
