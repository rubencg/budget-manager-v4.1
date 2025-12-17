import { useQuery } from '@tanstack/react-query';
import { useAuth0 } from '@auth0/auth0-react';
import { createBudgetApi } from '../api-client/apiFactory';
import { PlannedExpensesResponseDto } from '../api-client';

export const useBudgetPlannedExpensesQuery = (year: number, month: number) => {
    const { getAccessTokenSilently } = useAuth0();

    return useQuery<PlannedExpensesResponseDto, Error>({
        queryKey: ['budgetPlannedExpenses', year, month],
        queryFn: async () => {
            const token = await getAccessTokenSilently();
            const api = createBudgetApi(token);
            return api.apiBudgetPlannedExpensesYearMonthGet({ year, month });
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};
