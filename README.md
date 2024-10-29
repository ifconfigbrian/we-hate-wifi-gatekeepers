
# Portfolio

My own personal portfolio website

Inspired by [Alexander](https://github.com/alex289)

- **Framework**: [Next.js](https://nextjs.org/)
- **Database**: [Vercel Postgres](https://vercel.com)
- **ORM**: [Drizzle](https://orm.drizzle.team/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Deployment**: [Vercel](https://vercel.com)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)

## Overview

- `src/content/*` - MDX data that is used for my blog
- `src/lib/*` - Short for "library", a collection of helpful utilities or code for external services.
- `src/app/*` - The actual pages.
- `public/*` - Static assets including fonts and images.
- `src/styles/*` - A small amount of global styles. I'm mostly using vanilla Tailwind CSS.
- `src/messages/*` - All translations objects

## Running Locally

```bash
git clone https://github.com/ifconfigbrian/main-portfolio.git
cd main-portfolio
pnpm i
pnpm dev
```

Create a `.env` file similar to [`.env.example`](https://github.com/ifconfigbrian/main-ortfolio/blob/main/.env.example)

## Cloning / Forking

Please review the [license](https://github.com/ifconfigbrian/main-portfolio/blob/main/LICENSE) and remove all of my personal information (resume, blog posts, images, etc.).
