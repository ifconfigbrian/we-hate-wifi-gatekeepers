![cover](https://repository-images.githubusercontent.com/386759878/da75b7f3-2f50-4797-a36a-0d6dd8f7c6b3)

# Portfolio

My own personal portfolio website

Inspired by [leerob](https://github.com/leerob/leerob.io)

- **Framework**: [Next.js](https://nextjs.org/)
- **Database**: [PlanetScale](https://planetscale.com)
- **ORM**: [Prisma](https://prisma.io/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Deployment**: [Vercel](https://vercel.com)
- **CMS**: [Contentlayer](https://www.contentlayer.dev)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)

## Overview

- `content/*` - MDX data that is used for my blog
- `lib/*` - Short for "library", a collection of helpful utilities or code for external services.
- `app/*` - The actual pages.
- `public/*` - Static assets including fonts and images.
- `prisma/*` - My Prisma schema, which uses a PlanetScale MySQL database.
- `styles/*` - A small amount of global styles. I'm mostly using vanilla Tailwind CSS.
- `messages/*` - All translations objects

## Running Locally

```bash
git clone https://github.com/alex289/Portfolio.git
cd Portfolio
pnpm i
pnpm dev
```

Create a `.env` file similar to [`.env.example`](https://github.com/alex289/Portfolio/blob/main/.env.example)

## Cloning / Forking

Please review the [license](https://github.com/alex289/Portfolio/blob/main/LICENSE) and remove all of my personal information (resume, blog posts, images, etc.).
