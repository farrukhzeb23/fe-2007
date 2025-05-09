import { Gist } from '../../types';
import StartIcon from '../../assets/icons/star-24.svg';
import ForkIcon from '../../assets/icons/repo-forked-24.svg';
import styles from './GistTable.module.css';
import { timeElapsed } from '../../utils/date.utils';

interface GistTableProps {
  gists?: Gist[];
}

function GistItem({ gist }: { gist: Gist }) {
  const gistFile = Object.values(gist.files)[0];
  return (
    <div className={styles.tableRow}>
      <div className={styles.tableCell}>
        <div className={styles.userInfo}>
          <div className={styles.avatar}>
            <img src={gist.owner?.avatar_url} alt={gist.owner?.login} />
          </div>
          <span>{gist.owner?.login}</span>
        </div>
      </div>
      <div className={styles.tableCell}>{gistFile.filename}</div>
      <div className={styles.tableCell}>
        <span className={styles.keywordBadge}>Keyword</span>
      </div>
      <div className={styles.tableCell}>Last updated {timeElapsed(new Date(gist.updated_at))}</div>
      <div className={`${styles.tableCell} ${styles.actions}`}>
        <button className={styles.actionButton}>
          <img src={ForkIcon} alt="Fork" />
        </button>
        <button className={styles.actionButton}>
          <img src={StartIcon} alt="Star" />
        </button>
      </div>
    </div>
  );
}

function GistTable({ gists = [] }: GistTableProps) {
  return (
    <div className={styles.tableWrapper}>
      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <div className={styles.tableRow}>
            <div className={styles.tableCell}>Name</div>
            <div className={styles.tableCell}>Notebook Name</div>
            <div className={styles.tableCell}>Keyword</div>
            <div className={styles.tableCell}>Updated</div>
            <div className={`${styles.tableCell} ${styles.actions}`}></div>
          </div>
        </div>
        <div className={styles.tableBody}>
          {gists.map((gist, index) => (
            <GistItem key={index} gist={gist} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default GistTable;
