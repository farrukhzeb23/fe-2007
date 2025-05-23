import { Gist } from '../../types';
import StartIcon from '../../assets/icons/star-24.svg';
import ForkIcon from '../../assets/icons/repo-forked-24.svg';
import styles from './GistTable.module.css';
import { timeElapsed } from '../../utils/date.utils';
import { useNavigate } from 'react-router';

interface GistTableProps {
  gists?: Gist[];
  showActions?: boolean;
}

function GistItem({ gist, showActions = true }: { gist: Gist; showActions?: boolean }) {
  const navigate = useNavigate();

  const gistFile = Object.values(gist.files)[0];

  const handleForkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Fork clicked for gist:', gist.id);
  };

  const handleStarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Star clicked for gist:', gist.id);
  };

  return (
    <div className={styles.tableRow} onClick={() => navigate(`/gists/${gist.id}`)} role="button">
      <div className={styles.tableCell}>
        <div className={styles.userInfo}>
          {' '}
          <div className={styles.avatar}>
            <img src={gist.owner?.avatar_url} alt={gist.owner?.login} />
          </div>
          <span className={styles.truncate}>{gist.owner?.login}</span>
        </div>
      </div>
      <div className={styles.tableCell}>
        <span className={styles.truncate}>{gistFile.filename}</span>
      </div>
      <div className={styles.tableCell}>
        <span className={styles.keywordBadge}>Keyword</span>
      </div>
      <div className={styles.tableCell}>
        <span className={styles.truncate}>
          Last updated {timeElapsed(new Date(gist.updated_at))}
        </span>
      </div>
      {showActions && (
        <div className={`${styles.tableCell} ${styles.actions}`}>
          <button className={styles.actionButton} onClick={handleForkClick}>
            <img src={ForkIcon} alt="Fork" />
          </button>
          <button className={styles.actionButton} onClick={handleStarClick}>
            <img src={StartIcon} alt="Star" />
          </button>
        </div>
      )}
    </div>
  );
}

function GistTable({ gists = [], showActions = true }: GistTableProps) {
  return (
    <div className={styles.tableWrapper}>
      {' '}
      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <div className={styles.tableRow}>
            <div className={styles.tableCell}>
              <span className={styles.truncate}>Name</span>
            </div>
            <div className={styles.tableCell}>
              <span className={styles.truncate}>Notebook Name</span>
            </div>
            <div className={styles.tableCell}>
              <span className={styles.truncate}>Keyword</span>
            </div>
            <div className={styles.tableCell}>
              <span className={styles.truncate}>Updated</span>
            </div>
            <div className={`${styles.tableCell} ${styles.actions}`}></div>
          </div>
        </div>
        <div className={styles.tableBody}>
          {gists.map((gist, index) => (
            <GistItem key={index} gist={gist} showActions={showActions} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default GistTable;
