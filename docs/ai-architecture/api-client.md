# API Client Architecture & Workflow

## Overview
The frontend communicates with the backend using a generated TypeScript client. This client is generated from the backend's OpenAPI (Swagger) specification.

## 1. Updating the API Client
When the backend API changes (new endpoints, model updates), you generally do not edit `src/api-client` files manually (except for `apiFactory.ts`). Instead, you regenerate them.

**Command to Regenerate:**
```bash
npx @openapitools/openapi-generator-cli generate -i http://localhost:5023/swagger/v1/swagger.json -g typescript-fetch -o ./src/api-client --additional-properties=supportsES6=true
```
*   **-i**: Input URL (Swagger JSON). Ensure your backend is running.
*   **-o**: Output directory.

## 2. API Factory (`src/api-client/apiFactory.ts`)
We use a Factory pattern to instantiate API classes. This creates a centralized place to inject configuration (like the Base URL and Auth Token).

**Pattern:**
*   Do **NOT** instantiate `Api` classes (e.g., `TransactionsApi`) directly in your components or hooks.
*   Use/Create a factory method in `src/api-client/apiFactory.ts`.

**Example:**
```typescript
// src/api-client/apiFactory.ts
export const createTransactionsApi = (accessToken: string) => {
    const config = new Configuration({
        basePath: getApiBasePath(),
        accessToken: accessToken,
    });
    return new TransactionsApi(config);
};
```

**Adding a New API:**
If a new controller is added to the backend (e.g., `ReportsController`), the generator will create a `ReportsApi`. You must manually add a factory method for it in `apiFactory.ts`.
