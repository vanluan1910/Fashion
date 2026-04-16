---
name: The Curated Atelier - High-End React SPA Conversion
description: Workflow for converting luxury mockups into a modular React SPA (Vite) structure following the Feature-based + Layered Architecture.
---

# 💎 The Curated Atelier - High-End React SPA Conversion

This skill provides a systematic workflow for migrating high-aesthetic HTML/Tailwind templates into a premium, production-ready React codebase, following the **Feature-based + Layered Architecture** as defined in `admin/structured.md`.

## 1. Project Architecture Overview
The project is rooted in `src/` and divided into three primary layers:

### 🚀 A. `app/` — Application Core (Wiring)
Responsible for setting up the global infrastructure:
- `store/`: Centralized state management (e.g., `uiStore.tsx` for sidebar/theme).
- `router/`: Centralized navigation logic using `react-router-dom`.
- `providers/`: Context providers (Auth, Theme, QueryClient).

### 🎯 B. `features/` — Business Modules
Divided by business domain (e.g., `inventory`, `orders`, `dashboard`). Each feature has:
- `api/`: API calls and mock data fetchers.
- `components/`: UI components (Main view + smaller widgets).
- `hooks/`: Domain-specific business logic (ViewModel layer).
- `services/`: Complex calculations or data transformations.
- `types/`: Domain-specific TS interfaces.

### 🔌 C. `shared/` — Infrastructure & Base
- `components/`: Reusable UI elements (DataTable, Button, Sidebar).
- `hooks/`: Generic hooks (useDebounce, useLocalStorage).
- `utils/`: Common helper functions (formatting, validation).

---

## 2. Step-by-Step Conversion Workflow

### Phase 1: Environment Readiness
1. **Initialize Base**: Run `./scripts/setup-project.ps1` to ensure core folders exist.
2. **Global Styles**: Use `src/index.css` for Tailwind 4 configuration and root tokens.
3. **Luxury Tokens**: 
   - **Primary Color**: `#715b39` (Signature Gold/Bronze).
   - **Background**: `#faf9f7` (Soft Cream).
   - **Font**: **Be Vietnam Pro** (Optimized for Vietnamese typography).

### Phase 2: Building Shared Components
Extract common elements from the mockup into `src/shared/components/`. 
- **Rule**: Shared components must be "Pure UI" and independent of any feature logic.
- **Micro-animations**: Use `framer-motion` for smooth hover states and entry transitions.

### Phase 3: Feature Migration
For every page in the mockup (e.g., Inventory):

1. **Plan & Name**: Define the feature (e.g., `inventory`). Run `scripts/gen-feature.ps1 -FeatureName "inventory"`.
2. **Data Layer**: Move hardcoded HTML data into `api/` as mock assets.
3. **Logic Layer**: Create a custom hook in `hooks/` (e.g., `useInventory.ts`) to manage state and fetch data from the `api`.
4. **UI Components**: Build small, focused components in `components/`.
5. **Main Entry**: Assemble the feature in `components/[Name]Main.tsx`. This component should consume the feature hook and pass data down to sub-components.

### Phase 4: Wiring (Application Core)
1. **Store**: If the feature requires global coordination, update `src/app/store/`.
2. **Router**: Connect the new Feature Main component to a route in `src/app/router/index.tsx`.
3. **Layout**: Ensure the feature appears within the correct `Layout` shell.

---

## 3. High-End Design Principles (Luxury Standards)
- **Glassmorphism**: Use `backdrop-blur-xl` and semi-transparent backgrounds for headers and overlays.
- **Elevation**: Use `luxury-shadow` (defined in `index.css`) for cards to create a floating premium feel.
- **Typography**: Strictly use **Sentence-case**. Headers should use `tracking-widest` and `font-black` for emphasis.
- **Spacing**: Follow the "Breathing Room" policy. Avoid cramped layouts; use generous padding (`p-6` to `p-12`) for main content.

---

## 4. Best Practices
- **No Direct Data Fetching in UI**: UI components must receive data via props or a feature-level hook.
- **Path Aliases**: Always use `@/` to import from the `src` directory.
- **SPA Rules**: Use `react-router-dom`'s `Link` and `useNavigate`. Never use standard `<a>` tags for internal navigation.
- **State Separation**: Keep local UI state in `useState`, but move business domain state and multi-page state to the **Store** or **Hooks**.

---
*Developed for The Curated Atelier - Defining Modern Luxury in Digital Management.*
