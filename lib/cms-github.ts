import type { CmsArticle, CmsEntry } from "./cms-types";
import { sanitizeArticleBody } from "./cms-content.mjs";

const repository = "segaffbasry/asentya";
const branch = "main";
const directory = "content/insights";

export class CmsError extends Error {
  status: number;
  constructor(message: string, status = 500) { super(message); this.status = status; }
}

async function github(path: string, init: RequestInit = {}) {
  if (!process.env.CMS_GITHUB_TOKEN) throw new CmsError("The editor connection needs to be enabled.", 503);
  const response = await fetch(`https://api.github.com/repos/${repository}/contents/${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${process.env.CMS_GITHUB_TOKEN}`,
      "X-GitHub-Api-Version": "2026-03-10",
      "Content-Type": "application/json",
      ...init.headers,
    },
  });
  if (response.status === 404) throw new CmsError("This article could not be found.", 404);
  if ([409, 422].includes(response.status)) throw new CmsError("This article changed since you opened it. Reload it before saving.", 409);
  if (!response.ok) throw new CmsError("The editor could not connect to the content library. Please try again.", 502);
  return response.json();
}

export function checkSlug(slug: string) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || slug.length > 150) {
    throw new CmsError("Use lowercase words separated by hyphens for the URL name.", 400);
  }
}

export async function readArticle(slug: string): Promise<CmsEntry> {
  checkSlug(slug);
  const file = await github(`${directory}/${slug}.json?ref=${branch}`);
  const article: CmsArticle = JSON.parse(Buffer.from(file.content, "base64").toString("utf8"));
  article.body = sanitizeArticleBody(article.body || "");
  return { article, sha: file.sha };
}

export async function listArticles(): Promise<CmsEntry[]> {
  try {
    const files = await github(`${directory}?ref=${branch}`);
    return await Promise.all(files.filter((file: { name: string; type: string }) => file.type === "file" && file.name.endsWith(".json"))
      .map((file: { name: string }) => readArticle(file.name.slice(0, -5))));
  } catch (error) {
    if (error instanceof CmsError && error.status === 404) return [];
    throw error;
  }
}

export async function saveArticle(article: CmsArticle, sha?: string): Promise<CmsEntry> {
  checkSlug(article.slug);
  const result = await github(`${directory}/${article.slug}.json`, {
    method: "PUT",
    body: JSON.stringify({
      branch,
      message: `${article.published ? "Publish" : "Save draft"}: ${article.title}`,
      content: Buffer.from(JSON.stringify(article, null, 2) + "\n").toString("base64"),
      ...(sha ? { sha } : {}),
    }),
  });
  return { article, sha: result.content.sha };
}

export async function saveImage(bytes: Buffer, extension: string) {
  const filename = `${crypto.randomUUID()}.${extension}`;
  await github(`public/images/articles/${filename}`, {
    method: "PUT",
    body: JSON.stringify({ branch, message: "Upload article image", content: bytes.toString("base64") }),
  });
  return `/images/articles/${filename}`;
}

export function errorResponse(error: unknown) {
  return Response.json({ error: error instanceof CmsError ? error.message : "The editor could not complete this request. Please try again." },
    { status: error instanceof CmsError ? error.status : 500 });
}
