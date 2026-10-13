"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { CmsEntry } from "@/lib/cms-types";
import { ArticleForm } from "./ArticleForm";
import { Confetti, type BurstOrigin } from "./Confetti";
import { Tooltip } from "./Tooltip";
import { Loader } from "./Loader";
import { ArchiveIcon, Cross2Icon, ChevronRightIcon, ExitIcon, FileTextIcon, MagnifyingGlassIcon, PlusIcon, ReaderIcon } from "@radix-ui/react-icons";

export function Dashboard({ initialEntries, loadError }: { initialEntries: CmsEntry[]; loadError?: string }) {
  const router = useRouter();
  const [entries, setEntries] = useState(initialEntries);
  const [selection, setSelection] = useState<CmsEntry | "new" | null>(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All articles");
  const [celebration, setCelebration] = useState<BurstOrigin | null>(null);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function signOut() {
    setBusy(true);
    try { const response = await fetch("/api/admin/session", { method: "DELETE" }); if (!response.ok) throw new Error("Could not sign out. Please try again."); router.refresh(); }
    catch (error) { setError(error instanceof Error ? error.message : "Could not sign out."); setBusy(false); }
  }
  const visible = entries.filter(({ article }) => `${article.title} ${article.slug} ${article.byline}`.toLowerCase().includes(query.toLowerCase()) &&
    (filter === "All articles" || article.published === (filter === "Published")));
  return <div className="cms-workspace">
    {celebration && <Confetti origin={celebration} />}
    {busy && <Loader label="Signing out" />}
    <aside className="cms-sidebar"><div className="cms-sidebar-heading">Collections</div>
      <div className="cms-collection"><ReaderIcon aria-hidden="true" /><span>Blog</span><span className="cms-count">{entries.length}</span></div>
      <nav aria-label="Filter articles">{["All articles", "Published", "Drafts"].map((name, index) => <button key={name} aria-pressed={filter === name} onClick={() => setFilter(name)}>{index === 2 ? <ArchiveIcon aria-hidden="true" /> : <FileTextIcon aria-hidden="true" />}<span>{name}</span><span className="cms-count">{index === 0 ? entries.length : entries.filter(({article}) => article.published === (index === 1)).length}</span></button>)}</nav>
      <div className="cms-sidebar-bottom"><button className="cms-button cms-quiet" onClick={signOut} disabled={busy}><ExitIcon aria-hidden="true" />Sign out</button></div>
    </aside>
    <section className="cms-collection-main" aria-label="Article library">
      <div className="cms-collection-toolbar"><div className="cms-breadcrumb">Collections<ChevronRightIcon aria-hidden="true" /><strong>Blog</strong><span className="cms-count">{visible.length}</span></div><Tooltip text="Create a new article"><button className="cms-button cms-primary" onClick={() => setSelection("new")} disabled={Boolean(loadError)}><PlusIcon aria-hidden="true" />New article</button></Tooltip></div>
      <div className="cms-table-tools"><span>{filter}</span><div className="cms-search-field"><MagnifyingGlassIcon aria-hidden="true" /><input className="cms-search" type="search" aria-label="Search articles" placeholder="Search articles…" value={query} onChange={(event) => setQuery(event.target.value)} /></div></div>
      {(loadError || error) && <p className="cms-error" role="alert">{loadError || error}</p>}
      {message && <p className="cms-notice cms-toast" role="status">{message}<button aria-label="Dismiss notification" onClick={() => setMessage("")}><Cross2Icon aria-hidden="true" /></button></p>}
      <div className="cms-table-scroll"><table className="cms-content-table"><thead><tr><th>Title</th><th>Status</th><th>Slug</th><th>Date</th><th>Image</th></tr></thead><tbody>
        {visible.map((entry) => <tr key={entry.article.slug} className={selection !== "new" && selection?.article.slug === entry.article.slug ? "is-selected" : ""}>
          <td><button className="cms-table-title" onClick={() => setSelection(entry)}>{entry.article.title}<span>{entry.article.category}</span></button></td>
          <td><span className={`cms-badge ${entry.article.published ? "is-published" : ""}`}>{entry.article.published ? "Live" : "Draft"}</span></td>
          <td><span className="cms-table-slug" title={entry.article.slug}>{entry.article.slug}</span></td>
          <td><time dateTime={entry.article.date}>{entry.article.date ? new Date(`${entry.article.date}T00:00:00Z`).toLocaleDateString("en-GB", {timeZone: "UTC"}) : "—"}</time></td>
          <td><button className="cms-table-image" aria-label={`Edit cover image for ${entry.article.title}`} onClick={() => setSelection(entry)}>{entry.article.image ? <span role="img" aria-label="Article cover" style={{backgroundImage: `url(${JSON.stringify(entry.article.image)})`}} /> : <PlusIcon aria-hidden="true" />}</button></td>
        </tr>)}
      </tbody></table></div>
      {!visible.length && <div className="cms-empty"><h2>{entries.length ? "No matching articles" : "Your next insight starts here"}</h2><p>{entries.length ? "Try a different search or filter." : "Create your first article and save it as a draft."}</p></div>}
      <div className="cms-table-footer">{visible.length} article{visible.length !== 1 ? "s" : ""}<span>Save a draft. Publish when you’re ready.</span></div>
    </section>
    {selection && <ArticleForm key={selection === "new" ? "new" : selection.article.slug} initial={selection === "new" ? undefined : selection} onClose={() => setSelection(null)} onSaved={(entry, burst) => {
      if (burst) setCelebration(burst);
      setEntries((current) => [...current.filter((candidate) => candidate.article.slug !== entry.article.slug), entry].sort((a, b) => b.article.date.localeCompare(a.article.date)));
      setMessage(entry.article.published ? "Article saved. The website will update in a few minutes." : "Draft saved. It is not published on the website."); setSelection(null);
    }} />}
  </div>;
}
