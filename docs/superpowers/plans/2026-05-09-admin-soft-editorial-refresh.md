# Admin Soft Editorial Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Làm UI admin sáng hơn, tối giản hơn, bớt màu gắt theo hướng tạp chí thời trang tối giản.

**Architecture:** Tập trung vào shell và design tokens trước để đổi cảm giác toàn app bằng ít file. Giữ cấu trúc hiện tại, chỉ làm palette, surface, sidebar, header, modal, dialog đồng nhất hơn.

**Tech Stack:** Next.js App Router, React 19, Tailwind 4, CSS variables trong `admin/src/app/globals.css`

---

### Task 1: Refresh Shell Theme

**Files:**
- Modify: `admin/src/app/globals.css`
- Modify: `admin/src/shared/components/Sidebar.tsx`
- Modify: `admin/src/shared/components/Header.tsx`
- Modify: `admin/src/shared/components/AdminLayout.tsx`
- Modify: `admin/src/shared/components/Modal.tsx`
- Modify: `admin/src/shared/components/Dialog.tsx`

- [ ] Giảm độ đậm palette: nền trắng sáng, xám ấm, accent trung tính hơn.
- [ ] Đổi sidebar từ dark-heavy sang light editorial, line mảnh, active state nhẹ.
- [ ] Đổi header sang trắng mờ nhẹ, bỏ cảm giác glass/orange mạnh.
- [ ] Đổi modal/dialog sang surface sáng, border mảnh, CTA ít gắt hơn.
- [ ] Giữ responsive và luồng auth hiện tại.

### Task 2: Verify

**Files:**
- No code changes required

- [ ] Chạy `npm run lint` trong `admin`
- [ ] Chạy `npm run build` trong `admin`
