import { createHmac, scryptSync, timingSafeEqual } from "node:crypto";

export const CMS_COOKIE = "asentya_editor";
export const SESSION_SECONDS = 60 * 60 * 8;

export function cmsConfigured() {
  return Boolean(process.env.CMS_PASSWORD_HASH &&
    (process.env.CMS_SESSION_SECRET?.length ?? 0) >= 32 && process.env.CMS_GITHUB_TOKEN);
}

function signature(value) {
  return createHmac("sha256", process.env.CMS_SESSION_SECRET).update(value).digest("base64url");
}

export function verifyPassword(password) {
  const [salt, hash] = (process.env.CMS_PASSWORD_HASH || "").split(":");
  if (!salt || !/^[a-f0-9]{128}$/.test(hash || "") || password.length > 256) return false;
  const actual = scryptSync(password, salt, 64);
  return timingSafeEqual(actual, Buffer.from(hash, "hex"));
}

export function createSession() {
  const payload = Buffer.from(JSON.stringify({
    email: process.env.CMS_ADMIN_EMAIL || "admin@asentya.com",
    expires: Date.now() + SESSION_SECONDS * 1000,
    version: signature(process.env.CMS_PASSWORD_HASH),
  })).toString("base64url");
  return `${payload}.${signature(payload)}`;
}

export function validSession(token) {
  if (!cmsConfigured() || !token) return false;
  try {
    const [payload, mac, extra] = token.split(".");
    if (extra || !payload || !mac) return false;
    const expected = Buffer.from(signature(payload));
    const provided = Buffer.from(mac);
    if (expected.length !== provided.length || !timingSafeEqual(expected, provided)) return false;
    const session = JSON.parse(Buffer.from(payload, "base64url").toString());
    return session.email === (process.env.CMS_ADMIN_EMAIL || "admin@asentya.com") &&
      Number.isFinite(session.expires) && session.expires > Date.now() &&
      session.version === signature(process.env.CMS_PASSWORD_HASH);
  } catch { return false; }
}

