import { useQuery } from '@tanstack/react-query';
import { useAuth0 } from '@auth0/auth0-react';
import { createBudgetApi } from '../api-client/apiFactory';
import { IncomeAfterFixedExpensesDto } from '../api-client';

const fetchBudget = async (
    getAccessTokenSilently: () => Promise<string>,
    year: number,
    month: number
): Promise<IncomeAfterFixedExpensesDto> => {
    const token = await getAccessTokenSilently();
    const api = createBudgetApi(token);
    return api.apiBudgetIncomeAfterFixedExpensesYearMonthGet({
        year,
        month
    });
};

export const useBudgetQuery = (year: number, month: number) => {
    const { getAccessTokenSilently } = useAuth0();

    return useQuery<IncomeAfterFixedExpensesDto, Error>({
        queryKey: ['budget', year, month],
        queryFn: () => fetchBudget(getAccessTokenSilently, year, month),
        enabled: !!getAccessTokenSilently,
    });
};
