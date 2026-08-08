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
            <div className="site-footer__offices">
              {site.offices.map((office) => (
                <address className="site-footer__office" key={office.name}>
                  <strong>{office.name}</strong>
                  {office.lines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </address>
              ))}
            </div>
            <nav className="site-footer__social" aria-label="Social media">
              {socialLinks.map((item) => (
                <a
                  href={item.href}
                  key={item.href}
                  rel="noreferrer"
                  target="_blank"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </section>

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
