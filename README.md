# Stoik - URL Shortener

Application de raccourcissement d'URLs avec une API NestJS et un front React.

## Architecture

```
stoik/
├── api/    → NestJS, Drizzle ORM, PostgreSQL (architecture hexagonale)
└── front/  → React, Vite, Tailwind CSS
```

## Prérequis

- [Node.js](https://nodejs.org/) (v20+)
- [Docker](https://www.docker.com/)

## Installation

```bash
npm install
```

## Configuration

Créer un fichier `.env` dans chaque workspace :

**api/.env**

```env
DATABASE_URL=postgresql://user:password@localhost:5432/stoik
BASE_URL=http://localhost:3000
FRONTEND_URL=http://localhost:5173
```

**front/.env**

```env
VITE_API_URL=http://localhost:3000
```

## Démarrage

### Tout lancer

```bash
npm run dev
```

### Lancer séparément

```bash
npm run dev:api    # API uniquement (lance aussi Docker PostgreSQL)
npm run dev:front  # Front uniquement
```

### Appliquer les migrations

```bash
npx -w api drizzle-kit push
```

## API Endpoints

| Méthode | Route               | Description                       |
| ------- | ------------------- | --------------------------------- |
| POST    | `/api/links/shorten` | Raccourcir une URL                |
| GET     | `/:hash`            | Redirection vers l'URL originale  |

### Exemple

```bash
curl -X POST http://localhost:3000/api/links/shorten \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}'
```

```json
{
  "id": "123456789",
  "shortUrl": "http://localhost:3000/abc123"
}
```

## Scripts

| Script             | Description                        |
| ------------------ | ---------------------------------- |
| `npm run dev`      | Lance API + Front en parallèle     |
| `npm run dev:api`  | Lance Docker + API en mode watch   |
| `npm run dev:front`| Lance le front Vite                |
| `npm run build`    | Build API + Front                  |
| `npm test -w api`  | Lance les tests de l'API           |

## Stack technique

- **API** : NestJS, Drizzle ORM, PostgreSQL, Snowflake ID, class-validator
- **Front** : React 19, Vite, Tailwind CSS, TypeScript
