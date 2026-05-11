# Dashboard Editorial Essential Design

**Date:** 2026-05-11

## Goal

Reduce the admin dashboard to only the information that matters most, then rebuild the layout so it feels cleaner, more premium, and more editorial.

This change is presentation-focused. It must not change backend logic, data meaning, or navigation behavior.

## Confirmed Decisions

- Keep only these dashboard blocks:
  - summary metrics
  - revenue chart
  - recent orders
- Remove non-essential blocks from the page:
  - notifications
  - category chart
  - extra hero snapshots or duplicate summaries
- Show `3` summary metrics, not `4+`
- Chart direction: more elegant and fashion/editorial, not enterprise
- Preferred chart style: `bar chart with a trend line`
- Overall layout direction: `editorial split`
- Top band refinement: `soft luxury panel`
- Tone preference for the top band: `mềm mại, nữ tính, luxury`
- Top metrics should be treated as `equally important`

## Current Problem

The page currently shows too many competing sections for the amount of information that actually matters. Important data is diluted by duplicate summaries, side panels, and extra visual blocks.

The result is not a lack of features. It is a lack of focus.

## Scope

This design covers:

- `admin/src/app/page.tsx`
- dashboard-only styling additions in `admin/src/app/globals.css` if needed

Out of scope:

- backend API changes
- metric calculation changes
- sidebar, shell, or header redesign
- unrelated admin pages

## Content Strategy

The page should show only three layers of information:

1. summary metrics for fast scanning
2. one primary revenue visualization for trend reading
3. one recent orders table for operations

Anything else should be removed from this screen.

## Data Hierarchy

### Summary Metrics

Use exactly three metrics:

- total revenue
- total orders
- average order value

Reasoning:

- revenue is the main business signal
- orders show volume
- average order value gives a more useful commercial read than customers or conversion for this reduced layout
- none of the three metrics should visually dominate the other two

### Primary Chart

Use one chart only:

- rounded vertical bars for revenue by period
- one thin trend line over the bars

Reasoning:

- bars keep period-by-period reading clear
- the line adds a more refined, editorial sense of movement
- this looks more premium than a plain bar chart but stays more grounded than a soft area chart

### Operations Table

Keep the recent orders table, but make it tighter and more selective.

Columns should prioritize:

- customer / order id
- date
- status
- total amount

The product column may remain on desktop if spacing still feels balanced, but it should not dominate the table.

## Layout Plan

### 1. Top Band

Create one unified `soft luxury panel` instead of separate KPI cards.

Structure:

- top: short editorial heading
- bottom: three summary metrics on the same visual plane

The top metrics should not be rendered as three separate card widgets.

They should feel like one composed panel with:

- very soft boundaries
- larger corner radii
- warmer surface treatment
- more whitespace
- thin dividers or spacing instead of obvious boxes

The top band should not contain descriptive paragraphs, helper text, or secondary summaries.

The three metrics should be equal in hierarchy:

- no hero metric
- no oversized featured number
- no stacked “main + supporting” KPI arrangement

### 2. Main Feature Band

Make the revenue chart the visual centerpiece of the page.

Desktop:

- wide revenue chart block spanning most of the row
- compact filter controls aligned cleanly at the top edge

Mobile:

- controls stack above the chart
- chart remains readable without horizontal overflow

### 3. Operations Band

Place recent orders in a full-width or near-full-width block beneath the chart.

This keeps the page reading like:

- headline numbers
- trend view
- operational detail

That sequence is cleaner and more fashion-editorial than multiple side-by-side widgets.

## Visual Direction

The design should feel:

- editorial
- warm
- premium
- quiet
- soft
- feminine

Guidelines:

- fewer cards overall
- larger negative space
- stronger typographic hierarchy
- softer but more deliberate surfaces
- no extra decorative widgets
- avoid dashboard-hard card repetition in the hero area

## Component Treatment

### Metric Blocks

For the top band:

- large values
- compact uppercase labels
- optional small delta chip only where useful
- no extra descriptions
- metrics should live inside one shared panel, not isolated cards
- separators should be understated and elegant

### Revenue Chart Container

- one prominent surface
- clean header with minimal copy
- warm neutral palette
- subtle borders and shadows

### Orders Table

- calmer header
- less visual weight in secondary text
- strong alignment for amount and status
- empty state kept to one line only

## Responsive Plan

- mobile: stack metrics, chart, and orders vertically
- tablet: keep chart dominant and table below
- desktop: preserve the editorial reading order with the chart as the largest block

The layout should never depend on a narrow right sidebar for essential information.

## Risks

- removing too much could make the top section feel empty if spacing is not handled carefully
- keeping both a hero band and a KPI row would reintroduce duplication
- too much chart decoration would break the quiet editorial goal

## Testing

Verify:

- the page still fetches and renders the same data
- only the essential sections remain
- the chart reads clearly for all period selections
- the orders table stays readable on smaller widths
- no overflow or awkward empty spacing appears after block removal

## Success Criteria

This refresh is successful if:

- the dashboard shows only essential data
- the chart becomes the visual anchor of the page
- the page feels more premium and more focused than the current version
- the screen reads quickly without feeling empty or generic
