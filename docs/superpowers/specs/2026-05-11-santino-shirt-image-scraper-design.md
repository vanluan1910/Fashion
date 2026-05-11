# Santino Shirt Image Scraper Design

## Goal

Build one local tool that collects all shirt product images from the Santino category page and each shirt product detail page.

The tool should:

- start from `https://santino.com.vn/product-category/san-pham`
- keep only shirt products
- visit each shirt product page
- download every available product image
- save image metadata for later reuse

## Problem

The current repo has no reusable scraper for this task.

Manual downloading is slow, error-prone, and hard to repeat if the product list changes.

## Scope

### In scope

- crawl the target category page
- detect shirt products from category listings and/or product detail content
- open each product page
- extract all product images, including gallery images and primary product images
- download images to local disk
- write a manifest file with product title, URL, image URLs, and local file paths

### Out of scope

- editing product images
- uploading to cloud storage
- syncing with backend or admin UI
- scraping unrelated categories

## Design Direction

Use a hybrid scraper:

- `fetch`/HTML parsing for fast discovery when markup is available
- browser automation fallback for pages that hide data behind client-side rendering or lazy-loaded gallery behavior

This is preferred over browser-only scraping because it is faster on the main path and easier to rerun.

## Tool Shape

Implement one Node.js script in the repo, runnable from the command line.

Expected behavior:

1. Load category page.
2. Collect candidate product links.
3. Filter to shirt products by title, category hints, or product attributes.
4. Visit each product page.
5. Extract all image URLs from gallery, featured image, and structured metadata.
6. Download each image once.
7. Save a JSON manifest for the run.

## Output Format

The tool should write:

- `output/santino-shirts/manifest.json`
- `output/santino-shirts/images/...`

Manifest records should include:

- product title
- product URL
- source page URL
- image URL
- local file path
- image order/index

## Extraction Rules

### Shirt filtering

Keep product if:

- title contains shirt-related signals such as `sơ mi`, `shirt`, `shirting`, or `satin shirt`
- or product/category metadata clearly marks it as shirt-related

Exclude products that are clearly not shirts even if they appear in the same category page.

### Image collection

Collect images from:

- Open Graph / meta tags
- product gallery data
- product image anchors
- lazy-load attributes such as `data-src` or `data-lazy`
- any page-level JSON blobs that list image URLs

Prefer high-resolution URLs when multiple variants exist.

## Reliability Rules

The scraper should:

- deduplicate URLs
- skip broken downloads without stopping the full run
- use deterministic file names
- avoid re-downloading files that already exist
- log failures per product and continue

If HTTP parsing returns too little data, the browser fallback should load the page and extract the same fields from rendered DOM.

## Safety And Compliance

The tool should be polite:

- rate-limit requests
- set a clear user-agent
- respect site availability
- avoid aggressive concurrency

If the site blocks automated access, the tool should stop with a clear error instead of trying to bypass protections.

## Testing

Verify by running the scraper on the target page and checking:

- at least one shirt product is captured
- each shirt product includes multiple image URLs where available
- files are written to disk
- manifest entries match downloaded files
- rerun does not duplicate existing downloads

## Success Criteria

The tool is successful when it can be rerun locally and reliably produce a folder of shirt product images plus a manifest without manual copying.
