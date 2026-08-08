import Image from "next/image";

import { Footer, ReachUs, SiteHeader } from "@/components";
import { site } from "@/content/site-data";
import { createSiteMetadata } from "@/lib/site-metadata";

const aboutDescription =
  "We understand our clients demand a legal service that aligns with their business objective without hindering business processes. Therefore, our works ensure the clients' objective are achieved with integrity and sustainable with their interest. ";
const aboutBodyParagraph =
  "Apart from a normative legal perspective, we understand our clients demand a legal service that aligns with their business objective without hindering business processes. Therefore, our works ensure the clients' objective are achieved with integrity and sustainable with their interest.";

export const metadata = createSiteMetadata({
  title: "Asentya – About",
  description: aboutDescription,
  path: "/about",
});

const firmDescription = site.description.replace(`${site.name} `, "");

export default function AboutPage() {
  return (
    <div className="inner-page about-page">
      <SiteHeader variant="light" />

      <main id="main-content" className="about-page__main" tabIndex={-1}>
        <section className="about-intro" aria-labelledby="about-title">
          <div className="about-intro__inner">
            <div className="about-intro__content">
              <h1 id="about-title" className="about-intro__title">
                About us
              </h1>

              <div className="about-intro__copy">
                <p>
                  <strong>{site.name}</strong> {firmDescription}
                </p>
                <p>
                  Our diverse experience across multiple areas of expertise
                  ensures our clients receive a comprehensive, reasonably
                  flexible, and pleasant legal services.
                </p>
                <p>{aboutBodyParagraph}</p>
                <p>
                  At Asentya, we guide our clients with clarity in an{" "}
                  <strong>effective</strong> yet <strong>efficient</strong> manner,
                  because we are <strong>always at your presence.</strong>
                </p>
              </div>
            </div>

            <figure className="about-intro__media" aria-hidden="true">
              <Image
                className="about-intro__image"
                src="/images/about.webp"
                alt=""
                fill
                priority
                sizes="(min-width: 1200px) 50vw, 100vw"
              />
            </figure>
          </div>
        </section>

        <ReachUs />
      </main>

      <Footer />
    </div>
  );
}
