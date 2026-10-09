# SlinkyPixels

A small (but mighty) portfolio showcasing my work.

Next.js 16 · Sanity 6 (embedded Studio at `/studio`) · Tailwind v4 · shadcn/ui (Base UI) · `@wrksz/themes`

## Scripts

| Script           | Description                                        |
| ---------------- | -------------------------------------------------- |
| `yarn dev`       | Dev server on https://localhost:3000               |
| `yarn build`     | Production build                                   |
| `yarn lint`      | ESLint                                             |
| `yarn typecheck` | Generate Next.js route types and run `tsc`         |
| `yarn typegen`   | Extract the Sanity schema and generate query types |

## Environment variables

| Variable                   | Purpose                                                |
| -------------------------- | ------------------------------------------------------ |
| `SANITY_API_READ_TOKEN`    | Draft mode, Presentation Tool and live previews        |
| `SANITY_REVALIDATE_SECRET` | Verifies the Sanity webhook calling `/api/revalidate/` |

## Live content

- `<SanityLive />` pushes content changes to connected visitors immediately (`src/actions/refresh.ts`).
- A Sanity GROQ webhook revalidates the whole site on publish, so pages refresh even when nobody is connected (`src/app/(app)/api/revalidate/route.ts`).

Webhook settings ([Sanity Manage](https://www.sanity.io/manage/project/onh5qcdh/api/webhooks)):

| Setting    | Value                                                   |
| ---------- | ------------------------------------------------------- |
| URL        | `https://slinkypixels.io/api/revalidate/`               |
| Dataset    | `production`                                            |
| Trigger on | Create, Update, Delete                                  |
| Filter     | `_type in ["page", "work", "post", "menu", "settings"]` |
| Projection | `{_type}`                                               |
| Drafts     | Off                                                     |
| HTTP       | `POST`                                                  |
| Secret     | Same value as `SANITY_REVALIDATE_SECRET`                |
