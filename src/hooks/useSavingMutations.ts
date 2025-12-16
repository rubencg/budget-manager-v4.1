import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth0 } from '@auth0/auth0-react';
import { SavingsApi, CreateSavingCommand, CreateSavingCommandToJSON, UpdateSavingCommand, UpdateSavingCommandToJSON } from '../api-client';
import { Configuration } from '../api-client';

export const useSavingMutations = () => {
    const { getAccessTokenSilently } = useAuth0();
    const queryClient = useQueryClient();

    const getApi = async () => {
        const token = await getAccessTokenSilently();
        const config = new Configuration({
            basePath: import.meta.env.VITE_API_URL || 'http://localhost:5000',
            accessToken: token,
        });
        return new SavingsApi(config);
    };

    const createSaving = useMutation({
        mutationFn: async (command: CreateSavingCommand) => {
            const api = await getApi();
            return api.apiSavingsPost({
                createSavingCommand: command
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['accounts'] });
            queryClient.invalidateQueries({ queryKey: ['savings'] });
            queryClient.invalidateQueries({ queryKey: ['budget'] });
        }
    });

    const updateSaving = useMutation({
        mutationFn: async ({ id, command }: { id: string; command: UpdateSavingCommand }) => {
            const api = await getApi();
            return api.apiSavingsIdPut({
                id,
                updateSavingCommand: command
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['savings'] });
            queryClient.invalidateQueries({ queryKey: ['accounts'] });
            queryClient.invalidateQueries({ queryKey: ['budget'] });
        }
    });

    const deleteSaving = useMutation({
        mutationFn: async (id: string) => {
            const api = await getApi();
            return api.apiSavingsIdDelete({ id });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['savings'] });
            queryClient.invalidateQueries({ queryKey: ['accounts'] });
            queryClient.invalidateQueries({ queryKey: ['budget'] });
        }
    });

    return {
        createSaving,
        updateSaving,
        deleteSaving
    };
};
