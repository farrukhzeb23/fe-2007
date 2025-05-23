import { useState } from 'react';
import PaginationBar from '../PaginationBar';
import styles from './Profile.module.css';
import GistCard from '../Gist/GistCard';
import GistLoader from '../Gist/GistLoader';
import { useSearchParams } from 'react-router';
import { useAuthStore } from '../../stores/auth.store';
import { useGetUserGists } from '../../hooks/useGetUserGists';

const TOTAL_PAGES = 6;

function Profile() {
  const { user } = useAuthStore();
  const [currentPage, setCurrentPage] = useState(1);
  const { data: gists, isLoading, error } = useGetUserGists(currentPage, TOTAL_PAGES);
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search') || '';

  function renderContent() {
    if (isLoading) {
      return <GistLoader />;
    }

    if (error) {
      return <div className={styles.error}>{error.message || 'Unable to fetch gists'}</div>;
    }

    if (!gists || gists.length === 0) {
      return <div className={styles.noGists}>No gists found</div>;
    }

    const filteredGists = gists?.filter(
      (gist) =>
        search.trim() === '' ||
        gist.owner?.login.toLowerCase().includes(search.toLowerCase()) ||
        gist.description?.toLowerCase().includes(search.toLowerCase())
    );

    return (
      <div className={styles.gistList}>
        {filteredGists.map((gist) => (
          <GistCard key={gist.id} gist={gist} showActions={false} />
        ))}
      </div>
    );
  }

  const showPagination = gists && !isLoading && gists.length > TOTAL_PAGES;

  return (
    <div className={styles.profileWrapper}>
      <div className={styles.leftSection}>
        <img src={user?.avatar_url} alt={user?.login} />
        <h2>{user?.login}</h2>
        <a
          href={user?.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.githubLink}
        >
          View Github Profile
        </a>
      </div>
      <div className={styles.rightSection}>
        <div className={styles.header}>
          <h2>All Gists</h2>
        </div>
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
    </div>
  );
}

export default Profile;
