# SAFETINO Horizontal Logo Design

**Date:** 2026-05-04

## Goal

Make the storefront logo read more clearly by switching from the current stacked composition to a horizontal composition while preserving the existing SAFETINO symbol and wordmark.

## Current Problem

- The active logo asset [`public/images/lo_go.png`](d:/Fashion/public/images/lo_go.png) is a square composition with the icon above the wordmark.
- In narrow header/footer slots, the square asset leaves too much unused horizontal space.
- The result is a visually short logo that makes the wordmark feel smaller than it should.

## Approved Direction

- Keep the existing symbol and existing stylized SAFETINO lettering.
- Create a new transparent PNG asset that places the symbol on the left and the wordmark on the right.
- Do not overwrite the original square asset.
- Update the shared storefront header and footer to use the horizontal variant with dimensions tuned for readability.

## Asset Strategy

- Source asset: `public/images/lo_go.png`
- Output asset: `public/images/lo_go_horizontal.png`
- Construction approach:
  - Crop the existing icon and wordmark from the source PNG.
  - Recompose them side-by-side on a transparent canvas.
  - Scale the wordmark up moderately so it stays legible when rendered small in the header.

## UI Impact

- Desktop header logo becomes wider and more balanced within the existing primary badge.
- Mobile header logo uses the same horizontal asset with a narrower width cap.
- Footer logo gains a clearer wordmark without changing surrounding layout structure.

## Constraints

- Preserve the current SAFETINO visual identity.
- Keep changes limited to shared storefront logo usage.
- Avoid unrelated layout refactors.
