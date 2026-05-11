# Santino Shirt Image Scraper Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build one local Node.js tool that crawls Santino shirt products, downloads every product image, and writes a reusable manifest.

**Architecture:** Use one command-line scraper with a fast HTML parsing path for discovery and a browser fallback for pages that hide gallery data. Keep responsibilities split between discovery, page extraction, download, and manifest writing so each unit stays small and testable.

**Tech Stack:** Node.js, built-in `fetch`, `cheerio`, `playwright` fallback, filesystem APIs, JSON manifest output.

---

### Task 1: Lock command shape and test surface

**Files:**
- Create: `scripts/santino-shirt-images.mjs`
- Create: `scripts/__fixtures__/santino-category.html`
- Create: `scripts/__fixtures__/santino-product.html`

- [ ] **Step 1: Write the failing test**

```js
import assert from 'node:assert/strict';
import { extractProductLinks, isShirtProduct } from '../santino-shirt-images.mjs';

const categoryHtml = await fs.readFile(new URL('./__fixtures__/santino-category.html', import.meta.url), 'utf8');
const links = extractProductLinks(categoryHtml, 'https://santino.com.vn/product-category/san-pham');
assert.ok(links.length > 0);
assert.equal(isShirtProduct({ title: 'Sơ mi nam slim fit' }), true);
assert.equal(isShirtProduct({ title: 'Quần tây' }), false);
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node scripts/santino-shirt-images.test.mjs`
Expected: fail because scraper helpers do not exist yet.

- [ ] **Step 3: Write minimal implementation**

```js
export function extractProductLinks() {}
export function isShirtProduct() {}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node scripts/santino-shirt-images.test.mjs`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add scripts/santino-shirt-images.mjs scripts/santino-shirt-images.test.mjs scripts/__fixtures__/
git commit -m "feat: add santino scraper helpers"
```

### Task 2: Extract page images and download files

**Files:**
- Modify: `scripts/santino-shirt-images.mjs`
- Create: `scripts/santino-shirt-images.integration.mjs`

- [ ] **Step 1: Write the failing test**

```js
import assert from 'node:assert/strict';
import { extractProductImages } from '../santino-shirt-images.mjs';
const html = await fs.readFile(new URL('./__fixtures__/santino-product.html', import.meta.url), 'utf8');
const images = extractProductImages(html);
assert.ok(images.length > 0);
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node scripts/santino-shirt-images.integration.mjs`
Expected: fail because image extraction does not exist yet.

- [ ] **Step 3: Write minimal implementation**

```js
export function extractProductImages(html) {
  return [];
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node scripts/santino-shirt-images.integration.mjs`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add scripts/santino-shirt-images.mjs scripts/santino-shirt-images.integration.mjs
git commit -m "feat: extract santino product images"
```

### Task 3: Add crawl, download, and manifest output

**Files:**
- Modify: `scripts/santino-shirt-images.mjs`
- Modify: `package.json`

- [ ] **Step 1: Write the failing test**

```bash
node scripts/santino-shirt-images.mjs --limit 1 --dry-run
```

Expected: command should fail until CLI, crawl, and manifest code exist.

- [ ] **Step 2: Run test to verify it fails**

Run: `node scripts/santino-shirt-images.mjs --limit 1 --dry-run`
Expected: fail with missing CLI behavior.

- [ ] **Step 3: Write minimal implementation**

```js
// CLI: crawl category, visit shirt products, extract images, save manifest.
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node scripts/santino-shirt-images.mjs --limit 1 --dry-run`
Expected: PASS and print planned output without writing files.

- [ ] **Step 5: Commit**

```bash
git add scripts/santino-shirt-images.mjs package.json
git commit -m "feat: add santino shirt image crawler"
```

### Task 4: Verify against live site

**Files:**
- Modify: `output/santino-shirts/*` if generated locally

- [ ] **Step 1: Run live scrape**

Run: `node scripts/santino-shirt-images.mjs`

- [ ] **Step 2: Inspect output**

Check:
- manifest exists
- shirt products captured
- images downloaded
- duplicates skipped

- [ ] **Step 3: Commit if repo should keep generated fixture-free code only**

```bash
git add scripts/santino-shirt-images.mjs package.json
git commit -m "feat: finalize santino shirt image scraper"
```
