import { Gist } from '../types';

const mockGists: Gist[] = Array.from({ length: 6 }, (_, i) => ({
  id: `gist_name`,
  fileName: 'vercel_package.json',
  name: 'John Doe',
  notebookName: i === 2 ? 'a very long gist name that will overflow' : 'gist_name',
  keywords: ['Keyword'],
  link: `https://gist.github.com/${i}`,
  description: i === 2 ? 'A very long gist description that will overflow' : 'Git Description',
  createdAt: 'Created 7 hours ago',
  updatedAt: 'Last updated a few hours ago',
  code: `{
"name": "vercel-monorepo",
"version": "0.0.0",
"private": true,
"license": "Apache-2.0",
"packageManager": "pnpm@8.3.1",
"dependencies": {
  "tslib": "5.6.2"
},
"devDependencies": {
}`,
  language: 'json',
}));

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getGists = async (): Promise<Gist[]> => {
  await delay(1000);
  return mockGists;
};
