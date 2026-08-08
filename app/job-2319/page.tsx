import { CareerDetailPage } from "@/components/CareerDetailPage";
import { getCareerBySlug, site } from "@/content/site-data";
import { createSiteMetadata } from "@/lib/site-metadata";
import { notFound } from "next/navigation";

const listing = getCareerBySlug("job-2319");

export const metadata = createSiteMetadata({
  title: site.shortName,
  description: site.description,
  path: "/job-2319",
});

export default function LegacyCareerPage() {
  if (!listing) notFound();

  return <CareerDetailPage listing={listing} />;
}
