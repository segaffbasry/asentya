import assert from "node:assert/strict";
import test from "node:test";
import { CmsError, readArticle, saveArticle } from "../lib/cms-github.ts";

const fixture = { slug: "test-article", title: "Test article", published: false, date: "2026-10-13", category: "Insights", byline: "By Asentya", excerpt: "Test", image: "/images/test.jpg", body: "<p>Draft</p>" };
process.env.CMS_GITHUB_TOKEN = "isolated-test-token";

test("article writes target only the configured repository and preserve revision checks", async () => {
  const original = globalThis.fetch;
  try {
    globalThis.fetch = async (url, init) => {
      assert.equal(url, "https://api.github.com/repos/segaffbasry/asentya/contents/content/insights/test-article.json");
      assert.equal(init.method, "PUT");
      const request = JSON.parse(init.body);
      assert.equal(request.branch, "main");
      assert.equal(request.sha, "a".repeat(40));
      assert.deepEqual(JSON.parse(Buffer.from(request.content, "base64").toString()), fixture);
      return Response.json({ content: { sha: "b".repeat(40) } });
    };
    const saved = await saveArticle(fixture, "a".repeat(40));
    assert.equal(saved.sha, "b".repeat(40));
  } finally { globalThis.fetch = original; }
});

test("unsafe paths and conflicting revisions cannot overwrite content", async () => {
  await assert.rejects(() => saveArticle({ ...fixture, slug: "../../package" }), /lowercase/);
  const original = globalThis.fetch;
  try {
    globalThis.fetch = async () => new Response("", { status: 409 });
    await assert.rejects(() => saveArticle(fixture, "a".repeat(40)), (error) => error instanceof CmsError && error.status === 409);
  } finally { globalThis.fetch = original; }
});

test("loaded article bodies are sanitized before editor previews", async () => {
  const original = globalThis.fetch;
  try {
    globalThis.fetch = async () => Response.json({ sha: "a".repeat(40), content: Buffer.from(JSON.stringify({ ...fixture, body: '<p>Safe</p><script>alert(1)</script>' })).toString("base64") });
    const loaded = await readArticle("test-article");
    assert.equal(loaded.article.body, "<p>Safe</p>");
  } finally { globalThis.fetch = original; }
});
