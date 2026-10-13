import { Footer, InsightCard, PageBanner, ReachUs, SiteHeader } from "@/components";
import { insights } from "@/content/site-data";
import { createSiteMetadata } from "@/lib/site-metadata";
import { InsightsArchive } from "./InsightsArchive";

export const metadata = createSiteMetadata({
  title: "Asentya – Insights",
  description:
    "Stay informed with Asentya's latest insights, legal updates, and thought leadership.",
  path: "/insights",
});

export default function InsightsPage() {
  return (
    <div className="insights-page image-banner-page">
      <SiteHeader variant="transparent" />

      <main id="main-content" tabIndex={-1}>
        <PageBanner
          className="insights-page__banner"
          description={
            <p>
              Stay informed with Asentya&apos;s latest insights, legal updates, and
              thought leadership
            </p>
          }
          image="/images/insights-hero.avif"
          imageAlt="Abstract illuminated digital pattern"
          imagePriority
          title="Insights"
        />

        <section className="insights-featured" aria-labelledby="featured-title">
          <h2 id="featured-title">Featured</h2>
          <div className="insights-featured__grid">
            {insights.slice(0, 2).map((article, index) => (
              <InsightCard article={article} key={article.slug} priority={index === 0} />
            ))}
          </div>
        </section>

        <InsightsArchive articles={insights} />

        <ReachUs />
      </main>

      <Footer />
    </div>
  );
}
