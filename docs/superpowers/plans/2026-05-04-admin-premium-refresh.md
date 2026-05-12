# Admin Premium Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refresh the full admin UI so it feels premium, cohesive, and easier to use without changing core business workflows.

**Architecture:** Establish one shared visual system in `admin/src/app/globals.css`, upgrade the shell in `AdminLayout`, `Sidebar`, and `Header`, then apply the same page-header, card, table, filter, and form patterns across dashboard, products, orders, customers, blog, and settings. Keep business logic intact; focus on UI hierarchy, spacing, tokens, and local UX cleanup.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind CSS 4, Lucide React, Recharts

---

### Task 1: Create The Admin Visual Foundation

**Files:**
- Modify: `admin/src/app/globals.css`
- Test: `admin/package.json`

- [ ] **Step 1: Add admin design tokens in global CSS**

Replace the minimal root token block with a premium token set that supports warm surfaces, graphite text, muted borders, and restrained brand accent usage:

```css
:root {
  --background: #f7f3ee;
  --foreground: #1d1b19;
  --admin-bg: #f6f1ea;
  --admin-surface: #fffdf9;
  --admin-surface-strong: #ffffff;
  --admin-panel: #f3ede4;
  --admin-border: rgba(54, 43, 32, 0.12);
  --admin-border-strong: rgba(38, 29, 22, 0.18);
  --admin-text: #201c18;
  --admin-text-soft: #6f655c;
  --admin-text-faint: #9a8f84;
  --admin-accent: #d46a4a;
  --admin-accent-strong: #bb5334;
  --admin-sidebar: #191714;
  --admin-sidebar-soft: #24201c;
  --admin-success: #3f7b5e;
  --admin-warning: #b7863b;
  --admin-danger: #a35248;
  --admin-shadow-sm: 0 10px 30px rgba(34, 24, 18, 0.05);
  --admin-shadow-md: 0 18px 45px rgba(34, 24, 18, 0.08);
  --admin-radius-xl: 22px;
  --admin-radius-lg: 16px;
  --admin-radius-md: 12px;
}
```

- [ ] **Step 2: Add reusable admin utility classes**

Add shared utility-style classes so page files can converge on one visual system instead of duplicating arbitrary utility combinations:

```css
body {
  background:
    radial-gradient(circle at top left, rgba(212, 106, 74, 0.06), transparent 24%),
    linear-gradient(180deg, #fbf8f3 0%, #f4efe8 100%);
  color: var(--admin-text);
  font-family: Georgia, "Times New Roman", serif;
}

.admin-page {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.admin-surface {
  background: color-mix(in srgb, var(--admin-surface-strong) 88%, white 12%);
  border: 1px solid var(--admin-border);
  border-radius: var(--admin-radius-xl);
  box-shadow: var(--admin-shadow-sm);
}

.admin-section-title {
  color: var(--admin-text);
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: -0.03em;
}

.admin-kicker {
  color: var(--admin-text-faint);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.24em;
  text-transform: uppercase;
}
```

- [ ] **Step 3: Add consistent controls and table helpers**

Define reusable classes for filter bars, inputs, badges, and table wrappers:

```css
.admin-toolbar { @apply flex flex-col gap-4 rounded-[18px] border px-5 py-4 md:flex-row md:items-center md:justify-between; }
.admin-input { @apply h-12 rounded-[14px] border bg-white px-4 text-[14px] outline-none transition-all; }
.admin-select { @apply h-12 rounded-[14px] border bg-white px-4 text-[13px] font-semibold outline-none transition-all; }
.admin-table-wrap { @apply overflow-hidden rounded-[22px] border bg-white; }
.admin-table-head { @apply bg-[#f7f1e9] text-[11px] font-bold uppercase tracking-[0.24em] text-[#6f655c]; }
.admin-status-chip { @apply inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-bold; }
```

- [ ] **Step 4: Verify admin still builds after foundation changes**

Run:

```powershell
npm.cmd run build
```

Workdir:

```text
d:\Fashion\admin
```

Expected:

