import { cookies } from "next/headers";
import { CMS_COOKIE, validSession } from "./cms-session.mjs";
export { CMS_COOKIE, cmsConfigured, createSession, SESSION_SECONDS, verifyPassword } from "./cms-session.mjs";

export async function editorSignedIn() {
  return validSession((await cookies()).get(CMS_COOKIE)?.value);
}

export function sameOrigin(request: Request) {
  try {
    const origin = new URL(request.headers.get("origin") || "");
    const host = request.headers.get("host") || new URL(request.url).host;
    return origin.host === host && (origin.protocol === "https:" || process.env.NODE_ENV !== "production");
  } catch { return false; }
}

export async function authorizeEditor(request: Request) {
  if (!await editorSignedIn()) return Response.json({ error: "Please sign in again." }, { status: 401 });
  if (request.method !== "GET" && !sameOrigin(request)) {
    return Response.json({ error: "This request could not be verified." }, { status: 403 });
  }
  return null;
}
