# Quickstart: Next.js Template with Sample Implementations

**Feature Branch**: `001-template-samples`
**Date**: 2025-11-27

## Prerequisites

- Node.js 18+ installed
- Docker Desktop installed and running
- pnpm, npm, or yarn

## Setup Steps

### 1. Clone and Install Dependencies

```bash
# Clone the repository
git clone <repository-url>
cd next-16-template

# Install dependencies
pnpm install
# or: npm install
# or: yarn install
```

### 2. Start PostgreSQL Database

```bash
# Start the Docker container
docker compose -f docker/docker-compose.yml up -d

# Verify it's running
docker compose -f docker/docker-compose.yml ps
```

### 3. Setup Environment Variables

```bash
# Copy the example environment file
cp .env.example .env.local

# The default DATABASE_URL is already configured for Docker:
# DATABASE_URL="postgresql://dev:dev@localhost:5432/template_samples"
```

### 4. Initialize Database

```bash
# Generate Prisma client
pnpm prisma generate

# Run migrations
pnpm prisma migrate dev

# Seed the database with sample data
pnpm prisma db seed
```

### 5. Start Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the template.

## Available Feature Pages

| Route | Description | Rendering |
|-------|-------------|-----------|
| `/` | Home page with navigation to all features | - |
| `/todo` | TODO list with Server Actions | Dynamic |
| `/user` | User management with Server Actions | Dynamic |
| `/product` | Product catalog with Server Actions | ISR (1 hour) |
| `/blog` | Blog post list | Static |
| `/blog/[slug]` | Individual blog post | Static |

## API Endpoints

| Endpoint | Methods | Description |
|----------|---------|-------------|
| `/api/todos` | GET, POST | Todo CRUD operations |
| `/api/users` | GET, POST | User management |
| `/api/products` | GET, POST | Product catalog |
| `/api/posts` | GET, POST | Blog posts |
| `/api/posts/:slug` | GET | Single post by slug |

## Useful Commands

```bash
# Development
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm start            # Start production server

# Database
pnpm prisma studio    # Open Prisma Studio (database GUI)
pnpm prisma migrate dev    # Run migrations
pnpm prisma db seed   # Re-seed database
pnpm prisma generate  # Regenerate Prisma client

# Code Quality
pnpm lint             # Run Biome linter
pnpm format           # Format code with Biome

# Docker
docker compose -f docker/docker-compose.yml up -d     # Start database
docker compose -f docker/docker-compose.yml down      # Stop database
docker compose -f docker/docker-compose.yml down -v   # Stop and remove data
```

## Project Structure Overview

```
src/
├── app/
│   ├── todo/                      # TODO feature (Dynamic)
│   │   ├── page.tsx
│   │   ├── _action/               # Co-located server actions
│   │   ├── _components/           # Co-located UI components
│   │   └── ...                    # _data/, _function/, _hook/, _type/
│   ├── user/                      # User feature (Dynamic)
│   │   └── ...                    # Same co-location pattern
│   ├── product/                   # Product feature (ISR)
│   │   └── ...
│   ├── blog/                      # Blog feature (Static)
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   └── api/                       # API routes (route.ts only)
│       ├── todos/route.ts
│       ├── users/route.ts
│       ├── products/route.ts
│       └── posts/route.ts
│
├── components/                    # Cross-feature shared components
│   ├── ui/                        # shadcn/ui components
│   └── common/                    # Common layout components
│
├── data/                          # Cross-feature shared data access
│   ├── db.ts                      # Prisma client
│   ├── schema/                    # Zod validation schemas
│   └── queries/                   # Data access layer
│
└── lib/                           # Utility functions

prisma/
├── schema.prisma                  # Database schema
├── seed.ts                        # Seed data
└── migrations/                    # Migration files

docker/
└── docker-compose.yml             # PostgreSQL container
```

## Troubleshooting

### Database Connection Error

```bash
# Ensure Docker is running
docker compose -f docker/docker-compose.yml ps

# Check logs
docker compose -f docker/docker-compose.yml logs postgres

# Reset database
docker compose -f docker/docker-compose.yml down -v
docker compose -f docker/docker-compose.yml up -d
pnpm prisma migrate dev
pnpm prisma db seed
```

### Prisma Client Not Generated

```bash
# Regenerate client after schema changes
pnpm prisma generate
```

### Port 3000 Already in Use

```bash
# Find and kill the process
lsof -i :3000
kill -9 <PID>

# Or use a different port
pnpm dev -- -p 3001
```

## Next Steps

1. Explore the feature pages to understand the patterns
2. Check the source code in `src/app/todo/`, `src/app/user/`, `src/app/product/`, `src/app/blog/` for implementation details
3. Modify or extend the features for your experiments
4. Use the data access layer in `src/data/` as a reference for your own features
