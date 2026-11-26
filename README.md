# ShopSphere — Angular Microfrontends

Angular 22 + Native Federation workspace using strict TypeScript and standalone APIs. Implementation for [Epic #1](https://github.com/Dev-Mohit-1220/angular-microfrontend-example/issues/1).

| App | Port | Responsibility |
|---|---:|---|
| Shell / Host | 4200 | Navigation, runtime loading, fallback |
| Products | 4201 | Mock catalogue and add-to-cart |
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
npm run typecheck
npm run build:all
```

Product data is mock data. Cart state resets on reload. Checkout does not collect payment details or process transactions. Profile contains no account data. Real authentication, persistence, payments, and production observability remain outside this initial implementation.

See [architecture](docs/architecture.md), [deployment](docs/deployment.md), and [testing strategy](docs/testing.md). Angular and Native Federation are pinned to the compatible 22.2.5 release line.
