---
description: Ajouter le déploiement du rapport Allure sur GitHub Pages
---

Mets à jour `.github/workflows/cypress.yml` pour déployer le rapport Allure sur GitHub Pages après chaque run.

Contraintes :
- Ajouter un step `Deploy to GitHub Pages` après le step `Upload Allure report artifact`
- Utiliser `peaceiris/actions-gh-pages@v4` pour déployer le dossier `allure-report/` sur la branche `gh-pages`
- Le step doit avoir `if: always()` pour déployer même si des tests échouent
- Le token à utiliser : `${{ secrets.GITHUB_TOKEN }}`
- Branche de publication : `gh-pages`
- Dossier source : `allure-report`

Rappel : GitHub Pages doit être activé sur le repo (Settings → Pages → Source : branche `gh-pages`).

Montre uniquement les steps ajoutés, pas tout le fichier.
Termine par l'URL du rapport : `https://<organisation>.github.io/<repo>/`
