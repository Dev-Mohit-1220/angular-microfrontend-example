# Testing

## Automated checks

Run the same checks locally that CI runs:

```bash
npm run format:check
npm run lint
npm run typecheck
npm test
npm run build:all
```

Vitest runs the shared contract tests in a jsdom environment. These tests cover cart updates, quantity aggregation, event delivery, and listener cleanup. The production build validates that each independently deployed application can be compiled.

## Manual federation integration checks

The following checks still require a browser and all five apps running or deployed:

1. Open the Shell and verify the Products remote renders.
2. Add the same product twice; verify quantity and Shell cart count update.
3. Open Cart and remove the product; verify both Cart and Shell counts update.
4. Open Checkout with an empty cart and confirm the action is disabled.
5. Add a product, confirm a demo order, and verify a demo reference appears.
6. Stop one remote or configure an invalid remote URL; verify the Shell remains usable and displays the unavailable state for that route.
7. Open each remote route directly and refresh the browser.

Browser E2E coverage for these flows, accessibility automation, dependency/secret scanning, and deployed-manifest smoke tests are not yet configured. Do not treat a successful production build as proof that remote runtime loading works in a browser.
