import type { InsightArticle } from "@/content/site-data";
import Image from "next/image";
import Link from "next/link";

type InsightCardProps = Readonly<{
  article: InsightArticle;
  className?: string;
  detailed?: boolean;
  priority?: boolean;
}>;

export function InsightCard({
  article,
  className,
  detailed = false,
  priority = false,
}: InsightCardProps) {
  return (
    <Link
      className={["insight-card", detailed && "insight-card--detailed", className]
        .filter(Boolean)
        .join(" ")}
      href={article.path}
    >
      <span className="insight-card__media">
        <Image
          className="insight-card__image"
          src={article.imageUrl}
          alt=""
          fill
          priority={priority}
          sizes="(max-width: 767px) calc(100vw - 48px), 50vw"
        />
        <span className="insight-card__wash" aria-hidden="true" />
      </span>
      <span className="insight-card__meta">
        {detailed && article.category ? (
          <span className="insight-card__category">{article.category}</span>
        ) : null}
        <time dateTime={article.publishedDateIso}>{article.publishedDate}</time>
      </span>
      <span className="insight-card__rule" aria-hidden="true" />
      <span className="insight-card__title">{article.title}</span>
      {detailed ? (
        <span className="insight-card__excerpt">{article.excerpt}</span>
      ) : null}
      <span className="insight-card__arrow" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <path
            d="M5 12h14m-6-6 6 6-6 6"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.4"
          />
        </svg>
      </span>
    </Link>
  );
}
