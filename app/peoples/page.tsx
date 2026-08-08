import Image from "next/image";
import Link from "next/link";

import { Footer, PageBanner, ReachUs, SiteHeader } from "@/components";
import {
  associates,
  partners,
  type Person,
} from "@/content/site-data";
import { createSiteMetadata } from "@/lib/site-metadata";

export const metadata = createSiteMetadata({
  title: "Asentya – Peoples",
  description:
    "Our diverse experience across multiple areas of expertise ensures our clients receive a comprehensive, reasonably flexible, and pleasant legal services.",
  path: "/peoples",
});

const PERSON_IMAGE_BY_SLUG = {
  "zidny-assegaf": "/images/zidny.avif",
  "raditya-rahmadhan": "/images/raditya.avif",
  "christian-kevin-yoga-p": "/images/christian.avif",
  "faraz-almira-arelia": "/images/faraz.avif",
  "elizabeth-yunita-krisnawati": "/images/elizabeth.avif",
} as const satisfies Record<Person["slug"], string>;

function PersonName({ person }: Readonly<{ person: Person }>) {
  if (!person.path) {
    return <>{person.name}</>;
  }

  return (
    <Link className="person-card__profile-link" href={person.path}>
      {person.name}
    </Link>
  );
}

function PersonCard({ person }: Readonly<{ person: Person }>) {
  return (
    <article
      className={`person-card person-card--${person.role.toLowerCase()}`}
      data-person={person.slug}
    >
      <figure className="person-card__media">
        <Image
          className="person-card__image"
          src={PERSON_IMAGE_BY_SLUG[person.slug]}
          alt={`${person.name}, ${person.role}`}
          fill
          sizes="(min-width: 810px) 125px, 35vw"
        />
      </figure>

      <div className="person-card__content">
        <div className="person-card__identity">
          <h3 className="person-card__name">
            <PersonName person={person} />
          </h3>
          <p className="person-card__role">{person.role}</p>
        </div>

        {person.email || person.phone ? (
          <address className="person-card__contact">
            {person.email ? (
              <a href={`mailto:${person.email}`}>
                <span aria-hidden="true">E </span>
                {person.email}
              </a>
            ) : null}
            {person.phone ? (
              <a href={`tel:${person.phone.replace(/[^+\d]/g, "")}`}>
                <span aria-hidden="true">T </span>
                {person.phone}
              </a>
            ) : null}
          </address>
        ) : null}
      </div>
    </article>
  );
}

function PeopleGroup({
  heading,
  id,
  people,
}: Readonly<{
  heading: string;
  id: string;
  people: readonly Person[];
}>) {
  return (
    <section className="people-group" aria-labelledby={id}>
      <header className="people-group__header">
        <h2 id={id} className="people-group__title">
          {heading}
        </h2>
      </header>
      <div className="people-group__list">
        {people.map((person) => (
          <PersonCard person={person} key={person.slug} />
        ))}
      </div>
    </section>
  );
}

export default function PeoplesPage() {
  return (
    <div className="inner-page peoples-page">
      <SiteHeader variant="light" />

      <main id="main-content" className="peoples-page__main" tabIndex={-1}>
        <PageBanner
          className="peoples-page__banner"
          title="Peoples"
          image="/images/peoples-hero.avif"
          imageAlt=""
          imagePriority
        />

        <div className="peoples-page__directory">
          <PeopleGroup heading="Partners" id="partners-title" people={partners} />
          <PeopleGroup
            heading="Associates"
            id="associates-title"
            people={associates}
          />
        </div>

        <ReachUs />
      </main>

      <Footer />
    </div>
  );
}
