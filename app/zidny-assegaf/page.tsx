import { PersonProfilePage } from "@/components/PersonProfilePage";
import { getPersonBySlug, site } from "@/content/site-data";
import { createSiteMetadata } from "@/lib/site-metadata";
import { notFound } from "next/navigation";

const person = getPersonBySlug("zidny-assegaf");

export const metadata = createSiteMetadata({
  title: "Asentya – Zidny Assegaf",
  description: person?.pageDescription ?? site.description,
  path: "/zidny-assegaf",
});

export default function ZidnyAssegafPage() {
  if (!person) notFound();

  return <PersonProfilePage person={person} />;
}
