# Storefront Public API Base Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the storefront load backend data correctly through a public tunnel by replacing hardcoded local backend URLs with one shared public-configurable API base.

**Architecture:** Add one storefront-only API config module that resolves `NEXT_PUBLIC_API_URL` with a local fallback, then route each storefront service through that shared base. Cover the base resolution with a narrow regression test first, then update the affected service modules without changing their public behavior.

**Tech Stack:** Next.js 15, React 19, TypeScript, Node.js built-in test runner

---

### Task 1: Add and verify shared storefront API base

**Files:**
- Create: `src/shared/config/storefrontApi.ts`
- Create: `src/shared/config/storefrontApi.test.ts`
- Modify: `package.json`

- [ ] **Step 1: Write the failing test**

```ts
import test from "node:test";
import assert from "node:assert/strict";

const loadModule = async (envValue?: string) => {
  if (envValue === undefined) {
    delete process.env.NEXT_PUBLIC_API_URL;
  } else {
    process.env.NEXT_PUBLIC_API_URL = envValue;
  }

  return import(`./storefrontApi.ts?case=${Math.random()}`);
};

test("uses localhost api fallback when NEXT_PUBLIC_API_URL is not set", async () => {
  const mod = await loadModule(undefined);
  assert.equal(mod.STOREFRONT_API_BASE_URL, "http://127.0.0.1:5000/api");
  assert.equal(mod.buildStorefrontApiUrl("/products"), "http://127.0.0.1:5000/api/products");
});

test("uses NEXT_PUBLIC_API_URL when provided", async () => {
  const mod = await loadModule("https://demo.trycloudflare.com/api");
  assert.equal(mod.STOREFRONT_API_BASE_URL, "https://demo.trycloudflare.com/api");
  assert.equal(mod.buildStorefrontApiUrl("/orders"), "https://demo.trycloudflare.com/api/orders");
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test --experimental-strip-types src/shared/config/storefrontApi.test.ts`

Expected: FAIL because `src/shared/config/storefrontApi.ts` does not exist yet.

- [ ] **Step 3: Write minimal implementation**

```ts
const DEFAULT_STOREFRONT_API_BASE_URL = "http://127.0.0.1:5000/api";

const normalizeBaseUrl = (value: string) => value.replace(/\/+$/, "");
const normalizePath = (value: string) => value.startsWith("/") ? value : `/${value}`;

export const STOREFRONT_API_BASE_URL = normalizeBaseUrl(
  process.env.NEXT_PUBLIC_API_URL || DEFAULT_STOREFRONT_API_BASE_URL
);

export const buildStorefrontApiUrl = (path: string) =>
  `${STOREFRONT_API_BASE_URL}${normalizePath(path)}`;
```

- [ ] **Step 4: Add a repeatable test script**

```json
{
  "scripts": {
    "test:storefront-api": "node --test --experimental-strip-types src/shared/config/storefrontApi.test.ts"
  }
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npm run test:storefront-api`

Expected: PASS with 2 passing tests and no TypeScript compile step required.

- [ ] **Step 6: Commit**

```bash
git add package.json src/shared/config/storefrontApi.ts src/shared/config/storefrontApi.test.ts
git commit -m "test: add storefront api base coverage"
```

### Task 2: Move storefront product service onto shared API base

**Files:**
- Modify: `src/features/products/services/productsService.ts`
- Test: `src/shared/config/storefrontApi.test.ts`

- [ ] **Step 1: Write the failing test**

Add this test to `src/shared/config/storefrontApi.test.ts`:

```ts
test("buildStorefrontApiUrl keeps resource paths relative for products", async () => {
  const mod = await loadModule("https://demo.trycloudflare.com/api");
  assert.equal(mod.buildStorefrontApiUrl("/products/42"), "https://demo.trycloudflare.com/api/products/42");
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:storefront-api`

Expected: FAIL if path composition is wrong or duplicated.

- [ ] **Step 3: Write minimal implementation**

