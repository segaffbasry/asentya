import type { CmsArticle } from "./cms-types";
export function prepareArticles(entries: CmsArticle[]): CmsArticle[];
export function sanitizeArticleBody(body: string): string;
