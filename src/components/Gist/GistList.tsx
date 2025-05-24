import { useState } from 'react';
import { useSearchParams } from 'react-router';
import ListUnorderedIcon from '../../assets/icons/list-unordered-24.svg';
import NoteIcon from '../../assets/icons/note-24.svg';
import GistTable from './GistTable';
import GistCardList from './GistCardList';
import PaginationBar from '../PaginationBar';
import GistLoader from './GistLoader';
import styles from './GistList.module.css';
import { useGetGists } from '../../queries/gist';
import { useAuthStore } from '../../stores/auth.store';

type ViewMode = 'table' | 'card';

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

const TOTAL_PAGES = 6;

function GistList() {
  const [viewMode, setViewMode] = useState<ViewMode>('card');
  const [currentPage, setCurrentPage] = useState(1);

  const [searchParams] = useSearchParams();
  const search = searchParams.get('search') || '';
  const { data: gists, error, isLoading } = useGetGists(currentPage, TOTAL_PAGES);
  const { isAuthenticated } = useAuthStore();

  if (isLoading)
    return (
      <div className={styles.gistListWrapper}>
        <div className={styles.gistListBody}>
          <GistLoader />
        </div>
      </div>
    );

  if (error)
    return <div className={styles.error}>{error.message || 'Erro while fetching gists'}</div>;

  const filteredGists = gists?.filter(
    (gist) =>
      search.trim() === '' ||
      gist.owner?.login.toLowerCase().includes(search.toLowerCase()) ||
      gist.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.gistListWrapper}>
      <div className={styles.gistListHeader}>
        <h2>Public Gists</h2>
        <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
      </div>
      <div className={styles.gistListBody}>
        {viewMode === 'table' ? (
          <GistTable gists={filteredGists} showActions={isAuthenticated} />
        ) : (
          <GistCardList gists={filteredGists} showActions={isAuthenticated} />
        )}
      </div>
      {!isLoading && (
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
