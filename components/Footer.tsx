import { footerNavigation, site } from "@/content/site-data";
import type { ReactNode } from "react";

import { ArrowLink } from "./ArrowLink";

export type FooterLink = Readonly<{
  href: string;
  label: string;
  external?: boolean;
}>;

export type FooterContact = Readonly<{
  address?: ReactNode;
  email?: string;
  phone?: string;
}>;

export type FooterProps = Readonly<{
  className?: string;
  contact?: FooterContact | null;
  copyright?: ReactNode;
  navigation?: readonly FooterLink[];
  socialLinks?: readonly FooterLink[];
}>;

const defaultContact: FooterContact = {
  email: site.contact.email,
  phone: site.contact.phone,
};

const defaultSocialLinks: readonly FooterLink[] = [
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
];

function SocialIcon({ label }: Readonly<{ label: string }>) {
  const path =
    label === "Instagram"
      ? "M 4 8.667 C 4 6.089 6.089 4 8.667 4 L 15.333 4 C 17.911 4 20 6.089 20 8.667 L 20 15.333 C 20 17.911 17.911 20 15.333 20 L 8.667 20 C 6.089 20 4 17.911 4 15.333 Z M 15.333 7.333 C 15.322 7.817 15.574 8.268 15.991 8.513 C 16.408 8.758 16.924 8.758 17.341 8.513 C 17.758 8.269 18.01 7.817 17.999 7.334 C 17.983 6.609 17.391 6.03 16.667 6.03 C 15.942 6.03 15.35 6.609 15.333 7.333 Z M 8.667 12 C 8.667 13.841 10.16 15.334 12.001 15.333 C 13.842 15.333 15.334 13.84 15.334 11.999 C 15.334 10.158 13.841 8.666 12 8.666 C 10.159 8.666 8.666 10.159 8.667 12 Z"
      : "M 4 7 C 4 5.343 5.343 4 7 4 L 17 4 C 18.657 4 20 5.343 20 7 L 20 17 C 20 18.657 18.657 20 17 20 L 7 20 C 5.343 20 4 18.657 4 17 Z M 8.85 17.393 L 8.85 10.169 L 6.434 10.169 L 6.434 17.393 Z M 7.642 9.182 C 8.484 9.182 9.009 8.628 9.009 7.934 C 8.993 7.225 8.484 6.686 7.658 6.686 C 6.831 6.686 6.291 7.225 6.291 7.934 C 6.291 8.628 6.815 9.182 7.626 9.182 Z M 10.187 17.394 C 10.187 17.394 10.187 17.394 10.187 17.393 L 10.187 17.393 Z M 12.604 17.393 L 12.604 13.359 C 12.604 13.143 12.62 12.928 12.683 12.773 C 12.858 12.342 13.256 11.895 13.923 11.895 C 14.798 11.895 15.148 12.557 15.148 13.529 L 15.148 17.393 L 17.564 17.393 L 17.564 13.251 C 17.564 11.032 16.372 9.999 14.782 9.999 C 13.5 9.999 12.925 10.699 12.604 11.192 L 12.604 10.169 L 10.187 10.169 C 10.219 10.844 10.188 17.351 10.187 17.393 Z";

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d={path} fill="currentColor" />
    </svg>
  );
}

export function Footer({
  className,
  contact = defaultContact,
  copyright = site.footer.copyright,
  navigation = footerNavigation,
  socialLinks = defaultSocialLinks,
}: FooterProps) {
  return (
    <footer className={["site-footer", className].filter(Boolean).join(" ")}>
      <div className="site-footer__inner">
        <div className="site-footer__top">
          <section className="site-footer__find" aria-labelledby="footer-find-title">
            <p id="footer-find-title" className="site-footer__label">
              {site.footer.findUsHeading}
            </p>
            <address className="site-footer__office">
              <strong>{site.offices[0].name}</strong>
              {site.offices[0].lines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>
            <nav className="site-footer__social" aria-label="Social media">
              {socialLinks.map((item) => (
                <a
                  aria-label={item.label}
                  href={item.href}
                  key={item.href}
                  rel="noreferrer"
                  target="_blank"
                >
                  <SocialIcon label={item.label} />
                </a>
              ))}
            </nav>
          </section>

          <address className="site-footer__office site-footer__office--operational">
            <strong>{site.offices[1].name}</strong>
            {site.offices[1].lines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </address>

          <nav className="site-footer__navigation" aria-label="Footer navigation">
            <p className="site-footer__label">{site.footer.linksHeading}</p>
            <ul className="site-footer__link-list">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          {contact ? (
            <address className="site-footer__contact">
              {contact.email ? (
                <ArrowLink href={`mailto:${contact.email}`}>{contact.email}</ArrowLink>
              ) : null}
              {contact.phone ? (
                <ArrowLink href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}>
                  {contact.phone}
                </ArrowLink>
              ) : null}
            </address>
          ) : null}
        </div>
        <div className="site-footer__bottom">
          <small>{copyright}</small>
        </div>
      </div>
    </footer>
  );
}
