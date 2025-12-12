import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth0 } from '@auth0/auth0-react';
import { Account } from '../types';

interface CreateAccountCommand {
    name: string;
    currentBalance: number;
    accountType: { name: string };
    color: string;
    isArchived: boolean;
    image: string;
    sumsToMonthlyBudget: boolean;
}

interface UpdateAccountCommand extends CreateAccountCommand {
    id: string;
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

    const updateAccount = useMutation({
        mutationFn: async (command: UpdateAccountCommand) => {
            const token = await getAccessTokenSilently();
            const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

            const { id, ...accountData } = command;

            const response = await fetch(`${baseUrl}/api/Accounts/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(accountData)
            });

            if (!response.ok) {
                throw new Error('Failed to update account');
            }

            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['accounts'] });
        }
    });

    const archiveAccount = useMutation({
        mutationFn: async (account: Account) => {
            const token = await getAccessTokenSilently();
            const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

            const accountData = {
                name: account.name,
                currentBalance: account.currentBalance,
                accountType: account.accountType,
                color: account.color,
                isArchived: true,
                image: account.image,
                sumsToMonthlyBudget: account.sumsToMonthlyBudget
            };

            const response = await fetch(`${baseUrl}/api/Accounts/${account.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(accountData)
            });

            if (!response.ok) {
                throw new Error('Failed to archive account');
            }

            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['accounts'] });
        }
    });

    return {
        createAccount,
        updateAccount,
        archiveAccount
    };
};
