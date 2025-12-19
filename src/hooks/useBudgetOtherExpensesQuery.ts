import { useQuery } from '@tanstack/react-query';
import { useAuth0 } from '@auth0/auth0-react';
import { createBudgetApi } from '../api-client/apiFactory';
import { OtherExpensesResponseDto } from '../api-client';

export const useBudgetOtherExpensesQuery = (year: number, month: number) => {
    const { getAccessTokenSilently } = useAuth0();

    return useQuery<OtherExpensesResponseDto, Error>({
        queryKey: ['budgetOtherExpenses', year, month],
        queryFn: async () => {
            const token = await getAccessTokenSilently();
            const api = createBudgetApi(token);
            return api.apiBudgetOtherExpensesYearMonthGet({ year, month });
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};
