import sanitizeHtml from "sanitize-html";

export function sanitizeArticleBody(body) {
  return sanitizeHtml(body, {
    allowedTags: ["p", "br", "strong", "b", "em", "i", "u", "s", "h2", "h3", "h4", "h5", "h6", "ul", "ol", "li", "blockquote", "a", "img", "hr", "pre", "code", "table", "thead", "tbody", "tr", "th", "td"],
    allowedAttributes: { a: ["href", "title"], img: ["src", "alt", "title"], ol: ["start"], th: ["colspan", "rowspan"], td: ["colspan", "rowspan"] },
    allowedSchemes: ["https", "http", "mailto", "tel"],
    allowProtocolRelative: false,
  });
}

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
    const body = sanitizeArticleBody(entry.body);
    return { ...entry, body };
  }).sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}

