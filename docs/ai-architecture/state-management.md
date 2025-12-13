# State Management (TanStack Query)

## Overview
We use **TanStack Query (React Query)** for server state management.

## Architecture Pattern
We do **not** use `useQuery` or `useMutation` directly in UI components. Instead, we encapsulate them in custom hooks located in `src/hooks/`.

### 1. Naming Convention
*   **Queries**: `use[Resource]Query` (e.g., `useTransactionsQuery`, `useAccountsQuery`).
*   **Mutations**: `use[Resource]Mutations` (e.g., `useTransactionMutations`, `useAccountMutations`).

### 2. Query Hook Component
A typical query hook abstracts the key generation and API call.

```typescript
// src/hooks/useDataQuery.ts
export const useDataQuery = (param) => {
    const { getAccessTokenSilently } = useAuth0();
    
    return useQuery({
        queryKey: ['resource', param],
        queryFn: async () => {
            const token = await getAccessTokenSilently();
            // Use Factory to get client
            const api = createResourceApi(token); 
            return await api.callEndpoint(param);
        }
    });
};
```

### 3. Mutation Hook & Invalidation
Mutations are grouped in a single hook per resource. Crucially, successful mutations should **invalidate** relevant query keys to ensure the UI updates automatically.

```typescript
// src/hooks/useDataMutations.ts
export const useDataMutations = () => {
    const queryClient = useQueryClient();
    const { getAccessTokenSilently } = useAuth0();

    const createItem = useMutation({
        mutationFn: async (input) => { /* ... */ },
        onSuccess: () => {
            // TRIGGERS RE-FETCH
            queryClient.invalidateQueries({ queryKey: ['resource'] });
        }
    });

    return { createItem };
}
```
