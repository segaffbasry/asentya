"use client";

import { services } from "@/content/site-data";
import Link from "next/link";
import type { ReactNode } from "react";
import { useId, useState } from "react";

export type ServiceAccordionItem = Readonly<{
  id: string;
  title: string;
  content?: ReactNode;
  eyebrow?: string;
  href?: string;
  linkLabel?: string;
}>;

export type ServiceAccordionProps = Readonly<{
  items?: readonly ServiceAccordionItem[];
  allowMultiple?: boolean;
  ariaLabel?: string;
  className?: string;
  defaultOpenIds?: readonly string[];
}>;

const safeFragment = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9_-]+/g, "-").replace(/^-|-$/g, "");

const DEFAULT_SERVICE_ACCORDION_ITEMS: readonly ServiceAccordionItem[] =
  services.map((service) => ({
    id: service.slug,
    title: service.title,
    content: service.description,
  }));

export function ServiceAccordion({
  items = DEFAULT_SERVICE_ACCORDION_ITEMS,
  allowMultiple = false,
  ariaLabel = "Services",
  className,
  defaultOpenIds = [],
}: ServiceAccordionProps) {
  const instanceId = useId().replace(/:/g, "");
  const [openIds, setOpenIds] = useState<ReadonlySet<string>>(
    () => new Set(allowMultiple ? defaultOpenIds : defaultOpenIds.slice(0, 1)),
  );
  const classes = ["service-accordion", className].filter(Boolean).join(" ");

  const toggleItem = (id: string) => {
    setOpenIds((current) => {
      const isOpen = current.has(id);
      const next = allowMultiple ? new Set(current) : new Set<string>();

      if (isOpen) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  };

  return (
    <div className={classes} role="group" aria-label={ariaLabel}>
      {items.map((item, index) => {
        const itemFragment = safeFragment(item.id) || String(index + 1);
        const triggerId = `${instanceId}-${itemFragment}-trigger`;
        const panelId = `${instanceId}-${itemFragment}-panel`;
        const isOpen = openIds.has(item.id);

        return (
          <article
            className={[
              "service-accordion__item",
              isOpen && "is-open",
            ]
              .filter(Boolean)
              .join(" ")}
            data-state={isOpen ? "open" : "closed"}
            key={item.id}
          >
            <h3 className="service-accordion__heading">
              <button
                id={triggerId}
                className="service-accordion__trigger"
                type="button"
                aria-controls={panelId}
                aria-expanded={isOpen}
                onClick={() => toggleItem(item.id)}
              >
                <span className="service-accordion__trigger-copy">
                  {item.eyebrow ? (
                    <span className="service-accordion__eyebrow">
                      {item.eyebrow}
                    </span>
                  ) : null}
                  <span className="service-accordion__title">{item.title}</span>
                </span>
                <span className="service-accordion__plus" aria-hidden="true">
                  <span className="service-accordion__plus-horizontal" />
                  <span className="service-accordion__plus-vertical" />
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              className="service-accordion__panel"
              role="region"
              aria-labelledby={triggerId}
              aria-hidden={!isOpen}
              inert={isOpen ? undefined : true}
            >
              <div className="service-accordion__panel-inner">
                {item.content ? (
                  <div className="service-accordion__content">{item.content}</div>
                ) : null}
                {item.href ? (
                  <Link className="service-accordion__link" href={item.href}>
                    <span>{item.linkLabel ?? `Explore ${item.title}`}</span>
                    <span className="service-accordion__link-arrow" aria-hidden="true">
                      →
                    </span>
                  </Link>
                ) : null}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
