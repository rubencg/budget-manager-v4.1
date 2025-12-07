import { useQuery } from '@tanstack/react-query';
import { useAuth0 } from '@auth0/auth0-react';
import { createCategoriesApi } from '../api-client/apiFactory';
import { Category } from '../api-client';

const fetchCategories = async (
    getAccessTokenSilently: () => Promise<string>,
    type: 'expense' | 'income'
): Promise<Category[]> => {
    const token = await getAccessTokenSilently();
    const api = createCategoriesApi(token);
    if (type === 'expense') {
        return api.apiCategoriesExpenseGet();
    } else {
        return api.apiCategoriesIncomeGet();
    }
};

export const useCategoriesQuery = (type: 'expense' | 'income') => {
    const { getAccessTokenSilently } = useAuth0();

    return useQuery<Category[], Error>({
        queryKey: ['categories', type],
        queryFn: () => fetchCategories(getAccessTokenSilently, type),
        enabled: !!getAccessTokenSilently,
    });
};
