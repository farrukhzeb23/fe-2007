import { useQuery } from '@tanstack/react-query';
import { getGist } from '../api/gist.api';
import { Gist } from '../types';

export const useGetGist = (id: string) => {
  return useQuery<Gist>({
    queryKey: ['gist', id],
    queryFn: () => getGist(id),
    enabled: !!id, // Only run the query if we have an ID
  });
};
