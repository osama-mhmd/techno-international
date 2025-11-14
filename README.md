# Techno International Groups

![Website Landing View](docs/images/website-landing-view.png)

## Introduction

My name is Osama Mohammed, and this is the technical assessment for joining **EngTechno**. This project was built according to the Figma design provided, and it includes an Admin Panel available at: **[Admin Panel](https://techno-international.vercel.app/panel)** to almost manage all the content of the website.

Both the frontend and backend are deployed on Vercel. (Why Vercel? See the [Development](#development) section.)

## Overview

The main features of the app:

- **Pixel-perfect design** matching the provided Figma design.
- **Accessibility**: The website is accessible for people with disabilities (keyboard navigation implemented) and works across all device sizes.
- **Admin panel**: A secure admin panel that makes the website’s content highly customizable.

Potential improvements if more time were available (i.e., regarding scalability):

- **Stateful authentication**: I would not rely solely on JWT. I would introduce a `sessions` table to support stateful authentication. [More about Stateful vs Stateless Authentication](https://medium.com/@kennch/stateful-and-stateless-authentication-10aa3e3d4986).
- **Normalize the database**: The current `pages` table can be split into more meaningful tables.

## Getting Started

### Prerequisites

- Node.js 18 or newer.

### Installation

1. **Clone the repo:** `git clone https://github.com/osama-mhmd/techno-international`

2. **Install dependencies:** `pnpm i`

3. **Setup environment variables:**  
   Run:  
   `cd apps/backend && cp .example.env .env`  
   Then fill in the required environment variables.  
   → After setting `DATABASE_URL`, apply migrations using:  
   `pnpm run db:migrate`

4. **Start the app:** `pnpm run dev`

## Development

Here are the tools I used and why:

- **Turborepo**: Not strictly needed in this project since there are no shared libraries, but it does help keep the structure organized.
- **Next.js**: If not required, I would prefer using React alone because Next.js consumes more memory (which can increase hosting costs). Also, most components are client components, so the SEO benefits were minimal.
- **Express.js**: If not required, I would choose NestJS for better type safety and more coherent architecture.
- **Drizzle ORM**: Faster than Prisma and I’m already familiar with it.
- **PostgreSQL**
- **JSON Web Token (JWT)**
- **Vercel**: Chosen because it simplifies deployment significantly.

## Project Structure

```
techno international
--- apps/
--- --- frontend/
--- --- --- app/
--- --- --- assets/
--- --- --- components/
--- --- --- config/
--- --- --- hooks/
--- --- --- lib/
--- --- --- public/
--- --- backend/
--- --- --- drizzle/
--- --- --- scripts/
--- --- --- src/
--- --- --- --- db/
--- --- --- --- middlewares/
--- --- --- --- routes/
--- --- --- --- server.ts
--- docs/
--- packages/
--- pnpm-lock.yaml
--- turbo.config
```

## Guidelines

Please follow these guidelines when contributing:

- **Use ESLint & Prettier**
- **Use Conventional Commits**: Follow the existing commit message format. [Learn More](https://www.conventionalcommits.org/en/v1.0.0/)
- **Use GitFlow**: [Learn More](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)

## Concepts

### How the CMS Works

The CMS design is simple. The `pages` table contains:

- `page`
- `section`
- `key`
- `value`

Each page contains multiple sections (e.g. services, events, clients). Each section contains multiple keys (e.g. `heading`, `description`, `button_text`).

You can fetch content via: `/pages/:page` Where `:page` can be `'landing'`, `'about_us'`, etc.

In the frontend, these rows are transformed into structured data using: `frontend/lib/get-content.ts`

Usage example: `getContent('landing')('landing_view', 'description')`

If a value is not found in the database, a default value is used from: `frontend/config/default-content.ts`.

As mentioned earlier, the database should be normalized further instead of relying heavily on frontend logic, because the backend should enforce allowed sections and keys.

### Usage of AI

AI usage is allowed, but changes must be reviewed before committing. For me, since this is an assessment, I minimized AI usage except when designing the `/panel`, where I used Claude. I adjusted Claude’s output to match the website’s visual style.

### Authentication & Authorization

Authentication uses JWT for simplicity. However, I would prefer stateful auth (via a `sessions` table) for improved security.

Authorization uses `backend/src/middlewares/auth.ts` where you can specify allowed roles (`admin`, `owner`, or both).

## Contributing

Please familiarize yourself with the concepts of the app before contributing. We welcome ideas and feedback.

Check open issues here:  
**[Techno International Issues](https://github.com/osama-mhmd/techno-international/issues)**
