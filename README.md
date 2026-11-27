# ShopSphere — Angular Microfrontends

Angular 22 + Native Federation workspace using strict TypeScript and standalone APIs.

| App | Port | Responsibility |
|---|---:|---|
| Shell / Host | 4200 | Navigation, runtime loading, fallback |
| Products | 4201 | Small static catalogue and add-to-cart |
| Cart | 4202 | In-memory cart and count events |
| Checkout | 4203 | Demo confirmation only; no payments |
| Profile | 4204 | Profile placeholder |

## Run

Requires Node.js 22.12+ and npm 10+.

```bash
npm install
npm start
```

Run the remotes in separate terminals: `npm run start:products`, `npm run start:cart`, `npm run start:checkout`, and `npm run start:profile`. Open http://localhost:4200 once all are running.

## Validate

```bash
npm run format:check
npm run lint
npm run typecheck
npm test
npm run build:all
```

CI applies Prettier formatting on push and validates formatting, lint, types, tests, and all five production builds.

## Scope

The Products catalogue is static mock data. Cart state resets on reload. Checkout does not collect payment details or process transactions. Profile contains no account data. There is no backend, real authentication, persistence, or payment processing.

See [architecture](docs/architecture.md), [deployment](docs/deployment.md), and [testing](docs/testing.md).
