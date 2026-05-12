import assert from "node:assert/strict";
import test from "node:test";

const loadService = async (envValue?: string) => {
  if (envValue === undefined) {
    delete process.env.NEXT_PUBLIC_API_URL;
  } else {
    process.env.NEXT_PUBLIC_API_URL = envValue;
  }

  return import(`./productsService.ts?case=${Math.random()}`);
};

test("getproductsData uses NEXT_PUBLIC_API_URL-backed products endpoint", async () => {
  const calls: string[] = [];
  const originalFetch = globalThis.fetch;

  globalThis.fetch = (async (input: string | URL | Request) => {
    calls.push(String(input));

    return {
      json: async () => ({ data: [] }),
    } as Response;
  }) as typeof fetch;

  try {
    const service = await loadService("https://demo.trycloudflare.com/api");
    await service.getproductsData();

    assert.deepEqual(calls, ["https://demo.trycloudflare.com/api/products"]);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