```text
Next.js build succeeds with the updated global styles.
```

- [ ] **Step 5: Commit**

```powershell
git add admin/src/app/globals.css
git commit -m "feat(admin): add premium design foundation"
```

### Task 2: Refresh The Shared Admin Shell

**Files:**
- Modify: `admin/src/shared/components/AdminLayout.tsx`
- Modify: `admin/src/shared/components/Sidebar.tsx`
- Modify: `admin/src/shared/components/Header.tsx`
- Test: `admin/src/app/globals.css`

- [ ] **Step 1: Upgrade the layout frame**

Rework `AdminLayout` so the content wrapper feels intentional and premium:

```tsx
return (
  <div className="min-h-screen bg-[var(--admin-bg)] text-[var(--admin-text)]">
    <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    <div className={`min-h-screen transition-all duration-500 ${isSidebarOpen ? "lg:pl-[280px]" : "lg:pl-[104px]"}`}>
      <Header onToggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <div className="h-[88px]" />
      <main className="px-4 pb-8 pt-2 md:px-6 xl:px-10">
        <div className="mx-auto max-w-[1600px] admin-page">
          {children}
        </div>
      </main>
    </div>
  </div>
);
```

- [ ] **Step 2: Restyle the sidebar as a premium navigation rail**

Keep dark contrast, but reduce the blunt block feeling:

```tsx
<aside className={`fixed inset-y-0 left-0 z-50 w-[280px] border-r border-white/10 bg-[linear-gradient(180deg,#181512_0%,#221d18_100%)] text-white transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0 lg:w-[104px]"}`}>
  <div className="flex h-[88px] items-center justify-between px-6">
    <Link href="/" className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--admin-accent)] text-sm font-bold text-white">A</div>
      <div className={`${isOpen ? "opacity-100" : "lg:opacity-0"} transition-opacity`}>
        <p className="text-[11px] uppercase tracking-[0.22em] text-white/45">Atelier</p>
        <p className="text-[18px] font-semibold tracking-[-0.03em]">Admin House</p>
      </div>
    </Link>
  </div>
```

- [ ] **Step 3: Make nav item states more refined**

Use a richer active state than a flat orange fill:

```tsx
className={`group flex items-center gap-3 rounded-[16px] px-4 py-3 transition-all ${
  isActive
    ? "bg-white text-[#1c1713] shadow-[0_14px_30px_rgba(0,0,0,0.18)]"
    : "text-white/70 hover:bg-white/8 hover:text-white"
}`}
```

- [ ] **Step 4: Simplify and elevate the header**

Reduce icon clutter, strengthen search/profile hierarchy, and keep notifications elegant:

```tsx
<header className={`fixed right-0 top-0 z-[99] h-[88px] border-b border-[var(--admin-border)] bg-[rgba(251,248,243,0.82)] backdrop-blur-xl transition-all duration-300 ${isSidebarOpen ? "left-0 lg:left-[280px]" : "left-0 lg:left-[104px]"}`}>
  <div className="flex h-full items-center justify-between px-4 md:px-6 xl:px-10">
    <div className="flex items-center gap-3">
      <button className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--admin-border)] bg-white/70 text-[#2a241f] transition-all hover:border-[var(--admin-accent)]">
        <Menu size={18} />
      </button>
      <div className="hidden md:flex items-center gap-3 rounded-full border border-[var(--admin-border)] bg-white/80 px-4">
        <Search size={16} className="text-[var(--admin-text-faint)]" />
        <input className="h-11 w-[280px] bg-transparent text-[14px] outline-none" />
      </div>
    </div>
  </div>
</header>
```

- [ ] **Step 5: Build and visually inspect the shell**

Run:

```powershell
npm.cmd run build
```

Then verify:

```text
Sidebar, header, content frame, and footer all share the new premium system and remain responsive.
```

- [ ] **Step 6: Commit**

```powershell
git add admin/src/shared/components/AdminLayout.tsx admin/src/shared/components/Sidebar.tsx admin/src/shared/components/Header.tsx
git commit -m "feat(admin): refresh shared shell"
```

### Task 3: Redesign The Dashboard

**Files:**
- Modify: `admin/src/app/page.tsx`
- Test: `admin/src/app/globals.css`

- [ ] **Step 1: Upgrade the page header and action bar**

Replace the generic heading block with a more editorial premium header:

```tsx
<div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
  <div className="space-y-2">
    <p className="admin-kicker">Retail Control Room</p>
    <h1 className="admin-section-title">Tổng quan điều hành</h1>
    <p className="max-w-[720px] text-[15px] leading-7 text-[var(--admin-text-soft)]">
      Theo dõi sức khỏe kinh doanh, doanh thu và vận hành cửa hàng trong một không gian trực quan, dễ đọc và cao cấp hơn.
    </p>
  </div>
</div>
```

- [ ] **Step 2: Restyle KPI cards**

Bring the four stat cards into the shared surface language:

```tsx
<div className="admin-surface p-6">
  <div className="mb-6 flex items-start justify-between">
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f2e6dc] text-[var(--admin-accent)]">
      <Icon size={22} />
    </div>
  </div>
  <p className="admin-kicker">{stat.label}</p>
  <h3 className="mt-3 text-[30px] font-semibold tracking-[-0.05em] text-[var(--admin-text)]">{stat.value}</h3>
