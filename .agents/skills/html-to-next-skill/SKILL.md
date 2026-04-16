---
name: The Curated Atelier - Next.js Luxury Conversion
description: Workflow for converting high-end HTML/Tailwind templates into a modular Next.js (App Router) structure focused on performance, SEO, and premium aesthetics.
---

# 💎 The Curated Atelier - Next.js Luxury Conversion

This skill provides a systematic workflow for migrating high-aesthetic HTML templates into a premium **Next.js (App Router)** codebase, prioritizing Server-First architecture, SEO, and refined motion.

## 1. Project Architecture (Next.js - App Router)

The project follows a **Modified Feature-Based Architecture** optimized for Next.js:

### 🚀 A. `src/app/` — Routing & Layouts
The entry point for all routes. Keep logic here minimal:
- `(auth)/`: Grouped routes for authentication.
- `(dashboard)/`: Grouped routes for the admin/user dashboard.
- `layout.tsx`: Root layout (Providers, Fonts, Global SEO).
- `page.tsx`: Route entry points, primarily composing components from the `features` layer.

### 🎯 B. `src/features/` — Business Modules
Autonomous domain folders. Each feature contains:
- `components/`: Feature-specific UI (split into Server and Client components).
- `services/`: Server-side data fetching logic (Server Actions, direct DB queries).
- `hooks/`: Client-side state/logic (if needed).
- `types/`: TypeScript definitions.
- `constants/`: Feature-specific static data.

### 🔌 C. `src/shared/` — The Core Foundation
- `components/`: Reusable, atomic UI elements (Buttons, Inputs, Modals).
- `lib/`: Shared utilities (formatting, validation, client instances).
- `hooks/`: Generic client-side hooks.
- `assets/`: Global images and icons.

---

## 2. Step-by-Step Conversion Workflow

### Phase 1: Environment & Foundation
1. **Initialize Structure**: Run `./scripts/setup-next-structure.ps1` to scaffold the `src/` directory.
2. **Typography & Fonts**: Use `next/font/google` to implement **Be Vietnam Pro**.
3. **Global Aesthetics**: Inject the `luxury-theme.css` into `src/app/globals.css`.
4. **Metadata**: Set up the `viewport` and `metadata` objects in the root layout for SEO.

### Phase 2: Building Shared Atomic UI
Extract base elements from the mockup into `src/shared/components/`. 
- **Guideline**: Use `next/image` for all images to ensure automatic optimization.
- **Guideline**: Leverage CSS Variables for tokens (Gold: `#715b39`, Dark: `#1a1a1a`).

### Phase 3: Feature Migration (The Next.js Way)
For every page in the mockup:

1. **Plan Feature**: Identify the domain (e.g., `wedding-gallery`).
2. **Server-First Logic**: Create data fetching functions in `features/[name]/services/`. Fetch data directly on the server when possible.
3. **Component Splitting**: 
   - **Static/Server**: Information-heavy parts (Server Components).
   - **Interactive**: Forms, filters, sliders (Client Components with `"use client"`).
4. **Assembly**: Compose the feature in the `src/app/[route]/page.tsx` file.

### Phase 4: Refinement & Performance
1. **Dynamic Imports**: Use `next/dynamic` for heavy client components (e.g., complex charts).
2. **Loading States**: Add `loading.tsx` for each route to provide instant feedback.
3. **Transitions**: Use `framer-motion` (in Client Components) for micro-animations.

---

## 3. High-End Design Principles (Next.js Edition)
- **Zero-Shift Layouts**: Use `next/image` with proper `width` and `height` to prevent layout shifts.
- **Server-Side SEO**: Ensure all pages have unique `title` and `description` via the Metadata API.
- **Next-Level Interaction**: Use `AnimatePresence` for route transitions or element entry/exit.
- **Glassmorphism**: Apply `backdrop-blur` to sticky headers and sidebar overlays.

---

## 4. Best Practices & Rules
- **Minimize "use client"**: Default to Server Components. Only use Client Components for interactivity (event listeners, state, hooks).
- **Absolute Imports**: Always use `@/` (configured in `tsconfig.json`).
- **Secure Data**: Keep API keys and sensitive logic in Server Components or `.env`.
- **Image Quality**: Always use `.webp` or `.avif` where possible, handled by Next.js optimization.

---
*Developed for The Curated Atelier - Scaling Luxury with Next.js Performance.*
