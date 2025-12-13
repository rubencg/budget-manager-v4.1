import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateMonthlyTransactionCommand } from '../api-client';
import { createMonthlyTransactionsApi } from '../api-client/apiFactory';
import { useAuth0 } from '@auth0/auth0-react';

export const useMonthlyTransactionMutations = () => {
    const { getAccessTokenSilently } = useAuth0();
    const queryClient = useQueryClient();

    const createMonthlyTransaction = useMutation({
        mutationFn: async (data: CreateMonthlyTransactionCommand) => {
            const token = await getAccessTokenSilently();
            const api = createMonthlyTransactionsApi(token);
            return await api.apiMonthlyTransactionsPost({ createMonthlyTransactionCommand: data });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['monthly-transactions'] });
        },
    });

    return {
        createMonthlyTransaction,
    };
};
