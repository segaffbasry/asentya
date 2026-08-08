import { site } from "@/content/site-data";
import type { ReactNode } from "react";

import { ArrowLink } from "./ArrowLink";

export type ReachUsProps = Readonly<{
  className?: string;
  description?: ReactNode;
  heading?: ReactNode;
  href?: string;
  id?: string;
  linkLabel?: string;
}>;

export function ReachUs({
  className,
  description = site.reachUs.description,
  heading = site.reachUs.heading,
  href = site.reachUs.actionHref,
  id,
  linkLabel = site.reachUs.actionLabel,
}: ReachUsProps) {
  const headingId = id ? `${id}-title` : "reach-us-title";
  const classes = ["reach-us", className].filter(Boolean).join(" ");

  return (
    <section id={id} className={classes} aria-labelledby={headingId}>
      <div className="reach-us__inner">
        <h2 id={headingId} className="reach-us__title">
          {heading}
        </h2>
        <div className="reach-us__body">
          <div className="reach-us__description">{description}</div>
          <ArrowLink
            className="reach-us__link"
            href={href}
            variant="pill"
          >
            {linkLabel}
          </ArrowLink>
        </div>
      </div>
    </section>
  );
}
