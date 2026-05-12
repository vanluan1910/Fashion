# Admin Dashboard Luxury Simple Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the admin dashboard feel luxury, calm, and simple while improving hierarchy, scanability, and layout polish.

**Architecture:** Keep the change inside `admin/src/app/page.tsx` and `admin/src/app/globals.css`. First simplify structure and content grouping, then tune the visual system through a few dashboard-specific classes, then verify the page at desktop and mobile widths. No backend or data-shape changes.

**Tech Stack:** Next.js App Router, React, Tailwind utility classes, existing admin CSS tokens, Recharts

---

### Task 1: Reshape dashboard layout

**Files:**
- Modify: `admin/src/app/page.tsx`

- [ ] **Step 1: Capture current render shape**

Keep the current data fetch and state model unchanged. Only reorganize the JSX so the dashboard reads in four clear bands: hero, KPI row, insights row, operations row.

```tsx
const heroStats = stats.slice(0, 2);
const kpiStats = stats;
```

- [ ] **Step 2: Rebuild hero and row structure**

Use a top hero section with left-aligned title/description/badge and two snapshot cards on the right. Then render KPI cards, then the chart row, then recent orders + notifications.

```tsx
<div className="space-y-6">
  <section className="admin-page-surface overflow-hidden">
    <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="p-6 sm:p-7 lg:p-8">{/* hero copy */}</div>
      <div className="border-t lg:border-t-0 lg:border-l p-6 sm:p-7 lg:p-8">{/* snapshot cards */}</div>
    </div>
  </section>

  <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">{/* KPI cards */}</section>

  <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">{/* charts */}</section>

  <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">{/* table + notifications */}</section>
</div>
```

- [ ] **Step 3: Tighten hero copy**

Replace filler copy with a shorter luxury/editorial line. Keep only one descriptive sentence and a small badge.

```tsx
<h1 className="text-[2.4rem] font-semibold tracking-[-0.05em] text-[var(--admin-heading)] sm:text-[2.8rem]">
  Dashboard
</h1>
<p className="max-w-xl text-sm leading-6 text-[var(--admin-text-muted)]">
  Số liệu chính, bố cục sạch, nhịp đọc nhanh.
</p>
```

- [ ] **Step 4: Simplify KPI cards**

Keep one card style for all stats. Remove extra labels that duplicate information and keep only icon, label, value, change, and compare label.

```tsx
<article className="admin-dashboard-card">
  <div className="flex items-start justify-between gap-3">
    <div className="admin-dashboard-icon">{/* icon */}</div>
    <span className="admin-dashboard-chip">Chỉ số</span>
  </div>
  <div className="mt-5 space-y-1.5">{/* label/value/change */}</div>
</article>
```

- [ ] **Step 5: Preserve behavior**

Keep the existing `period` and `selectedYear` controls, the `ResponsiveContainer`, and the `Link` targets unchanged.

Run: no command yet. This is a structure-only step.

### Task 2: Add dashboard-specific premium styling

**Files:**
- Modify: `admin/src/app/globals.css`

- [ ] **Step 1: Add dashboard semantic classes**

Create a small set of classes for the dashboard only, so `page.tsx` stops repeating long utility strings for every block.

```css
.admin-dashboard-card {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--admin-border);
  border-radius: var(--admin-radius-lg);
  background: linear-gradient(180deg, rgba(255,255,255,0.86), rgba(252,250,247,0.96));
  box-shadow: var(--admin-shadow-md);
}

.admin-dashboard-chip {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 0.35rem 0.7rem;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--admin-text-muted);
  background: rgba(255,255,255,0.72);
  border: 1px solid var(--admin-border);
}
```

- [ ] **Step 2: Style snapshot cards, icon holders, and chart wrappers**

Add lightweight classes for the hero snapshot cards and chart containers so the page feels unified without heavy visual effects.

```css
.admin-dashboard-snapshot {
  border: 1px solid var(--admin-border);
  border-radius: calc(var(--admin-radius-md) - 4px);
  background: linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,251,246,0.92));
  padding: 1rem;
}

.admin-dashboard-icon {
  display: flex;
  height: 2.5rem;
  width: 2.5rem;
  align-items: center;
  justify-content: center;
  border-radius: calc(var(--admin-radius-md) - 4px);
  background: var(--admin-accent-soft);
  color: var(--admin-accent-strong);
}
```

- [ ] **Step 3: Reuse existing table and chip styling**

Keep `admin-table-wrap` and `admin-status-chip`, but tune the dashboard use case with a little more spacing and cleaner section headers.

```css
.admin-dashboard-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
}
```

- [ ] **Step 4: Keep responsiveness intact**

Do not change global layout tokens. Only add dashboard classes that collapse cleanly on smaller screens.

Run: no command yet. This step is CSS-only.

### Task 3: Polish charts, table, and notifications

**Files:**
- Modify: `admin/src/app/page.tsx`

- [ ] **Step 1: Clean chart containers**

Wrap chart blocks with the new dashboard card classes and keep filters aligned at the top right.

```tsx
<article className="admin-dashboard-card xl:col-span-2">
  <div className="admin-dashboard-section">
    {/* header + filters */}
    {/* chart */}
  </div>
</article>
```

- [ ] **Step 2: Tighten category panel**

Make the pie chart smaller and the legend more compact so the panel feels editorial, not crowded.

```tsx
<div className="space-y-3">
  {categoryData.map((item, idx) => (
    <div key={idx} className="flex items-center justify-between rounded-[calc(var(--admin-radius-md)-4px)] border border-[var(--admin-border)] bg-[rgba(255,255,255,0.62)] px-4 py-3">
      {/* legend row */}
    </div>
  ))}
</div>
```

- [ ] **Step 3: Improve table and notifications balance**

Keep the recent orders table wide and readable, then make notifications feel like a vertical stack of calm cards instead of a dense list.

```tsx
<article className="admin-dashboard-card xl:col-span-2">
  <div className="admin-dashboard-section">{/* recent orders table */}</div>
</article>
<article className="admin-dashboard-card">
  <div className="admin-dashboard-section">{/* notifications */}</div>
</article>
```

- [ ] **Step 4: Preserve data formatting**

Keep the existing currency formatting, status tone logic, and `recentOrders` mapping untouched.

Run: no command yet. This step is presentation-only.

### Task 4: Verify dashboard build and layout

**Files:**
- None

- [ ] **Step 1: Run app build**

Run:

```bash
cd admin
npm run build
```

Expected: build succeeds with no dashboard-related TypeScript or CSS errors.

- [ ] **Step 2: Run a fast lint check if available**

Run:

```bash
cd admin
npm run lint
```

Expected: lint passes or only reports pre-existing unrelated issues.

- [ ] **Step 3: Manually inspect dashboard at key widths**

Open the admin dashboard and verify:

- hero stays split cleanly
- KPI row remains aligned
- charts do not overflow
- table stays readable
- notifications stack neatly

Expected: no broken spacing on desktop, tablet, or mobile widths.

- [ ] **Step 4: Commit implementation**

Run:

```bash
git add admin/src/app/page.tsx admin/src/app/globals.css
git commit -m "feat(admin): refresh dashboard layout"
```

Expected: one focused commit for the dashboard refresh.
