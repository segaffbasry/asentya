import { PersonProfilePage } from "@/components/PersonProfilePage";
import { getPersonBySlug, site } from "@/content/site-data";
import { createSiteMetadata } from "@/lib/site-metadata";
import { notFound } from "next/navigation";

const person = getPersonBySlug("raditya-rahmadhan");

export const metadata = createSiteMetadata({
  title: "Asentya – Raditya Rahmadhan",
  description: person?.pageDescription ?? site.description,
  path: "/raditya-rahmadhan",
});

export default function RadityaRahmadhanPage() {
  if (!person) notFound();

  return <PersonProfilePage person={person} />;
}
