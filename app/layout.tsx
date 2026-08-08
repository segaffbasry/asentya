import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { site } from "@/content/site-data";
import { createSiteMetadata } from "@/lib/site-metadata";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.asentya.com"),
  ...createSiteMetadata({
    title: "Asentya – Home",
    description: site.description,
    path: "https://www.asentya.com/",
  }),
  robots: {
    "max-image-preview": "large",
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
