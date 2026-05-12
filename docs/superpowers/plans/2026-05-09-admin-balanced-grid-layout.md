# Admin Balanced Grid Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Làm bố cục admin cân đối, gọn, thoáng hơn theo hướng `balanced grid`.

**Architecture:** Giữ shell hiện tại, nhưng chỉnh spacing, card rhythm, và table density để toàn trang có nhịp đều hơn. Ưu tiên thay đổi ở `globals.css` và dashboard page trước, rồi đồng bộ các page danh sách còn lại bằng cùng hệ spacing.

**Tech Stack:** Next.js App Router, React 19, Tailwind 4, CSS variables

---

### Task 1: Tighten Shell Rhythm

**Files:**
- Modify: `admin/src/app/globals.css`
- Modify: `admin/src/shared/components/Sidebar.tsx`
- Modify: `admin/src/shared/components/Header.tsx`
- Modify: `admin/src/shared/components/AdminLayout.tsx`

- [ ] Reduce vertical spacing so shell feels compact but not crowded.
- [ ] Keep sidebar readable, but compress nav/footer blocks and header chrome.
- [ ] Normalize surface borders, shadows, and padding to one rhythm.

### Task 2: Balance Dashboard Grid

**Files:**
- Modify: `admin/src/app/page.tsx`

- [ ] Re-space stat cards, charts, recent orders, and notifications into a cleaner grid.
- [ ] Reduce competing visual weight from cards and tables.
- [ ] Make dashboard sections line up to the same padding and gap scale.

### Task 3: Harmonize List Pages

**Files:**
- Modify: `admin/src/app/products/page.tsx`
- Modify: `admin/src/app/orders/page.tsx`
- Modify: `admin/src/app/customers/page.tsx`
- Modify: `admin/src/app/notifications/page.tsx`

- [ ] Tighten toolbar, table, and empty-state spacing across list views.
- [ ] Keep functionality unchanged.
- [ ] Make each page use the same spacing scale as dashboard.

### Task 4: Verify

**Files:**
- No code changes required

- [ ] Run `npm run lint` in `admin`
- [ ] Run `npm run build` in `admin`
