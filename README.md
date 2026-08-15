# Tim's Devfolio

A full-stack developer portfolio built to present my software engineering
experience, education, skills, and projects. The site combines a responsive,
animated frontend with a server-side contact workflow that stores messages in
PostgreSQL and sends email notifications.

**Live site:** [tims-devfolio.vercel.app](https://tims-devfolio.vercel.app/)

## Features

- Responsive portfolio pages for home, about, projects, and contact
- Light and dark themes with the selected preference stored in the browser
- Animated project cards, skill cards, navigation, and career timeline
- Résumé download and links to GitHub, LinkedIn, and X
- Project and timeline content maintained in typed TypeScript collections
- Contact form with client feedback and server-side Zod validation
- PostgreSQL message persistence through Prisma
- Email notifications through Resend
- Honeypot protection for basic contact-form spam

## Technology

| Area       | Tools                                 |
| ---------- | ------------------------------------- |
| Framework  | Next.js App Router, React, TypeScript |
| Styling    | Tailwind CSS                          |
| Animation  | Framer Motion                         |
| Database   | PostgreSQL, Prisma ORM                |
| Validation | Zod                                   |
| Email      | Resend                                |
| Deployment | Vercel                                |

## Application flow

```mermaid
flowchart LR
    Visitor[Portfolio visitor] --> Form[Contact form]
    Form --> API[POST /api/contact]
    API --> Validation[Zod validation]
    Validation --> Database[(PostgreSQL)]
    Validation --> Email[Resend notification]
```

The API stores accepted messages along with request metadata such as the
referrer, user agent, and forwarded IP address. It then sends a notification
email with the visitor's address set as the reply-to value.

## Project structure

```text
devfolio/
├── prisma/                  # Database schema and migrations
├── public/                  # Profile image, résumé, and project assets
└── src/
    ├── app/
    │   ├── api/contact/     # Contact form API route
    │   ├── components/      # Shared portfolio components
    │   ├── context/         # Theme state and persistence
    │   └── ...              # App Router pages
    ├── contents/            # Projects, timeline, and blog metadata
    ├── lib/                 # Prisma client setup
    ├── types/               # Shared TypeScript interfaces
    └── utils/               # Animation definitions
```

## Local development

### Prerequisites

- Node.js 20 or newer
- npm
- A PostgreSQL database
- A Resend account and sending domain for contact-form email

### 1. Install dependencies

```bash
npm install
```

The install process generates the Prisma client automatically.

### 2. Configure environment variables

Create a `.env` file in the project root:

```dotenv
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
SHADOW_DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/SHADOW_DATABASE"
RESEND_API_KEY="re_..."
RESEND_FROM="Portfolio <portfolio@example.com>"
RESEND_TO="recipient@example.com"
```

| Variable              | Purpose                                                     |
| --------------------- | ----------------------------------------------------------- |
| `DATABASE_URL`        | PostgreSQL connection used by the application               |
| `SHADOW_DATABASE_URL` | Separate database used by Prisma when developing migrations |
| `RESEND_API_KEY`      | API credential used to send contact notifications           |
| `RESEND_FROM`         | Verified sender shown on notification emails                |
| `RESEND_TO`           | One or more comma-separated notification recipients         |

Never commit `.env` or production credentials.

### 3. Apply the database migrations

```bash
npx prisma migrate dev
```

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser.

## Updating portfolio content

- Add or edit projects in `src/contents/projects.ts`.
- Update education and experience in `src/contents/timeline.ts`.
- Replace public résumé and image assets in `public/`.
- Shared project-card rendering lives in `src/app/components/projects/`.

Project entries support an optional image. When no image is provided, the site
renders a branded text-based preview instead of using unrelated placeholder
artwork.

## Production build

```bash
npm run build
npm run start
```

The production build generates the Prisma client, compiles the application,
checks TypeScript, and prerenders static routes. The contact endpoint remains a
server-rendered Node.js route because Prisma and Resend require a server
runtime.

## Deployment

The portfolio is deployed on Vercel. Configure all required environment
variables in the deployment project, ensure the production database migration
has been applied, and deploy the `main` branch.

Do not expose database credentials or the Resend API key through variables
prefixed with `NEXT_PUBLIC_`.
