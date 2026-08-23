import { ArrowLink, Footer, SiteHeader } from "@/components";
import { contactPage, site } from "@/content/site-data";
import { createSiteMetadata } from "@/lib/site-metadata";

import { AppointmentForm } from "./AppointmentForm";

export const metadata = createSiteMetadata({
  title: "Asentya – Contact",
  description: contactPage.description,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="inner-page contact-page">
      <SiteHeader sticky variant="light" />

      <main id="main-content" className="contact-page__main" tabIndex={-1}>
        <section
          id="offices"
          className="contact-offices"
          aria-labelledby="contact-offices-title"
        >
          <div className="contact-offices__inner">
            <div className="contact-offices__details">
              <h1 id="contact-offices-title" className="contact-offices__title">
                {contactPage.heading}
              </h1>
              <address className="contact-offices__address">
                {contactPage.address.map((line, index) => (
                  <span
                    className={index === 0 ? "contact-offices__address-name" : undefined}
                    key={line}
                  >
                    {line}
                  </span>
                ))}
              </address>
              <p className="contact-offices__statement">
                {contactPage.locationStatement}
              </p>
            </div>

            <figure className="contact-map">
              <div className="contact-map__frame">
                <iframe
                  src="https://maps.google.com/maps?q=Asentya&z=15&output=embed"
                  title="Map showing Asentya offices in Jakarta"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <figcaption className="contact-map__caption">
                <ul className="contact-map__location-list">
                  {contactPage.mapLabels.map((location) => (
                    <li className="contact-map__location" key={location.name}>
                      <strong>{location.name}</strong>
                      <span>{location.address}</span>
                    </li>
                  ))}
                </ul>
              </figcaption>
            </figure>
          </div>
        </section>

        <section
          id="contactus"
          className="appointment-section"
          aria-labelledby="appointment-title"
        >
          <div className="appointment-section__inner">
            <aside className="appointment-section__intro">
              <h2 id="appointment-title" className="appointment-section__title">
                {contactPage.appointmentHeading}
              </h2>
              <p className="appointment-section__description">
                {contactPage.description}
              </p>
              <div className="appointment-section__contact-links">
                <ArrowLink href={`mailto:${site.contact.email}`} external>
                  {site.contact.email}
                </ArrowLink>
                <ArrowLink href={site.contact.phoneHref} external>
                  {site.contact.phone}
                </ArrowLink>
              </div>
            </aside>

            <div className="appointment-section__form-column">
              <AppointmentForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
