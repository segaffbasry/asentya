import { Footer, PageBanner, ReachUs, ServiceAccordion, SiteHeader } from "@/components";
import { createSiteMetadata } from "@/lib/site-metadata";

export const metadata = createSiteMetadata({
  title: "Asentya – Services",
  description:
    "Asentya Legal Advisor offers a span of corporate and commercial legal services. We practice with a business-oriented approach to identify our clients’ needs and a deep understanding of their best interest.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <div className="services-page image-banner-page">
      <SiteHeader variant="transparent" />

      <main id="main-content" tabIndex={-1}>
        <PageBanner
          className="services-page__banner"
          image="/images/services-hero.avif"
          imageAlt="City lights in motion at night"
          imagePriority
          title="Services"
        />
        <section className="services-page__content" aria-label="Service areas">
          <ServiceAccordion />
        </section>
        <ReachUs />
      </main>

      <Footer />
    </div>
  );
}
