# Tasks: Next.js Template with Sample Implementations

**Input**: Design documents from `/specs/001-template-samples/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/api.md, quickstart.md

**Tests**: Tests are NOT requested in this feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Project Type**: Next.js App Router with co-location pattern inside `src/` directory
- **Feature Routes**: `src/app/todo/`, `src/app/user/`, `src/app/product/`, `src/app/blog/`
- **API Routes**: `src/app/api/todos/`, `src/app/api/users/`, `src/app/api/products/`, `src/app/api/posts/`
- **Shared Code**: `src/components/`, `src/data/`, `src/lib/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create project structure with Next.js 16 and React 19 (`npx create-next-app@latest` or manual setup)
- [X] T002 [P] Configure TypeScript with strict mode in `tsconfig.json`
- [X] T003 [P] Setup Tailwind CSS 4 configuration in `tailwind.config.ts` and `src/app/globals.css`
- [X] T004 [P] Configure Biome for linting/formatting in `biome.json`
- [X] T005 [P] Create Docker configuration in `docker/docker-compose.yml` for PostgreSQL
- [X] T006 [P] Create environment example file `.env.example` with DATABASE_URL
- [X] T007 Initialize Prisma with PostgreSQL configuration in `prisma/schema.prisma`
- [X] T008 Setup shadcn/ui with required components (Button, Input, Label, Dialog, Toast, Card, Form)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T009 Define Prisma schema with all entities (Todo, User, Product, Post) in `prisma/schema.prisma`
- [X] T010 Run Prisma migration to create database tables
- [X] T011 Create Prisma client singleton in `data/db.ts`
- [X] T012 [P] Create Zod schema for Todo in `data/schema/todo.ts`
- [X] T013 [P] Create Zod schema for User in `data/schema/user.ts`
- [X] T014 [P] Create Zod schema for Product in `data/schema/product.ts`
- [X] T015 [P] Create Zod schema for Post in `data/schema/post.ts`
- [X] T016 [P] Create data queries for Todo in `data/queries/todos.ts`
- [X] T017 [P] Create data queries for User in `data/queries/users.ts`
- [X] T018 [P] Create data queries for Product in `data/queries/products.ts`
- [X] T019 [P] Create data queries for Post in `data/queries/posts.ts`
- [X] T020 Create seed data script in `prisma/seed.ts`
- [X] T021 Configure seed script in `prisma.config.ts` and run seeding
- [X] T022 Create utility functions in `lib/utils.ts` (cn helper for className merging)
- [X] T023 Create constants file in `lib/constants.ts`
- [X] T024 [P] Configure next/font with Japanese font (Noto Sans JP) in `app/layout.tsx`

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - View Sample Pages Navigation (Priority: P1) 🎯 MVP

**Goal**: Developers can see a navigation menu on the home page that lists all available sample pages and navigate to them

**Independent Test**: Launch dev server, verify home page displays navigation menu with links to all sample pages (Todo, User, Product, Blog)

### Implementation for User Story 1

- [X] T025 [P] [US1] Create Header component in `src/components/common/header.tsx`
- [X] T026 [P] [US1] Create Navigation component in `src/components/common/nav.tsx`
- [X] T027 [US1] Create root layout with navigation in `src/app/layout.tsx`
- [X] T028 [US1] Create home page with sample page listings in `src/app/page.tsx`

**Checkpoint**: User Story 1 complete - Home page shows navigation to all sample features

---

## Phase 4: User Story 2 - Explore API Route Examples (Priority: P1)

**Goal**: Developers can make HTTP requests to sample API endpoints and receive correct JSON responses

**Independent Test**: Make GET/POST requests to `/api/todos`, `/api/users`, `/api/products`, `/api/posts` and verify JSON responses

### Implementation for User Story 2

- [X] T029 [P] [US2] Implement Todos API route (GET, POST) in `app/api/todos/route.ts`
- [X] T030 [P] [US2] Implement Users API route (GET, POST) in `app/api/users/route.ts`
- [X] T031 [P] [US2] Implement Products API route (GET, POST) in `app/api/products/route.ts`
- [X] T032 [P] [US2] Implement Posts API route (GET, POST) in `app/api/posts/route.ts`
- [X] T033 [US2] Implement Posts by slug API route (GET) in `app/api/posts/[slug]/route.ts`

