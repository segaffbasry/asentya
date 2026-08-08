"use client";

import { primaryNavigation } from "@/content/site-data";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

export type HeaderNavigationItem = Readonly<{
  href: string;
  label: string;
  external?: boolean;
  prefetch?: boolean;
}>;

export const DEFAULT_HEADER_NAVIGATION: readonly HeaderNavigationItem[] =
  primaryNavigation;

export type SiteHeaderProps = Readonly<{
  brandLabel?: string;
  className?: string;
  logo?: ReactNode;
  navigation?: readonly HeaderNavigationItem[];
  sticky?: boolean;
  variant?: "transparent" | "light";
}>;

type NavigationLinkProps = Readonly<{
  item: HeaderNavigationItem;
  pathname: string;
  onNavigate?: () => void;
}>;

function NavigationLink({
  item,
  pathname,
  onNavigate,
}: NavigationLinkProps) {
  const isCurrent =
    !item.external &&
    (item.href === "/"
      ? pathname === "/"
      : pathname === item.href || pathname.startsWith(`${item.href}/`));
  const className = ["site-header__nav-link", isCurrent && "is-current"]
    .filter(Boolean)
    .join(" ");

  if (item.external) {
    return (
      <a
        className={className}
        href={item.href}
        onClick={onNavigate}
        rel="noreferrer"
        target="_blank"
      >
        {item.label}
      </a>
    );
  }

  return (
    <Link
      className={className}
      href={item.href}
      aria-current={isCurrent ? "page" : undefined}
      onClick={onNavigate}
      prefetch={item.prefetch}
    >
      {item.label}
    </Link>
  );
}

function DefaultLogo({ variant }: Readonly<{ variant: "transparent" | "light" }>) {
  return (
    <span className="site-header__logos" data-logo-variant={variant}>
      <Image
        className="site-header__logo-image site-header__logo-image--white"
        src="/images/logo-white.svg"
        alt=""
        aria-hidden="true"
        height={21}
        width={70}
        priority
      />
      <Image
        className="site-header__logo-image site-header__logo-image--color"
        src="/images/logo-color.svg"
        alt=""
        aria-hidden="true"
        height={21}
        width={70}
        priority
      />
    </span>
  );
}

export function SiteHeader({
  brandLabel = "Asentya Legal Advisor — Home",
  className,
  logo,
  navigation = DEFAULT_HEADER_NAVIGATION,
  sticky = false,
  variant = "transparent",
}: SiteHeaderProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const headerClasses = [
    "site-header",
    `site-header--${variant}`,
    sticky && "site-header--sticky",
    variant === "transparent" && isScrolled && "is-scrolled",
    isMenuOpen && "is-menu-open",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const closeMenu = useCallback((restoreFocus = false) => {
    setIsMenuOpen(false);

    if (restoreFocus) {
      window.requestAnimationFrame(() => menuButtonRef.current?.focus());
    }
  }, []);

  useEffect(() => {
    if (variant !== "transparent") {
      return;
    }

    const updateHeader = () => {
      const leadSection = document.querySelector<HTMLElement>(
        ".home-hero, .page-banner",
      );
      const threshold = leadSection
        ? leadSection.offsetTop + leadSection.offsetHeight - 72
        : 48;
      setIsScrolled(window.scrollY > threshold);
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    window.addEventListener("resize", updateHeader);

    return () => {
      window.removeEventListener("scroll", updateHeader);
      window.removeEventListener("resize", updateHeader);
    };
  }, [pathname, variant]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu(true);
        return;
      }

      if (event.key === "Tab") {
        const menuItems = Array.from(
          mobileMenuRef.current?.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]):not([tabindex="-1"])',
          ) ?? [],
        );
        const focusableItems = menuButtonRef.current
          ? [menuButtonRef.current, ...menuItems]
          : menuItems;
        const firstItem = focusableItems[0];
        const lastItem = focusableItems.at(-1);

        if (!firstItem || !lastItem) return;

        if (event.shiftKey && document.activeElement === firstItem) {
          event.preventDefault();
          lastItem.focus();
        } else if (!event.shiftKey && document.activeElement === lastItem) {
          event.preventDefault();
          firstItem.focus();
        }
      }
    };

    root.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    const focusFrame = window.requestAnimationFrame(() => {
      mobileMenuRef.current
        ?.querySelector<HTMLElement>("a[href], button:not([disabled])")
        ?.focus();
    });

    return () => {
      window.cancelAnimationFrame(focusFrame);
      root.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeMenu, isMenuOpen]);

  return (
    <header
      className={headerClasses}
      data-menu-state={isMenuOpen ? "open" : "closed"}
      data-variant={variant}
    >
      <div className="site-header__inner">
        <Link
          className="site-header__brand"
          href="/"
          aria-label={brandLabel}
          onClick={() => closeMenu()}
        >
          {logo ?? <DefaultLogo variant={variant} />}
        </Link>

        <nav className="site-header__desktop-nav" aria-label="Primary navigation">
          <ul className="site-header__nav-list">
            {navigation.map((item) => (
              <li className="site-header__nav-item" key={item.href}>
                <NavigationLink item={item} pathname={pathname} />
              </li>
            ))}
          </ul>
        </nav>

        <button
          ref={menuButtonRef}
          className="site-header__menu-button"
          type="button"
          aria-controls="mobile-navigation"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span className="site-header__menu-icon" aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </div>

      <div
        ref={mobileMenuRef}
        id="mobile-navigation"
        className="site-header__mobile-menu"
        data-state={isMenuOpen ? "open" : "closed"}
        role="dialog"
        aria-label="Mobile navigation"
        aria-modal="true"
        aria-hidden={!isMenuOpen}
        inert={isMenuOpen ? undefined : true}
      >
        <button
          className="site-header__mobile-backdrop"
          type="button"
          aria-label="Close navigation menu"
          onClick={() => closeMenu(true)}
          tabIndex={-1}
        />
        <nav className="site-header__mobile-nav" aria-label="Mobile navigation links">
          <ul className="site-header__mobile-nav-list">
            {navigation.map((item, index) => (
              <li className="site-header__mobile-nav-item" key={item.href}>
                <span className="site-header__mobile-nav-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <NavigationLink
                  item={item}
                  pathname={pathname}
                  onNavigate={() => closeMenu()}
                />
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
