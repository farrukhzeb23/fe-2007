import { useQuery } from '@tanstack/react-query';
import { Gist } from '../types';
import { getGists } from '../api/gist.api';

export const useGetGists = (page: number = 1, perPage: number = 14) => {
  return useQuery<Gist[]>({
    queryKey: ['gists', page, perPage],
    queryFn: () => getGists({ page, per_page: perPage }),
  });
};
