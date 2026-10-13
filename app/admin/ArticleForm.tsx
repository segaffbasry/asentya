"use client";

import { useEffect, useRef, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import type { CmsArticle, CmsEntry } from "@/lib/cms-types";

function newArticle(): CmsArticle {
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Jakarta", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  return { title: "", slug: "", published: false, date: today, category: "Insights", byline: "", excerpt: "", image: "", body: "" };
}

export function ArticleForm({ initial, onClose, onSaved }: { initial?: CmsEntry; onClose: () => void; onSaved: (entry: CmsEntry) => void }) {
  const [article, setArticle] = useState<CmsArticle>(initial?.article || newArticle);
  const [dirty, setDirty] = useState(false);
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(false);
  const [linkInput, setLinkInput] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState("");
  const [slugEdited, setSlugEdited] = useState(Boolean(initial));
  const coverFile = useRef<HTMLInputElement>(null);
  const inlineFile = useRef<HTMLInputElement>(null);
  const previewDialog = useRef<HTMLDialogElement>(null);
  const editor = useEditor({
    extensions: [StarterKit.configure({ link: { openOnClick: false, protocols: ["https", "http", "mailto", "tel"] } }), Image],
    content: initial?.article.body || "",
    immediatelyRender: false,
    editorProps: { attributes: { "aria-label": "Article body", class: "cms-prose", role: "textbox", "aria-multiline": "true" } },
    onUpdate: ({ editor }) => { setArticle((current) => ({ ...current, body: editor.getHTML() })); setDirty(true); },
  });

  useEffect(() => {
    function leave(event: BeforeUnloadEvent) { if (dirty) { event.preventDefault(); event.returnValue = ""; } }
    window.addEventListener("beforeunload", leave);
    return () => window.removeEventListener("beforeunload", leave);
  }, [dirty]);
  useEffect(() => { return () => { if (coverPreview) URL.revokeObjectURL(coverPreview); }; }, [coverPreview]);
  useEffect(() => { if (preview) previewDialog.current?.showModal(); }, [preview]);

  function change(field: keyof CmsArticle, value: string) {
    setArticle((current) => ({ ...current, [field]: value })); setDirty(true);
  }

  async function upload(file: File | undefined, inline: boolean) {
    if (!file) return;
    setUploading(true); setError("");
    try {
      const form = new FormData(); form.set("image", file);
      const response = await fetch("/api/admin/images", { method: "POST", body: form });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      if (inline) editor?.chain().focus().setImage({ src: result.path, alt: file.name.replace(/\.[^.]+$/, "") }).run();
      else { change("image", result.path); setCoverPreview(URL.createObjectURL(file)); }
    } catch (error) { setError(error instanceof Error ? error.message : "Upload failed. Please try again."); }
    finally { setUploading(false); }
  }

  async function save(published: boolean) {
    setBusy(true); setError("");
    try {
      const response = await fetch("/api/admin/articles", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ article: { ...article, published }, sha: initial?.sha }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setDirty(false); onSaved(result);
    } catch (error) { setError(error instanceof Error ? error.message : "Could not save. Please try again."); }
    finally { setBusy(false); }
  }

  function close() {
    if (!dirty || window.confirm("Leave this article without saving your changes?")) onClose();
  }

  const disabled = busy || uploading;
  return <>
    <div className="cms-editor-heading"><button className="cms-back" onClick={close} disabled={disabled}>← Articles</button><div className="cms-actions"><span className="cms-save-state">{dirty ? "Unsaved changes" : "Saved"}</span><button className="cms-button cms-secondary" onClick={() => setPreview(true)} disabled={disabled}>Preview</button><button className="cms-button cms-secondary" onClick={() => save(initial?.article.published ?? false)} disabled={disabled}>{busy ? "Saving…" : initial?.article.published ? "Save changes" : "Save draft"}</button><button className="cms-button cms-primary" onClick={() => save(true)} disabled={disabled}>{initial?.article.published ? "Update article" : "Publish article"} ↗</button></div></div>
    {error && <p className="cms-error" role="alert">{error}</p>}
    <div className="cms-editor-grid">
      <section className="cms-writing-card"><p className="cms-eyebrow">{initial ? "EDIT ARTICLE" : "NEW ARTICLE"}</p>
        <label className="cms-title-field"><span className="cms-sr-only">Article title</span><input placeholder="Your article title" value={article.title} maxLength={250} onChange={(event) => {
          const title = event.target.value;
          setArticle((current) => ({ ...current, title, ...(!slugEdited ? { slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") } : {}) })); setDirty(true);
        }} /></label>
        <label className="cms-byline-field"><span className="cms-sr-only">Author byline</span><input placeholder="By Author Name | Role" value={article.byline} onChange={(event) => change("byline", event.target.value)} /></label>
        <div className="cms-toolbar" role="toolbar" aria-label="Article formatting">
          <button title="Bold" aria-label="Bold" onClick={() => editor?.chain().focus().toggleBold().run()}><strong>B</strong></button>
          <button title="Italic" aria-label="Italic" onClick={() => editor?.chain().focus().toggleItalic().run()}><em>I</em></button>
          <button title="Heading" aria-label="Heading" onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}>H2</button>
          <button title="Bullet list" aria-label="Bullet list" onClick={() => editor?.chain().focus().toggleBulletList().run()}>• List</button>
          <button title="Numbered list" aria-label="Numbered list" onClick={() => editor?.chain().focus().toggleOrderedList().run()}>1. List</button>
          <button title="Quote" aria-label="Quote" onClick={() => editor?.chain().focus().toggleBlockquote().run()}>“</button>
          <button title="Add link" aria-label="Add link" onClick={() => setLinkInput(editor?.getAttributes("link").href || "")}>Link</button>
          <button title="Add image" aria-label="Add image" onClick={() => inlineFile.current?.click()} disabled={uploading}>Image</button>
          <button title="Undo" aria-label="Undo" onClick={() => editor?.chain().focus().undo().run()}>↶</button>
          <button title="Redo" aria-label="Redo" onClick={() => editor?.chain().focus().redo().run()}>↷</button>
        </div>
        {linkInput !== null && <div className="cms-link-form"><input aria-label="Link address" type="url" placeholder="https://…" value={linkInput} onChange={(event) => setLinkInput(event.target.value)} /><button className="cms-button cms-secondary" onClick={() => {
          if (!linkInput) editor?.chain().focus().unsetLink().run();
          else if (/^(https?:\/\/|mailto:|tel:)/i.test(linkInput)) editor?.chain().focus().extendMarkRange("link").setLink({ href: linkInput }).run();
          else { setError("Enter a complete link beginning with https://."); return; }
          setLinkInput(null);
        }}>Apply</button><button className="cms-button cms-quiet" onClick={() => setLinkInput(null)}>Cancel</button></div>}
        <EditorContent editor={editor} />
        <p className="cms-writing-hint">Partner contact details and the standard disclaimer are added automatically.</p>
        <input ref={inlineFile} type="file" accept="image/jpeg,image/png,image/webp" hidden onChange={(event) => { void upload(event.target.files?.[0], true); event.target.value = ""; }} />
      </section>
      <aside className="cms-details"><div className="cms-detail-card"><h2>Article details</h2>
        <label>URL name<input value={article.slug} disabled={Boolean(initial)} placeholder="your-article-title" onChange={(event) => { setSlugEdited(true); change("slug", event.target.value); }} /><small>{initial ? "The URL is fixed to keep existing links working." : "Lowercase words, separated by hyphens."}</small></label>
        <label>Article date<input type="date" value={article.date} onChange={(event) => change("date", event.target.value)} /></label>
        <label>Category<select value={article.category} onChange={(event) => change("category", event.target.value)}>{["Insights", "Alerts", "Awards"].map((category) => <option key={category}>{category}</option>)}</select></label>
        <label>Short summary<textarea rows={4} placeholder="A short introduction for your readers…" value={article.excerpt} onChange={(event) => change("excerpt", event.target.value)} /></label>
      </div><div className="cms-detail-card"><h2>Cover image</h2>
        {article.image ? <div className="cms-cover-preview" style={{ backgroundImage: `url(${JSON.stringify(coverPreview || article.image)})` }} role="img" aria-label="Cover image preview" /> : <div className="cms-upload-placeholder"><span aria-hidden="true">↥</span><p>Add an image to your article</p></div>}
        <button className="cms-button cms-secondary cms-full" disabled={disabled} onClick={() => coverFile.current?.click()}>{uploading ? "Uploading…" : article.image ? "Change image" : "Upload image"}</button><p className="cms-file-hint">JPG, PNG, or WebP · Up to 4 MB</p>
        <input ref={coverFile} type="file" accept="image/jpeg,image/png,image/webp" hidden onChange={(event) => { void upload(event.target.files?.[0], false); event.target.value = ""; }} />
      </div>{initial?.article.published && <button className="cms-unpublish" disabled={disabled} onClick={() => {
        if (window.confirm("Unpublish this article? It will remain saved as a draft.")) void save(false);
      }}>Move back to drafts</button>}</aside>
    </div>
    {preview && <dialog ref={previewDialog} className="cms-preview" aria-labelledby="preview-title" onCancel={() => setPreview(false)}><div className="cms-preview-top"><span>Article preview</span><button className="cms-button cms-secondary" onClick={() => setPreview(false)}>Close preview</button></div><article><p className="cms-eyebrow">{article.category} · {article.date}</p><h1 id="preview-title">{article.title || "Untitled article"}</h1>{article.image && <div className="cms-preview-cover" style={{ backgroundImage: `url(${JSON.stringify(coverPreview || article.image)})` }} role="img" aria-label="Article cover" />}<p>{article.byline}</p><div className="cms-prose" dangerouslySetInnerHTML={{ __html: article.body }} /></article></dialog>}
  </>;
}
