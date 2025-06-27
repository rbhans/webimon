# Webimon

Webimon is a virtual pet and battle game inspired by classic key-chain Digimon devices. This monorepo contains the React frontend and Firebase Cloud Functions.

## Setup

```bash
npm install
cp .env.example .env # fill in Firebase credentials
npm run dev
```

## Deployment

```bash
npm run build
npm run deploy
```

The web app uses Vite + React, TailwindCSS, Firebase v10, and Zustand for state management. Cloud Functions are written in TypeScript and handle scheduled pet ticking and battle resolution.
