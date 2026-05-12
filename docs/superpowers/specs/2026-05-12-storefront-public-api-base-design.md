## Goal

Make the storefront work correctly when shared through a public tunnel by removing hardcoded local backend origins from client-facing service modules and routing them through one shared API base derived from `NEXT_PUBLIC_API_URL`.

## Problem

The storefront currently renders through a public tunnel on port `3000`, but several service modules still call `http://127.0.0.1:5000/api/...` directly. When another person opens the public storefront URL, those requests resolve against their own machine instead of the developer's backend, so product and related data fails to load.

## Scope

In scope:

- Storefront service modules under `src/` that currently hardcode `127.0.0.1:5000`
- A shared storefront API base utility or config module
- Regression tests for the storefront product service base URL behavior

Out of scope:

- Admin application under `admin/`
- Backend route changes
- Deployment or Cloudflare account configuration

## Recommended Approach

Create one shared storefront API base that resolves to:

- `process.env.NEXT_PUBLIC_API_URL` when provided
- `http://127.0.0.1:5000/api` as the local-development fallback

Then update storefront service modules to compose endpoint URLs from that base instead of embedding full local URLs per file.

This is preferred over patching only `productsService` because the repo already contains multiple storefront services with the same public-tunnel failure mode. Fixing only products would leave auth, reviews, blog, and orders inconsistent.

## Affected Areas

Expected storefront files:

- `src/features/products/services/productsService.ts`
- `src/core/providers/AuthProvider.tsx`
- `src/features/account/services/reviewService.ts`
- `src/features/blog/services/blogService.ts`
- `src/features/blog/services/blogCommentService.ts`
- `src/features/checkout/services/orderService.ts`

Possible new shared file:

- `src/shared/config/api.ts` or equivalent storefront-only config module

## Data Flow

1. Storefront code reads a shared API base.
2. If `NEXT_PUBLIC_API_URL` is set, requests go to the public backend origin, for example `https://<backend>.trycloudflare.com/api`.
3. If not set, requests continue using the current local backend fallback.
4. Service modules append their resource paths such as `/products`, `/orders`, `/auth`, `/reviews`, and `/blogs`.

## Testing

Add a small regression test around the storefront products service or shared API-base utility to prove:

- default behavior uses the local fallback when the env var is absent
- public behavior uses `NEXT_PUBLIC_API_URL` when present

If the existing test setup is too thin for direct unit coverage, add the narrowest possible test file or utility-level test rather than broad integration coverage.

## Risks And Constraints

- Client-side env variables in Next.js must use the `NEXT_PUBLIC_` prefix.
- If `NEXT_PUBLIC_API_URL` includes `/api`, service modules must avoid duplicating the segment.
- Existing local development behavior must remain unchanged when no env var is set.
- Other runtime issues like CORS on the backend may still need separate configuration, but they are not the root cause found in this repo.

## Usage After Change

For local development:

- no extra configuration required

For public tunnel sharing:

1. Start the backend tunnel.
2. Set `NEXT_PUBLIC_API_URL` to the backend public URL with `/api`.
3. Start or restart the storefront.
4. Share the storefront public URL.
