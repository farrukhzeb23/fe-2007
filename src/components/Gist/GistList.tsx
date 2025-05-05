import { useEffect, useState } from 'react';
import ListUnorderedIcon from '../../assets/icons/list-unordered-24.svg';
import NoteIcon from '../../assets/icons/note-24.svg';
import GistTable from './GistTable';
import GistCardList from './GistCardList';
import PaginationBar from '../PaginationBar';
import { Gist } from '../../types';
import GistLoader from './GistLoader';
import { getGists } from '../../api/gist.api';

type ViewMode = 'table' | 'card';

type Props = {
  search: string;
};

function ViewModeToggle({
  viewMode,
  setViewMode,
}: {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}) {
  return (
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
  );
}

function GistList({ search }: Props) {
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [gists, setGists] = useState<Gist[]>();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchGists = async () => {
      const response = await getGists();
      setGists(response);
      setLoading(false);
    };

    fetchGists();
  }, []);

  const renderContent = () => {
    if (loading) {
      return <GistLoader />;
    }

    const filteredGists = gists?.filter(
      (gist) =>
        search.trim() === '' || gist.notebookName.toLowerCase().includes(search.toLowerCase())
    );

    if (viewMode === 'table') {
      return <GistTable gists={filteredGists} />;
    }

    return <GistCardList gists={filteredGists} />;
  };

  const paginationClassName = viewMode === 'card' ? 'card-pagination' : '';

  return (
    <div className="gist-list-wrapper">
      <div className="gist-list-header">
        <h2>Public Gists</h2>
        <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
      </div>
      <div className="gist-list-body">{renderContent()}</div>
      {!loading && (
        <PaginationBar
          className={paginationClassName}
          currentPage={currentPage}
          totalPages={14}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}

export default GistList;
