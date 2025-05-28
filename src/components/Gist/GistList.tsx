import { useState } from 'react';
import ListUnorderedIcon from '../../assets/icons/list-unordered-24.svg';
import NoteIcon from '../../assets/icons/note-24.svg';
import GistTable from './GistTable';
import GistCardList from './GistCardList';
import styles from './GistList.module.css';
import { useGetGists } from '../../queries/gist';
import { useAuthStore } from '../../stores/auth.store';
import GistListContainer from './GistListContainer';
import { Gist } from '../../types';

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
  const { data: gists, error, isLoading } = useGetGists(currentPage, TOTAL_PAGES);
  const { isAuthenticated } = useAuthStore();

  const renderGists = (filteredGists: Gist[]) => (
    <>
      {viewMode === 'table' ? (
        <GistTable gists={filteredGists} showActions={isAuthenticated} />
      ) : (
        <GistCardList gists={filteredGists} showActions={isAuthenticated} />
      )}
    </>
  );

  return (
    <div className={styles.gistListWrapper}>
      <div className={styles.gistListHeader}>
        <h2>Public Gists</h2>
        <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
      </div>
      <div className={styles.gistListBody}>
        <GistListContainer
          gists={gists}
          isLoading={isLoading}
          error={error}
          renderGists={renderGists}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={14}
          emptyMessage="No gists found"
          errorClassName={styles.error}
          paginationClassName={viewMode === 'card' ? 'card-pagination' : ''}
        />
      </div>
    </div>
  );
}

export default GistList;
