# Project Knowledge Base

## 1. Architectural Overview

- **Architectural Approach**: Strict **Feature-Sliced Design (FSD)**.
- **Decomposition Principle**: Layered architecture with strict vertical slicing (slices) and horizontal segmentation (segments).
- **Layer Responsibility**:
  - **App**: Global providers, routing, store initialization.
  - **Pages**: Composition of widgets into routes.
  - **Widgets**: Composition of features and entities into standalone UI blocks.
  - **Features**: User scenarios and business logic.
  - **Entities**: Business domain models (data, logic, visual representation, converters).
  - **Shared**: Reusable infrastructure code (UI kit, API, config, lib) with NO business logic.
- **Dependency Direction**: Unidirectional strict flow: `App -> Pages -> Widgets -> Features -> Entities -> Shared`.
- **Infrastructure**: `Shared` layer constitutes the infrastructure (API clients, I18n setup, UI primitives).

## 2. Folder Structure Rules

### Universal Rules
- **Public/Private Zones**: 
  - Cross-imports between slices of the same layer are strictly **forbidden** (e.g., `features/auth` cannot import `features/cart`).
  - Only `shared` layer allows cross-module usage (as it is a toolkit, not a domain layer).
- **Nesting**: Max depth of 2-3 levels for organizational folders within slices.

### Layer Specifics
- **`src/app`**: Root configuration only. CANNOT be imported by any other layer.
- **`src/pages`**: Flat structure or grouped by route. Each page must map to a route.
- **`src/widgets`**: "Smart" blocks. Must act as the primary interface for pages.
- **`src/features`**: Action-based components (e.g., `AddToOrder`, `SearchTours`).
- **`src/entities`**: Data-centric modules. STRICTLY separated by domain (e.g., `tour`, `user`, `finance`).
  - Large entities (e.g., `tour`) are split into sub-concepts (segments) like `tour/catalog`, `tour/order`.
- **`src/shared`**: atomic resources.
  - `ui`: generic UI components (Shadcn UI).
  - `api`: base API configuration.
  - `config`: global configs (i18n, env).

## 3. Design Principles

- **Separation of Models**: Strict separation between Backend Models (DTOs) and Frontend Domain Models.
- **Anti-Corruption Layer**: **Mandatory**. Data never flows from API to UI directly.
- **Explicit over Implicit**: Explicit mappers (converters) are used instead of auto-mapping.
- **Type Safety**: No `any`. Strict TS configurations. Zod usage for runtime validation (forms).

## 4. Core Patterns

- **State Management**: 
  - **Server State**: Managed via RTK Query (`base.api.ts`).
  - **Client State**: Redux Toolkit (slices) for global UI state; `useState` for local component state.
- **Data Fetching**: RTK Query endpoints defined in `api` segments of entities/features.
- **Converter Pattern**: Every entity fetching data MUST have a `*.converters.ts` file to transform `BackendType` -> `FrontendType`.
- **UI Patterns**:
  - **Composition**: Widgets compose Features and Entities.
  - **Presentational/Container**: Entities provide presentation; Features provide interactivity.

## 5. State & Data Flow

- **Single Source of Truth**: The Redux Store (`src/app/providers/store`).
- **Data Flow**: `API -> RTK Query -> Converter -> Store/Component -> UI`.
- **Contracts**:
  - Backend types are suffixed with `Backend` (e.g., `ITourBackend`).
  - Frontend types are pure domain names (e.g., `ITourCard`).

## 6. UI Architecture

- **Library**: React + TailwindCSS + Radix Primitives (Shadcn UI).
- **Component Location**:
  - Generic/Atomic -> `src/shared/ui` (buttons, inputs).
  - Domain Specific -> `src/entities/{entity}/ui`.
  - Feature Specific -> `src/features/{feature}/ui`.
- **Styling**: Utility-first CSS (Tailwind).
- **Icons**: Lucide React.

## 7. Entity Layer Rules

- **Definition**: An Entity represents a distinct business domain object (Tour, User, Invoice).
- **Structure**:
  - `api/`: RTK Query endpoints.
  - `model/`: Slices, selectors, types.
  - `ui/`: Visual representation components.
  - `converters/`: Data transformation logic.
  - `types/`: TS definitions.
- **Constraints**:
  - Entities **cannot** import other entities.
  - Entities **cannot** contain business logic involving multiple domains (that belongs in Features/Widgets).

## 8. TypeScript Typing Strategy

- **Interfaces**: Used for data shapes and objects.
  - Naming: **PascalCase** with **I** prefix (e.g., `ITourCard`).
- **Types**: Used for unions, aliases, and complex utility types.
  - Naming: **PascalCase** with **T** prefix (e.g., `TStatus`).
- **Enums**: Used for fixed sets of values.
  - Naming: **UPPER_CASE** with **ENUM_** prefix (e.g., `ENUM_TOUR_STATUS_TYPE`).
- **Location**:
  - Shared types -> `src/shared/types`.
  - Entity types -> `src/entities/{entity}/{segment}/types`.

## 9. Data Converters & Anti-Corruption Layer

- **Mandatory Requirement**: API responses MUST undergo transformation.
- **Naming**: `*.converters.ts`.
- **Logic**:
  - Transform `snake_case` (backend) to `camelCase` (frontend).
  - Format dates/currencies.
  - Resolve enums.
  - Filter unused fields.
- **Functions**: `map{Entity}ToFrontend`, `map{Entity}ToBackend`.

## 10. Localization (i18n) Architecture

- **Engine**: i18next + react-i18next + i18next-http-backend.
- **Loading Strategy**: Dynamic loading via logic in `src/shared/config/i18n/i18n.init.ts`.
- **Key Storage**: `public/locales/{lang}/{namespace}.json`.
- **Usage**:
  - Configuration in `src/shared/config/i18n`.
  - Keys MUST be typed/checked via specialized helpers if available.

## 11. ESLint & Code Style as Architecture

- **Linter**: ESLint 9 with `eslint-plugin-boundaries`.
- **Key Rules**:
  - `'boundaries/element-types'`: Enforces FSD layers.
  - `'boundaries/no-private'`: Enforces slice isolation.
  - `'unicorn/filename-case'`: Enforces `kebab-case` for files.
  - `'@typescript-eslint/naming-convention'`: Enforces `I`/`T`/`ENUM_` prefixes.
- **Filename Convention**: `kebab-case` maps to resource type (e.g., `user.service.ts`).

## 12. Project Invariants

- ✅ **Strict FSD Compliance**: No bypassing layer rules.
- ✅ **Typed Data Flow**: API data is NEVER used directly in UI without a declared type and converter.
- ✅ **Kebab-Case Files**: All files must be `kebab-case`.
- ✅ **Named Exports**: Prefer named exports over default exports (except for lazy loaded pages/components where necessary).
- ✅ **Tailwind Styling**: No CSS modules or inline styles unless completely unavoidable.
- ❌ **Forbidden**:
  - Importing `features` into `entities`.
  - Circular dependencies between slices.
  - `any` type usage.
  - Direct API calls in components (must use hooks/slices).
