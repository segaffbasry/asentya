import Image, { type ImageProps } from "next/image";
import type { ReactNode } from "react";

export type PageBannerProps = Readonly<{
  actions?: ReactNode;
  align?: "start" | "center";
  children?: ReactNode;
  className?: string;
  description?: ReactNode;
  eyebrow?: ReactNode;
  headingId?: string;
  image?: ImageProps["src"];
  imageAlt?: string;
  imagePriority?: boolean;
  imageSizes?: string;
  title: ReactNode;
  variant?: "image" | "light" | "blue";
}>;

export function PageBanner({
  actions,
  align = "start",
  children,
  className,
  description,
  eyebrow,
  headingId = "page-title",
  image,
  imageAlt = "",
  imagePriority = false,
  imageSizes = "100vw",
  title,
  variant = image ? "image" : "light",
}: PageBannerProps) {
  const classes = [
    "page-banner",
    `page-banner--${variant}`,
    `page-banner--align-${align}`,
    image && "page-banner--has-image",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={classes} aria-labelledby={headingId}>
      {image ? (
        <div className="page-banner__media">
          <Image
            className="page-banner__image"
            src={image}
            alt={imageAlt}
            fill
            priority={imagePriority}
            sizes={imageSizes}
          />
          <span className="page-banner__overlay" aria-hidden="true" />
        </div>
      ) : null}

      <div className="page-banner__inner">
        <div className="page-banner__content">
          {eyebrow ? <p className="page-banner__eyebrow">{eyebrow}</p> : null}
          <h1 id={headingId} className="page-banner__title">
            {title}
          </h1>
          {description ? (
            <div className="page-banner__description">{description}</div>
          ) : null}
          {actions ? <div className="page-banner__actions">{actions}</div> : null}
          {children}
        </div>
      </div>
    </section>
  );
}
