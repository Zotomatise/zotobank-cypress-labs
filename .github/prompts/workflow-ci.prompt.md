---
description: Générer ou mettre à jour le workflow GitHub Actions Cypress + Allure
---

Mets à jour `.github/workflows/cypress.yml` pour ce projet Cypress ZotoBank.

Contraintes :

- Runner : `ubuntu-latest`, Node.js 20
- Action Cypress officielle : `cypress-io/github-action@v6`
- Garder une CI lisible dans GitHub Actions : ne pas masquer toute la préparation dans un seul step opaque
- Séparer visiblement au minimum les phases `setup-node`, `npm ci`, `cypress verify` et `cypress run`
- Si besoin, utiliser `actions/setup-node` pour Node 20 puis `cypress-io/github-action@v6` uniquement pour l'exécution des tests avec l'installation désactivée
- `baseUrl` : `https://zotobank.zotomatise.com`
- Allure activé via `CYPRESS_allure: true`
- `if: always()` obligatoire sur les steps Allure (génération + upload)
- Commande génération : `npx allure generate allure-results --clean -o allure-report` (`allure-commandline` est en devDependency — npx trouve la v2 locale, pas besoin de télécharger)
- Artefact `allure-report` conservé 7 jours
- Triggers : `push` sur `main` et `develop`, `pull_request` sur `main`, `schedule` lundi-vendredi à 6h UTC

Montre le fichier complet `.github/workflows/cypress.yml`.
Explique en une ligne pourquoi `if: always()` est indispensable.
Explique en une ligne pourquoi un workflow découpé en plusieurs steps facilite le diagnostic quand GitHub Actions semble bloqué.
