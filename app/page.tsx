import {
  ArrowLink,
  Footer,
  HomeScrollMotion,
  InsightCard,
  ReachUs,
  ServiceAccordion,
  SiteHeader,
} from "@/components";
import { insights, partners } from "@/content/site-data";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="home-page">
      <HomeScrollMotion />
      <SiteHeader variant="transparent" />

      <main id="main-content" tabIndex={-1}>
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-hero__media">
          <Image
            className="home-hero__image"
            src="/images/home-hero.avif"
            alt="Modern glass architecture layered with warm city lights"
            fill
            priority
            sizes="100vw"
          />
        </div>
        <span className="home-hero__shade" aria-hidden="true" />
        <div className="home-hero__inner">
          <h1 id="home-title" className="home-hero__title">
            Asentya Legal Advisor
          </h1>
          <div className="home-hero__statement">
            <p>
              At Asentya, we guide our clients to reach their interests in an{" "}
              <strong>effective yet efficient manner</strong>, because we are{" "}
              <strong>always at your presence.</strong>
            </p>
            <ArrowLink className="home-hero__contact" href="/contact">
              Contact us
            </ArrowLink>
          </div>
          <ArrowLink
            ariaLabel="Scroll to overview"
            className="home-hero__scroll"
            direction="down"
            href="#overview"
            scroll
            variant="circle"
          >
            Scroll
          </ArrowLink>
        </div>
      </section>

      <section id="overview" className="home-overview" aria-labelledby="overview-title">
        <div className="home-overview__copy">
          <h2 id="overview-title">Overview</h2>
          <div className="home-overview__text">
            <p>
              <strong>
                Asentya Legal Advisor (“Asentya”) offers a span of corporate and
                commercial legal services
              </strong>
              . We practice with a business-oriented approach to identify our
              clients’ needs and a deep understanding of their best interest.
            </p>
            <p>
              We dedicate our resources solely for the interest of our clients,
              ensuring every decision is guided with clarity and proven by results.
            </p>
          </div>
        </div>
        <div className="home-overview__media">
          <Image
            src="/images/overview.avif"
            alt="Abstract translucent blue forms"
            fill
            sizes="(max-width: 767px) 100vw, 50vw"
          />
        </div>
      </section>

      <section className="home-people" aria-labelledby="people-title">
        <h2 id="people-title">Peoples</h2>
        <div className="home-people__list">
          {partners.map((person) => (
            <Link className="home-person" href={person.path ?? "/peoples"} key={person.slug}>
              <span className="home-person__copy">
                <strong>{person.name}</strong>
                <small>{person.role}</small>
              </span>
              <span className="home-person__portrait">
                <Image
                  src={person.imageUrl}
                  alt={`Portrait of ${person.name}`}
                  fill
                  sizes="160px"
                />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-services" aria-labelledby="home-services-title">
        <h2 id="home-services-title">Services</h2>
        <ServiceAccordion />
      </section>

      <section className="home-insights" aria-labelledby="home-insights-title">
        <div className="home-insights__heading">
          <h2 id="home-insights-title">Insights</h2>
          <p>
            Stay informed with Asentya&apos;s latest insights, legal updates, and
            thought leadership
          </p>
        </div>
        <div className="home-insights__grid">
          {insights.slice(0, 3).map((article, index) => (
            <InsightCard article={article} key={article.slug} priority={index === 0} />
          ))}
        </div>
      </section>

      <ReachUs />
      </main>

      <Footer
        socialLinks={[
          {
            href: "https://www.instagram.com/asentya.legal/",
            label: "Instagram",
            external: true,
          },
          {
            href: "https://www.linkedin.com/company/asentya/?originalSubdomain=id",
            label: "LinkedIn",
            external: true,
          },
        ]}
      />
    </div>
  );
}