</div>
```

- [ ] **Step 3: Align charts and data blocks with the new system**

Convert chart containers and recent orders into calmer premium surfaces:

```tsx
<div className="admin-surface p-7 md:p-8">
  <div className="mb-8 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
    <div>
      <p className="admin-kicker">Performance</p>
      <h4 className="mt-2 text-[22px] font-semibold tracking-[-0.03em]">Hiệu suất doanh thu</h4>
    </div>
  </div>
</div>
```

- [ ] **Step 4: Verify the dashboard page still renders after data fetches**

Run:

```powershell
npm.cmd run build
```

Expected:

```text
The dashboard page compiles and keeps existing data-fetch logic intact.
```

- [ ] **Step 5: Commit**

```powershell
git add admin/src/app/page.tsx
git commit -m "feat(admin): refresh dashboard presentation"
```

### Task 4: Standardize Products And Orders

**Files:**
- Modify: `admin/src/app/products/page.tsx`
- Modify: `admin/src/app/orders/page.tsx`
- Modify: `admin/src/features/products/components/ProductTable.tsx`
- Test: `admin/src/features/orders/hooks/useOrders.ts`

- [ ] **Step 1: Bring products header and toolbar into the shared pattern**

Refactor products page top sections to use the same premium hierarchy:

```tsx
<div className="admin-surface p-5">
  <div className="admin-toolbar border-[var(--admin-border)] bg-[#f9f4ee]">
    <div className="relative w-full md:w-[380px]">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--admin-text-faint)]" size={18} />
      <input className="admin-input w-full pl-11" />
    </div>
  </div>
</div>
```

- [ ] **Step 2: Tighten the products table presentation**

Update `ProductTable.tsx` row spacing, head styling, thumbnail treatment, and action cells to match the premium catalog tone:

```tsx
<table className="w-full border-collapse">
  <thead className="admin-table-head">
    <tr>
      <th className="px-5 py-4 text-left">Sản phẩm</th>
    </tr>
  </thead>
  <tbody className="divide-y divide-[rgba(54,43,32,0.08)]">
    <tr className="transition-colors hover:bg-[#fcf8f2]">
```

- [ ] **Step 3: Rebuild orders tabs, filters, and table rhythm**

Restyle `orders/page.tsx` so the status tabs and filters feel calmer and more operationally legible:

```tsx
<div className="flex gap-2 overflow-x-auto border-b border-[var(--admin-border)] pb-1">
  <button className={activeTab === tab ? "rounded-full bg-[#201b17] px-4 py-2 text-white" : "rounded-full px-4 py-2 text-[var(--admin-text-soft)]"}>
    {tab}
  </button>
