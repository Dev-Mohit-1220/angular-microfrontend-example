# Architecture

## Application boundaries

The Shell (4200) owns the application frame, top-level navigation, route activation, and remote loading. Products (4201), Cart (4202), Checkout (4203), and Profile (4204) expose route configurations through Native Federation. A remote must not import another remote's implementation; cross-application dependencies belong in `libs/contracts`.

Each remote owns its feature UI and local presentation state. The Shell does not own remote feature state. Shared contracts are deliberately limited to product/cart models and versioned event names and payloads. Avoid adding general-purpose service abstractions until more than one real consumer requires them.

## Runtime communication

Cross-remote communication uses typed browser CustomEvents from `libs/contracts`. Event names and payloads are public APIs: changes must be backward-compatible or introduced as a new event contract. Listeners must be removed when their owning component is destroyed.

Events must never contain credentials, tokens, payment data, or sensitive personal information. Cart state is held in the browser window and resets on reload; it is a demonstration mechanism, not durable storage or a security boundary.

## Failure behavior

The Shell displays a startup error if federation initialization or Angular bootstrap fails. Remote route loading is isolated: a failed remote renders the unavailable state instead of taking down the Shell. Navigation shows a status indicator while lazy routes are resolving. Production monitoring, retry policy, and version compatibility enforcement remain deployment concerns.

## Current product limitations

The Products remote uses a small static catalogue. Checkout creates a demo reference only and does not collect payment details or process transactions. Profile is a placeholder and contains no account data. There is no backend, authentication, persistence, or real payment processing.
