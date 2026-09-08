import assert from "node:assert/strict";
import test from "node:test";

import worker, {
  isTestingIngestion,
} from "../cloudflare/posthog-proxy/worker.js";

const testingRequest = (pathname: string) =>
  new Request(`https://e.vrajmpatel.com${pathname}`, {
    method: "POST",
    headers: { "X-Vrajmpatel-Analytics-Mode": "testing" },
  });

test("recognizes only marked PostHog ingestion requests as testing traffic", () => {
  assert.equal(isTestingIngestion(testingRequest("/e/"), "/e/"), true);
  assert.equal(isTestingIngestion(testingRequest("/i/v0/e/"), "/i/v0/e/"), true);
  assert.equal(isTestingIngestion(testingRequest("/s/"), "/s/"), true);
  assert.equal(isTestingIngestion(testingRequest("/decide/?v=3"), "/decide/"), false);
  assert.equal(
    isTestingIngestion(new Request("https://e.vrajmpatel.com/e/", { method: "POST" }), "/e/"),
    false,
  );
});

test("returns locally for marked testing traffic instead of forwarding it to PostHog", async () => {
  const originalFetch = globalThis.fetch;
  let fetchCalls = 0;
  globalThis.fetch = async () => {
    fetchCalls += 1;
    return new Response(null, { status: 204 });
  };

  try {
    const response = await worker.fetch(
      testingRequest("/e/"),
      {},
      { waitUntil: () => undefined },
    );
    assert.equal(response.status, 204);
    assert.equal(response.headers.get("X-Vrajmpatel-Analytics-Excluded"), "testing");
    assert.equal(response.headers.get("Cache-Control"), "no-store");
    assert.equal(fetchCalls, 0);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
