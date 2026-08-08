import type { CareerListing } from "@/content/site-data";

import { ArrowLink } from "./ArrowLink";
import { Footer } from "./Footer";
import { ReachUs } from "./ReachUs";
import { SiteHeader } from "./SiteHeader";

type CareerDetailPageProps = Readonly<{
  listing: CareerListing;
}>;

export function CareerDetailPage({ listing }: CareerDetailPageProps) {
  const [applicationPrefix, applicationSuffix = ""] = listing.howToApply.split(
    listing.applyEmail,
  );

  return (
    <div className="career-detail-page">
      <SiteHeader variant="light" />

      <main id="main-content" className="career-detail-page__main" tabIndex={-1}>
        <section
          id="intro"
          className="career-detail"
          aria-labelledby="career-detail-title"
        >
          <div className="career-detail__inner">
            <header className="career-header">
              <span className="career-header__badge">{listing.badge}</span>
              <h1 id="career-detail-title" className="career-header__title">
                {listing.title}
              </h1>
              <p className="career-header__location">{listing.location}</p>
              <ArrowLink
                className="career-header__apply"
                href={`mailto:${listing.applyEmail}`}
                variant="pill"
              >
                {listing.applyLabel}
              </ArrowLink>
            </header>

            <article className="career-content">
              <p className="career-content__introduction">
                {listing.introduction}
              </p>

              <div className="career-sections">
                {listing.sections.map((section) => (
                  <section
                    className="career-section"
                    key={section.heading}
                    aria-labelledby={`career-${section.heading.toLowerCase()}`}
                  >
                    <h2 id={`career-${section.heading.toLowerCase()}`}>
                      {section.heading}
                    </h2>
                    <ul>
                      {section.items.map((item) => (
                        <li key={item.text}>
                          {item.text}
                          {item.children?.length ? (
                            <ul>
                              {item.children.map((child) => (
                                <li key={child}>{child}</li>
                              ))}
                            </ul>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>

              <p className="career-content__closing">{listing.closing}</p>

              <section
                className="career-apply"
                aria-labelledby="career-apply-title"
              >
                <h2 id="career-apply-title">{listing.howToApplyHeading}</h2>
                <p>
                  {applicationPrefix}
                  <a href={`mailto:${listing.applyEmail}`}>
                    {listing.applyEmail}
                  </a>
                  {applicationSuffix}
                </p>
              </section>
            </article>
          </div>
        </section>

        <section
          className="career-more"
          aria-labelledby="career-more-title"
        >
          <div className="career-more__inner">
            <h2 id="career-more-title">{listing.moreCareersHeading}</h2>
            <p>{listing.moreCareersDescription}</p>
          </div>
        </section>
      </main>

      <ReachUs />
      <Footer />
    </div>
  );
}
