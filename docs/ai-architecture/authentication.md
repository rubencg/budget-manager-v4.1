# Authentication (Auth0)

## Overview
Authentication is handled via **Auth0** using the `@auth0/auth0-react` library.

## Usage in Architecture

### 1. Getting the Token
We use the `getAccessTokenSilently` method to retrieve a Bearer token for API calls. This is typically done **inside** the custom hooks (see [State Management](./state-management.md)).

```typescript
const { getAccessTokenSilently } = useAuth0();
const token = await getAccessTokenSilently();
```

### 2. Passing to API Headers
This token is passed to the `apiFactory` methods, which configure the OpenAPI `Configuration` object to include the token in the `Authorization` header (`Bearer <token>`).

### 3. Login/Logout
Login and Logout flows are handled by Auth0's `loginWithRedirect` and `logout` methods, usually triggered from `src/components/layout/Header.tsx` or a specific Login page.
