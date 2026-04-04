# Project Overview

A Next.js 16 web application with Convex backend, Better Auth authentication, Tailwind CSS v4, and shadcn/ui components.

## Architecture

- **Frontend**: Next.js 16 (App Router) with React 19
- **Backend**: Convex (serverless, real-time database)
- **Auth**: Better Auth via `@convex-dev/better-auth` (email/password, no email verification required)
- **Styling**: Tailwind CSS v4, shadcn/ui, next-themes (dark/light mode)
- **Package manager**: pnpm

## Key Files

- `app/` — Next.js App Router pages and layouts
- `app/ConvexClientProvider.tsx` — Convex + Better Auth client provider
- `app/api/auth/[...all]/route.ts` — Better Auth API handler
- `convex/` — Convex backend functions, auth config, schema
- `lib/auth-client.ts` — Better Auth client (for use in client components)
- `lib/auth-server.ts` — Better Auth server helpers (Next.js SSR)
- `components/` — Shared UI components (navbar, theme toggle, shadcn/ui)

## Environment Variables Required

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_CONVEX_URL` | Convex deployment URL (e.g. `https://xxx.convex.cloud`) |
| `NEXT_PUBLIC_CONVEX_SITE_URL` | Convex HTTP Actions site URL (e.g. `https://xxx.convex.site`) |
| `SITE_URL` | Public URL of this app (used by Better Auth as baseURL) |

## Running on Replit

- Dev server: `pnpm run dev` — runs on port 5000, bound to `0.0.0.0`
- The workflow "Start application" is configured to start the dev server automatically
- No `instrumentation.ts` file present (nothing to disable)

## Notes

- The `convex/` directory contains backend logic; run `npx convex dev` separately to sync schema changes with your Convex dashboard
- Better Auth uses Convex as its database adapter — no separate DB needed
