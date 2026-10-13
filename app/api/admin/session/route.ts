import { NextResponse } from "next/server";
import { CMS_COOKIE, cmsConfigured, createSession, sameOrigin, SESSION_SECONDS, verifyPassword } from "@/lib/cms-auth";

export const runtime = "nodejs";
const attempts = new Map<string, { count: number; reset: number }>();

export async function POST(request: Request) {
  if (!sameOrigin(request)) return new Response(null, { status: 403 });
  if (!cmsConfigured()) return Response.json({ error: "Editor sign-in has not been enabled yet." }, { status: 503 });
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "local";
  const now = Date.now();
  for (const [key, entry] of attempts) if (entry.reset < now) attempts.delete(key);
  const entry = attempts.get(ip) || { count: 0, reset: now + 15 * 60 * 1000 };
  if (entry.count >= 5) return Response.json({ error: "Too many attempts. Please try again in 15 minutes." }, { status: 429 });
  if (attempts.size > 10000) return Response.json({ error: "Please try again later." }, { status: 429 });
  entry.count++;
  attempts.set(ip, entry);
  try {
    const { email, password } = await request.json();
    const matches = typeof email === "string" && email.toLowerCase().trim() === (process.env.CMS_ADMIN_EMAIL || "admin@asentya.com").toLowerCase();
    const correct = typeof password === "string" && verifyPassword(password);
    if (!matches || !correct) return Response.json({ error: "Check your email and password, then try again." }, { status: 401 });
    attempts.delete(ip);
    const response = NextResponse.json({ ok: true });
    response.cookies.set(CMS_COOKIE, createSession(), { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: SESSION_SECONDS });
    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch { return Response.json({ error: "Check your email and password, then try again." }, { status: 400 }); }
}

export async function DELETE(request: Request) {
  if (!sameOrigin(request)) return new Response(null, { status: 403 });
  const response = NextResponse.json({ ok: true });
  response.cookies.set(CMS_COOKIE, "", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: 0 });
  return response;
}
