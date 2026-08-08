import { InsightArticlePage } from "@/components/InsightArticlePage";
import {
  getInsightBySlug,
  insights,
  type InsightSlug,
} from "@/content/site-data";
import { createSiteMetadata } from "@/lib/site-metadata";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type InsightPageProps = Readonly<{
  params: Promise<{ slug: string }>;
}>;

export const dynamicParams = false;

export function generateStaticParams(): { slug: InsightSlug }[] {
  return insights.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: InsightPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getInsightBySlug(slug);

  if (!article) return {};

  return createSiteMetadata({
    title: article.pageTitle,
    description: article.pageDescription,
    path: article.path,
  });
}

export default async function InsightPage({ params }: InsightPageProps) {
  const { slug } = await params;
  const article = getInsightBySlug(slug);

  if (!article) notFound();

  const relatedArticles = insights.filter(
    (candidate) => candidate.slug !== article.slug,
  );

  return (
    <InsightArticlePage
      article={article}
      relatedArticles={relatedArticles}
    />
  );
}
