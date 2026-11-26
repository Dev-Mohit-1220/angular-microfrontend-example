# Deployment

## Vercel monorepo deployment

Deploy the five Angular applications as **five separate Vercel projects connected to this same GitHub repository**. Keep the Vercel Root Directory set to the repository root (`.`) for every project. This is intentional: the Angular workspace, package manifest, lockfile, shared styles, and all five applications live at the repository root.

Create one Vercel project per app with these settings:

| Vercel project | Build command | Output directory |
|---|---|---|
| `shopsphere-shell` | `npm run build:shell` | `dist/shell/browser` |
| `shopsphere-products` | `npm run build:products` | `dist/products/browser` |
| `shopsphere-cart` | `npm run build:cart` | `dist/cart/browser` |
| `shopsphere-checkout` | `npm run build:checkout` | `dist/checkout/browser` |
| `shopsphere-profile` | `npm run build:profile` | `dist/profile/browser` |

Use these common settings for all five projects:

- Framework Preset: Angular
- Root Directory: `.` (repository root)
- Install Command: `npm ci --no-audit --no-fund`
- Node.js Version: 22.x
- Production Branch: `master` after PR #2 is merged
- Keep the repository-root `vercel.json`; it supplies the Angular SPA fallback rewrite.

The Angular application builder writes browser assets into each `dist/<app>/browser` directory. Confirm the output path in the Vercel build log if the Angular builder version changes.

## Shell federation environment variables

The Shell must load the four independently deployed remotes. In the **shopsphere-shell** Vercel project, configure these environment variables for both Production and Preview:

| Variable | Value format |
|---|---|
| `FEDERATION_PRODUCTS_URL` | `https://<products-project-domain>/remoteEntry.json` |
| `FEDERATION_CART_URL` | `https://<cart-project-domain>/remoteEntry.json` |
| `FEDERATION_CHECKOUT_URL` | `https://<checkout-project-domain>/remoteEntry.json` |
| `FEDERATION_PROFILE_URL` | `https://<profile-project-domain>/remoteEntry.json` |

Replace each placeholder with the actual stable Vercel domain assigned to that remote project.

The Shell build runs `scripts/write-federation-manifest.mjs`. It writes the deployment-specific URLs to `apps/shell/public/federation.manifest.json` before Angular builds. Vercel builds fail if a remote URL is missing, malformed, or not HTTPS. Local builds continue to use localhost ports 4201–4204.

## Deployment order

1. Create the four remote Vercel projects and deploy them first.
2. Copy each remote's stable production domain into the Shell project's environment variables.
3. Deploy the Shell project.
4. Open the Shell domain and verify that all four remote routes load.
5. Test direct navigation and browser refresh on every remote route.

The root `vercel.json` rewrites client-side routes to `index.html`, so Angular Router refreshes work on each project. Existing static files, including `remoteEntry.json`, are served as assets.

## Release and security notes

Remotes are executable code loaded by the Shell. Only configure trusted HTTPS remote origins. Keep production and preview variables aligned with the remote deployment environment. Deploy remote assets before publishing a Shell manifest that references them, retain prior releases for rollback, and validate the Shell/remote version matrix in staging.

The app remains mock-data-only: there is no backend persistence, real authentication, or payment processing. Vercel hosts the static frontend applications only.
