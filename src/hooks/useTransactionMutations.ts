import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth0 } from '@auth0/auth0-react';

interface CreateTransferCommand {
    transactionType: number;
    amount: number;
    date: string;
    fromAccountId: string;
    fromAccountName: string;
    toAccountId: string;
    toAccountName: string;
    notes: string;
    isApplied: boolean;
}

export const useTransactionMutations = () => {
    const { getAccessTokenSilently } = useAuth0();
    const queryClient = useQueryClient();

    const createTransfer = useMutation({
        mutationFn: async (command: CreateTransferCommand) => {
            const token = await getAccessTokenSilently();
            const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

            const response = await fetch(`${baseUrl}/api/Transactions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(command)
            });

            if (!response.ok) {
                throw new Error('Failed to create transfer');
            }

            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['accounts'] });
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
            queryClient.invalidateQueries({ queryKey: ['budgetPlannedExpenses'] });
        }
    });

    const createTransaction = useMutation({
        mutationFn: async (command: any) => {
            const token = await getAccessTokenSilently();
            const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

            const response = await fetch(`${baseUrl}/api/Transactions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(command)
            });

            if (!response.ok) {
                throw new Error('Failed to create transaction');
            }

            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['accounts'] });
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
            queryClient.invalidateQueries({ queryKey: ['dashboard'] });
            queryClient.invalidateQueries({ queryKey: ['budgetPlannedExpenses'] });
        }
    });

    const deleteTransaction = useMutation({
        mutationFn: async (id: string) => {
            const token = await getAccessTokenSilently();
            const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

            const response = await fetch(`${baseUrl}/api/Transactions/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete transaction');
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['accounts'] });
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
            queryClient.invalidateQueries({ queryKey: ['dashboard'] });
            queryClient.invalidateQueries({ queryKey: ['budgetPlannedExpenses'] });
        }
    });

    const updateTransaction = useMutation({
        mutationFn: async ({ id, ...data }: { id: string } & any) => {
            const token = await getAccessTokenSilently();
            const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

            const response = await fetch(`${baseUrl}/api/Transactions/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Failed to update transaction');
            }

            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['accounts'] });
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
            queryClient.invalidateQueries({ queryKey: ['dashboard'] });
        }
    });

    return {
        createTransfer,
        createTransaction,
        deleteTransaction,
        updateTransaction
    };
};
