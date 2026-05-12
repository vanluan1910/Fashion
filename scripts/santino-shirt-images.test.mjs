import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import {
  buildProductImageEntries,
  extractShirtCategoryLinks,
  extractProductLinks,
  extractProductImages,
  extractProductTitle,
  isShirtText,
} from './santino-shirt-images.mjs';

const fixturesDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '__fixtures__');

async function fixture(name) {
  return readFile(path.join(fixturesDir, name), 'utf8');
}

test('extractShirtCategoryLinks keeps only shirt categories', async () => {
  const html = await fixture('santino-category-root.html');
  const links = extractShirtCategoryLinks(html, 'https://santino.com.vn/product-category/san-pham');

  assert.deepEqual(links, ['https://santino.com.vn/product-category/san-pham/ao-so-mi-nam-dai-tay']);
});

test('extractProductLinks keeps only shirt products', async () => {
  const html = await fixture('santino-shirt-category.html');
  const links = extractProductLinks(html, 'https://santino.com.vn/product-category/san-pham/ao-so-mi-nam-dai-tay');

  assert.deepEqual(links, [
    'https://santino.com.vn/product/ao-so-mi-dai-tay-bamboo-nam-cao-cap-santino-s851',
    'https://santino.com.vn/product/ao-so-mi-dai-tay-bamboo-nam-cao-cap-santino-s849',
  ]);
});

test('extractProductImages collects unique image urls from multiple sources', async () => {
  const html = await fixture('santino-product.html');
  const images = extractProductImages(html, 'https://santino.com.vn/product/ao-so-mi-dai-tay-bamboo-nam-cao-cap-santino-s851');

  assert.deepEqual(images, [
    'https://cdn.santino.com.vn/storage/upload/products/2026/03/S851-08.jpg',
    'https://cdn.santino.com.vn/storage/upload/products/2026/03/S851-09.jpg',
    'https://cdn.santino.com.vn/storage/upload/products/2026/03/S851-10.jpg',
    'https://cdn.santino.com.vn/storage/upload/products/2026/03/S851-11.jpg',
  ]);
});

test('extractProductTitle prefers page heading', async () => {
  const html = await fixture('santino-product.html');
  const title = extractProductTitle(html);

  assert.equal(title, 'Ao so mi dai tay bamboo nam cao cap Santino S851');
});

test('isShirtText matches shirt-like labels only', () => {
  assert.equal(isShirtText('Ao so mi nam'), true);
  assert.equal(isShirtText('So mi dai tay'), true);
  assert.equal(isShirtText('Ao vest nam'), false);
});

test('buildProductImageEntries stores images under product slug folder', () => {
  const entries = buildProductImageEntries({
    outputDir: 'output/santino-shirts',
    productUrl: 'https://santino.com.vn/product/ao-so-mi-dai-tay-bamboo-nam-cao-cap-santino-s851',
    title: 'Ao so mi dai tay bamboo nam cao cap Santino S851',
    images: [
      'https://cdn.santino.com.vn/storage/upload/products/2026/03/S851-08.jpg',
      'https://cdn.santino.com.vn/storage/upload/products/2026/03/S851-09.png',
    ],
  });

  assert.deepEqual(entries, [
    {
      title: 'Ao so mi dai tay bamboo nam cao cap Santino S851',
      productUrl: 'https://santino.com.vn/product/ao-so-mi-dai-tay-bamboo-nam-cao-cap-santino-s851',
      sourceUrl: 'https://santino.com.vn/product/ao-so-mi-dai-tay-bamboo-nam-cao-cap-santino-s851',
      imageUrl: 'https://cdn.santino.com.vn/storage/upload/products/2026/03/S851-08.jpg',
      localPath: path.join('output/santino-shirts', 's851', '01.jpg'),
      index: 1,
    },
    {
      title: 'Ao so mi dai tay bamboo nam cao cap Santino S851',
      productUrl: 'https://santino.com.vn/product/ao-so-mi-dai-tay-bamboo-nam-cao-cap-santino-s851',
      sourceUrl: 'https://santino.com.vn/product/ao-so-mi-dai-tay-bamboo-nam-cao-cap-santino-s851',
      imageUrl: 'https://cdn.santino.com.vn/storage/upload/products/2026/03/S851-09.png',
      localPath: path.join('output/santino-shirts', 's851', '02.png'),
      index: 2,
    },
  ]);
});
