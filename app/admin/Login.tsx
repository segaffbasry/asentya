"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, EyeClosedIcon, EyeOpenIcon, ReloadIcon } from "@radix-ui/react-icons";

export function Login({ configured }: { configured: boolean }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
    <Link className="cms-login-brand" href="/" aria-label="Asentya home"><Image src="/images/logo-color.svg" width={142} height={51} alt="Asentya Legal Advisor" priority /></Link>
    <section className="cms-login-card" aria-labelledby="login-title">
      <h1 id="login-title">Sign in to your account</h1>
      <form onSubmit={signIn}>
        <label>Email<input type="email" name="email" autoComplete="username" defaultValue="admin@asentya.com" required /></label>
        <label>Password<span className="cms-password-field"><input type={showPassword ? "text" : "password"} name="password" autoComplete="current-password" required maxLength={256} /><button type="button" aria-label={showPassword ? "Hide password" : "Show password"} aria-pressed={showPassword} onClick={() => setShowPassword((visible) => !visible)}>{showPassword ? <EyeClosedIcon aria-hidden="true" /> : <EyeOpenIcon aria-hidden="true" />}</button></span></label>
        {error && <p className="cms-error" role="alert">{error}</p>}
        <button className="cms-button cms-primary" disabled={busy || !configured}>{busy ? <><ReloadIcon className="cms-spin" aria-hidden="true" />Signing in…</> : <>Sign in<ArrowRightIcon aria-hidden="true" /></>}</button>
      </form>
      {!configured && <p className="cms-login-setup" role="status">Sign-in will be available once account setup is complete.</p>}
    </section>
    <p className="cms-login-help">Need access? Contact the website administrator.</p>
    <p className="cms-login-copyright">© Asentya Legal Advisor</p>
  </div>;
}
