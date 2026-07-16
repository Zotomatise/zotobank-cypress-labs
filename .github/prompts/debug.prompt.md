---
description: Expliquer la cause d'un test Cypress rouge, puis corriger
---
# À placer dans : .github/prompts/debug.prompt.md  (réglage chat.promptFiles activé)
# Usage : dans Copilot Chat, tape /debug

Voici un test Cypress qui échoue. Aide-moi à le débloquer.

1. Si je n'ai pas collé l'erreur, demande-la-moi (ou propose d'utiliser `#terminalLastCommand`).
2. Explique d'abord la CAUSE, en la classant : sélecteur faux (ton code), action manquante,
   mauvaise hypothèse (ce que tu attendais n'arrive pas), ou comportement réel différent de l'app.
3. Propose le correctif minimal, en gardant les `data-testid`.
4. Termine par : "Relance le test pour vérifier qu'il passe au vert."
