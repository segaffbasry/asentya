import sanitizeHtml from "sanitize-html";
import { authorizeEditor } from "@/lib/cms-auth";
import { checkSlug, CmsError, errorResponse, listArticles, saveArticle } from "@/lib/cms-github";
import type { CmsArticle } from "@/lib/cms-types";
import { prepareArticles, sanitizeArticleBody } from "@/lib/cms-content.mjs";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const denied = await authorizeEditor(request);
  if (denied) return denied;
  try { return Response.json(await listArticles(), { headers: { "Cache-Control": "no-store" } }); }
  catch (error) { return errorResponse(error); }
}

export async function POST(request: Request) {
  const denied = await authorizeEditor(request);
  if (denied) return denied;
  try {
    const raw = await request.text();
    if (raw.length > 500000) throw new CmsError("This article is too large. Please shorten it.", 400);
    const { article: input, sha } = JSON.parse(raw);
    const fields = ["slug", "title", "date", "category", "byline", "excerpt", "image", "body"] as const;
    if (!input || fields.some((field) => typeof input[field] !== "string") || typeof input.published !== "boolean") throw new CmsError("Please check the article fields.", 400);
    const article = Object.fromEntries(fields.map((field) => [field, input[field]])) as CmsArticle;
    article.published = input.published;
    checkSlug(article.slug);
    if (!article.title.trim() || article.title.length > 250) throw new CmsError("Add an article title of up to 250 characters.", 400);
    article.body = sanitizeArticleBody(article.body);
    if (article.published) {
      try { prepareArticles([article]); } catch (error) { throw new CmsError(error instanceof Error ? error.message : "Complete all fields before publishing.", 400); }
      if (!sanitizeHtml(article.body, { allowedTags: [], allowedAttributes: {} }).trim()) throw new CmsError("Write your article before publishing.", 400);
    }
    if (sha !== undefined && (typeof sha !== "string" || !/^[a-f0-9]{40}$/.test(sha))) throw new CmsError("Reload the article before saving.", 400);
    return Response.json(await saveArticle(article, sha));
  } catch (error) { return errorResponse(error); }
}
