# Project Econ

A modern, responsive website for Project Econ, a free student-led initiative applying economics to real problems for businesses and organizations in Cabarrus County, North Carolina.

## Run locally

1. Install [Node.js 22 or newer](https://nodejs.org/).
2. Run `npm install`.
3. Copy `.env.example` to `.env.local` and add your development credentials.
4. Run `npm run dev`.
5. Open the local address shown in the terminal.

## Validate the site

- `npx tsc --noEmit` checks TypeScript.
- `npm run lint` checks code quality.
- `npm run build` creates the production build.

## Update the content

- Add founder details in `app/about/page.tsx`.
- Add future case studies in `app/data/projects.ts`.
- Update economic concept examples in `app/data/concepts.ts`.

## Deploy to Vercel

1. Push this project to a GitHub repository.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Keep the detected framework settings and deploy. Vercel will use the project build script.

## Configure contact email delivery

The Work With Us form sends email through Resend using the server-only route at `/api/contact`.

1. Create a [Resend](https://resend.com/) account.
2. Add and verify the `projectecon.org` domain in Resend.
3. Add the DNS records supplied by Resend to the domain's Squarespace DNS settings and wait for verification.
4. Create a Resend API key.
5. In Vercel, add `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, and `CONTACT_TO_EMAIL` using the placeholders documented in `.env.example`.
6. Redeploy the production website so the environment variables take effect.
7. Submit a test inquiry and confirm it arrives at `projecteconbusiness@gmail.com`. Use Reply in Gmail to verify that it addresses the visitor's submitted email.

Never commit `.env.local` or a real API key. The sender configured in `RESEND_FROM_EMAIL` must belong to the verified domain.
