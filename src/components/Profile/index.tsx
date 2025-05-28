import { useState } from 'react';
import styles from './Profile.module.css';
import GistCard from '../Gist/GistCard';
import { useAuthStore } from '../../stores/auth.store';
import { useGetUserGists } from '../../queries/gist';
import GistListContainer from '../Gist/GistListContainer';
import { Gist } from '../../types';

const TOTAL_PAGES = 6;

function Profile() {
  const { user } = useAuthStore();
  const [currentPage, setCurrentPage] = useState(1);
  const { data: gists, isLoading, error } = useGetUserGists(currentPage, TOTAL_PAGES);

  const renderGists = (filteredGists: Gist[]) => (
    <div className={styles.gistList}>
      {filteredGists.map((gist) => (
        <GistCard key={gist.id} gist={gist} showActions={false} />
      ))}
    </div>
  );

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
          noGistsClassName={styles.noGists}
        />
      </div>
    </div>
  );
}

export default Profile;
