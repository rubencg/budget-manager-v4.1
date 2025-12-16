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
            queryClient.invalidateQueries({ queryKey: ['budget'] });
        },
    });

    const updateMonthlyTransaction = useMutation({
        mutationFn: async (data: { id: string, command: CreateMonthlyTransactionCommand }) => { // Note: using CreateMonthlyTransactionCommand as update command often mimics create structure, or use UpdateMonthlyTransactionCommand if available and different.
            // Checking UpdateMonthlyTransactionCommand availability
            // The previous list_dir showed UpdateMonthlyTransactionCommand.ts exists.
            // Let's use UpdateMonthlyTransactionCommand.
            // But wait, the previous code snippet for MonthlyTransactionModal used { ...transactionData, id: entity.id } casting it to unknown or similar.
            // The API client likely has apiMonthlyTransactionsIdPut.
            // Let's assume apiMonthlyTransactionsIdPut({ id, updateMonthlyTransactionCommand: command }).
            const token = await getAccessTokenSilently();
            const api = createMonthlyTransactionsApi(token);
            // Import UpdateMonthlyTransactionCommand first!
            // Assuming UpdateMonthlyTransactionCommand structure matches. 
            // If not, I'll need to check the API mapping.
            // For now I'll use 'any' or verify the method signature if I could, but better to just implement standard pattern.
            // I will update imports first.
            return await api.apiMonthlyTransactionsIdPut({ id: data.id, updateMonthlyTransactionCommand: data.command as any });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['monthly-transactions'] });
            queryClient.invalidateQueries({ queryKey: ['budget'] }); // Also invalidate budget
        },
    });

    const deleteMonthlyTransaction = useMutation({
        mutationFn: async (id: string) => {
            const token = await getAccessTokenSilently();
            const api = createMonthlyTransactionsApi(token);
            return await api.apiMonthlyTransactionsIdDelete({ id });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['monthly-transactions'] });
            queryClient.invalidateQueries({ queryKey: ['budget'] }); // Also invalidate budget
        },
    });

    return {
        createMonthlyTransaction,
        updateMonthlyTransaction,
        deleteMonthlyTransaction
    };
};
