import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import "./admin.css";

export const metadata: Metadata = {
  title: { absolute: "Asentya — Article editor" },
  robots: { index: false, follow: false },
};

export default function EditorLayout({ children }: { children: React.ReactNode }) {
  return <div className="cms-shell">
    <header className="cms-header">
      <Link href="/admin" aria-label="Asentya article editor"><Image src="/images/logo-color.svg" width={132} height={47} alt="Asentya Legal Advisor" priority /></Link>
      <span className="cms-header-label">Article editor</span>
      <a href="/" target="_blank" rel="noreferrer" className="cms-site-link">View website <ExternalLinkIcon aria-hidden="true" /></a>
    </header>
    <main id="main-content" className="cms-main">{children}</main>
    <footer className="cms-footer">Asentya Legal Advisor <span>Always at your presence.</span></footer>
  </div>;
}
