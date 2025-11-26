# Feature Specification: Next.js Template with Sample Implementations

**Feature Branch**: `001-template-samples`
**Created**: 2025-11-27
**Status**: Draft
**Input**: User description: "I want to create a Next.js template project. The reason is that it's tedious to set up from scratch every time I want to try out frontend libraries. Since I want to experiment with various libraries, I'd like it to come with sample pages, sample route.ts files, and server actions already implemented."

## Clarifications

### Session 2025-11-27

- Q: サンプルページの構成方法は？ → A: 各サンプルを独立したページとして実装（/samples/api, /samples/actions 等）
- Q: サンプルデータのドメインは？ → A: 4種類すべて実装（TODO、ユーザー、商品、ブログ）- データ属性によるレンダリング戦略の実験を可能にするため
- Q: UIコンポーネントのアプローチは？ → A: shadcn/ui（Tailwindベース、コピー方式）
- Q: バリデーションのアプローチは？ → A: Zod（スキーマベース、TypeScript型生成）
- Q: レンダリング戦略のサンプルは？ → A: データドメインと紐付け（Blog=Static, Product=ISR, TODO/User=Dynamic）

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Sample Pages Navigation (Priority: P1)

As a developer starting a new experiment, I want to see a navigation menu that lists all available sample pages so that I can quickly understand what's included in the template and navigate to relevant examples.

**Why this priority**: This is the entry point for all template usage. Without clear navigation, developers cannot discover or access the sample implementations.

**Independent Test**: Can be fully tested by launching the dev server and verifying the home page displays a navigation menu with links to all sample pages.

**Acceptance Scenarios**:

1. **Given** the template is freshly cloned and dev server is running, **When** I open the home page, **Then** I see a navigation menu listing all available sample pages with descriptions
2. **Given** I am on the home page, **When** I click on a sample page link, **Then** I am navigated to that sample page
3. **Given** I am on any sample page, **When** I look for navigation, **Then** I can return to the home page or navigate to other samples

---

### User Story 2 - Explore API Route Examples (Priority: P1)

As a developer who wants to experiment with API integrations, I want to see working examples of route.ts files (GET, POST, etc.) so that I can understand the patterns and copy them for my experiments.

**Why this priority**: API routes are essential for any full-stack experimentation. Developers need reference implementations to build upon.

**Independent Test**: Can be tested by making HTTP requests to the sample API endpoints and verifying correct responses.

**Acceptance Scenarios**:

1. **Given** the dev server is running, **When** I send a GET request to the sample API endpoint, **Then** I receive a JSON response with sample data
2. **Given** the dev server is running, **When** I send a POST request with valid data to the sample API endpoint, **Then** I receive a success response confirming data was received
3. **Given** I send an invalid request to the sample API endpoint, **When** the server processes it, **Then** I receive an appropriate error response with helpful message

---

### User Story 3 - Use Server Action Examples (Priority: P1)

As a developer who wants to understand Server Actions, I want to see working examples of server actions with form submissions so that I can learn the patterns and apply them to my experiments.

**Why this priority**: Server Actions are a key Next.js feature that many developers want to experiment with but find confusing initially.

**Independent Test**: Can be tested by interacting with sample forms that use server actions and verifying the actions execute correctly.

**Acceptance Scenarios**:

1. **Given** I am on the Server Actions sample page, **When** I submit a form with valid data, **Then** the server action executes and I see feedback confirming the action completed
2. **Given** I am on the Server Actions sample page, **When** I submit a form with invalid data, **Then** I see validation error messages
3. **Given** I want to understand the code, **When** I view the sample page source, **Then** I can see clear examples of server action definitions and usage

---

### User Story 4 - Interactive UI Component Samples (Priority: P2)

As a developer who wants to test UI libraries, I want to see sample interactive components (buttons, forms, modals) so that I have a baseline to integrate new libraries against.

**Why this priority**: UI components are the most common type of library experimentation. Having baseline components provides comparison points.

**Independent Test**: Can be tested by interacting with UI components on the sample page and verifying they respond correctly.

**Acceptance Scenarios**:

1. **Given** I am on the UI Components sample page, **When** I click an interactive button, **Then** I see visual feedback (state change, toast notification, etc.)
2. **Given** I am on the UI Components sample page, **When** I interact with a sample form, **Then** form validation and submission work correctly
3. **Given** I am on the UI Components sample page, **When** I trigger a modal or dialog, **Then** it opens and can be closed properly

