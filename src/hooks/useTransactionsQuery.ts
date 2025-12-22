import { useQuery } from '@tanstack/react-query';
import { useAuth0 } from '@auth0/auth0-react';
import { createTransactionsApi } from '../api-client/apiFactory';

const fetchTransactions = async (
    getAccessTokenSilently: () => Promise<string>,
    year: number,
    month: number,
    pageNumber?: number,
    pageSize?: number,
    searchText?: string
) => {
    const token = await getAccessTokenSilently();
    const transactionsApi = createTransactionsApi(token);
    const response = await transactionsApi.apiTransactionsMonthYearMonthGet({
        year,
        month,
        pageNumber,
        pageSize,
        searchText
    });
    return response;
};

export const useTransactionsQuery = (year: number, month: number, pageNumber?: number, pageSize?: number, searchText?: string) => {
    const { getAccessTokenSilently } = useAuth0();

    return useQuery({
        queryKey: ['transactions', year, month, pageNumber, pageSize, searchText],
        queryFn: () => fetchTransactions(getAccessTokenSilently, year, month, pageNumber, pageSize, searchText),
        staleTime: 1000 * 60 * 5, // 5 minutes
        enabled: !!getAccessTokenSilently,
    });
};
