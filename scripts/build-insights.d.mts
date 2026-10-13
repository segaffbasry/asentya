import type { CmsArticle } from "../lib/cms-types";
export function prepareArticles(entries: CmsArticle[]): CmsArticle[];
export function buildInsights(): Promise<void>;
export function sanitizeArticleBody(body: string): string;
