# Account Review Success Popup Design

**Date:** 2026-05-04

## Goal

Replace the browser `alert` shown after a successful product review submission on the account page with an in-app success popup that matches the existing modal-based UI.

## Current Problem

- The account page review flow lives in [`src/app/account/page.tsx`](d:/Fashion/src/app/account/page.tsx).
- After the user clicks `Gửi đánh giá`, the current code waits for the simulated submit, then calls `alert("Cảm ơn bạn đã đánh giá!")`.
- The browser alert breaks the visual experience and does not match the rest of the storefront, which already uses overlays and animated modals.

## Approved Direction

- Keep the existing review modal for rating and comment input.
- After a successful submit, close the review modal and open a dedicated centered success popup.
- Do not use a toast.
- Do not leave the user inside the form modal with a browser alert.

## Interaction Flow

1. User opens the review modal from the account page.
2. User chooses a rating and enters a comment.
3. User clicks `Gửi đánh giá`.
4. The existing loading state remains active during submission.
5. When the submit finishes successfully:
   - close the review modal
   - reset review form state
   - open a success popup in the center of the screen
6. User can dismiss the popup by:
   - clicking the close button
   - clicking the `Đóng` action button
   - clicking the overlay

## UI Design

- Reuse the existing overlay and motion style already used for the review modal.
- The success popup should contain:
  - a success icon
  - a clear title such as `Đánh giá đã được gửi`
  - a short thank-you message
  - one primary dismiss action
- The popup should feel visually consistent with the account page: clean white card, subtle border/shadow, compact luxury storefront styling.

## State Changes

- Introduce one dedicated boolean state for the success popup.
- Keep the current `isSubmittingReview` loading state.
- Preserve the current review modal state separation so the success popup does not overload the review form logic.

## Constraints

- Limit changes to the account review flow in `src/app/account/page.tsx`.
- Preserve current fake-submit timing and existing review modal behavior.
- Avoid introducing a global popup system for this change.
