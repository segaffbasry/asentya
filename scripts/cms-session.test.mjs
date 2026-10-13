import assert from "node:assert/strict";
import { createHmac, scryptSync } from "node:crypto";
import test from "node:test";
import { cmsConfigured, createSession, validSession, verifyPassword } from "../lib/cms-session.mjs";

process.env.CMS_ADMIN_EMAIL = "admin@asentya.com";
process.env.CMS_SESSION_SECRET = "test-secret-for-isolated-tests-only-123456789";
process.env.CMS_GITHUB_TOKEN = "nonfunctional-test-fixture";
process.env.CMS_PASSWORD_HASH = `test-salt:${scryptSync("fixture-password", "test-salt", 64).toString("hex")}`;

test("password hashes authenticate only the correct password", () => {
  assert.equal(verifyPassword("fixture-password"), true);
  assert.equal(verifyPassword("incorrect"), false);
  assert.equal(verifyPassword("x".repeat(257)), false);
});

test("sessions reject missing, altered, expired, and rotated credentials", () => {
  const token = createSession();
  assert.equal(validSession(token), true);
  assert.equal(validSession(), false);
  assert.equal(validSession(token + "x"), false);
  const [payload] = token.split(".");
  const expired = JSON.parse(Buffer.from(payload, "base64url").toString());
  expired.expires = Date.now() - 100;
  const expiredPayload = Buffer.from(JSON.stringify(expired)).toString("base64url");
  const mac = createHmac("sha256", process.env.CMS_SESSION_SECRET).update(expiredPayload).digest("base64url");
  assert.equal(validSession(`${expiredPayload}.${mac}`), false);
  const previous = process.env.CMS_PASSWORD_HASH;
  process.env.CMS_PASSWORD_HASH = `another-salt:${scryptSync("other-fixture", "another-salt", 64).toString("hex")}`;
  assert.equal(validSession(token), false);
  process.env.CMS_PASSWORD_HASH = previous;
});

test("missing server configuration keeps the editor locked", () => {
  const previous = process.env.CMS_GITHUB_TOKEN;
  delete process.env.CMS_GITHUB_TOKEN;
  assert.equal(cmsConfigured(), false);
  assert.equal(validSession(createSession()), false);
  process.env.CMS_GITHUB_TOKEN = previous;
});
