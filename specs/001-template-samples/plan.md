# Implementation Plan: Next.js Template with Sample Implementations

**Branch**: `001-template-samples` | **Date**: 2025-11-27 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-template-samples/spec.md`

## Summary

Create a Next.js 16 template project with pre-built sample pages demonstrating API routes, Server Actions, UI components, and data fetching patterns. The template uses PostgreSQL with Prisma for data persistence, follows co-location principles for feature organization, and includes four data domains (TODO, User, Product, Blog) each showcasing different rendering strategies.

## Technical Context

**Language/Version**: TypeScript 5+ with strict mode
**Primary Dependencies**: Next.js 16, React 19, Tailwind CSS 4, shadcn/ui, Prisma, Zod
**Storage**: PostgreSQL (Docker container for local development)
**Testing**: Biome for linting/formatting, manual testing via dev server
**Target Platform**: Web (Node.js 18+)
**Project Type**: Web application (Next.js App Router)
**Performance Goals**: Dev server startup < 10s (terminal output), page load < 2s (Chrome DevTools Network tab, local)
**Constraints**: Docker required for database, Japanese UI text
**Scale/Scope**: Template for experimentation, 4 data domains, ~10 sample pages

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. App Router First | ✅ PASS | All routes in `src/app/` directory with co-location |
| II. Server Components by Default | ✅ PASS | RSC default, Client Components only for interactivity |
| III. Type Safety Non-Negotiable | ✅ PASS | TypeScript strict, Zod validation, Prisma types |
| IV. Clean & Modular Architecture | ✅ PASS | Co-location, feature-based organization |
| V. Performance by Design | ✅ PASS | next/image, next/font, appropriate rendering strategies |

**Technology Standards Compliance**:
- ✅ Next.js 16+ with App Router
- ✅ TypeScript 5+ with strict mode
- ✅ React 19+
- ✅ Tailwind CSS 4+
- ✅ Biome for linting/formatting
- ✅ Zod for schema validation (recommended)

## Project Structure

### Documentation (this feature)

```text
specs/001-template-samples/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── layout.tsx                    # Root layout with navigation
│   ├── page.tsx                      # Home page with sample links
│   ├── globals.css                   # Global styles (Tailwind)
│   ├── _components/                  # Root-level shared components
│   │
│   ├── todo/                         # TODO feature (Dynamic rendering)
│   │   ├── page.tsx                  # TODO list page with Server Actions
│   │   ├── _action/                  # Co-located server actions
│   │   │   └── todo.ts               # CRUD actions for todos
│   │   ├── _components/              # Co-located UI components
│   │   ├── _data/                    # Co-located data access
│   │   ├── _function/                # Co-located utility functions
│   │   ├── _hook/                    # Co-located React hooks
│   │   └── _type/                    # Co-located TypeScript types
│   │
│   ├── user/                         # User feature (Dynamic rendering)
│   │   ├── page.tsx                  # User list page with Server Actions
│   │   ├── _action/                  # Co-located server actions
│   │   │   └── user.ts               # CRUD actions for users
│   │   ├── _components/              # Co-located UI components
│   │   ├── _data/                    # Co-located data access
│   │   ├── _function/                # Co-located utility functions
│   │   ├── _hook/                    # Co-located React hooks
│   │   └── _type/                    # Co-located TypeScript types
│   │
│   ├── product/                      # Product feature (ISR rendering)
│   │   ├── page.tsx                  # Product list page with Server Actions
│   │   ├── _action/                  # Co-located server actions
│   │   │   └── product.ts            # CRUD actions for products
│   │   ├── _components/              # Co-located UI components
│   │   ├── _data/                    # Co-located data access
│   │   ├── _function/                # Co-located utility functions
│   │   ├── _hook/                    # Co-located React hooks
│   │   └── _type/                    # Co-located TypeScript types
│   │
│   ├── blog/                         # Blog feature (Static rendering)
│   │   ├── page.tsx                  # Blog post list page
│   │   ├── [slug]/
│   │   │   └── page.tsx              # Individual blog post page
│   │   ├── _action/                  # Co-located server actions
│   │   │   └── post.ts               # CRUD actions for posts
│   │   ├── _components/              # Co-located UI components
│   │   ├── _data/                    # Co-located data access
│   │   ├── _function/                # Co-located utility functions
│   │   ├── _hook/                    # Co-located React hooks
│   │   └── _type/                    # Co-located TypeScript types
│   │
│   └── api/                          # API endpoints (route.ts only)
│       ├── todos/
│       │   └── route.ts              # GET/POST for todos
│       ├── users/
│       │   └── route.ts              # GET/POST for users
│       ├── products/
│       │   └── route.ts              # GET/POST for products
│       └── posts/
│           └── route.ts              # GET/POST for blog posts
│
├── components/                       # Cross-feature shared components
│   ├── ui/                           # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── form.tsx
│   │   ├── dialog.tsx
│   │   ├── toast.tsx
│   │   └── ...
│   └── common/                       # Common shared components
│       ├── header.tsx                # Site header with navigation
│       └── nav.tsx                   # Navigation component
│
├── data/                             # Cross-feature shared data access layer
│   ├── db.ts                         # Prisma client singleton
│   ├── schema/                       # Zod schemas (shared)
│   │   ├── todo.ts
│   │   ├── user.ts
│   │   ├── product.ts
│   │   └── post.ts
│   └── queries/                      # Shared data access layer
│       ├── todos.ts
│       ├── users.ts
│       ├── products.ts
│       └── posts.ts
│
└── lib/
    ├── utils.ts                      # Utility functions (cn, etc.)
    └── constants.ts                  # Shared constants

prisma/
├── schema.prisma                     # Prisma schema definition
├── seed.ts                           # Database seeding script
└── migrations/                       # Database migrations

docker/
└── docker-compose.yml                # PostgreSQL container config
```

**Co-location Convention**:
Feature-specific code uses underscore-prefixed folders to prevent them from becoming routes:
- `_components/` - UI components scoped to the feature
- `_action/` - Server actions scoped to the feature
- `_data/` - Data access functions scoped to the feature
- `_function/` - Utility functions scoped to the feature
- `_hook/` - React hooks scoped to the feature
- `_type/` - TypeScript types scoped to the feature

**API Routes Convention**:
- `src/app/api/` contains only `route.ts` files
- No `page.tsx`, `_components/`, or other folders in API routes
- API routes serve as pure REST endpoints

**Shared Code Location**:
- `src/components/` - UI components used across multiple features
  - `ui/` - shadcn/ui base components
  - `common/` - Common layout/navigation components
- `src/data/` - Data access layer used across multiple features
- `src/lib/` - Utility functions and constants

**Rendering Strategies by Feature**:
| Feature | Route | Rendering | Rationale |
|---------|-------|-----------|-----------|
| TODO | `/todo` | Dynamic | Frequently changing state, real-time updates |
| User | `/user` | Dynamic | User-specific data, authentication-related |
| Product | `/product` | ISR (revalidate: 3600) | Catalog updates periodically |
| Blog | `/blog`, `/blog/[slug]` | Static | Content rarely changes, build-time generation |

**Structure Decision**: Next.js App Router with co-location pattern inside `src/` directory. Each data domain (TODO, User, Product, Blog) has its own feature route with co-located Server Actions. API routes are pure endpoints without UI components. Shared components and data access layer are placed at `src/` level for cross-feature usage.

## Complexity Tracking

No constitution violations requiring justification.
