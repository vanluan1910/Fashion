import test from 'node:test';
import assert from 'node:assert/strict';
import { getProductImages } from './productImages.mjs';

test('getProductImages returns unique gallery images with primary first', () => {
  const images = getProductImages({
    image: '/images/one.jpg',
    images: ['/images/two.jpg', '/images/one.jpg', '/images/three.jpg'],
  });

  assert.deepEqual(images, ['/images/one.jpg', '/images/two.jpg', '/images/three.jpg']);
});
