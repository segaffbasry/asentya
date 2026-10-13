# Asentya article editor

Open https://app.pagescms.org and select the Asentya site, then **Articles**.

1. Click **New** to write an article, or choose an existing article to edit it.
2. Enter the title, URL name, date, category, author, and short summary.
3. Upload or select a cover image.
4. Write the article in the visual editor. Use its toolbar for headings, bold, italic, links, lists, and images.
5. Keep **Publish on website** off and save to keep a draft.
6. When ready, turn **Publish on website** on and save. Vercel builds and publishes the updated site automatically; allow a few minutes, then check the article on https://www.asentya.com/insights.

Partner contact details and the standard disclaimer are added automatically. Keep an article's URL name unchanged after publishing so existing links continue to work. To unpublish, turn **Publish on website** off and save.

Drafts are excluded from the website, article lists, and sitemap. Draft files are stored in GitHub; they are not confidential if the repository is public. The editor previews text formatting, but does not provide a full website preview for unpublished drafts.

## One-time connection (site owner)

Sign in to Pages CMS with GitHub and install its GitHub App for **segaffbasry/asentya only**. Select the repository and its `main` branch. The editor configuration is already supplied in `.pages.yml`.

Invite editors from Pages CMS's collaborator settings using their email addresses. They can edit through email sign-in without using GitHub, code, or AI. Confirm that a published test article reaches Vercel before handing the editor to the team.

## Site maintenance

Article files live in `content/insights/*.json`. All build and development scripts run `scripts/build-insights.mjs`, which validates published articles, sanitizes their rich text, excludes drafts, and builds the article data bundled into the site. New published filenames automatically become article routes. No database, CMS API key, or custom backend is required.
