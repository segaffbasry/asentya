import type {
  InsightArticle,
  RichTextParagraph,
} from "@/content/site-data";
import Image from "next/image";
import Link from "next/link";
import { Fragment, type ReactNode } from "react";

import { Footer } from "./Footer";
import { ReachUs } from "./ReachUs";
import { SiteHeader } from "./SiteHeader";

type InsightArticlePageProps = Readonly<{
  article: InsightArticle;
  relatedArticles: readonly InsightArticle[];
}>;

const nextSteps = [
  {
    title: "Services",
    description: "Comprehensive legal solutions",
    href: "/services",
    imageUrl: "/images/services-hero.avif",
  },
  {
    title: "Careers",
    description: "Join our team of experts",
    href: "/careers",
    imageUrl: "/images/careers-hero.avif",
  },
] as const;

function ArticleRichText({
  content,
}: Readonly<{ content: RichTextParagraph }>) {
  if (typeof content === "string") return content;

  return content.map((part, index) => {
    if (typeof part === "string") {
      return <Fragment key={index}>{part}</Fragment>;
    }

    let rendered: ReactNode = part.text;

    if (part.strong) rendered = <strong>{rendered}</strong>;
    if (part.emphasis) rendered = <em>{rendered}</em>;
    if (part.href) rendered = <a href={part.href}>{rendered}</a>;

    return <Fragment key={index}>{rendered}</Fragment>;
  });
}

function RelatedArticleCard({ article }: Readonly<{ article: InsightArticle }>) {
  return (
    <Link className="article-related-card" href={article.path}>
      <span className="article-related-card__media">
        <Image
          className="article-related-card__image"
          src={article.imageUrl}
          alt=""
          fill
          sizes="(max-width: 809px) calc(100vw - 40px), 320px"
        />
      </span>
      <span className="article-related-card__content">
        <span className="article-related-card__meta">
          {article.category ? (
            <span className="article-related-card__category">
              {article.category}
            </span>
          ) : null}
          <time dateTime={article.publishedDateIso}>
            {article.publishedDate}
          </time>
        </span>
        <span className="article-related-card__title">{article.title}</span>
        <span className="article-related-card__excerpt">{article.excerpt}</span>
        <span className="article-related-card__arrow" aria-hidden="true">
          →
        </span>
      </span>
    </Link>
  );
}

export function InsightArticlePage({
  article,
  relatedArticles,
}: InsightArticlePageProps) {
  return (
    <div className="article-page">
      <SiteHeader variant="light" />

      <main id="main-content" className="article-page__main" tabIndex={-1}>
        <article id="intro" className="article-layout">
          <header className="article-header">
            <div className="article-header__meta">
              {article.category ? (
                <span className="article-header__category">{article.category}</span>
              ) : null}
              <time dateTime={article.publishedDateIso}>
                {article.publishedDate}
              </time>
            </div>
            <h1 className="article-header__title">{article.title}</h1>
            <Link className="article-header__back-link" href="/insights">
              <span aria-hidden="true">←</span>
              <span>Back to Blog</span>
            </Link>
          </header>

          <div className="article-content">
            <figure className="article-content__media">
              <Image
                className="article-content__image"
                src={article.imageUrl}
                alt=""
                fill
                priority
                sizes="(max-width: 1199px) calc(100vw - 40px), 50vw"
              />
            </figure>

            <div className="article-body">
              <p className="article-body__byline">{article.byline}</p>

              <div
                className="article-body__rich-text"
                dangerouslySetInnerHTML={{ __html: article.bodyHtml }}
              />

              <p className="article-body__contact">
                <ArticleRichText content={article.contactParagraph} />
              </p>

              <div className="article-disclaimer">
                <p className="article-disclaimer__label">
                  <ArticleRichText content={article.disclaimerLabel} />
                </p>
                <p>
                  <ArticleRichText content={article.disclaimer} />
                </p>
              </div>

              <p className="article-body__copyright">{article.copyright}</p>
            </div>
          </div>
        </article>

        {relatedArticles.length ? (
          <section
            className="article-more"
            aria-labelledby="article-more-title"
          >
            <header className="article-more__header">
              <p className="article-more__eyebrow">Exlpore</p>
              <h2 id="article-more-title">More Articles</h2>
            </header>
            <div className="article-more__list">
              {relatedArticles.map((relatedArticle) => (
                <RelatedArticleCard
                  key={relatedArticle.slug}
                  article={relatedArticle}
                />
              ))}
            </div>
          </section>
        ) : null}

        <section
          className="article-next-steps"
          aria-labelledby="article-next-steps-title"
        >
          <div className="article-next-steps__intro">
            <p className="article-next-steps__eyebrow">Explore</p>
            <h2 id="article-next-steps-title">
              Discover how Asentya can support your legal needs and help you
              achieve your goals.
            </h2>
          </div>

          <div className="article-next-steps__cards">
            {nextSteps.map((item) => (
              <Link
                className="article-next-step-card"
                href={item.href}
                key={item.href}
              >
                <span className="article-next-step-card__media">
                  <Image
                    className="article-next-step-card__image"
                    src={item.imageUrl}
                    alt=""
                    fill
                    sizes="(max-width: 809px) calc(100vw - 40px), 40vw"
                  />
                </span>
                <span className="article-next-step-card__content">
                  <span className="article-next-step-card__title">
                    {item.title}
                  </span>
                  <span className="article-next-step-card__arrow" aria-hidden="true">
                    →
                  </span>
                  <span className="article-next-step-card__description">
                    {item.description}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <ReachUs />
      <Footer />
    </div>
  );
}
