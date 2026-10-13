export type CmsArticle = {
  slug: string;
  title: string;
  published: boolean;
  date: string;
  category: string;
  byline: string;
  excerpt: string;
  image: string;
  body: string;
};

export type CmsEntry = { article: CmsArticle; sha: string };
