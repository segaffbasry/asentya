"use client";

import { InsightCard } from "@/components";
import type { InsightArticle } from "@/content/site-data";
import { useState } from "react";

type InsightsArchiveProps = Readonly<{
  articles: readonly InsightArticle[];
}>;

export function InsightsArchive({ articles }: InsightsArchiveProps) {
  const [allLoaded, setAllLoaded] = useState(false);

  return (
    <section className="insights-archive" aria-label="All insights">
      <div className="insights-archive__grid">
        {articles.map((article) => (
          <InsightCard article={article} detailed key={article.slug} />
        ))}
      </div>
      <button
        className="insights-archive__load"
        type="button"
        disabled={allLoaded}
        onClick={() => setAllLoaded(true)}
      >
        {allLoaded ? "All articles loaded" : "Load more"}
      </button>
      <p className="insights-archive__status" role="status" aria-live="polite">
        {allLoaded ? "All published insights are already displayed." : ""}
      </p>
    </section>
  );
}
