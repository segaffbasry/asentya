"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { CmsEntry } from "@/lib/cms-types";
import { ArticleForm } from "./ArticleForm";
import { ExitIcon, MagnifyingGlassIcon, Pencil1Icon, PlusIcon } from "@radix-ui/react-icons";

export function Dashboard({ initialEntries, loadError }: { initialEntries: CmsEntry[]; loadError?: string }) {
  const router = useRouter();
  const [entries, setEntries] = useState(initialEntries);
  const [selection, setSelection] = useState<CmsEntry | "new" | null>(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All articles");
  const [message, setMessage] = useState("");

  async function signOut() {
    await fetch("/api/admin/session", { method: "DELETE" });
    router.refresh();
  }

  if (selection) return <ArticleForm key={selection === "new" ? "new" : selection.article.slug}
    initial={selection === "new" ? undefined : selection}
    onClose={() => setSelection(null)}
    onSaved={(entry) => {
      setEntries((current) => [...current.filter((candidate) => candidate.article.slug !== entry.article.slug), entry]
        .sort((a, b) => b.article.date.localeCompare(a.article.date)));
      setMessage(entry.article.published ? "Article saved for publishing. The website will update in a few minutes." : "Draft saved. It is not published on the website.");
      setSelection(null);
    }} />;

  const visible = entries.filter(({ article }) => article.title.toLowerCase().includes(query.toLowerCase()) &&
    (filter === "All articles" || article.published === (filter === "Published")));

  return <>
    <div className="cms-page-heading"><div><p className="cms-eyebrow">YOUR PUBLISHING SPACE</p><h1>Articles</h1><p>Share your expertise. Keep your readers informed.</p></div>
      <div className="cms-actions"><button className="cms-button cms-quiet" onClick={signOut}><ExitIcon aria-hidden="true" />Sign out</button><button className="cms-button cms-primary" onClick={() => setSelection("new")} disabled={Boolean(loadError)}><PlusIcon aria-hidden="true" />New article</button></div>
    </div>
    {loadError && <p className="cms-error" role="alert">{loadError}</p>}
    {message && <p className="cms-notice" role="status">{message}</p>}
    <div className="cms-summary"><div><strong>{entries.length}</strong><span>Total articles</span></div><div><strong>{entries.filter(({ article }) => article.published).length}</strong><span>Published</span></div><div><strong>{entries.filter(({ article }) => !article.published).length}</strong><span>Drafts</span></div></div>
    <section className="cms-library" aria-label="Article library">
      <div className="cms-library-controls"><div className="cms-tabs" role="group" aria-label="Filter articles">{["All articles", "Published", "Drafts"].map((name) => <button key={name} aria-pressed={filter === name} onClick={() => setFilter(name)}>{name}</button>)}</div><div className="cms-search-field"><MagnifyingGlassIcon aria-hidden="true" /><input className="cms-search" type="search" aria-label="Search articles" placeholder="Search articles…" value={query} onChange={(event) => setQuery(event.target.value)} /></div></div>
      <div className="cms-list-head"><span>Article</span><span>Status</span><span>Date</span><span /></div>
      {visible.map((entry) => <button className="cms-article-row" key={entry.article.slug} onClick={() => setSelection(entry)}>
        <span className="cms-row-title"><strong>{entry.article.title}</strong><span>{entry.article.category} · {entry.article.byline}</span></span>
        <span><span className={`cms-badge ${entry.article.published ? "is-published" : ""}`}>{entry.article.published ? "Published" : "Draft"}</span></span>
        <time dateTime={entry.article.date}>{entry.article.date ? new Date(`${entry.article.date}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }) : "—"}</time><span className="cms-row-edit"><Pencil1Icon aria-hidden="true" />Edit</span>
      </button>)}
      {!visible.length && <div className="cms-empty"><h2>{entries.length ? "No matching articles" : "Your next insight starts here"}</h2><p>{entries.length ? "Try a different search or filter." : "Create your first article and save it as a draft."}</p></div>}
    </section>
    <p className="cms-bottom-help">Save your work as a draft. Publish when you’re ready.</p>
  </>;
}
