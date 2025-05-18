import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import PaginationBar from '../PaginationBar';
import styles from './Profile.module.css';
import { Gist } from '../../types';
import { getGists } from '../../api/gist.api';
import GistCard from '../Gist/GistCard';
import GistLoader from '../Gist/GistLoader';
import { useSearchParams } from 'react-router';

const TOTAL_PAGES = 6;

function Profile() {
  const { user } = useAuth();
  const [gists, setGists] = useState<Gist[]>();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search') || '';

  useEffect(() => {
    const fetchGists = async () => {
      try {
        setLoading(true);
        const response = await getGists({
          page: currentPage,
          per_page: TOTAL_PAGES,
        });

        setGists(response);
      } catch (error) {
        console.error('Error fetching gists:', error);
        setError('Failed to fetch gists. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchGists();
  }, [currentPage]);

  function renderContent() {
    if (loading) {
      return <GistLoader />;
    }

    if (error) {
      return <div className={styles.error}>{error}</div>;
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
          <GistCard key={gist.id} gist={gist} />
        ))}
      </div>
    );
  }

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
        <PaginationBar
          className={'card-pagination'}
          currentPage={currentPage}
          totalPages={14}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default Profile;