</div>
```

- [ ] **Step 4: Preserve existing order behaviors while cleaning action density**

Do not change selection, status update, print, or review logic; only rebalance the visual grouping:

```tsx
<td className="px-5 py-5 text-right">
  <div className="flex items-center justify-end gap-2">
    <button className="rounded-full border border-[var(--admin-border)] p-2 text-[#5f554c] hover:border-[var(--admin-accent)] hover:text-[var(--admin-accent)]">
      <Eye size={16} />
    </button>
  </div>
</td>
```

- [ ] **Step 5: Build and spot-check products/orders pages**

Run:

```powershell
npm.cmd run build
```

Then verify:

```text
Products and orders still support search, filters, selection, dialogs, and action menus after the redesign.
```

- [ ] **Step 6: Commit**

```powershell
git add admin/src/app/products/page.tsx admin/src/app/orders/page.tsx admin/src/features/products/components/ProductTable.tsx
git commit -m "feat(admin): standardize product and order management surfaces"
```

### Task 5: Standardize Customers And Blog

**Files:**
- Modify: `admin/src/app/customers/page.tsx`
- Modify: `admin/src/app/blog/page.tsx`
- Modify: `admin/src/shared/components/Modal.tsx`
- Modify: `admin/src/shared/components/Dialog.tsx`

- [ ] **Step 1: Refine customer stats and toolbar hierarchy**

Bring customer stats, filters, and action areas into the shared premium pattern:

```tsx
<div className="grid gap-5 md:grid-cols-3">
  <div className="admin-surface flex items-center gap-4 p-6">
    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#ede2d7] text-[var(--admin-accent)]">
      <Users size={24} />
    </div>
  </div>
</div>
```

- [ ] **Step 2: Improve customer table scanability and detail modal hierarchy**

Keep the same actions, but simplify the visual clutter in rows and modal content:

```tsx
<tr className="group transition-colors hover:bg-[#fcf8f2]">
  <td className="px-5 py-5">
    <div className="flex items-center gap-4">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f2e6dc] text-[var(--admin-accent)]">
        {(customer.full_name || customer.name || "?").charAt(0)}
      </div>
    </div>
  </td>
</tr>
```

- [ ] **Step 3: Push blog management toward an editorial premium tone**

Use larger headline hierarchy, calmer metadata, and more studio-like form/preview surfaces:

```tsx
<div className="admin-surface overflow-hidden">
  <div className="border-b border-[var(--admin-border)] bg-[#faf4ed] px-5 py-4">
    <p className="admin-kicker">Editorial Studio</p>
    <h2 className="mt-2 text-[22px] font-semibold tracking-[-0.03em]">Quản lý bài viết</h2>
  </div>
</div>
```

- [ ] **Step 4: Normalize modal/dialog surface styling**

Adjust shared modal/dialog shells so customer and blog actions inherit the same premium overlay treatment:

```tsx
className="rounded-[24px] border border-[var(--admin-border)] bg-[var(--admin-surface-strong)] shadow-[var(--admin-shadow-md)]"
```

- [ ] **Step 5: Build and check customer/blog flows**

Run:

```powershell
npm.cmd run build
```

Expected:

```text
Customer add/view/message flows and blog create/edit/preview/dialog flows still compile and render correctly.
```

- [ ] **Step 6: Commit**

```powershell
git add admin/src/app/customers/page.tsx admin/src/app/blog/page.tsx admin/src/shared/components/Modal.tsx admin/src/shared/components/Dialog.tsx
git commit -m "feat(admin): refresh customer and editorial management UI"
```

### Task 6: Rework Settings Into A Premium Control Center

**Files:**
- Modify: `admin/src/app/settings/page.tsx`
- Modify: `admin/src/shared/components/Button.tsx`

- [ ] **Step 1: Restyle the settings header and save action**

Make the page heading and primary save action align with the new premium system:

```tsx
<div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
  <div>
    <p className="admin-kicker">System Configuration</p>
    <h1 className="admin-section-title">Cài đặt hệ thống</h1>
  </div>
