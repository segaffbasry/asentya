import type { Person } from "@/content/site-data";
import Image from "next/image";

import { Footer } from "./Footer";
import { ReachUs } from "./ReachUs";
import { SiteHeader } from "./SiteHeader";

type PersonProfilePageProps = Readonly<{
  person: Person;
}>;

export function PersonProfilePage({ person }: PersonProfilePageProps) {
  return (
    <div className="profile-page">
      <SiteHeader variant="light" />

      <main id="main-content" className="profile-page__main" tabIndex={-1}>
        <section
          id="intro"
          className="profile-hero"
          aria-labelledby="profile-name"
        >
          <div className="profile-hero__inner">
            <aside className="profile-details" aria-label={`${person.name} profile`}>
              <div className="profile-details__media">
                <Image
                  className="profile-details__image"
                  src={person.imageUrl}
                  alt={person.name}
                  fill
                  priority
                  sizes="(max-width: 809px) 160px, 290px"
                />
              </div>

              <div className="profile-details__identity">
                <h1 id="profile-name" className="profile-details__name">
                  {person.name}
                </h1>
                <p className="profile-details__role">{person.role}</p>
              </div>

              {person.email || person.phone ? (
                <address className="profile-details__contact">
                  {person.email ? (
                    <p>
                      <span aria-hidden="true">E: </span>
                      <a href={`mailto:${person.email}`}>{person.email}</a>
                    </p>
                  ) : null}
                  {person.phone ? (
                    <p>
                      <span aria-hidden="true">T: </span>
                      <a href={`tel:${person.phone}`}>{person.phone}</a>
                    </p>
                  ) : null}
                </address>
              ) : null}

              <div className="profile-details__practice">
                <section
                  className="profile-details__list-group"
                  aria-labelledby="profile-expertise"
                >
                  <h2 id="profile-expertise">Expertise</h2>
                  <ul>
                    {person.expertise.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <section
                  className="profile-details__list-group"
                  aria-labelledby="profile-industries"
                >
                  <h2 id="profile-industries">Industry and Sectors</h2>
                  <ul>
                    {person.industriesAndSectors.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </div>
            </aside>

            <article className="profile-biography" aria-label={`${person.name} biography`}>
              {person.biography.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </article>
          </div>
        </section>
      </main>

      <ReachUs />
      <Footer />
    </div>
  );
}
