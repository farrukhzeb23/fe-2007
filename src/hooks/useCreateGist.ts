import { useMutation } from '@tanstack/react-query';
import { createGist } from '../api/gist.api';
import { CreateGist } from '../types';

export const useCreateGist = () => {
  return useMutation({
    mutationFn: (data: CreateGist) => createGist(data),
    mutationKey: ['create-gist'],
  });
};
