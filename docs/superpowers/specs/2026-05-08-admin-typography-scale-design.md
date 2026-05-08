# Admin Typography Scale Design

## Goal

Normalize typography across `admin/src` so the admin UI feels compact, premium, and visually consistent.

This work focuses on text sizing, weight, line-height, and label density. It does not redesign page structure, data flow, or business behavior.

## Problem

The current admin UI mixes many one-off text sizes such as `10px`, `11px`, `12px`, `13px`, `14px`, `15px`, `16px`, and `text-2xl` across similar interface patterns.

This causes three visible issues:

1. Similar elements do not look related across pages.
2. Small uppercase labels become noisy because they combine tiny sizes with aggressive tracking.
3. Some screens feel oversized while others feel cramped, especially in cards, filters, tables, and modal surfaces.

## Scope

This typography normalization applies to admin UI surfaces under `admin/src`, with priority on:

- `admin/src/app/page.tsx`
- `admin/src/app/customers/page.tsx`
- `admin/src/app/settings/page.tsx`
- `admin/src/app/inventory/page.tsx`
- `admin/src/app/reviews/page.tsx`
- `admin/src/app/products/add/page.tsx`
- `admin/src/app/products/edit/[id]/page.tsx`
- shared admin components that define repeated text patterns such as modal, layout header, and reusable editor wrappers

Out of scope:

- storefront `src/`
- backend `backend/`
- color palette redesign
- layout restructuring
- data fetching changes

## Design Direction

The chosen direction is a compact typography system built from shared semantic tokens instead of page-specific hardcoded sizes.

The admin should read as:

- compact, not cramped
- refined, not loud
- consistent, not repetitive

## Typography System

Typography should be normalized around a small shared scale.

### Core sizes

- page title: `26px` mobile, `30px` desktop
- section title: `18px` to `20px`
- stat value: `26px` to `28px`
- body text: `14px`
- form and control text: `14px`
- form label: `13px`
- secondary and helper text: `12px` to `13px`
- table header and micro labels: `11px` to `12px`

### Weight rules

- page title: `font-semibold`
- section title: `font-semibold`
- stat value: `font-semibold`
- body text: `font-medium` only where current design needs stronger reading contrast, otherwise regular inherited weight
- controls and buttons: `font-medium` or `font-semibold`, avoid `font-black`
- small labels: `font-semibold`, avoid exaggerated heavy weights

### Tracking rules

- headings: slight negative tracking only
- body text: normal tracking
- uppercase utility labels: reduced tracking compared with current implementation
- avoid combining very small text with very wide tracking unless it is a rare accent

### Line-height rules

- titles: tight but readable
- body and helper text: relaxed enough for dashboard copy, table meta, and modal descriptions
- compact labels: keep line-height close to single-line usage

## Implementation Strategy

### Shared foundation

Add semantic typography classes in `admin/src/app/globals.css` so repeated patterns stop hardcoding raw pixel sizes.

Expected shared classes:

- `.admin-page-title`
- `.admin-page-subtitle`
- `.admin-section-title`
- `.admin-stat-label`
- `.admin-stat-value`
- `.admin-body`
- `.admin-meta`
- `.admin-form-label`
- `.admin-table-label`
- `.admin-button-text`

These classes should encode size, weight, tracking, and line-height together.

### Page migration

Update priority pages to use semantic classes first, especially for:

- page headers
- KPI/stat cards
- toolbar labels and filters
- table headers and row metadata
- modal titles and modal helper text
- form labels, inputs, buttons, and empty states

### Normalization rule

When a text element represents an existing semantic role, it should use the shared class instead of inline `text-[...]` sizing.

One-off sizes should remain only where the content is domain-specific and intentionally exceptional, such as rich text editor content headings.

## Component Expectations

### Page headers

All admin pages should share one visual hierarchy:

- title uses `admin-page-title`
- supporting description uses `admin-page-subtitle`

This removes cases where one page uses bold `2xl` while another uses smaller custom values for the same hierarchy.

### KPI and summary cards

Stat cards should use one consistent label/value pairing:

- label uses `admin-stat-label`
- value uses `admin-stat-value`

### Tables

Table headings should feel compact and deliberate, not tiny and overtracked.

Use:

- `admin-table-label` for column headers
- `admin-body` or `admin-meta` for primary and secondary row text

### Forms and filters

Form labels and controls should use:

- `admin-form-label` for labels
- `admin-body` or `admin-button-text` for input and button text

This should make filters, selects, and modal forms read as one product instead of page-specific implementations.

## Data Flow and Behavior

No data flow or business logic changes are expected.

This work changes presentation only:

- CSS token definitions
- class names applied to JSX
- removal of inconsistent hardcoded font sizing

## Risks

Main risks:

1. Some screens may become too visually flat if every title is reduced without preserving hierarchy.
2. Existing spacing may feel off once text becomes smaller or less bold.
3. Rich text editor and modal content may need selective exceptions because they mix prose and UI controls.

Risk handling:

- preserve clear hierarchy between page title, section title, stat value, and body text
- adjust nearby spacing only when typography changes expose imbalance
- keep editor content headings as controlled exceptions if they serve authored content rather than admin chrome

## Testing

Verify visually across:

- dashboard
- customers
- settings
- inventory
- reviews
- product add/edit

Check specifically:

1. Titles align in hierarchy across pages.
2. Tables remain readable on desktop and mobile widths.
3. Filters and modal forms feel compact without becoming cramped.
4. Empty states and helper copy remain legible.
5. No page keeps obvious oversized or undersized outlier text unless intentionally exempted.

## Success Criteria

This design is successful when:

- repeated admin patterns use a shared type scale
- visual hierarchy is obvious without relying on oversized bold text
- pages feel denser and cleaner
- users no longer notice abrupt jumps between tiny labels and oversized headings