**Checkpoint**: User Story 2 complete - All API endpoints respond correctly

---

## Phase 5: User Story 3 - Use Server Action Examples (Priority: P1)

**Goal**: Developers can see working examples of Server Actions with form submissions on TODO and User pages

**Independent Test**: Navigate to `/todo` and `/user` pages, submit forms, verify Server Actions execute and provide feedback

### Implementation for User Story 3

#### TODO Feature (Dynamic Rendering)

- [X] T034 [P] [US3] Create Todo types in `app/todo/_type/todo.ts`
- [X] T035 [P] [US3] Create Todo server actions (create, toggle, delete) in `app/todo/_action/todo.ts`
- [X] T036 [US3] Create TodoForm component in `app/todo/_components/todo-form.tsx`
- [X] T037 [US3] Create TodoList component in `app/todo/_components/todo-list.tsx`
- [X] T038 [US3] Create TodoItem component in `app/todo/_components/todo-item.tsx`
- [X] T039 [US3] Create TODO page with Server Actions in `app/todo/page.tsx`

#### User Feature (Dynamic Rendering)

- [X] T040 [P] [US3] Create User types in `app/user/_type/user.ts`
- [X] T041 [P] [US3] Create User server actions (create, update, delete) in `app/user/_action/user.ts`
- [X] T042 [US3] Create UserForm component in `app/user/_components/user-form.tsx`
- [X] T043 [US3] Create UserList component in `app/user/_components/user-list.tsx`
- [X] T044 [US3] Create UserCard component in `app/user/_components/user-card.tsx`
- [X] T045 [US3] Create User page with Server Actions in `app/user/page.tsx`

**Checkpoint**: User Story 3 complete - TODO and User pages demonstrate Server Actions with forms

---

## Phase 6: User Story 4 - Interactive UI Component Samples (Priority: P2)

**Goal**: Developers can interact with sample UI components (buttons, forms, dialogs, toasts)

**Independent Test**: Navigate to `/product` page, interact with UI components (click buttons, open dialogs, see toasts)

### Implementation for User Story 4

#### Product Feature (ISR Rendering)

- [X] T046 [P] [US4] Create Product types in `src/app/product/_type/product.ts`
- [X] T047 [P] [US4] Create Product server actions (create, update, delete) in `src/app/product/_action/product.ts`
- [X] T048 [US4] Create ProductForm component with Dialog in `src/app/product/_components/product-form.tsx`
- [X] T049 [US4] Create ProductList component in `src/app/product/_components/product-list.tsx`
- [X] T050 [US4] Create ProductCard component with interactive buttons in `src/app/product/_components/product-card.tsx`
- [X] T051 [P] [US4] Demonstrate next/image usage with optimized product images in `src/app/product/_components/product-image.tsx`
- [X] T052 [US4] Create Product page with ISR rendering (revalidate: 3600) in `src/app/product/page.tsx`

**Checkpoint**: User Story 4 complete - Product page demonstrates interactive UI with Dialog, Toast, and optimized images

---

## Phase 7: User Story 5 - Data Fetching Patterns (Priority: P2)

**Goal**: Developers can see examples of server-side (static) and client-side data fetching patterns

**Independent Test**: Navigate to `/blog` and `/blog/[slug]` pages, verify static data rendering and proper loading states

### Implementation for User Story 5

#### Blog Feature (Static Rendering)

- [ ] T053 [P] [US5] Create Post types in `src/app/blog/_type/post.ts`
- [ ] T054 [P] [US5] Create Post server actions (create) in `src/app/blog/_action/post.ts`
- [ ] T055 [US5] Create PostList component in `src/app/blog/_components/post-list.tsx`
- [ ] T056 [US5] Create PostCard component in `src/app/blog/_components/post-card.tsx`
- [ ] T057 [US5] Create PostContent component (Markdown rendering) in `src/app/blog/_components/post-content.tsx`
- [ ] T058 [US5] Create Blog list page with static rendering in `src/app/blog/page.tsx`
- [ ] T059 [US5] Create Blog post detail page with generateStaticParams in `src/app/blog/[slug]/page.tsx`

