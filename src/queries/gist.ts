import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createGist, forkGist, getGist, getGists, getUserGists, starGist } from '../api/gist.api';
import { CreateGist, Gist } from '../types';

export const useCreateGist = () => {
  return useMutation({
    mutationFn: (data: CreateGist) => createGist(data),
    mutationKey: ['create-gist'],
  });
};

export const useForkGist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (gistId: string) => forkGist(gistId),
    mutationKey: ['fork-gist'],
    onMutate: async (gistId) => {
      // Optimistically update the cache
      await queryClient.cancelQueries({ queryKey: ['gist', gistId] });
      const previousGist = queryClient.getQueryData<Gist>(['gist', gistId]);

      if (previousGist) {
        // Create a placeholder fork entry with a temporary ID
        const tempForkEntry = {
          id: `temp-${Date.now()}`,
          url: '',
          user: null,
          created_at: new Date().toISOString(),
        };

        queryClient.setQueryData<Gist>(['gist', gistId], {
          ...previousGist,
          // Add a new temporary fork entry to the existing forks array
          forks: [...(previousGist.forks || []), tempForkEntry],
        });
      }
      return { previousGist, gistId };
    },
    onSettled: async (_newGist, _error, _variables, context) => {
      if (!context?.gistId) return;
      // Whether successful or not, invalidate the query to ensure data consistency
      await queryClient.invalidateQueries({ queryKey: ['gist', context.gistId] });
      await queryClient.invalidateQueries({ queryKey: ['gists'] });
    },
  });
};

export const useGetGist = (id: string) => {
  return useQuery<Gist>({
    queryKey: ['gist', id],
    queryFn: () => getGist(id),
    enabled: !!id, // Only run the query if we have an ID
  });
};

export const useGetGists = (page: number = 1, perPage: number = 14) => {
  return useQuery<Gist[]>({
    queryKey: ['gists', page, perPage],
    queryFn: () => getGists({ page, per_page: perPage }),
  });
};

export const useGetUserGists = (page: number = 1, perPage: number = 14) => {
  return useQuery<Gist[]>({
    queryKey: ['user-gists', page, perPage],
    queryFn: () => getUserGists({ page, per_page: perPage }),
  });
};

export const useStarGist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (gistId: string) => starGist(gistId),
    mutationKey: ['star-gist'],
    onMutate: async (gistId) => {
      // Optimistically update the cache
      await queryClient.cancelQueries({ queryKey: ['gist', gistId] });
      const previousGist = queryClient.getQueryData<Gist>(['gist', gistId]);

      if (previousGist) {
        // Create a placeholder star entry with a temporary ID
        const tempStarEntry = {
          id: `temp-${Date.now()}`,
          url: '',
          user: null,
          starred_at: new Date().toISOString(),
        };

        queryClient.setQueryData<Gist>(['gist', gistId], {
          ...previousGist,
          // Add a new temporary star entry to the existing stars array
          forks: [...(previousGist.forks || []), tempStarEntry],
        });
      }
      return { previousGist, gistId };
    },
    onSettled: async (_newGist, _error, _variables, context) => {
      if (!context?.gistId) return;
      // Whether successful or not, invalidate the query to ensure data consistency
      await queryClient.invalidateQueries({ queryKey: ['gist', context.gistId] });
      await queryClient.invalidateQueries({ queryKey: ['gists'] });
    },
  });
};
