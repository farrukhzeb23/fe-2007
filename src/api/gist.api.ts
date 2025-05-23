import { Gist, AuthUser, CreateGist } from '../types';
import axios from 'axios';

const baseUrl = 'https://api.github.com';

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_GITHUB_PERSONAL_ACCESS_TOKEN}`,
  },
});

type GetGistsParams = {
  page?: number;
  per_page?: number;
};

export const getGists = async (params: GetGistsParams): Promise<Gist[]> => {
  const response = await api.get(
    `/gists/public?page=${params.page || 1}&per_page=${params.per_page || 14}`
  );
  return response.data;
};

export const getUserGists = async (params: GetGistsParams): Promise<Gist[]> => {
  const response = await api.get(
    `/gists?page=${params.page || 1}&per_page=${params.per_page || 14}`
  );
  return response.data;
};

export const getGist = async (id: string): Promise<Gist> => {
  const response = await api.get(`/gists/${id}`);
  return response.data;
};

export const createGist = async (data: CreateGist): Promise<Gist> => {
  const response = await api.post('/gists', data);
  return response.data;
};

export const getUser = async (): Promise<AuthUser> => {
  const response = await api.get('/user');
  return response.data;
};

export const forkGist = async (id: string): Promise<Gist> => {
  const response = await api.post(`/gists/${id}/forks`);
  return response.data;
};

export const starGist = async (id: string): Promise<Gist> => {
  const response = await api.put(`/gists/${id}/star`);
  return response.data;
};