```ts
import { buildStorefrontApiUrl } from "@/shared/config/storefrontApi";
import { Product } from "../types/product";

const API_URL = buildStorefrontApiUrl("/products");
```

Keep the existing fetch behavior and return shapes unchanged.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test:storefront-api`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/features/products/services/productsService.ts src/shared/config/storefrontApi.test.ts
git commit -m "fix: route storefront products through shared api base"
```

### Task 3: Move remaining storefront services onto shared API base

**Files:**
- Modify: `src/core/providers/AuthProvider.tsx`
- Modify: `src/features/account/services/reviewService.ts`
- Modify: `src/features/blog/services/blogService.ts`
- Modify: `src/features/blog/services/blogCommentService.ts`
- Modify: `src/features/checkout/services/orderService.ts`
- Modify: `src/shared/config/storefrontApi.test.ts`

- [ ] **Step 1: Write the failing test**

Add this test to `src/shared/config/storefrontApi.test.ts`:

```ts
test("buildStorefrontApiUrl composes other storefront resources from the same base", async () => {
  const mod = await loadModule("https://demo.trycloudflare.com/api");
  assert.equal(mod.buildStorefrontApiUrl("/auth/login"), "https://demo.trycloudflare.com/api/auth/login");
  assert.equal(mod.buildStorefrontApiUrl("/reviews"), "https://demo.trycloudflare.com/api/reviews");
  assert.equal(mod.buildStorefrontApiUrl("/blogs/5"), "https://demo.trycloudflare.com/api/blogs/5");
  assert.equal(mod.buildStorefrontApiUrl("/orders/account/3"), "https://demo.trycloudflare.com/api/orders/account/3");
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:storefront-api`

Expected: FAIL if resource composition is not handled consistently.

- [ ] **Step 3: Write minimal implementation**

Use the shared helper in each file:

```ts
import { buildStorefrontApiUrl } from "@/shared/config/storefrontApi";
```

Replace hardcoded URLs with:

```ts
const LOGIN_URL = buildStorefrontApiUrl("/auth/login");
const REGISTER_URL = buildStorefrontApiUrl("/auth/register");
const REVIEWS_URL = buildStorefrontApiUrl("/reviews");
const BLOGS_URL = buildStorefrontApiUrl("/blogs");
const ORDERS_URL = buildStorefrontApiUrl("/orders");
```

Then keep each existing fetch call structure and fallback behavior intact.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test:storefront-api`

Expected: PASS.

- [ ] **Step 5: Run a broader safety check**

Run: `npm run build`

Expected: successful Next.js production build with no new type or import errors from the shared config usage.

- [ ] **Step 6: Commit**

```bash
git add src/core/providers/AuthProvider.tsx src/features/account/services/reviewService.ts src/features/blog/services/blogService.ts src/features/blog/services/blogCommentService.ts src/features/checkout/services/orderService.ts src/shared/config/storefrontApi.test.ts
git commit -m "fix: use shared storefront api base across client services"
```

### Task 4: Document runtime usage for tunnel sharing

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Write the failing test**

No automated test is needed for this documentation-only task. Validation is a manual doc review against the implemented runtime behavior.

- [ ] **Step 2: Verify current docs do not cover the required setup**

Run: `Get-Content README.md`

Expected: missing or insufficient guidance for setting `NEXT_PUBLIC_API_URL` when exposing the storefront through a public tunnel.

- [ ] **Step 3: Write minimal implementation**

Add a short section such as:

```md
## Public tunnel storefront

When exposing the storefront publicly, set `NEXT_PUBLIC_API_URL` to the backend public URL including `/api`.

Example:

```powershell
$env:NEXT_PUBLIC_API_URL="https://your-backend.trycloudflare.com/api"
npm run dev
```
```

- [ ] **Step 4: Verify docs read cleanly**

Run: `Get-Content README.md`

Expected: the new section is present, concise, and matches the implemented config key exactly.

- [ ] **Step 5: Commit**

```bash
git add README.md
git commit -m "docs: add storefront tunnel api setup"
```
