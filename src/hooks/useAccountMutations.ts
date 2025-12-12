import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth0 } from '@auth0/auth0-react';

interface CreateAccountCommand {
    name: string;
    currentBalance: number;
    accountType: { name: string };
    color: string;
    isArchived: boolean;
    image: string;
    sumsToMonthlyBudget: boolean;
}

export const useAccountMutations = () => {
    const { getAccessTokenSilently } = useAuth0();
    const queryClient = useQueryClient();

    const createAccount = useMutation({
        mutationFn: async (command: CreateAccountCommand) => {
            const token = await getAccessTokenSilently();
            const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

            const response = await fetch(`${baseUrl}/api/Accounts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(command)
            });

            if (!response.ok) {
                throw new Error('Failed to create account');
            }

            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['accounts'] });
        }
    });

    return {
        createAccount
    };
};
