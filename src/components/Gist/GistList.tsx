import { useState } from 'react';
import ListUnorderedIcon from '../../assets/icons/list-unordered-24.svg';
import NoteIcon from '../../assets/icons/note-24.svg';
import GistTable from './GistTable';
import GistCardList from './GistCardList';

function GistList() {
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table');
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
        {viewMode === 'table' ? <GistTable /> : <GistCardList />}
      </div>
    </div>
  );
}

export default GistList;
