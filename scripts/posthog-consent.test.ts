import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

import {
  CONSENT_STORAGE_KEY,
  defaultConsent,
  hasTrackingGrant,
  isProductionAnalyticsHost,
  optedOutConsent,
  parseStoredConsent,
  serializeConsent,
} from "../src/lib/posthogConsent.ts";

test("defaults both analytics and replay to on", () => {
  assert.deepEqual(defaultConsent(), { analytics: true, replay: true });
  assert.equal(hasTrackingGrant(defaultConsent()), true);
  assert.deepEqual(optedOutConsent(), { analytics: false, replay: false });
  assert.equal(hasTrackingGrant(optedOutConsent()), false);
});

test("parses only complete boolean consent records", () => {
  assert.equal(parseStoredConsent(null), null);
  assert.equal(parseStoredConsent("{"), null);
  assert.equal(parseStoredConsent('{"analytics":true}'), null);
  assert.equal(
    parseStoredConsent('{"analytics":"yes","replay":false}'),
    null,
  );
  assert.deepEqual(parseStoredConsent('{"analytics":true,"replay":false}'), {
    analytics: true,
    replay: false,
  });
  assert.deepEqual(parseStoredConsent('{"analytics":false,"replay":false}'), {
    analytics: false,
    replay: false,
  });
  assert.equal(
    serializeConsent({ analytics: true, replay: true }),
    '{"analytics":true,"replay":true}',
  );
  assert.equal(CONSENT_STORAGE_KEY, "vrajmpatel-analytics-consent");
});

test("treats either remaining grant as enough to keep PostHog capturing", () => {
  assert.equal(hasTrackingGrant({ analytics: true, replay: false }), true);
  assert.equal(hasTrackingGrant({ analytics: false, replay: true }), true);
  assert.equal(hasTrackingGrant({ analytics: true, replay: true }), true);
});

test("limits production ingest to the canonical site hosts", () => {
  assert.equal(isProductionAnalyticsHost("vrajmpatel.com"), true);
  assert.equal(isProductionAnalyticsHost("www.vrajmpatel.com"), true);
  assert.equal(isProductionAnalyticsHost("localhost"), false);
  assert.equal(isProductionAnalyticsHost("patvraj.github.io"), false);
});

test("privacy page controls notify the tracker, and the first-visit banner is gone", async () => {
  const [controls, tracker, layout] = await Promise.all([
    readFile("src/components/PrivacyControls.astro", "utf8"),
    readFile("src/components/Tracker.astro", "utf8"),
    readFile("src/layouts/BaseLayout.astro", "utf8"),
  ]);

  assert.match(controls, /CONSENT_CHANGE_EVENT/);
  assert.doesNotMatch(controls, /canApplyConsentChange/);
  assert.doesNotMatch(controls, /data-consent-confirm/);
  assert.match(tracker, /CONSENT_CHANGE_EVENT/);
  assert.match(tracker, /applyConsent/);
  assert.match(tracker, /defaultConsent/);
  assert.match(tracker, /recruiter_brief_opened/);
  assert.match(tracker, /"account"/);
  assert.doesNotMatch(tracker, /hasBrowserPrivacySignal/);
  assert.doesNotMatch(tracker, /respect_dnt/);
  assert.doesNotMatch(controls, /data-consent-privacy-signal/);
  assert.doesNotMatch(controls, /Do Not Track/);
  assert.doesNotMatch(controls, /Global Privacy Control/);
  assert.doesNotMatch(tracker, /opt_out_capturing_by_default:\s*true/);
  assert.doesNotMatch(layout, /ConsentBanner/);
  assert.doesNotMatch(layout, /Privacy choices/);
  await assert.rejects(access("src/components/ConsentBanner.astro"));
});
