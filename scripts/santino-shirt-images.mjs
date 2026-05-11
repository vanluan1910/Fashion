import { mkdir, writeFile, access, rm } from 'node:fs/promises';
import { createWriteStream } from 'node:fs';
import path from 'node:path';
import { pipeline } from 'node:stream/promises';

const DEFAULT_ROOT = 'https://santino.com.vn/product-category/san-pham';
const OUTPUT_DIR = path.join('output', 'santino-shirts');

const SHIRT_HINTS = [
  'so mi',
  'shirt',
  'shirting',
  'satin shirt',
  'ao so mi',
  'ao-somi',
];

function stripDiacritics(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

export function isShirtText(value) {
  const normalized = stripDiacritics(value);
  return SHIRT_HINTS.some((hint) => normalized.includes(hint));
}

function absoluteUrl(baseUrl, href) {
  try {
    return new URL(href, baseUrl).toString();
  } catch {
    return null;
  }
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function cleanUrl(value) {
  return String(value).replace(/[)',;]+$/, '');
}

function collectHrefMatches(html) {
  return [...html.matchAll(/href="([^"]+)"/gi)].map((match) => match[1]);
}

function collectTextAroundAnchors(html) {
  return [...html.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)].map((match) => ({
    href: match[1],
    text: match[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(),
  }));
}

export function extractShirtCategoryLinks(html, baseUrl) {
  return unique(
    collectTextAroundAnchors(html)
      .filter(({ href, text }) => (href.includes('/product-category/san-pham/') && (isShirtText(href) || isShirtText(text))))
      .map(({ href }) => absoluteUrl(baseUrl, href))
  );
}

export function extractProductLinks(html, baseUrl) {
  return unique(
    collectTextAroundAnchors(html)
      .filter(({ href, text }) => href.includes('/product/') && (isShirtText(href) || isShirtText(text) || href.includes('ao-so-mi')))
      .map(({ href }) => absoluteUrl(baseUrl, href))
  );
}

function extractJsonLdImages(html) {
  const images = [];
  for (const match of html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const data = JSON.parse(match[1].trim());
      const values = Array.isArray(data)
        ? data.flatMap((item) => item?.image || [])
        : data?.image || [];
      for (const value of [].concat(values)) {
        if (typeof value === 'string') images.push(value);
      }
    } catch {
      // ignore malformed JSON-LD
    }
  }
  return images;
}

export function extractProductImages(html, baseUrl) {
  const urls = [];

  for (const match of html.matchAll(/property="og:image"[^>]*content="([^"]+)"/gi)) urls.push(match[1]);
  for (const match of html.matchAll(/data-(?:src|lazy|large_image)="([^"]+)"/gi)) urls.push(match[1]);
  for (const match of html.matchAll(/<img\b[^>]*(?:src|data-src|data-lazy|data-large_image)="([^"]+)"/gi)) urls.push(match[1]);
  for (const match of html.matchAll(/href="([^"]+\.(?:jpg|jpeg|png|webp)(?:\?[^"]*)?)"/gi)) urls.push(match[1]);
  for (const match of html.matchAll(/https:\/\/cdn\.santino\.com\.vn\/storage\/upload\/products\/[^"'`\s<>]+/gi)) urls.push(match[0]);
  urls.push(...extractJsonLdImages(html));

  return unique(urls.map((url) => absoluteUrl(baseUrl, url) || url))
    .map(cleanUrl)
    .filter((url) => /\/storage\/upload\/products\//.test(url));
}

export function extractProductTitle(html) {
  const headingMatch = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i);
  if (headingMatch) {
    return headingMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  }

  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
  if (titleMatch) {
    return titleMatch[1].replace(/\s+/g, ' ').trim();
  }

  return '';
}

async function fetchHtml(url) {
  const response = await fetch(url, {
    headers: {
      'user-agent': 'Mozilla/5.0 (compatible; SantinoImageScraper/1.0)',
      accept: 'text/html,application/xhtml+xml',
    },
  });
  if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.status}`);
  return response.text();
}

async function fetchWithBrowser(url) {
  try {
    const { chromium } = await import('playwright');
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle' });
    const html = await page.content();
    await browser.close();
    return html;
  } catch (error) {
    throw new Error(`Browser fallback unavailable for ${url}: ${error.message}`);
  }
}

async function loadHtml(url) {
  try {
    return await fetchHtml(url);
  } catch {
    return fetchWithBrowser(url);
  }
}

function parseArgs(argv) {
  const args = { rootUrl: DEFAULT_ROOT, limit: Infinity, dryRun: false, outputDir: OUTPUT_DIR };
  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--dry-run') args.dryRun = true;
    else if (arg === '--limit') args.limit = Number(argv[++i]);
    else if (arg === '--root') args.rootUrl = argv[++i];
    else if (arg === '--out') args.outputDir = argv[++i];
  }
  return args;
}

function getExtension(url, contentType = '') {
  const ext = path.extname(new URL(url).pathname);
  if (ext) return ext;
  if (contentType.includes('jpeg')) return '.jpg';
  if (contentType.includes('png')) return '.png';
  if (contentType.includes('webp')) return '.webp';
  return '.jpg';
}

async function downloadImage(url, filePath) {
  const response = await fetch(url, {
    headers: { 'user-agent': 'Mozilla/5.0 (compatible; SantinoImageScraper/1.0)' },
  });
  if (!response.ok) throw new Error(`Failed to download ${url}: ${response.status}`);
  await mkdir(path.dirname(filePath), { recursive: true });
  const stream = createWriteStream(filePath);
  await pipeline(response.body, stream);
}

async function runCli() {
  const { rootUrl, limit, dryRun, outputDir } = parseArgs(process.argv);
  const rootHtml = await loadHtml(rootUrl);
  const categoryLinks = extractShirtCategoryLinks(rootHtml, rootUrl);
  const categoryPages = categoryLinks.length ? categoryLinks : [rootUrl];

  const productLinks = [];
  for (const categoryUrl of categoryPages) {
    const html = categoryUrl === rootUrl ? rootHtml : await loadHtml(categoryUrl);
    productLinks.push(...extractProductLinks(html, categoryUrl));
  }

  const selectedProducts = unique(productLinks).slice(0, limit);
  const manifest = [];

  for (const productUrl of selectedProducts) {
    const html = await loadHtml(productUrl);
    const images = extractProductImages(html, productUrl);
    const title = extractProductTitle(html) || new URL(productUrl).pathname.split('/').filter(Boolean).pop();
    const slug = new URL(productUrl).pathname.split('/').filter(Boolean).pop();

    images.forEach((imageUrl, index) => {
      const filename = `${slug}-${String(index + 1).padStart(2, '0')}${path.extname(new URL(imageUrl).pathname) || '.jpg'}`;
      const filePath = path.join(outputDir, 'images', filename);
      manifest.push({
        title,
        productUrl,
        sourceUrl: productUrl,
        imageUrl,
        localPath: filePath,
        index: index + 1,
      });
    });

    if (!dryRun) {
      for (const entry of manifest.filter((item) => item.productUrl === productUrl)) {
        try {
          await access(entry.localPath);
        } catch {
          await downloadImage(entry.imageUrl, entry.localPath);
        }
      }
    }
  }

  if (!dryRun) {
    await mkdir(outputDir, { recursive: true });
    await writeFile(path.join(outputDir, 'manifest.json'), JSON.stringify(manifest, null, 2), 'utf8');
  }

  console.log(JSON.stringify({ products: selectedProducts.length, images: manifest.length, dryRun }, null, 2));
  return manifest;
}

if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href) {
  runCli().catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
}

export { runCli };
