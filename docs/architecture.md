# Architecture

The shell (4200) loads four independently served Angular remotes: Products (4201), Cart (4202), Checkout (4203), and Profile (4204). Native Federation exposes each remote's route configuration; the shell owns navigation and a remote-load fallback.

Cross-remote communication uses typed CustomEvents defined in `libs/contracts`. Event payloads must remain backwards-compatible and must never contain credentials, tokens, payment data, or sensitive personal information. Cart state is in memory and resets on reload. Checkout creates a demo reference only. Profile contains no real account data.
