# Testing strategy

CI runs TypeScript checks and production builds for all five applications. Extend before production use with unit tests for event contracts and cart calculations, integration tests for remote navigation and failure recovery, browser E2E tests for cart/checkout/deep links/refresh, accessibility checks, dependency and secret scanning, and staging smoke tests against the deployed manifest. No automated test result is claimed by the scaffold commit.
