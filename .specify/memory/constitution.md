<!--
  ============================================================================
  SYNC IMPACT REPORT
  ============================================================================
  Version change: N/A → 1.0.0 (Initial ratification)

  Modified principles: N/A (Initial creation)

  Added sections:
  - Core Principles (5 principles)
  - Technology Standards
  - Development Workflow
  - Governance

  Removed sections: N/A (Initial creation)

  Templates requiring updates:
  - ✅ plan-template.md (Compatible - uses generic Constitution Check)
  - ✅ spec-template.md (Compatible - technology-agnostic)
  - ✅ tasks-template.md (Compatible - structure-agnostic with path conventions)

  Follow-up TODOs: None
  ============================================================================
-->

# Next.js 16 Template Constitution

## Core Principles

### I. App Router First

All routing MUST use the Next.js App Router. Pages Router is prohibited except for documented migration paths.

- Route segments MUST be defined in `app/` directory
- Layouts MUST be used for shared UI across routes
- Loading and error boundaries MUST be co-located with their segments
- Parallel routes and intercepting routes SHOULD be used for complex UI patterns

**Rationale**: App Router is the future of Next.js, providing better performance, simpler data fetching, and improved DX. Consistency in routing patterns reduces cognitive overhead.

### II. Server Components by Default

React Server Components (RSC) MUST be the default rendering strategy. Client Components MUST be explicitly marked and minimized.

- Components are Server Components unless marked with `'use client'`
- Client Components MUST only be used for: interactivity, browser APIs, hooks that use state/effects
- Data fetching MUST occur in Server Components using `async/await`
- The `'use client'` directive MUST be placed at the minimal component boundary

**Rationale**: Server Components reduce JavaScript bundle size, improve initial load performance, and enable direct backend access. Minimizing Client Components keeps the application fast.

### III. Type Safety Non-Negotiable

TypeScript MUST be used throughout the codebase with strict mode enabled. No `any` types except in documented exceptional cases.

- `strict: true` MUST be enabled in `tsconfig.json`
- All function parameters and return types MUST be explicitly typed
- Zod or similar runtime validation MUST be used for external data (API responses, form inputs)
- Type assertions (`as`) SHOULD be avoided; use type guards instead

**Rationale**: Type safety catches errors at compile time, improves IDE support, and serves as documentation. Runtime validation ensures data integrity at system boundaries.

### IV. Clean & Modular Architecture

Code MUST be organized into clear, single-responsibility modules. Avoid premature abstraction but maintain separation of concerns.

- Components MUST be small and focused (< 200 lines as guideline)
- Business logic MUST be separated from UI components
- Shared utilities MUST be placed in `lib/` or `utils/`
- Feature-based organization SHOULD be used for complex features
- YAGNI principle: Build only what is needed now

**Rationale**: Modular code is easier to test, maintain, and refactor. Clear boundaries enable parallel development and reduce merge conflicts.

### V. Performance by Design

Performance MUST be considered from the start, not as an afterthought. Use Next.js built-in optimizations.

- Images MUST use `next/image` with appropriate sizing
- Fonts MUST use `next/font` for optimization
- Dynamic imports SHOULD be used for heavy components
- Metadata MUST be defined using the Metadata API
- Core Web Vitals targets: LCP < 2.5s, FID < 100ms, CLS < 0.1

**Rationale**: Users expect fast experiences. Next.js provides powerful optimization tools that MUST be utilized rather than implementing custom solutions.

## Technology Standards

### Required Stack

- **Framework**: Next.js 16+ with App Router
- **Language**: TypeScript 5+ with strict mode
- **React**: React 19+
- **Styling**: Tailwind CSS 4+
- **Linting/Formatting**: Biome (unified linter and formatter)

### Prohibited Patterns

- Pages Router for new routes (except documented migrations)
- CSS-in-JS libraries that don't support RSC
- `getServerSideProps`, `getStaticProps` (use App Router patterns)
- Untyped `fetch` calls without validation
- Inline styles except for truly dynamic values

### Recommended Additions

- Zod for schema validation
- React Hook Form for complex forms
- Tanstack Query for client-side data fetching (when needed)
- next-safe-action for type-safe server actions

## Development Workflow

### Code Quality Gates

1. **Type Check**: `tsc --noEmit` MUST pass
2. **Lint**: `biome check` MUST pass with no errors
3. **Format**: `biome format` MUST be applied
4. **Build**: `next build` MUST complete without errors

### Commit Standards

- Commits SHOULD be atomic and focused
- Commit messages SHOULD follow Conventional Commits format
- Breaking changes MUST be documented in commit body

### Review Requirements

- All changes MUST pass automated checks before review
- UI changes SHOULD include screenshots or recordings
- Performance-impacting changes MUST include before/after metrics

## Governance

This constitution supersedes all other development practices for this project. Amendments require:

1. Documented rationale for the change
2. Assessment of impact on existing code
3. Migration plan if breaking changes are introduced
4. Version increment following semantic versioning

**Versioning Policy**:
- MAJOR: Backward-incompatible principle changes or removals
- MINOR: New principles or significant clarifications
- PATCH: Typo fixes, wording improvements, non-semantic changes

**Compliance**: All pull requests and code reviews MUST verify compliance with these principles. Violations require documented justification in the PR description.

**Version**: 1.0.0 | **Ratified**: 2025-11-27 | **Last Amended**: 2025-11-27
