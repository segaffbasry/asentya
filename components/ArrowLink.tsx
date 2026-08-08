import Link from "next/link";
import type { HTMLAttributeAnchorTarget, ReactNode } from "react";

export type ArrowDirection = "right" | "down" | "up-right";

export type ArrowLinkProps = Readonly<{
  href: string;
  children: ReactNode;
  ariaLabel?: string;
  className?: string;
  direction?: ArrowDirection;
  download?: boolean | string;
  external?: boolean;
  prefetch?: boolean | null;
  rel?: string;
  scroll?: boolean;
  showIcon?: boolean;
  target?: HTMLAttributeAnchorTarget;
  variant?: "text" | "circle" | "pill";
}>;

const isExternalHref = (href: string) =>
  /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(href);

function ArrowIcon({ direction }: Readonly<{ direction: ArrowDirection }>) {
  const path = {
    down: "M12 5v14m-7-7 7 7 7-7",
    right: "M5 12h14m-6-6 6 6-6 6",
    "up-right": "M7 17 17 7M7 7h10v10",
  }[direction];

  return (
    <span className="arrow-link__icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" focusable="false">
        <path
          d={path}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </span>
  );
}

export function ArrowLink({
  href,
  children,
  ariaLabel,
  className,
  direction = "right",
  download,
  external,
  prefetch,
  rel,
  scroll,
  showIcon = true,
  target,
  variant = "text",
}: ArrowLinkProps) {
  const classes = [
    "arrow-link",
    `arrow-link--${variant}`,
    `arrow-link--${direction}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");
  const content = (
    <>
      <span className="arrow-link__label">{children}</span>
      {showIcon ? <ArrowIcon direction={direction} /> : null}
    </>
  );
  const shouldUseAnchor = external ?? isExternalHref(href);
  const safeRel = target === "_blank" ? rel ?? "noreferrer" : rel;

  if (shouldUseAnchor) {
    return (
      <a
        className={classes}
        href={href}
        aria-label={ariaLabel}
        download={download}
        rel={safeRel}
        target={target}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      className={classes}
      href={href}
      aria-label={ariaLabel}
      download={download}
      prefetch={prefetch}
      rel={safeRel}
      scroll={scroll}
      target={target}
    >
      {content}
    </Link>
  );
}
