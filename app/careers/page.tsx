import { Footer, PageBanner, ReachUs, SiteHeader } from "@/components";
import { site } from "@/content/site-data";
import { createSiteMetadata } from "@/lib/site-metadata";

const careersDescription =
  "We are always looking for the brightest to join our team. We believe that every member of our team is the reason we can strive forward. If you are an individual who eager to move forward, learn, and grow together, we invite you to be part of our team.";
const applicationSubject = "Application – Position (Intern/Associate/Support)";

export const metadata = createSiteMetadata({
  title: "Asentya – Careers",
  description: careersDescription,
  path: "/careers",
});

export default function CareersPage() {
  const applicationHref = `mailto:${site.contact.email}?subject=${encodeURIComponent(applicationSubject)}`;

  return (
    <div className="inner-page careers-page">
      <SiteHeader variant="transparent" />

      <main id="main-content" className="careers-page__main" tabIndex={-1}>
        <PageBanner
          className="careers-page__banner"
          title="Careers"
          image="/images/careers-hero.avif"
          imageAlt=""
          imagePriority
        />

        <section className="careers-intro" aria-labelledby="careers-title">
          <div className="careers-intro__inner">
            <div className="careers-intro__heading-column">
              <h2 id="careers-title" className="careers-intro__title">
                A place to grow
              </h2>
            </div>
            <div className="careers-intro__copy">
              <p>
                We are always looking for the brightest to join our team. We
                believe that every member of our team is the reason we can
                strive forward. If you are an individual who eager to move
                forward, learn, and grow together, we invite you to be part of
                our team, as an Intern, Associate, or Support.
              </p>
              <p>
                Explore exciting career opportunities at Asentya, where
                innovation, excellence, and growth are at the forefront of
                everything we do.
              </p>
              <p>
                If you are interested in joining us, please send us an email to{" "}
                <a href={applicationHref}>{site.contact.email}</a> with the email
                subject “{applicationSubject}”.
              </p>
            </div>
          </div>
        </section>

        <ReachUs />
      </main>

      <Footer />
    </div>
  );
}
