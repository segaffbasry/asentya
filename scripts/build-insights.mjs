import { readdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sanitizeHtml from "sanitize-html";

const root = new URL("../", import.meta.url);
const directory = new URL("content/insights/", root);

export function prepareArticles(entries) {
  const slugs = new Set();
  return entries.filter((entry) => entry.published === true).map((entry) => {
    for (const field of ["slug", "title", "date", "byline", "excerpt", "image", "body"]) {
      if (typeof entry[field] !== "string" || !entry[field].trim()) {
        throw new Error(`Article ${entry.slug || "(unnamed)"}: ${field} is required.`);
      }
    }
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.slug) || slugs.has(entry.slug)) {
      throw new Error(`Article URL must be unique and use lowercase words and hyphens: ${entry.slug}`);
    }
    slugs.add(entry.slug);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(entry.date) ||
        Number.isNaN(Date.parse(entry.date)) ||
        new Date(entry.date).toISOString().slice(0, 10) !== entry.date) {
      throw new Error(`Invalid article date: ${entry.date}`);
    }
    if (!/^\/images\/[a-zA-Z0-9_./ -]+$/.test(entry.image) || entry.image.includes("..")) {
      throw new Error(`Article cover must be uploaded to the image library: ${entry.slug}`);
    }
    const body = sanitizeHtml(entry.body, {
      allowedTags: ["p", "br", "strong", "b", "em", "i", "u", "s", "h2", "h3", "h4", "h5", "h6", "ul", "ol", "li", "blockquote", "a", "img", "hr", "pre", "code", "table", "thead", "tbody", "tr", "th", "td"],
      allowedAttributes: { a: ["href", "title"], img: ["src", "alt", "title"], ol: ["start"], th: ["colspan", "rowspan"], td: ["colspan", "rowspan"] },
      allowedSchemes: ["https", "http", "mailto", "tel"],
      allowProtocolRelative: false,
    });
    return { ...entry, body };
  }).sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}

export async function buildInsights() {
  const filenames = (await readdir(directory)).filter((name) => name.endsWith(".json")).sort();
  const entries = await Promise.all(filenames.map(async (filename) => {
    const entry = JSON.parse(await readFile(new URL(filename, directory), "utf8"));
    if (entry.slug && filename !== `${entry.slug}.json`) {
      throw new Error(`Article filename must match its URL: ${filename}`);
    }
    return entry;
  }));
  const articles = prepareArticles(entries);
  await writeFile(new URL("content/insights.generated.json", root), JSON.stringify(articles, null, 2) + "\n");
  console.log(`Prepared ${articles.length} published articles (${entries.length - articles.length} drafts excluded).`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) await buildInsights();
