# Project Econ

A modern, responsive website for Project Econ, a free student-led initiative applying economics to real problems for businesses and organizations in Cabarrus County, North Carolina.

## Run locally

1. Install [Node.js 22 or newer](https://nodejs.org/) and [pnpm](https://pnpm.io/installation).
2. Run `pnpm install`.
3. Run `pnpm dev`.
4. Open the local address shown in the terminal.

## Validate the site

- `pnpm exec tsc --noEmit` checks TypeScript.
- `pnpm lint` checks code quality.
- `pnpm build` creates the production build.

## Update the content

- Replace the placeholder email in `app/components/SiteShell.tsx`, `app/contact/page.tsx`, and `app/components/ContactForm.tsx`.
- Add founder details in `app/about/page.tsx`.
- Add future case studies in `app/data/projects.ts`.
- Update economic concept examples in `app/data/concepts.ts`.
- Connect a contact service in the `submit` function in `app/components/ContactForm.tsx`. The current form validates locally and does not send data.

## Deploy to Vercel

1. Push this project to a GitHub repository.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Keep the detected framework settings and deploy. Vercel will use the project build script.

Before publishing publicly, replace the placeholder email and connect the contact form to a real backend such as Formspree, Supabase, or Resend.
