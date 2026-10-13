# Asentya article editor

Open https://www.asentya.com/admin. The editor uses a light theme, Asentya blue, and navy text. Sign in with the administrator email and password.

## Write and publish

1. Click **New article**, or select an existing article.
2. Write the title and author byline. The URL name is generated from the title; you can adjust it before the first save.
3. Write in the visual editor. The toolbar supports headings, bold, italic, links, lists, quotes, and images.
4. Set the article date, category, short summary, and cover image.
5. Click **Preview** to review the article, or **Save draft** to return later.
6. Click **Publish article** when ready. The website updates after Vercel finishes its build, usually in a few minutes. Check the public article before sharing its link.

Published articles use **Save changes** / **Update article**. To unpublish an article, choose **Move back to drafts**. Articles are retained; the editor has no permanent delete action. Existing URL names are fixed so old links keep working.

Partner contact details and the standard disclaimer are added automatically. New image uploads become publicly available after the site build finishes. Uploads accept JPG, PNG, and WebP files up to 4 MB.

## One-time private setup (site owner)

The account email defaults to `admin@asentya.com`. Sign-in stays disabled until all server settings below are configured. No password is stored in the source code.

1. Run `node scripts/configure-cms.mjs` in a local terminal. Enter the password yourself. The script writes a salted password hash and random session secret to the ignored, private `.env.cms.local` file.
2. Create a fine-grained GitHub token for **segaffbasry/asentya only**, with **Contents: read and write**. No account-wide or workflow permissions are needed. Set an appropriate expiration and renew it before it expires.
3. Add `CMS_ADMIN_EMAIL`, `CMS_PASSWORD_HASH`, `CMS_SESSION_SECRET`, and `CMS_GITHUB_TOKEN` to the Vercel project's Production environment settings. Enter the new credential values yourself; do not paste them into chat or commit them to GitHub.
4. Redeploy the site, sign in, and verify a draft can be saved before giving the account to the team.

The editor runs on the existing Next.js / Vercel deployment. It has no separate database. Article changes and uploads are saved to GitHub and trigger the existing Vercel build. The GitHub token stays on the server. Access is limited to article JSON files and image uploads by the application.

Drafts are excluded from the website, article lists, and sitemap, but their source files are stored in GitHub. Use a private repository for confidential drafts. This is a single shared administrator account; additional per-person accounts require a separate identity provider or user store.

Sessions use signed, expiring, HttpOnly cookies. Password rotation invalidates existing sessions. Mutating endpoints check request origin. Login attempts have a per-instance limit; for distributed rate limiting, configure a Vercel Firewall rate-limit rule on `/api/admin/session`.

## Development

Article data lives in `content/insights/*.json`. Build scripts validate published entries, sanitize HTML, exclude drafts, and generate the bundled article data. Authentication settings must be present in the development environment to exercise authenticated routes. Never add an authentication bypass for previewing the editor.

Run `npm run test:content`, `npm run test:cms`, `npm run typecheck`, `npm run lint`, and `npm run build:next` to validate changes. The `.pages.yml` configuration remains available as an optional hosted editing alternative, but `/admin` uses Asentya's own editor.
