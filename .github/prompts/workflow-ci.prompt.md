---
mode: agent
description: Générer ou mettre à jour le workflow GitHub Actions Cypress + Allure
---

Mets à jour `.github/workflows/cypress.yml` pour ce projet Cypress ZotoBank.

Contraintes :
- Runner : `ubuntu-latest`, Node.js 20
- Action Cypress officielle : `cypress-io/github-action@v6`
- `baseUrl` : `https://zotobank.zotomatise.com`
- Allure activé via `CYPRESS_allure: true`
- `if: always()` obligatoire sur les steps Allure (génération + upload)
- Artefact `allure-report` conservé 7 jours
- Triggers : `push` sur `main` et `develop`, `pull_request` sur `main`, `schedule` lundi-vendredi à 6h UTC

Montre le fichier complet `.github/workflows/cypress.yml`.
Explique en une ligne pourquoi `if: always()` est indispensable.
