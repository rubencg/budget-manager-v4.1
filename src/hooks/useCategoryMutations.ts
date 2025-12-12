import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth0 } from '@auth0/auth0-react';
import { createCategoriesApi } from '../api-client/apiFactory';
import { CreateCategoryCommand, Category, UpdateCategoryCommand } from '../api-client';

export const useCategoryMutations = () => {
    const { getAccessTokenSilently } = useAuth0();
    const queryClient = useQueryClient();

    const createCategory = useMutation<Category, Error, CreateCategoryCommand>({
        mutationFn: async (command) => {
            const token = await getAccessTokenSilently();
            const api = createCategoriesApi(token);
            return api.apiCategoriesPost({ createCategoryCommand: command });
        },
        onSuccess: (_, variables) => {
            // Invalidate the query for the specific category type to refresh the list
            queryClient.invalidateQueries({
                queryKey: ['categories', variables.categoryType === 0 ? 'expense' : 'income']
            });
        },
    });

    const updateCategory = useMutation<Category, Error, { id: string; command: UpdateCategoryCommand }>({
        mutationFn: async ({ id, command }) => {
            const token = await getAccessTokenSilently();
            const api = createCategoriesApi(token);
            return api.apiCategoriesIdPut({ id, updateCategoryCommand: command });
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ['categories', data.categoryType === 0 ? 'expense' : 'income']
            });
        }
    });

    return {
        createCategory,
        updateCategory
    };
};
