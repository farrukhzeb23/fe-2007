import { useState } from 'react';
import { useGetUserStarredGists } from '../../queries/gist';
import GistCard from '../Gist/GistCard';
import styles from './StarredGists.module.css';
import GistListContainer from '../Gist/GistListContainer';
import { Gist } from '../../types';

const TOTAL_PAGES = 6;

function StarredGists() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: gists, isLoading, error } = useGetUserStarredGists(currentPage, TOTAL_PAGES);

  const renderGists = (filteredGists: Gist[]) => (
    <div className={styles.cardList}>
      {filteredGists.map((gist) => (
        <GistCard key={gist.id} gist={gist} showActions={false} />
      ))}
    </div>
  );

  return (
    <div className={styles.starredGistsWrapper}>
      <h2>Starred Gists</h2>
      <GistListContainer
        gists={gists}
        isLoading={isLoading}
        error={error}
        renderGists={renderGists}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={14}
      />
    </div>
  );
}

export default StarredGists;
