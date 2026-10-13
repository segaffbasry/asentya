"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function Login({ configured }: { configured: boolean }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function signIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setBusy(true); setError("");
    try {
      const response = await fetch("/api/admin/session", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: form.get("email"), password: form.get("password") }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      router.refresh();
    } catch (error) { setError(error instanceof Error ? error.message : "Unable to sign in. Please try again."); }
    finally { setBusy(false); }
  }

  return <div className="cms-login-wrap">
    <section className="cms-login-intro">
      <p className="cms-eyebrow">ASENTYA EDITOR</p>
      <h1>A space for<br />your next insight.</h1>
      <p>Write, refine, and publish your articles.<br />Everything you need, in one place.</p>
      <div className="cms-login-features"><span>Simple writing tools</span><span>Drafts & previews</span><span>One-click publishing</span></div>
    </section>
    <section className="cms-login-card" aria-labelledby="login-title">
      <div className="cms-login-icon" aria-hidden="true">✎</div>
      <h2 id="login-title">Welcome back</h2>
      <p>Sign in to manage Asentya’s articles.</p>
      {!configured && <p className="cms-notice">Your editor is ready. Sign-in is waiting for the website administrator to finish setup.</p>}
      <form onSubmit={signIn}>
        <label>Email address<input type="email" name="email" autoComplete="username" defaultValue="admin@asentya.com" required /></label>
        <label>Password<input type="password" name="password" autoComplete="current-password" placeholder="Enter your password" required maxLength={256} /></label>
        {error && <p className="cms-error" role="alert">{error}</p>}
        <button className="cms-button cms-primary" disabled={busy || !configured}>{busy ? "Signing in…" : "Sign in"}<span aria-hidden="true">→</span></button>
      </form>
      <p className="cms-login-help">Need access? Contact the website administrator.</p>
    </section>
  </div>;
}
