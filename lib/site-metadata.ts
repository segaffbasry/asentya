import type { Metadata } from "next";

const socialImage = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "Asentya Legal Advisor",
} as const;

type SiteMetadataInput = Readonly<{
  title: string;
  description: string;
  path: string;
}>;

export function createSiteMetadata({
  title,
  description,
  path,
}: SiteMetadataInput): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      title,
      description,
      url: path,
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  };
}
