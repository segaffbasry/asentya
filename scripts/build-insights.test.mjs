import assert from "node:assert/strict";
import test from "node:test";
import { prepareArticles } from "./build-insights.mjs";

const article = {
  slug: "test-article", title: "Test article", published: true,
  date: "2026-10-13", category: "Insights", byline: "By Asentya",
  excerpt: "A test article", image: "/images/insight-bkpm.avif",
  body: "<p>Original <strong>bold</strong> and <em>italic</em> text.</p>",
};

test("new published entries appear automatically; incomplete drafts are excluded", () => {
  const entries = prepareArticles([
    article,
    { ...article, slug: "new-article", date: "2026-10-14" },
    { slug: "private-draft", published: false, body: "Do not publish" },
  ]);
  assert.deepEqual(entries.map((entry) => entry.slug), ["new-article", "test-article"]);
  assert.equal(JSON.stringify(entries).includes("Do not publish"), false);
});

test("formatting, links, lists, and images survive while executable HTML is removed", () => {
  const [{ body }] = prepareArticles([{ ...article, body:
    '<h2>Heading</h2><p><strong>Bold</strong><em>Italic</em><a href="https://asentya.com">Link</a></p><ul><li>Item</li></ul><img src="/images/test.jpg" alt="Photo" onerror="alert(1)"><script>alert(2)</script><a href="javascript:alert(3)">Unsafe</a>',
  }]);
  assert.match(body, /<h2>Heading<\/h2>/);
  assert.match(body, /<strong>Bold<\/strong><em>Italic<\/em>/);
  assert.match(body, /href="https:\/\/asentya.com"/);
  assert.match(body, /<ul><li>Item<\/li><\/ul>/);
  assert.match(body, /src="\/images\/test.jpg" alt="Photo"/);
  assert.doesNotMatch(body, /script|onerror|alert\(/);
});

test("invalid published content fails the build rather than publishing broken routes", () => {
  assert.throws(() => prepareArticles([article, article]), /unique/);
  assert.throws(() => prepareArticles([{ ...article, slug: "Invalid URL" }]), /lowercase/);
  assert.throws(() => prepareArticles([{ ...article, date: "2026-02-30" }]), /Invalid article date/);
  assert.throws(() => prepareArticles([{ ...article, title: "" }]), /title is required/);
  assert.throws(() => prepareArticles([{ ...article, image: "/images/../secret" }]), /cover/);
});
