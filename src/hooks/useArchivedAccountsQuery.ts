import { useQuery } from '@tanstack/react-query';
import { useAuth0 } from '@auth0/auth0-react';
import { Account } from '../types';
import { PaginatedResponse } from '../types/pagination';

interface ArchivedAccountsParams {
    pageNumber: number;
    pageSize: number;
    sortBy?: string;
    sortDirection?: 'asc' | 'desc';
}

const fetchArchivedAccounts = async (
    getAccessTokenSilently: () => Promise<string>,
    params: ArchivedAccountsParams
): Promise<PaginatedResponse<Account>> => {
    const token = await getAccessTokenSilently();
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    const queryParams = new URLSearchParams({
        pageNumber: params.pageNumber.toString(),
        pageSize: params.pageSize.toString(),
    });

    if (params.sortBy) {
        queryParams.append('sortBy', params.sortBy);
    }
    if (params.sortDirection) {
        queryParams.append('sortDirection', params.sortDirection);
    }

    const response = await fetch(`${baseUrl}/api/Accounts/archived?${queryParams}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    return response.json();
};

export const useArchivedAccountsQuery = (params: ArchivedAccountsParams) => {
    const { getAccessTokenSilently, isLoading } = useAuth0();

    return useQuery<PaginatedResponse<Account>, Error>({
        queryKey: ['accounts', 'archived', params],
        queryFn: () => fetchArchivedAccounts(getAccessTokenSilently, params),
        enabled: !isLoading && !!getAccessTokenSilently,
    });
};
