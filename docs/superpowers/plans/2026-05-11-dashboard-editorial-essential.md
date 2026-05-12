# Dashboard Editorial Essential Implementation Plan

**Goal:** Reduce the admin dashboard to three summary metrics, one premium revenue chart, and one recent orders table in a cleaner editorial layout.

**Architecture:** Keep all work inside `admin/src/app/page.tsx` and `admin/src/app/globals.css`. Preserve the current fetch flow and API shape. Remove non-essential blocks from rendering, then restyle the remaining blocks into a clear reading sequence: heading, metrics, chart, orders.

**Tech Stack:** Next.js App Router, React, Tailwind CSS v4, existing admin design tokens, Recharts

## Task 1: Simplify the dashboard data model and rendering

**Files**
- Modify: `admin/src/app/page.tsx`

- [ ] Keep the existing fetch lifecycle, error state, and loading state.
- [ ] Reduce summary metrics from four items to three:
  - total revenue
  - total orders
  - average order value
- [ ] Remove category chart, notifications, duplicate hero snapshots, and extra summary blocks.
- [ ] Keep recent orders and existing currency/date/status formatting.

## Task 2: Rebuild the page into an editorial hierarchy

**Files**
- Modify: `admin/src/app/page.tsx`

- [ ] Create a restrained top band with:
  - short heading
  - compact status badge
  - three metric blocks beneath or beside the heading
- [ ] Make the revenue chart the primary visual block.
- [ ] Move recent orders into a wide block beneath the chart.
- [ ] Keep period and year filters, but align them cleanly with the chart header.

## Task 3: Upgrade chart presentation

**Files**
- Modify: `admin/src/app/page.tsx`

- [ ] Replace the plain bar-only chart with a more premium `ComposedChart` treatment:
  - rounded bars
  - thin revenue trend line
  - minimal tooltip and grid styling
- [ ] Keep the chart readable across `week`, `month`, and `year` data sets.

## Task 4: Add dashboard-specific styling

**Files**
- Modify: `admin/src/app/globals.css`

- [ ] Add small semantic classes for:
  - metric blocks
  - chart shell
  - header badge
  - section shell
- [ ] Keep the palette warm and quiet.
- [ ] Prefer spacing and typography over decorative surfaces.

## Task 5: Verify

**Files**
- None

- [ ] Run `npx eslint src/app/page.tsx` in `admin`
- [ ] Run `npm run build` in `admin`
- [ ] Check for layout regressions in the rendered structure via build/lint feedback
