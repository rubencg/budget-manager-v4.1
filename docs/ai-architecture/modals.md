# Modal & Form Guidelines

This document outlines the standard architecture for creating modals and forms in the application. Follow these patterns to ensure consistency in UX, state management, and data handling.

## 1. Component Structure

Modals should be isolated components that accept at least `isOpen` and `onClose` props.

### Standard Props Interface
```typescript
interface EntityModalProps {
    isOpen: boolean;
    onClose: () => void;
    entity?: EntityType; // Optional: For "Edit" mode
    // ...other helper data (e.g. accounts list)
}
```

### State Management
Use local `useState` for form fields. Sync state with props using `useEffect`.

**Pattern:**
```typescript
const [name, setName] = useState('');

useEffect(() => {
    if (isOpen) {
        if (entity) {
             // Edit Mode: Populate fields
            setName(entity.name);
        } else {
            // Create Mode: Reset fields
            setName('');
        }
    }
}, [isOpen, entity]);
```

## 2. API Interaction (Hooks)

Do **not** make API calls directly in the component. Use custom hooks that wrap TanStack Query mutations.

### Hook Usage
1.  Import the mutation hook (e.g., `useAccountMutations`, `useTransactionMutations`).
2.  Destructure the `create` and `update` mutation functions.
3.  Use derived state for loading (`isPending`).

```typescript
const { createEntity, updateEntity } = useEntityMutations();
const isSaving = createEntity.isPending || updateEntity.isPending;
```

### Handle Submit
Create a `handleSubmit` function that:
1.  Validates the form (or relies on `disabled` button state).
2.  Constructs the payload object.
3.  Checks if it's "Create" or "Update" based on the existence of the entity prop/ID.
4.  Calls `mutateAsync`.
5.  Closes the modal on success (`onClose()`).
6.  Catches errors (optionally validation errors).

```typescript
const handleSubmit = async () => {
    try {
        const payload = { name, ...otherFields };
        
        if (entity && entity.id) {
            await updateEntity.mutateAsync({ id: entity.id, ...payload });
        } else {
            await createEntity.mutateAsync(payload);
        }
        onClose();
    } catch (error) {
        console.error('Failed to save:', error);
    }
};
```

## 3. UI Guidelines

### Layout
*   Use the `Modal` wrapper component.
*   Title should dynamically change: `'Nueva cuenta'` vs `'Editar cuenta'`.
*   Form fields should stack vertically or use flexbox for side-by-side.

### Actions (Buttons)
*   Place actions at the bottom right.
*   **Cancel**: `variant="secondary"`, closes modal.
*   **Save**: `variant="primary"`.
    *   **Text**: "GUARDAR" / "ACTUALIZAR" (Normal) vs "GUARDANDO..." (Loading).
    *   **Disabled State**: When form is invalid OR `isSaving` is true.

### Validation
*   Compute `isValid` as a boolean derived from state.
*   Disable the primary button if `!isValid`.

```typescript
const isValid = name.trim().length > 0 && amount > 0;

<Button 
    disabled={!isValid || isSaving} 
    onClick={handleSubmit} 
    variant="primary"
>
    {isSaving ? 'GUARDANDO...' : 'GUARDAR'}
</Button>
```
