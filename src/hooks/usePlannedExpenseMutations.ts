import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth0 } from '@auth0/auth0-react';
import { CreatePlannedExpenseCommand, UpdatePlannedExpenseCommand } from '../api-client';

export const usePlannedExpenseMutations = () => {
    const { getAccessTokenSilently } = useAuth0();
    const queryClient = useQueryClient();

    const createPlannedExpense = useMutation({
        mutationFn: async (command: CreatePlannedExpenseCommand) => {
            const token = await getAccessTokenSilently();
            const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

            const response = await fetch(`${baseUrl}/api/PlannedExpenses`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(command)
            });

            if (!response.ok) {
                throw new Error('Failed to create planned expense');
            }

            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['planned-expenses'] });
            queryClient.invalidateQueries({ queryKey: ['budgetPlannedExpenses'] });
            queryClient.invalidateQueries({ queryKey: ['budgetOtherExpenses'] });
            queryClient.invalidateQueries({ queryKey: ['budget'] });
        }
    });

    const updatePlannedExpense = useMutation({
        mutationFn: async (command: UpdatePlannedExpenseCommand) => {
            const token = await getAccessTokenSilently();
            const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

            const { plannedExpenseId, ...data } = command;

            const response = await fetch(`${baseUrl}/api/PlannedExpenses/${plannedExpenseId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Failed to update planned expense');
            }

            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['planned-expenses'] });
            queryClient.invalidateQueries({ queryKey: ['budgetPlannedExpenses'] });
            queryClient.invalidateQueries({ queryKey: ['budgetOtherExpenses'] });
            queryClient.invalidateQueries({ queryKey: ['budget'] });
        }
    });

    const deletePlannedExpense = useMutation({
        mutationFn: async (id: string) => {
            const token = await getAccessTokenSilently();
            const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

            const response = await fetch(`${baseUrl}/api/PlannedExpenses/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete planned expense');
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['planned-expenses'] });
            queryClient.invalidateQueries({ queryKey: ['budgetPlannedExpenses'] });
            queryClient.invalidateQueries({ queryKey: ['budgetOtherExpenses'] });
            queryClient.invalidateQueries({ queryKey: ['budget'] });
        }
    });

    return {
        createPlannedExpense,
        updatePlannedExpense,
        deletePlannedExpense
    };
};
