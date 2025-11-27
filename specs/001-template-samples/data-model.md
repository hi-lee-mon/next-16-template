# Data Model: Next.js Template with Sample Implementations

**Feature Branch**: `001-template-samples`
**Date**: 2025-11-27

## Entity Relationship Diagram

```text
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│    Todo     │     │    User     │     │   Product   │     │    Post     │
├─────────────┤     ├─────────────┤     ├─────────────┤     ├─────────────┤
│ id (PK)     │     │ id (PK)     │     │ id (PK)     │     │ id (PK)     │
│ title       │     │ name        │     │ name        │     │ title       │
│ completed   │     │ email       │     │ price       │     │ content     │
│ createdAt   │     │ role        │     │ category    │     │ author      │
│ updatedAt   │     │ createdAt   │     │ stock       │     │ slug        │
└─────────────┘     │ updatedAt   │     │ createdAt   │     │ publishedAt │
                    └─────────────┘     │ updatedAt   │     │ createdAt   │
                                        └─────────────┘     │ updatedAt   │
                                                            └─────────────┘
```

Note: Entities are independent for this template. No foreign key relationships as each domain demonstrates standalone patterns.

## Entity Definitions

### Todo (Dynamic Rendering)

Demonstrates frequently changing state with real-time updates.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | String | PK, CUID | Unique identifier |
| title | String | Required, 1-100 chars | Task title |
| completed | Boolean | Default: false | Completion status |
| createdAt | DateTime | Auto-generated | Creation timestamp |
| updatedAt | DateTime | Auto-updated | Last modification timestamp |

**Prisma Schema**:
```prisma
model Todo {
  id        String   @id @default(cuid())
  title     String
  completed Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

**Zod Schema**:
```typescript
export const todoSchema = z.object({
  title: z.string().min(1, 'タイトルは必須です').max(100, 'タイトルは100文字以内です'),
})

export const todoUpdateSchema = z.object({
  title: z.string().min(1).max(100).optional(),
  completed: z.boolean().optional(),
})
```

---

### User (Dynamic Rendering)

Demonstrates user-specific data patterns.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | String | PK, CUID | Unique identifier |
| name | String | Required, 1-50 chars | Display name |
| email | String | Required, Unique, Email format | Email address |
| role | Enum | admin/user/guest | User role |
| createdAt | DateTime | Auto-generated | Creation timestamp |
| updatedAt | DateTime | Auto-updated | Last modification timestamp |

**Prisma Schema**:
```prisma
enum Role {
  ADMIN
  USER
  GUEST
}

model User {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  role      Role     @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

**Zod Schema**:
```typescript
export const roleEnum = z.enum(['ADMIN', 'USER', 'GUEST'])

export const userSchema = z.object({
  name: z.string().min(1, '名前は必須です').max(50, '名前は50文字以内です'),
  email: z.string().email('有効なメールアドレスを入力してください'),
  role: roleEnum.optional().default('USER'),
})
```

---

### Product (ISR Rendering)

Demonstrates catalog data with periodic revalidation.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | String | PK, CUID | Unique identifier |
| name | String | Required, 1-100 chars | Product name |
| price | Int | Required, >= 0 | Price in JPY |
| category | String | Required | Product category |
| stock | Int | Required, >= 0 | Available stock |
| createdAt | DateTime | Auto-generated | Creation timestamp |
| updatedAt | DateTime | Auto-updated | Last modification timestamp |

**Prisma Schema**:
```prisma
model Product {
  id        String   @id @default(cuid())
  name      String
  price     Int
  category  String
  stock     Int      @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

**Zod Schema**:
```typescript
export const productSchema = z.object({
  name: z.string().min(1, '商品名は必須です').max(100, '商品名は100文字以内です'),
  price: z.number().int().min(0, '価格は0以上である必要があります'),
  category: z.string().min(1, 'カテゴリは必須です'),
  stock: z.number().int().min(0, '在庫数は0以上である必要があります').optional().default(0),
})
```

---

### Post (Static Rendering)

Demonstrates blog content with build-time generation.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | String | PK, CUID | Unique identifier |
| title | String | Required, 1-200 chars | Post title |
| content | String | Required | Post content (Markdown) |
| author | String | Required, 1-50 chars | Author name |
| slug | String | Required, Unique | URL-friendly identifier |
| publishedAt | DateTime | Nullable | Publication date |
| createdAt | DateTime | Auto-generated | Creation timestamp |
| updatedAt | DateTime | Auto-updated | Last modification timestamp |

**Prisma Schema**:
```prisma
model Post {
  id          String    @id @default(cuid())
  title       String
  content     String
  author      String
  slug        String    @unique
  publishedAt DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}
```

**Zod Schema**:
```typescript
export const postSchema = z.object({
  title: z.string().min(1, 'タイトルは必須です').max(200, 'タイトルは200文字以内です'),
  content: z.string().min(1, '本文は必須です'),
  author: z.string().min(1, '著者名は必須です').max(50, '著者名は50文字以内です'),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, 'スラッグは英小文字、数字、ハイフンのみ使用可能です'),
  publishedAt: z.date().optional(),
})
```

## Complete Prisma Schema

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Todo {
  id        String   @id @default(cuid())
  title     String
  completed Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum Role {
  ADMIN
  USER
  GUEST
}

model User {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  role      Role     @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Product {
  id        String   @id @default(cuid())
  name      String
  price     Int
  category  String
  stock     Int      @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Post {
  id          String    @id @default(cuid())
  title       String
  content     String
  author      String
  slug        String    @unique
  publishedAt DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}
```

## Seed Data

Each entity will have sample seed data for demonstration:

- **Todo**: 5 sample tasks (mix of completed/incomplete)
- **User**: 3 sample users (one per role)
- **Product**: 6 sample products (2 per category: electronics, clothing, food)
- **Post**: 3 sample blog posts (with Japanese content)

See `prisma/seed.ts` for implementation.
