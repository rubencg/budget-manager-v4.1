import { useQuery } from '@tanstack/react-query';
import { useAuth0 } from '@auth0/auth0-react';
import { AccountGroup } from '../types';

const fetchAccountsDashboard = async (
    getAccessTokenSilently: () => Promise<string>
): Promise<AccountGroup[]> => {
    const token = await getAccessTokenSilently();
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    const response = await fetch(`${baseUrl}/api/Accounts/dashboard`, {
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

export const useAccountsQuery = () => {
    const { getAccessTokenSilently, isLoading } = useAuth0();

    return useQuery<AccountGroup[], Error>({
        queryKey: ['accounts', 'dashboard'],
        queryFn: () => fetchAccountsDashboard(getAccessTokenSilently),
        enabled: !isLoading && !!getAccessTokenSilently,
    });
};
