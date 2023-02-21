# The Quest

This repo contains the source code for a web app for The Quest PC23. Built using Vue 3 with TypeScript

## Configuration

Some configuration files that are needed are not commited.
This project requires a `firebase.config.ts` file in the root of the project, with 2 exports:

- `apiURL` - base URL to the API that is deployed to Firebase Functions (2nd gen), see `functions` folder
- `firebaseConfig` - firebase configuration, can be found in the Firebase Console -> Project settings

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Tools and libraries

Most important tools and libraries used in this project

- Vite-based setup, dev server and build tool
- vue-router for routing
- vue-i18n for localization
- pinia for state management
- TailwindCSS for styling (+PostCSS)
- Prettier for code formatting
- Firebase for backend (Auth + Firestore + Functions)
