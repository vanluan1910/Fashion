import assert from "node:assert/strict";
import test from "node:test";

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
  assert.equal(
    mod.buildStorefrontApiUrl("/products"),
    "http://127.0.0.1:5000/api/products"
  );
});

test("uses NEXT_PUBLIC_API_URL when provided", async () => {
  const mod = await loadModule("https://demo.trycloudflare.com/api");
  assert.equal(mod.STOREFRONT_API_BASE_URL, "https://demo.trycloudflare.com/api");
  assert.equal(
    mod.buildStorefrontApiUrl("/orders"),
    "https://demo.trycloudflare.com/api/orders"
  );
});

test("buildStorefrontApiUrl keeps resource paths relative for products", async () => {
  const mod = await loadModule("https://demo.trycloudflare.com/api");
  assert.equal(
    mod.buildStorefrontApiUrl("/products/42"),
    "https://demo.trycloudflare.com/api/products/42"
  );
});

test("buildStorefrontApiUrl composes other storefront resources from the same base", async () => {
  const mod = await loadModule("https://demo.trycloudflare.com/api");
  assert.equal(
    mod.buildStorefrontApiUrl("/auth/login"),
    "https://demo.trycloudflare.com/api/auth/login"
  );
  assert.equal(
    mod.buildStorefrontApiUrl("/blogs/5"),
    "https://demo.trycloudflare.com/api/blogs/5"
  );
  assert.equal(
    mod.buildStorefrontApiUrl("/orders/account/3"),
    "https://demo.trycloudflare.com/api/orders/account/3"
  );
});
