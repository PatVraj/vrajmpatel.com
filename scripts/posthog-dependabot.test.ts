import assert from "node:assert/strict";
import test from "node:test";

import {
  mergeVerifiedUpdate,
  hasRequiredMergeRules,
  isAllowedPostHogLockUpdate,
  isAllowedPostHogUpdate,
} from "./posthog-dependabot.mjs";

test("allows exact PostHog patch and minor upgrades", () => {
  assert.equal(isAllowedPostHogUpdate("1.419.0", "1.419.1"), true);
  assert.equal(isAllowedPostHogUpdate("1.419.1", "1.420.0"), true);
});

test("rejects major, prerelease, duplicate, and downgrade updates", () => {
  assert.equal(isAllowedPostHogUpdate("1.419.0", "2.0.0"), false);
  assert.equal(isAllowedPostHogUpdate("1.419.0", "1.420.0-beta.1"), false);
  assert.equal(isAllowedPostHogUpdate("1.419.0", "1.419.0"), false);
  assert.equal(isAllowedPostHogUpdate("1.419.1", "1.419.0"), false);
});

test("rejects ranges and malformed versions", () => {
  assert.equal(isAllowedPostHogUpdate("^1.419.0", "1.420.0"), false);
  assert.equal(isAllowedPostHogUpdate("1.419.0", "latest"), false);
  assert.equal(isAllowedPostHogUpdate("", "1.420.0"), false);
});

function lockfile(version: string) {
  return {
    lockfileVersion: "9.0",
    settings: {
      autoInstallPeers: true,
      excludeLinksFromLockfile: false,
    },
    importers: {
      ".": {
        dependencies: {
          astro: {
            specifier: "^7.2.7",
            version: "7.2.7",
          },
          "posthog-js": {
            specifier: version,
            version,
          },
        },
      },
    },
    packages: {
      "astro@7.2.7": {
        resolution: { integrity: "sha512-astro" },
      },
      "@posthog/core@1.48.11": {
        resolution: { integrity: "sha512-posthog-core" },
      },
      [`posthog-js@${version}`]: {
        resolution: { integrity: `sha512-${version}` },
      },
    },
    snapshots: {
      "astro@7.2.7": {},
      "@posthog/core@1.48.11": {},
      [`posthog-js@${version}`]: {
        dependencies: { "@posthog/core": "1.48.11" },
      },
    },
  };
}

test("allows lockfile changes limited to the known PostHog graph", () => {
  assert.equal(
    isAllowedPostHogLockUpdate(
      lockfile("1.419.0"),
      lockfile("1.419.2"),
      "1.419.0",
      "1.419.2",
    ),
    true,
  );
});

test("rejects unrelated and unexpected lockfile changes", () => {
  const unrelated = lockfile("1.419.2");
  unrelated.packages["astro@7.2.7"].resolution.integrity = "sha512-changed";
  assert.equal(
    isAllowedPostHogLockUpdate(
      lockfile("1.419.0"),
      unrelated,
      "1.419.0",
      "1.419.2",
    ),
    false,
  );

  const unexpected = lockfile("1.419.2");
  unexpected.packages["@posthog/unexpected@1.0.0"] = {
    resolution: { integrity: "sha512-unexpected" },
  };
  assert.equal(
    isAllowedPostHogLockUpdate(
      lockfile("1.419.0"),
      unexpected,
      "1.419.0",
      "1.419.2",
    ),
    false,
  );
});

test("requires strict main rules for every merge check", () => {
  const rule = {
    type: "required_status_checks",
    parameters: {
      strict_required_status_checks_policy: true,
      required_status_checks: [
        { context: "Quality (Node 24 LTS)" },
        { context: "Compatibility (Node 26 Current)" },
        { context: "Dependency review" },
      ],
    },
  };
  assert.equal(hasRequiredMergeRules([rule]), true);
  rule.parameters.strict_required_status_checks_policy = false;
  assert.equal(hasRequiredMergeRules([rule]), false);
  rule.parameters.strict_required_status_checks_policy = true;
  rule.parameters.required_status_checks.pop();
  assert.equal(hasRequiredMergeRules([rule]), false);
});

test("merges the verified head and dispatches main checks only after confirmed success", async (t) => {
  const calls: { url: string; method: string; body: unknown }[] = [];
  const head = "a".repeat(40);
  const merged = "b".repeat(40);
  t.mock.method(globalThis, "fetch", async (url: string, options: RequestInit) => {
    calls.push({ url, method: options.method!, body: JSON.parse(String(options.body)) });
    return calls.length === 1
      ? Response.json({ merged: true, sha: merged })
      : new Response(null, { status: 204 });
  });
  assert.equal(await mergeVerifiedUpdate("owner/repo", 7, head, "test-token"), merged);
  assert.deepEqual(calls, [
    { url: "https://api.github.com/repos/owner/repo/pulls/7/merge", method: "PUT", body: { sha: head, merge_method: "squash" } },
    { url: "https://api.github.com/repos/owner/repo/actions/workflows/ci.yml/dispatches", method: "POST", body: { ref: "main" } },
  ]);
});

test("a rejected or unconfirmed merge never dispatches a deployment", async (t) => {
  for (const response of [Response.json({ message: "Head changed" }, { status: 409 }), Response.json({ merged: false })]) {
    let calls = 0;
    const mock = t.mock.method(globalThis, "fetch", async () => { calls++; return response; });
    await assert.rejects(mergeVerifiedUpdate("owner/repo", 7, "a".repeat(40), "test-token"));
    assert.equal(calls, 1);
    mock.mock.restore();
  }
});
