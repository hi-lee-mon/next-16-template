# API Contracts: Next.js Template with Sample Implementations

**Feature Branch**: `001-template-samples`
**Date**: 2025-11-27

## Base URL

```
http://localhost:3000/api
```

## Common Response Format

### Success Response
```json
{
  "data": <entity or array>,
  "message": "操作が完了しました"
}
```

### Error Response
```json
{
  "error": {
    "message": "エラーメッセージ",
    "code": "ERROR_CODE",
    "details": {} // Optional validation errors
  }
}
```

---

## Todos API

### GET /api/todos

Retrieve all todos.

**Response**: `200 OK`
```json
{
  "data": [
    {
      "id": "cuid_xxx",
      "title": "タスク1",
      "completed": false,
      "createdAt": "2025-11-27T00:00:00.000Z",
      "updatedAt": "2025-11-27T00:00:00.000Z"
    }
  ]
}
```

### POST /api/todos

Create a new todo.

**Request Body**:
```json
{
  "title": "新しいタスク"
}
```

**Validation**:
- `title`: Required, 1-100 characters

**Response**: `201 Created`
```json
{
  "data": {
    "id": "cuid_xxx",
    "title": "新しいタスク",
    "completed": false,
    "createdAt": "2025-11-27T00:00:00.000Z",
    "updatedAt": "2025-11-27T00:00:00.000Z"
  },
  "message": "TODOを作成しました"
}
```

**Error**: `400 Bad Request`
```json
{
  "error": {
    "message": "バリデーションエラー",
    "code": "VALIDATION_ERROR",
    "details": {
      "title": ["タイトルは必須です"]
    }
  }
}
```

---

## Users API

### GET /api/users

Retrieve all users.

**Response**: `200 OK`
```json
{
  "data": [
    {
      "id": "cuid_xxx",
      "name": "山田太郎",
      "email": "taro@example.com",
      "role": "USER",
      "createdAt": "2025-11-27T00:00:00.000Z",
      "updatedAt": "2025-11-27T00:00:00.000Z"
    }
  ]
}
```

### POST /api/users

Create a new user.

**Request Body**:
```json
{
  "name": "鈴木花子",
  "email": "hanako@example.com",
  "role": "USER"
}
```

**Validation**:
- `name`: Required, 1-50 characters
- `email`: Required, valid email format, unique
- `role`: Optional, one of "ADMIN", "USER", "GUEST" (default: "USER")

**Response**: `201 Created`
```json
{
  "data": {
    "id": "cuid_xxx",
    "name": "鈴木花子",
    "email": "hanako@example.com",
    "role": "USER",
    "createdAt": "2025-11-27T00:00:00.000Z",
    "updatedAt": "2025-11-27T00:00:00.000Z"
  },
  "message": "ユーザーを作成しました"
}
```

**Error**: `400 Bad Request` (Validation)
```json
{
  "error": {
    "message": "バリデーションエラー",
    "code": "VALIDATION_ERROR",
    "details": {
      "email": ["有効なメールアドレスを入力してください"]
    }
  }
}
```

**Error**: `409 Conflict` (Duplicate email)
```json
{
  "error": {
    "message": "このメールアドレスは既に使用されています",
    "code": "DUPLICATE_EMAIL"
  }
}
```

---

## Products API

### GET /api/products

Retrieve all products.

**Query Parameters**:
- `category` (optional): Filter by category

**Response**: `200 OK`
```json
{
  "data": [
    {
      "id": "cuid_xxx",
      "name": "ワイヤレスイヤホン",
      "price": 12800,
      "category": "electronics",
      "stock": 50,
      "createdAt": "2025-11-27T00:00:00.000Z",
      "updatedAt": "2025-11-27T00:00:00.000Z"
    }
  ]
}
```

### POST /api/products

Create a new product.

**Request Body**:
```json
{
  "name": "スマートウォッチ",
  "price": 29800,
  "category": "electronics",
  "stock": 25
}
```

**Validation**:
- `name`: Required, 1-100 characters
- `price`: Required, integer >= 0
- `category`: Required
- `stock`: Optional, integer >= 0 (default: 0)

