# Storefront Typography Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move the customer-facing storefront to a modern premium minimal typography system with `Work Sans` for UI/body and `Playfair Display` reserved for editorial headings.

**Architecture:** Keep the existing font imports in the storefront layout, but correct the typography tokens so `font-sans` resolves to `Work Sans` and `font-serif` resolves to `Playfair Display`. Remove page-level `Roboto` overrides so shared global typography applies consistently without touching `admin/` or `backend/`.

**Tech Stack:** Next.js App Router, `next/font`, Tailwind CSS v4, React 19

---

### Task 1: Remove Storefront Roboto Overrides

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/blog/page.tsx`
- Modify: `src/app/shop/page.tsx`
- Modify: `src/app/cart/page.tsx`
- Modify: `src/app/checkout/page.tsx`
- Modify: `src/app/wishlist/page.tsx`
- Modify: `src/app/account/page.tsx`
- Modify: `src/shared/components/Header.tsx`
- Modify: `src/features/products/components/ProductDetail.tsx`

- [ ] **Step 1: Confirm the current override locations**

```powershell
rg -n 'font-family: "Roboto"|Roboto", sans-serif' src/app src/shared src/features/products
```

Expected: matches in the storefront pages/components listed above.

- [ ] **Step 2: Remove the inline `<style>` blocks that force Roboto**

```tsx
export default function BlogPage() {
  return (
    <main className="bg-white">
      <BlogBreadcrumb />
      <BlogGrid />
    </main>
  );
}
```

```tsx
export function Header() {
  return (
    <header className="bg-white w-full border-b border-gray-100 relative">
      {/* existing header content */}
    </header>
  );
}
```

- [ ] **Step 3: Re-run the search to verify the overrides are gone**

```powershell
rg -n 'font-family: "Roboto"|Roboto", sans-serif' src/app src/shared src/features/products
```

Expected: no matches.

### Task 2: Fix the Global Typography Tokens

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Inspect the current font variables and token mapping**

```tsx
const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});
```

```css
@theme {
  --font-sans: var(--font-playfair);
  --font-serif: var(--font-playfair);
}
```

- [ ] **Step 2: Update the theme tokens so sans and serif map correctly**

```css
@theme {
  --font-sans: var(--font-work-sans);
  --font-serif: var(--font-playfair);
}
```

```css
@layer base {
  body {
    font-family: var(--font-work-sans), sans-serif;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: var(--font-playfair), serif;
  }

  .font-serif {
    font-family: var(--font-playfair), serif;
  }

  .font-sans {
    font-family: var(--font-work-sans), sans-serif;
  }

  button,
  input,
  select,
  textarea {
    font-family: var(--font-work-sans), sans-serif;
  }
}
```

- [ ] **Step 3: Leave `Eleganto Sans` available but do not promote it to the storefront default**

```tsx
<html lang="vi" className={`${workSans.variable} ${playfair.variable} ${elegantoSans.variable}`}>
  <body suppressHydrationWarning className="font-sans antialiased">
    {/* existing providers and storefront layout */}
  </body>
</html>
```

Expected: no new typography utility system, only corrected token usage.

### Task 3: Verify the Storefront Typography Change

**Files:**
- Verify: `src/app/layout.tsx`
- Verify: `src/app/globals.css`
- Verify: storefront pages modified in Task 1

- [ ] **Step 1: Run a focused search to verify the intended typography sources remain**

```powershell
rg -n 'font-eleganto|font-playfair|font-work-sans|font-family' src/app src/shared src/features
```

Expected: `Work Sans` and `Playfair` remain as the system fonts, with no remaining forced `Roboto` storefront override.

- [ ] **Step 2: Run the storefront build**

```powershell
npm run build
```

Expected: Next.js storefront build completes successfully with exit code `0`.

- [ ] **Step 3: Review the diff before closing the task**

```powershell
git diff -- src/app/layout.tsx src/app/globals.css src/app/page.tsx src/app/blog/page.tsx src/app/shop/page.tsx src/app/cart/page.tsx src/app/checkout/page.tsx src/app/wishlist/page.tsx src/app/account/page.tsx src/shared/components/Header.tsx src/features/products/components/ProductDetail.tsx
```

Expected: only storefront typography changes are present.

