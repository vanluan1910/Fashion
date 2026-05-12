# Storefront Typography Refresh Design

Date: 2026-05-04
Scope: `src/` storefront only, not `admin/` or `backend/`

## Goal

Move the customer-facing storefront to a `modern premium minimal` typography system that feels cleaner and more consistent for fashion ecommerce.

## Approved Direction

- Use `Work Sans` as the primary UI and body font across the storefront.
- Keep `Playfair Display` only for high-importance editorial headings such as hero titles and major section headings.
- Do not use `Roboto` overrides in page-local inline styles.
- Keep `Eleganto Sans` available in the codebase, but do not use it as the default storefront font system.

## Current Problems

- `globals.css` maps both `font-sans` and `font-serif` to `Playfair Display`, so the storefront does not have a real sans-serif system.
- Several pages and shared components inject `Roboto !important`, which breaks typography consistency.
- The layout imports `Work Sans`, `Playfair Display`, and `Eleganto Sans`, but the actual CSS and page-level overrides do not align with that intended system.

## Design Rules

### Global Typography

- `body`, buttons, inputs, labels, menus, product metadata, prices, and general content use `Work Sans`.
- `font-sans` resolves to `Work Sans`.
- `font-serif` resolves to `Playfair Display`.

### Editorial Typography

- `h1` through `h6` keep `Playfair Display` by default.
- Existing areas already using `font-serif` continue to feel elevated without changing their layout behavior.

### Cleanup

- Remove inline `<style>` blocks that force `Roboto` on major storefront pages and shared UI.
- Do not introduce a new typography utility system unless required; prefer fixing the current token mapping and removing overrides.

## Files Expected To Change

- `src/app/layout.tsx`
- `src/app/globals.css`
- Storefront pages/components that inject `Roboto` inline styles, including:
  - `src/app/page.tsx`
  - `src/app/blog/page.tsx`
  - `src/app/cart/page.tsx`
  - `src/app/checkout/page.tsx`
  - `src/app/shop/page.tsx`
  - `src/app/wishlist/page.tsx`
  - `src/app/account/page.tsx`
  - `src/shared/components/Header.tsx`
  - `src/features/products/components/ProductDetail.tsx`

## Risks

- Some pages may currently rely on the forced `Roboto` overrides for spacing or visual balance, so removing them could slightly change perceived density.
- Keeping serif on all headings may still feel a bit more editorial than fully minimal, but that is an intentional compromise to preserve fashion character.

## Verification Plan

- Run a targeted search to confirm `Roboto` inline overrides are removed from storefront code.
- Run the storefront build or lint command that is available in this repository to catch class or syntax regressions.

