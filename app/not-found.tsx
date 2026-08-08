import { ArrowLink } from "@/components/ArrowLink";
import { Footer } from "@/components/Footer";
import { ReachUs } from "@/components/ReachUs";
import { SiteHeader } from "@/components/SiteHeader";
import { createSiteMetadata } from "@/lib/site-metadata";

export const metadata = createSiteMetadata({
  title: "Asentya – 404 ",
  description: "404",
  path: "/404",
});

export default function NotFound() {
  return (
    <div className="not-found-page">
      <SiteHeader variant="light" />

      <main id="main-content" className="not-found-page__main" tabIndex={-1}>
        <section className="not-found-hero" aria-labelledby="not-found-title">
          <span className="not-found-hero__code" aria-hidden="true">
            404
          </span>
          <h1 id="not-found-title">Whoops!</h1>
          <p>The page you&apos;re looking for is not here!</p>
          <ArrowLink href="/" variant="pill">
            Back to Homepage
          </ArrowLink>
        </section>
      </main>

      <ReachUs />
      <Footer />
    </div>
  );
}
