# Architecture Overview

## Guidelines for AI Developer Agents
This folder contains the architectural guidelines for the **Budget Manager** frontend. Please refer to these documents before creating new features or refactoring code.

## Key Documentation
*   [**API Client & Generation**](./api-client.md): How to regenerate the API client and use the `apiFactory`.
*   [**State Management**](./state-management.md): Patterns for `src/hooks`, TanStack Query, and Cache Invalidation.
*   [**Authentication**](./authentication.md): How Auth0 is integrated into the API calls.

## Directory Structure
*   `src/api-client`: **Generated code**. Do not touch except `apiFactory.ts`.
*   `src/components`: UI components.
    *   `src/components/ui`: Generic, reusable UI (Buttons, Modals, Inputs).
    *   `src/components/[feature]`: Feature-specific components (Transactions, Accounts).
*   `src/hooks`: **Business Logic**. Wrappers for TanStack Query.
*   `src/pages`: Top-level Route components.
*   `src/types`: Shared TypeScript definitions (that aren't in api-client).

## General Rules
1.  **Strict Typing**: Use TypeScript interfaces for all props and data. Use generated types from `src/api-client` whenever possible.
2.  **Modular CSS**: Use global CSS variables (`src/styles/global.css`) for colors and spacing. Avoid inline styles for complex layouts.
3.  **Proactive State Updates**: Always invalidate queries after a mutation to keep the UI fresh.
