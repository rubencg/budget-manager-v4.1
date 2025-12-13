---
description: Update the frontend API client using OpenAPI Generator
---

This workflow updates the generated TypeScript API client from the running backend's Swagger definition.

**Prerequisites:**
1. Ensure the backend URL is accessible (default: `http://localhost:5023`).

**Steps:**

1. Run the generator command:

// turbo
```bash
npx @openapitools/openapi-generator-cli generate -i http://localhost:5023/swagger/v1/swagger.json -g typescript-fetch -o ./src/api-client --additional-properties=supportsES6=true
```
