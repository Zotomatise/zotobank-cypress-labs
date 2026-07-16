---
description: Relire un test et vérifier les réflexes d'un bon test
---
# À placer dans : .github/prompts/revue.prompt.md  (réglage chat.promptFiles activé)
# Usage : dans Copilot Chat, tape /revue

Relis ce test Cypress et dis-moi s'il respecte les réflexes d'un bon test. Pour chaque point :
OK, ou à améliorer avec une suggestion concrète.

- Intention claire : le nom du `it` dit ce qu'on prouve ?
- Déterministe : même résultat à chaque exécution (pas de dépendance au hasard / à l'ordre) ?
- Isolé : repart d'un état connu (pas dépendant d'un autre test) ?
- Observable : assertion stable (URL, data-testid, texte non traduisible), pas de sélecteur fragile ?
- Lisible : un collègue comprend le scénario sans explication ?
- Pas hardcodé : pas de données ou de sélecteurs codés en dur, utilisation de fixtures ou de variables ?
- Utilisation de selecteurs robustes : utilisation de data-testid ou d'autres sélecteurs stables plutôt que des classes CSS ou des IDs dynamiques ?

Ne réécris pas tout le test. Propose seulement des améliorations ciblées.
