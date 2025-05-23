import { useQuery } from '@tanstack/react-query';
import { Gist } from '../types';
import { getUserGists } from '../api/gist.api';

export const useGetUserGists = (page: number = 1, perPage: number = 14) => {
  return useQuery<Gist[]>({
    queryKey: ['user-gists', page, perPage],
    queryFn: () => getUserGists({ page, per_page: perPage }),
  });
};
