import { Gist, AuthUser, CreateGist } from '../types';
import axios from 'axios';
import { useAuthStore } from '../stores/auth.store';

const baseUrl = 'https://api.github.com';

// Create the API instance
const api = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to dynamically include the token from the auth store
api.interceptors.request.use((config) => {
  // Get the current auth state with each request
  const token = useAuthStore.getState().token;

  // If token exists, add it to the Authorization header
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
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

export const getUser = async (accessToken: string): Promise<AuthUser> => {
  const response = await api.get('/user', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
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

export const getUserStarredGists = async (params: GetGistsParams): Promise<Gist[]> => {
  const response = await api.get(
    `/gists/starred?page=${params.page || 1}&per_page=${params.per_page || 14}`
  );
  return response.data;
};
