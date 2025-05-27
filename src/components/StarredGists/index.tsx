import { useSearchParams } from 'react-router';
import { useGetUserStarredGists } from '../../queries/gist';
import GistLoader from '../Gist/GistLoader';
import GistCard from '../Gist/GistCard';
import PaginationBar from '../PaginationBar';
import { useState } from 'react';
import styles from './StarredGists.module.css';

const TOTAL_PAGES = 6;

function StarredGists() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: gists, isLoading, error } = useGetUserStarredGists(currentPage, TOTAL_PAGES);
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search') || '';

  function renderContent() {
    if (isLoading) {
      return <GistLoader />;
    }

    if (error) {
      return <div>{error.message || 'Unable to fetch gists'}</div>;
    }

    if (!gists || gists.length === 0) {
      return <div>No gists found</div>;
    }

    const filteredGists = gists?.filter(
      (gist) =>
        search.trim() === '' ||
        gist.owner?.login.toLowerCase().includes(search.toLowerCase()) ||
        gist.description?.toLowerCase().includes(search.toLowerCase())
    );

    return (
      <div className={styles.cardList}>
        {filteredGists.map((gist) => (
          <GistCard key={gist.id} gist={gist} showActions={false} />
        ))}
      </div>
    );
  }

  const showPagination = gists && !isLoading;

  return (
    <div className={styles.starredGistsWrapper}>
      <h2>Starred Gists</h2>
      {renderContent()}
      {showPagination && (
        <PaginationBar
          className={'card-pagination'}
          currentPage={currentPage}
          totalPages={14}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}

export default StarredGists;
