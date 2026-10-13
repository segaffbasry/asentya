import { readdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { prepareArticles } from "../lib/cms-content.mjs";
export { prepareArticles, sanitizeArticleBody } from "../lib/cms-content.mjs";

const root = new URL("../", import.meta.url);
const directory = new URL("content/insights/", root);

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