**Response**: `201 Created`
```json
{
  "data": {
    "id": "cuid_xxx",
    "name": "スマートウォッチ",
    "price": 29800,
    "category": "electronics",
    "stock": 25,
    "createdAt": "2025-11-27T00:00:00.000Z",
    "updatedAt": "2025-11-27T00:00:00.000Z"
  },
  "message": "商品を作成しました"
}
```

---

## Posts API

### GET /api/posts

Retrieve all published posts.

**Query Parameters**:
- `published` (optional): Filter by published status (default: true)

**Response**: `200 OK`
```json
{
  "data": [
    {
      "id": "cuid_xxx",
      "title": "Next.js 16の新機能",
      "content": "# はじめに\n\nNext.js 16では...",
      "author": "開発チーム",
      "slug": "nextjs-16-features",
      "publishedAt": "2025-11-27T00:00:00.000Z",
      "createdAt": "2025-11-27T00:00:00.000Z",
      "updatedAt": "2025-11-27T00:00:00.000Z"
    }
  ]
}
```

### GET /api/posts/:slug

Retrieve a single post by slug.

**Response**: `200 OK`
```json
{
  "data": {
    "id": "cuid_xxx",
    "title": "Next.js 16の新機能",
    "content": "# はじめに\n\nNext.js 16では...",
    "author": "開発チーム",
    "slug": "nextjs-16-features",
    "publishedAt": "2025-11-27T00:00:00.000Z",
    "createdAt": "2025-11-27T00:00:00.000Z",
    "updatedAt": "2025-11-27T00:00:00.000Z"
  }
}
```

**Error**: `404 Not Found`
```json
{
  "error": {
    "message": "記事が見つかりません",
    "code": "NOT_FOUND"
  }
}
```

### POST /api/posts

Create a new post.

**Request Body**:
```json
{
  "title": "新しい記事",
  "content": "# 内容\n\n本文です。",
  "author": "著者名",
  "slug": "new-article",
  "publishedAt": "2025-11-27T00:00:00.000Z"
}
```

**Validation**:
- `title`: Required, 1-200 characters
- `content`: Required
- `author`: Required, 1-50 characters
- `slug`: Required, unique, lowercase alphanumeric with hyphens
- `publishedAt`: Optional, ISO date string

**Response**: `201 Created`
```json
{
  "data": {
    "id": "cuid_xxx",
    "title": "新しい記事",
    "content": "# 内容\n\n本文です。",
    "author": "著者名",
    "slug": "new-article",
    "publishedAt": "2025-11-27T00:00:00.000Z",
    "createdAt": "2025-11-27T00:00:00.000Z",
    "updatedAt": "2025-11-27T00:00:00.000Z"
  },
  "message": "記事を作成しました"
}
```

**Error**: `409 Conflict` (Duplicate slug)
```json
{
  "error": {
    "message": "このスラッグは既に使用されています",
    "code": "DUPLICATE_SLUG"
  }
}
```

---

## Server Actions Contract

Server Actions follow the same validation rules as API routes but return action results:

### Action Result Format

```typescript
type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: { message: string; details?: Record<string, string[]> } }
```

### Example Usage

```typescript
// src/app/todo/_action/todo.ts
'use server'

import { revalidatePath } from 'next/cache'
import { createTodo } from '@/data/queries/todos'
import { todoSchema } from '@/data/schema/todo'

export async function createTodoAction(formData: FormData) {
  const parsed = todoSchema.safeParse({
    title: formData.get('title'),
  })

  if (!parsed.success) {
    return { success: false, error: { details: parsed.error.flatten().fieldErrors } }
  }

  const todo = await createTodo(parsed.data)
  revalidatePath('/todo')
  return { success: true, data: todo }
}

// Usage in component
const result = await createTodoAction(formData)

if (result.success) {
  // result.data contains the created todo
} else {
  // result.error.details contains field-level errors
}
```

---

## HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Validation error |
| 404 | Not Found - Resource not found |
| 409 | Conflict - Duplicate key error |
| 500 | Internal Server Error - Unexpected error |
