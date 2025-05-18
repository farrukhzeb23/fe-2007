import { ReactNode } from 'react';
import GistList from '../components/Gist/GistList';
import Profile from '../components/Profile';
import GistDetails from '../components/GistDetails';
import NotFound from '../components/NotFound';

export interface RouteConfig {
  path: string;
  element: ReactNode;
  protected: boolean;
}

const routes: RouteConfig[] = [
  {
    path: '/',
    element: <GistList />,
    protected: false,
  },
  {
    path: '/profile',
    element: <Profile />,
    protected: true,
  },
  {
    path: '/gists/:id',
    element: <GistDetails />,
    protected: false,
  },
  {
    path: '*',
    element: <NotFound />,
    protected: false,
  },
];

export default routes;
