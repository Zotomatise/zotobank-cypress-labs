---
description: Ajouter Environment, Executors et Categories dans le rapport Allure
---

Mets à jour `.github/workflows/cypress.yml` pour remplir les sections vides du rapport Allure.

Ajouter ces 3 steps **entre** le step "Run Cypress tests" et le step "Generate Allure report" :

1. **Environment** — écrire `allure-results/environment.properties` avec Browser, Base URL, Environment, Node version
2. **Executors** — écrire `allure-results/executor.json` avec le nom "GitHub Actions", le numéro de run (`github.run_number`) et l'URL cliquable vers le run (`github.server_url`, `github.repository`, `github.run_id`)
3. **Categories** — créer `allure-results/categories.json` avec 4 catégories : "Échecs produit" (failed), "Tests cassés" (broken), "Tests ignorés" (skipped), "Timeout" (broken + messageRegex ".*Timed out.*")

Contraintes :
- Tous les steps doivent avoir `if: always()`
- Utiliser `mkdir -p allure-results` avant chaque écriture
- Le fichier `categories.json` doit être écrit inline dans le step (pas de `cp`)

Montre uniquement les 3 steps à ajouter, pas tout le fichier.
Termine par : "Relance un run pour voir Environment, Executors et Categories remplis dans le rapport."
