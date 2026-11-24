# Localhabitats

Localhabitats est une plateforme de recherche de logements construite avec Angular. Cette première
version propose une interface responsive avec des annonces de démonstration, une recherche par
ville ou quartier, des filtres par type et par budget, ainsi qu’une liste de favoris.
Tailwind CSS est configuré pour les vues Angular.

## Prérequis

- Node.js 22.12 ou une version ultérieure
- npm

## Installation et démarrage

Depuis le dossier `localhabitats` :

```bash
npm install
npm start
```

Ouvrez ensuite [http://localhost:4200](http://localhost:4200). L’application se recharge
automatiquement lorsque les fichiers source changent.

## Vérification de production

```bash
npm run build
```

Les fichiers générés se trouvent dans `dist/localhabitats`.

## Structure

- `src/app/app.ts` : annonces de démonstration, filtres et favoris.
- `src/app/app.html` : interface de recherche et présentation des logements.
- `src/app/app.css` : styles responsives de l’application.
- `src/styles.css` : styles globaux.
- `tailwind.config.js` : chemins de détection des classes Tailwind.
- `.postcssrc.json` : intégration de Tailwind CSS et Autoprefixer.

Les photos et les polices sont chargées depuis Unsplash et Google Fonts. Les annonces, la recherche
et les favoris sont locaux à la page ; aucun compte, enregistrement serveur ou service de réservation
n’est encore connecté.