</div>
```

- [ ] **Step 2: Redesign the settings navigation rail**

Keep the same tabs, but use quieter premium navigation instead of loud pill buttons:

```tsx
<button className={`flex w-full items-center gap-3 rounded-[18px] border px-5 py-4 text-left transition-all ${
  activeTab === tab.id
    ? "border-[var(--admin-border-strong)] bg-[#201b17] text-white"
    : "border-[var(--admin-border)] bg-white text-[var(--admin-text-soft)] hover:bg-[#faf4ed]"
}`}>
```

- [ ] **Step 3: Improve settings section cards and form rhythm**

Use larger breathing room, better helper text, and more consistent input hierarchy:

```tsx
<div className="admin-surface overflow-hidden">
  <div className="border-b border-[var(--admin-border)] bg-[#faf4ed] px-6 py-5">
    <h4 className="text-[18px] font-semibold tracking-[-0.02em] text-[var(--admin-text)]">Thông tin trang web</h4>
    <p className="mt-1 text-[13px] leading-6 text-[var(--admin-text-soft)]">Các trường này kiểm soát cách thương hiệu xuất hiện trong hệ thống và công cụ tìm kiếm.</p>
  </div>
</div>
```

- [ ] **Step 4: Keep current fake-save logic unchanged while improving button polish**

If `Button.tsx` is used in this flow, align its neutral and primary variants with the new system:

```tsx
primary: "rounded-full bg-[var(--admin-accent)] px-6 text-white hover:bg-[var(--admin-accent-strong)]"
secondary: "rounded-full border border-[var(--admin-border)] bg-white text-[var(--admin-text)] hover:bg-[#faf4ed]"
```

- [ ] **Step 5: Build and validate settings tabs**

Run:

```powershell
npm.cmd run build
```

Then verify:

```text
Settings tabs, fields, and save dialog remain functional and visually consistent.
```

- [ ] **Step 6: Commit**

```powershell
git add admin/src/app/settings/page.tsx admin/src/shared/components/Button.tsx
git commit -m "feat(admin): refine settings control center"
```

### Task 7: Final Consistency Pass And Verification

**Files:**
- Modify: `admin/src/app/page.tsx`
- Modify: `admin/src/app/products/page.tsx`
- Modify: `admin/src/app/orders/page.tsx`
- Modify: `admin/src/app/customers/page.tsx`
- Modify: `admin/src/app/blog/page.tsx`
- Modify: `admin/src/app/settings/page.tsx`
- Modify: `admin/src/shared/components/AdminLayout.tsx`
- Modify: `admin/src/shared/components/Sidebar.tsx`
- Modify: `admin/src/shared/components/Header.tsx`
- Modify: `admin/src/app/globals.css`

- [ ] **Step 1: Sweep for inconsistent old visual patterns**

Search for old hard-coded patterns that should be normalized:

```powershell
rg -n "bg-\\[#f3f4f9\\]|bg-\\[#fcfcff\\]|rounded-xl|rounded-2xl|shadow-sm|text-2xl font-extrabold" admin/src
```

Expected:

```text
Only intentional exceptions remain after the premium refresh.
```

- [ ] **Step 2: Run the admin production build**

Run:

```powershell
npm.cmd run build
```

Workdir:

```text
d:\Fashion\admin
```

Expected:

```text
Next.js production build completes successfully.
```

- [ ] **Step 3: Run lint if the repo currently supports it**

Run:

```powershell
npm.cmd run lint
```

Expected:

```text
Lint either passes or reveals only pre-existing issues unrelated to the redesign. Document any residual lint blockers.
```

- [ ] **Step 4: Manual QA checklist**

Check:

```text
1. Desktop shell: sidebar/header/content proportions feel premium and coherent.
2. Mobile shell: overlay sidebar and wrapped header controls remain usable.
3. Dashboard cards/charts still render and scan cleanly.
4. Products/orders/customers/blog/settings page headers, toolbars, tables, and forms now share one design system.
5. Dialogs and modals feel consistent with the updated premium surfaces.
```

- [ ] **Step 5: Commit**

```powershell
git add admin/src
git commit -m "feat(admin): complete premium interface refresh"
```