#### Client-Side Data Fetching Example

- [ ] T060 [US5] Create client-side data fetching example with loading/error states in `src/app/blog/_components/post-search.tsx`

**Checkpoint**: User Story 5 complete - Blog demonstrates both static and client-side data fetching patterns

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Final improvements that affect multiple user stories

- [ ] T061 Verify all pages display Japanese UI text per requirements
- [ ] T062 Add error handling examples across all features
- [ ] T063 Verify navigation works from all pages (return to home, cross-navigation)
- [ ] T064 Update quickstart.md with final setup instructions if needed
- [ ] T065 Run Biome linting and fix any issues
- [ ] T066 Manual testing: verify all acceptance scenarios from spec.md
- [ ] T067 Final build verification (`npm run build` succeeds without errors)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-7)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P1 → P1 → P2 → P2)
- **Polish (Phase 8)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational - No dependencies on other stories
- **User Story 3 (P1)**: Can start after Foundational - Requires navigation (US1) for user experience but technically independent
- **User Story 4 (P2)**: Can start after Foundational - Requires navigation (US1) for user experience but technically independent
- **User Story 5 (P2)**: Can start after Foundational - Requires navigation (US1) for user experience but technically independent

### Within Each User Story

- Models/Types before components
- Components before page
- Server Actions before forms that use them

### Parallel Opportunities

**Phase 1 Setup** (can run in parallel):
- T002, T003, T004, T005, T006 (all independent config files)

**Phase 2 Foundational** (can run in parallel after T011):
- T012, T013, T014, T015 (Zod schemas - different files)
- T016, T017, T018, T019 (Data queries - different files)

**Phase 3-7 User Stories** (can run in parallel after Phase 2):
- All user stories can technically run in parallel
- Within each story, [P] marked tasks can run in parallel

---

## Parallel Example: User Story 3 (Server Actions)

```bash
# Launch types in parallel:
Task: "Create Todo types in src/app/todo/_type/todo.ts"
Task: "Create User types in src/app/user/_type/user.ts"

# Launch server actions in parallel:
Task: "Create Todo server actions in src/app/todo/_action/todo.ts"
Task: "Create User server actions in src/app/user/_action/user.ts"
```

---

## Implementation Strategy

### MVP First (User Stories 1-3)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1 - Navigation
4. Complete Phase 4: User Story 2 - API Routes
5. Complete Phase 5: User Story 3 - Server Actions
6. **STOP and VALIDATE**: Test core features independently
7. Deploy/demo MVP with navigation, APIs, and Server Actions

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Navigation works → Core template usable
3. Add User Story 2 → API routes work → REST examples available
4. Add User Story 3 → Server Actions work → Form examples available (MVP!)
5. Add User Story 4 → UI components work → Interactive examples available
6. Add User Story 5 → Data fetching works → All patterns demonstrated
7. Polish phase → Production-ready template

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Navigation) + User Story 3 (TODO portion)
   - Developer B: User Story 2 (API Routes) + User Story 3 (User portion)
   - Developer C: User Story 4 (Product) + User Story 5 (Blog)
3. Stories complete and integrate independently

---

## Summary

| Category | Count |
|----------|-------|
| **Total Tasks** | 67 |
| **Phase 1: Setup** | 8 |
| **Phase 2: Foundational** | 16 |
| **US1: Navigation** | 4 |
| **US2: API Routes** | 5 |
| **US3: Server Actions** | 12 |
| **US4: UI Components** | 7 |
| **US5: Data Fetching** | 8 |
| **Phase 8: Polish** | 7 |

### MVP Scope (Recommended)

- **Minimum**: Phase 1 + Phase 2 + US1 + US2 + US3 = 45 tasks
- **Delivers**: Working template with navigation, API routes, and Server Actions examples

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Japanese UI text is required for all user-facing content
- No tests included - testing is manual via dev server as per specification