---

### User Story 5 - Data Fetching Patterns (Priority: P2)

As a developer who wants to experiment with data handling libraries, I want to see examples of different data fetching patterns (server-side, client-side) so that I can compare approaches and test new libraries.

**Why this priority**: Data fetching is a common area for library experimentation (React Query, SWR, etc.). Baseline patterns enable meaningful comparisons.

**Independent Test**: Can be tested by viewing data fetching sample pages and verifying data loads correctly with appropriate loading states.

**Acceptance Scenarios**:

1. **Given** I am on the Server-side data fetching sample page, **When** the page loads, **Then** I see pre-rendered data without loading spinners
2. **Given** I am on the Client-side data fetching sample page, **When** the page loads, **Then** I see a loading state followed by fetched data
3. **Given** I am viewing a data fetching example, **When** an error occurs during fetch, **Then** I see an appropriate error state

---

### Edge Cases

- What happens when a sample API route receives malformed JSON? → Display user-friendly error message
- What happens when a server action throws an unexpected error? → Graceful error handling with user feedback
- What happens when the user navigates away during a pending server action? → Action completes or is properly cancelled
- What happens when JavaScript is disabled? → Server-rendered content remains functional where possible

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Template MUST include a home page with navigation to all sample pages
- **FR-001a**: Sample pages MUST be organized as independent pages under `/samples/*` route structure (e.g., `/samples/api`, `/samples/actions`, `/samples/ui`, `/samples/data-fetching`)
- **FR-002**: Template MUST include sample API routes demonstrating GET request handling for each data domain (TODO, User, Product, Blog)
- **FR-003**: Template MUST include sample API routes demonstrating POST request handling with Zod schema validation for each data domain
- **FR-004**: Template MUST include sample server actions with form integration and Zod validation for each data domain
- **FR-005**: Template MUST include sample interactive UI components using shadcn/ui (buttons, forms, dialogs, toasts)
- **FR-006**: Template MUST include examples of server-side data fetching with different rendering strategies (Static for Blog, ISR for Product, Dynamic for TODO/User)
- **FR-007**: Template MUST include examples of client-side data fetching patterns
- **FR-008**: All sample pages MUST include Japanese UI text as per project requirements
- **FR-009**: All sample code MUST follow Next.js 16 and React 19 best practices
- **FR-010**: Template MUST include appropriate error handling examples in all samples

### Key Entities

- **Sample Page**: A demonstration page showing a specific pattern or feature. Attributes: title, description, category, route path
- **API Route**: A route.ts file demonstrating API handling patterns. Attributes: HTTP method(s), request/response format, validation approach
- **Server Action**: A server-side function demonstrating form handling. Attributes: action name, input validation, response handling

### Sample Data Domains

Four mock data domains, each demonstrating a specific Next.js rendering strategy:

- **TODO**: id, title, completed, createdAt - **Dynamic rendering** (frequently changing state, real-time updates)
- **User**: id, name, email, role - **Dynamic rendering** (user-specific, authentication-related)
- **Product**: id, name, price, category, stock - **ISR (Incremental Static Regeneration)** (catalog data, periodic revalidation)
- **Blog Post**: id, title, content, author, publishedAt - **Static rendering** (content rarely changes, build-time generation)

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Developers can clone the template and have a running dev server within 2 minutes
- **SC-002**: All sample pages are accessible and functional without any console errors
- **SC-003**: Each sample API endpoint responds correctly to valid and invalid requests
- **SC-004**: Each server action demonstrates complete form submission flow (submit → validate → feedback)
- **SC-005**: Navigation allows access to any sample page within 2 clicks from the home page
- **SC-006**: Sample code is clear enough that developers can understand patterns without external documentation

## Assumptions

- Developers have Node.js 18+ installed
- Developers have basic familiarity with Next.js concepts
- The template targets developers who want to experiment, not production deployment
- Sample data can be static/mock data (no database required)
- Japanese UI text will be used for labels, messages, and descriptions as per project constitution
- shadcn/ui components will be used for UI samples (copy-paste approach, minimal external dependencies)
- Zod will be used for schema-based validation with TypeScript type inference
