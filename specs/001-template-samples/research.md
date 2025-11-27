# Research: Next.js Template with Sample Implementations

**Feature Branch**: `001-template-samples`
**Date**: 2025-11-27

## Research Topics

### 1. Next.js 16 App Router Co-location Pattern

**Decision**: Use underscore-prefixed folders (`_action/`, `_components/`, `_data/`, `_function/`, `_hook/`, `_type/`) for co-located feature-specific code.

**Rationale**:
- Next.js App Router treats folders starting with `_` as private, preventing them from becoming routes
- Keeps related code together (actions, components, data access) within feature boundaries
- Aligns with Next.js official documentation recommendations
- Makes it easy to understand what code belongs to which feature

**Alternatives considered**:
- Parentheses folders `(group)` - Used for route groups, not for private folders
- Separate top-level folders - Breaks co-location principle, harder to maintain
- `__` double underscore - Works but less conventional

### 2. Prisma with Next.js 16

**Decision**: Use Prisma with singleton pattern for database client.

**Rationale**:
- Prisma provides type-safe database access that integrates well with TypeScript
- Generated types can be shared with Zod schemas for validation
- Singleton pattern prevents connection pool exhaustion during development (hot reload)
- Excellent developer experience with Prisma Studio for data browsing

**Implementation pattern**:
```typescript
// src/data/db.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

**Alternatives considered**:
- Drizzle ORM - Lighter weight but less mature ecosystem
- Raw SQL with pg - More control but loses type safety benefits
- Kysely - Good type safety but smaller community

### 3. PostgreSQL Docker Setup

**Decision**: Use Docker Compose with PostgreSQL 16 for local development.

**Rationale**:
- Consistent environment across all developers
- Easy to start/stop without system-level installation
- Data persisted in Docker volume for development continuity
- Can be extended with additional services (Redis, etc.) later

**Configuration**:
```yaml
# docker/docker-compose.yml
services:
  postgres:
    image: postgres:16-alpine
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: dev
      POSTGRES_PASSWORD: dev
      POSTGRES_DB: template_samples
    volumes:
      - postgres_data:/var/lib/postgresql/data
volumes:
  postgres_data:
```

**Alternatives considered**:
- SQLite - Simpler but doesn't demonstrate real PostgreSQL patterns
- Supabase local - More features but heavier setup
- Neon - Requires internet connection

### 4. Data Access Layer Pattern

**Decision**: Centralized `data/queries/` folder with domain-specific query files.

**Rationale**:
- Single source of truth for database operations
- Easy to maintain and test
- Prevents duplicate queries across features
- Works well with Server Components and Server Actions

**Pattern**:
```typescript
// src/data/queries/todos.ts
import { prisma } from '../db'
import type { Todo } from '@prisma/client'

export async function getTodos(): Promise<Todo[]> {
  return prisma.todo.findMany({ orderBy: { createdAt: 'desc' } })
}

export async function createTodo(data: { title: string }): Promise<Todo> {
  return prisma.todo.create({ data: { ...data, completed: false } })
}
```

**Alternatives considered**:
- Repository pattern with classes - Over-engineered for this use case
- Inline Prisma calls - Leads to duplication and harder testing
- tRPC - Good for larger apps but adds complexity for a template

### 5. Server Actions Best Practices

**Decision**: Co-locate Server Actions with their feature pages using `_action/` folder.

**Rationale**:
- Clear ownership of actions per feature
- Easy to find related code
- Actions can import from shared `data/queries/` for actual DB operations
- Validation with Zod before database operations

**Pattern**:
```typescript
// src/app/todo/_action/todo.ts
'use server'

import { revalidatePath } from 'next/cache'
import { createTodo } from '@/data/queries/todos'
import { todoSchema } from '@/data/schema/todo'

export async function addTodo(formData: FormData) {
  const parsed = todoSchema.safeParse({
    title: formData.get('title'),
  })

  if (!parsed.success) {
    return { error: parsed.error.flatten() }
  }

  await createTodo(parsed.data)
  revalidatePath('/todo')
  return { success: true }
}
```

**Alternatives considered**:
- Global actions folder - Breaks co-location
- Inline in page components - Harder to test and reuse
- next-safe-action library - Good but adds dependency for a template

### 6. Rendering Strategies Implementation

**Decision**: Map data domains to rendering strategies as specified.

| Domain | Rendering | Implementation |
|--------|-----------|----------------|
| Blog | `/blog`, `/blog/[slug]` | Static | `generateStaticParams()` + no `revalidate` |
| Product | `/product` | ISR | `revalidate: 3600` (1 hour) |
| TODO | `/todo` | Dynamic | `dynamic = 'force-dynamic'` |
| User | `/user` | Dynamic | `dynamic = 'force-dynamic'` |

**Rationale**:
- Each domain has its own feature route with co-located Server Actions
- Blog content rarely changes → static at build time with individual post pages
- Product catalog updates periodically → ISR with revalidation
- TODO/User data is user-specific → always fresh

### 7. Zod Schema Organization

**Decision**: Centralized schemas in `data/schema/` with Prisma type alignment.

**Rationale**:
- Single source of truth for validation rules
- Can be used in both Server Actions and API routes
- TypeScript inference provides type safety
- Schemas can derive from or align with Prisma types

**Pattern**:
```typescript
// src/data/schema/todo.ts
import { z } from 'zod'

export const todoSchema = z.object({
  title: z.string().min(1, 'タイトルは必須です').max(100),
})

export const todoUpdateSchema = todoSchema.extend({
  completed: z.boolean().optional(),
})

export type TodoInput = z.infer<typeof todoSchema>
```

### 8. shadcn/ui Integration

**Decision**: Initialize shadcn/ui with required components only.

**Components needed**:
- Button, Input, Label (forms)
- Dialog (modals)
- Toast (notifications)
- Card (content containers)
- Form (react-hook-form integration)

**Rationale**:
- Copy-paste approach means no external runtime dependency
- Only include what's needed to keep bundle small
- Easy to customize or replace components
- Works well with Tailwind CSS 4

## Resolved Clarifications

All technical decisions have been made. No outstanding NEEDS CLARIFICATION items.

## References

- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [Prisma with Next.js](https://www.prisma.io/nextjs)
- [Server Actions Documentation](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Zod Documentation](https://zod.dev/)
