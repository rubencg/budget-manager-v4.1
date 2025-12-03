import { useQuery } from '@tanstack/react-query';
import { useAuth0 } from '@auth0/auth0-react';
import { createDashboardApi } from '../api-client/apiFactory';
import { GetDashboardQueryResult } from '../api-client';

const fetchDashboardData = async (
    getAccessTokenSilently: () => Promise<string>,
    year: number,
    month: number
): Promise<GetDashboardQueryResult> => {
    const token = await getAccessTokenSilently();
    const dashboardApi = createDashboardApi(token);
    const response = await dashboardApi.apiDashboardGet({ year, month });
    return response;
};

export const useDashboardQuery = () => {
    const { getAccessTokenSilently } = useAuth0();
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // getMonth() is 0-indexed

    return useQuery<GetDashboardQueryResult, Error>({
        queryKey: ['dashboardData', year, month],
        queryFn: () => fetchDashboardData(getAccessTokenSilently, year, month),
        enabled: !!getAccessTokenSilently, // Ensure the query doesn't run until the auth client is ready
    });
};
