# Deployment

Run `npm run build:all`; outputs are written to `dist/<application>`. Replace local URLs in the shell's `assets/federation.manifest.json` with each remote's deployed HTTPS `remoteEntry.json` URL.

Remotes may use separate origins or paths on one origin; separate hosting providers are optional. Before production, use HTTPS, allow-list trusted remote origins, configure CORS and CSP, cache hashed assets immutably and federation manifests briefly, deploy remote assets before publishing updated entry points, retain prior releases for rollback, and validate the shell/remote version matrix in staging. Add backend authentication and authorization before exposing account data. Payment must use a backend-controlled provider flow.

The local manifest is not a production allow-list. Maintain environment-specific manifests and review every remote origin as a trusted code-execution dependency.
