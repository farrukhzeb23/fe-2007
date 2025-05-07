import { useEffect, useState } from 'react';
import ListUnorderedIcon from '../../assets/icons/list-unordered-24.svg';
import NoteIcon from '../../assets/icons/note-24.svg';
import GistTable from './GistTable';
import GistCardList from './GistCardList';
import PaginationBar from '../PaginationBar';
import { Gist } from '../../types';
import GistLoader from './GistLoader';
import { getGists } from '../../api/gist.api';
import styles from './GistList.module.css';

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
    <div className={styles.gistListHeaderActions}>
      <button
        className={styles.gistListHeaderAction}
        onClick={() => setViewMode('card')}
        style={{ backgroundColor: viewMode === 'card' ? '#e3e3e3' : 'transparent' }}
      >
        <img src={NoteIcon} alt="Card" />
      </button>
      <button
        className={styles.gistListHeaderAction}
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
        search.trim() === '' ||
        gist.notebookName.toLowerCase().includes(search.toLowerCase()) ||
        gist.name.toLowerCase().includes(search.toLowerCase())
    );

    if (viewMode === 'table') {
      return <GistTable gists={filteredGists} />;
    }

    return <GistCardList gists={filteredGists} />;
  };

  return (
    <div className={styles.gistListWrapper}>
      <div className={styles.gistListHeader}>
        <h2>Public Gists</h2>
        <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
      </div>
      <div className={styles.gistListBody}>{renderContent()}</div>
      {!loading && (
        <PaginationBar
          className={viewMode === 'card' ? 'card-pagination' : ''}
          currentPage={currentPage}
          totalPages={14}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}

export default GistList;
