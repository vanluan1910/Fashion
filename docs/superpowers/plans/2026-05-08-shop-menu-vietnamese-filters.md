# Shop Menu Vietnamese Filters Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make storefront shop menu links point to the correct filtered product sets and show Vietnamese category/subcategory labels in the shop UI.

**Architecture:** Add one shared shop taxonomy helper for category and subcategory normalization plus Vietnamese display labels. Update menu links to use the correct filter keys, then reuse the helper in sidebar, product grid, and product cards so both legacy English values and new Vietnamese values resolve consistently.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS

---

### Task 1: Add shared Vietnamese taxonomy helpers

**Files:**
- Create: `src/features/shop/constants/shop-taxonomy.ts`

- [ ] **Step 1: Add category and subcategory normalization/display helpers**

```ts
export const SHOP_CATEGORY_LABELS = {
  men: "Thời trang nam",
  women: "Thời trang nữ",
  accessories: "Phụ kiện",
} as const;

export const SHOP_SUBCATEGORY_LABELS = {
  "t-shirts": "Áo thun",
  shirts: "Áo sơ mi",
  jackets: "Áo khoác",
  sweaters: "Áo len",
  jeans: "Quần jeans",
  suits: "Bộ suit",
  dresses: "Váy đầm",
  skirts: "Chân váy",
  handbags: "Túi xách",
  shoes: "Giày dép",
  hats: "Mũ nón",
  accessories: "Phụ kiện khác",
  "winter wear": "Đồ mùa đông",
  "summer specials": "Đồ mùa hè",
  tops: "Áo kiểu",
  bottoms: "Quần",
} as const;
```

- [ ] **Step 2: Export `normalizeShopCategory`, `normalizeShopSubCategory`, `getShopCategoryLabel`, `getShopSubCategoryLabel`**

```ts
const normalizeText = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
```

---

### Task 2: Fix header menu link targets

**Files:**
- Modify: `src/shared/components/Header.tsx`

- [ ] **Step 1: Keep main category links, but change subcategory menu items from `category=` to `subCategory=`**

```tsx
<Link href="/shop?subCategory=Váy đầm">Váy đầm</Link>
<Link href="/shop?subCategory=Áo sơ mi">Áo sơ mi</Link>
<Link href="/shop?subCategory=Quần jeans">Quần jeans</Link>
```

- [ ] **Step 2: Fix seasonal/secondary links so each one maps to an existing product set**

```tsx
<Link href="/shop?subCategory=Áo khoác,Áo len">Đồ mùa đông</Link>
<Link href="/shop?subCategory=Váy đầm,Áo thun">Đồ mùa hè</Link>
<Link href="/shop?subCategory=Áo thun">Áo thun</Link>
```

---

### Task 3: Localize sidebar filters and active chips

**Files:**
- Modify: `src/features/shop/components/ShopSidebar.tsx`

- [ ] **Step 1: Replace hardcoded English/inline translation logic with shared helpers**

```tsx
import {
  getShopCategoryLabel,
  getShopSubCategoryLabel,
  normalizeShopCategory,
  normalizeShopSubCategory,
} from "../constants/shop-taxonomy";
```

- [ ] **Step 2: Make `toggleFilter` and `isChecked` compare normalized values**

```tsx
const normalizeFilterValue = (key: string, value: string) => {
  if (key === "category") return normalizeShopCategory(value);
  if (key === "subCategory") return normalizeShopSubCategory(value);
  return value.trim().toLowerCase();
};
```

- [ ] **Step 3: Render active category chips and sidebar labels in Vietnamese**

```tsx
{getShopCategoryLabel(cat)}
{getShopSubCategoryLabel(cat)}
```

---

### Task 4: Localize product grid filter summaries and matching

**Files:**
- Modify: `src/features/shop/components/ProductGrid.tsx`

- [ ] **Step 1: Normalize category/subcategory matching with shared helpers**

```tsx
const normalizedCategoryFilters = categoryFilter.map(normalizeShopCategory).filter(Boolean);
const normalizedSubCategoryFilters = subCategoryFilter.map(normalizeShopSubCategory).filter(Boolean);
```

- [ ] **Step 2: Render Vietnamese summary text for category/subcategory filters**

```tsx
const categorySummary = categoryFilter.map(getShopCategoryLabel).join(", ");
const subCategorySummary = subCategoryFilter.map(getShopSubCategoryLabel).join(", ");
```

- [ ] **Step 3: Show subcategory summary when menu links use `subCategory=`**

```tsx
categoryFilter.length > 0
  ? categorySummary
  : subCategoryFilter.length > 0
    ? subCategorySummary
    : "tất cả sản phẩm"
```

---

### Task 5: Localize product card category links

**Files:**
- Modify: `src/features/shop/components/ProductCard.tsx`

- [ ] **Step 1: Send users to Vietnamese category filters from product cards**

```tsx
<Link href={`/shop?category=${encodeURIComponent(getShopCategoryLabel(product.category))}`}>
```

---

### Task 6: Verify no obvious English category leaks remain

**Files:**
- Inspect: `src/shared/components/Header.tsx`
- Inspect: `src/features/shop/components/ShopSidebar.tsx`
- Inspect: `src/features/shop/components/ProductGrid.tsx`
- Inspect: `src/features/shop/components/ProductCard.tsx`

- [ ] **Step 1: Search for remaining English category labels**

Run: `rg -n --hidden -S "Men|Women|Accessories|Dresses|Skirts|Shirts|Jeans|Sweaters|T-Shirts|Handbags|Shoes|Hats" src/shared/components/Header.tsx src/features/shop`

Expected: only taxonomy helper aliases or intentional fallback logic remain

