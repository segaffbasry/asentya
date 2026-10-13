import { cmsConfigured, editorSignedIn } from "@/lib/cms-auth";
import { listArticles } from "@/lib/cms-github";
import { Dashboard } from "./Dashboard";
import { Login } from "./Login";
import type { CmsEntry } from "@/lib/cms-types";

export const runtime = "nodejs";

export default async function ArticleEditor() {
  if (!await editorSignedIn()) return <Login configured={cmsConfigured()} />;
  let entries: CmsEntry[] = [];
  let loadError: string | undefined;
  try {
    entries = await listArticles();
    entries.sort((a, b) => b.article.date.localeCompare(a.article.date));
  } catch {
    loadError = "We couldn’t load your articles. Please reload this page before making changes.";
  }
  return <Dashboard initialEntries={entries} loadError={loadError} />;
}
