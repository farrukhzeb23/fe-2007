import { useState } from 'react';
import ListUnorderedIcon from '../../assets/icons/list-unordered-24.svg';
import NoteIcon from '../../assets/icons/note-24.svg';
import GistTable from './GistTable';
import GistCardList from './GistCardList';
import PaginationBar from '../PaginationBar';
import { Gist } from '../../types';

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

function GistList() {
  const [viewMode, setViewMode] = useState<'table' | 'card'>('card');
  return (
    <div className="gist-list-wrapper">
      <div className="gist-list-header">
        <h2>Public Gists</h2>
        <div className="gist-list-header-actions">
          <button
            className="gist-list-header-action"
            onClick={() => setViewMode('card')}
            style={{ backgroundColor: viewMode === 'card' ? '#e3e3e3' : 'transparent' }}
          >
            <img src={NoteIcon} alt="Card" />
          </button>
          <button
            className="gist-list-header-action"
            onClick={() => setViewMode('table')}
            style={{ backgroundColor: viewMode === 'table' ? '#e3e3e3' : 'transparent' }}
          >
            <img src={ListUnorderedIcon} alt="List" />
          </button>
        </div>
      </div>
      <div className="gist-list-body">
        {viewMode === 'table' ? (
          <GistTable gists={mockGists} />
        ) : (
          <GistCardList gists={mockGists} />
        )}
      </div>
      <PaginationBar className={viewMode === 'card' ? 'card-pagination' : ''} />
    </div>
  );
}

export default GistList;
