import { Gist } from '../../types';
import StartIcon from '../../assets/icons/star-24.svg';
import ForkIcon from '../../assets/icons/repo-forked-24.svg';
import styles from './GistTable.module.css';

interface GistTableProps {
  gists?: Gist[];
}

function GistItem({ gist, index }: { gist: Gist; index: number }) {
  return (
    <div className={styles.tableRow}>
      <div className={styles.tableCell}>
        <div className={styles.userInfo}>
          <div className={styles.avatar}>
            <img src={`https://i.pravatar.cc/40?img=${index}`} alt="User Avatar" />
          </div>
          <span>{gist.name}</span>
        </div>
      </div>
      <div className={styles.tableCell} title={gist.notebookName}>
        {gist.notebookName}
      </div>
      <div className={styles.tableCell}>
        <span className={styles.keywordBadge}>{gist.keywords[0]}</span>
      </div>
      <div className={styles.tableCell} title={`Updated: ${gist.updatedAt}`}>
        {gist.updatedAt}
      </div>
      <div className={`${styles.tableCell} ${styles.actions}`}>
        <button className={styles.actionButton} title="Fork">
          <img src={ForkIcon} alt="Fork" />
        </button>
        <button className={styles.actionButton} title="Star">
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
            <GistItem key={index} gist={gist} index={index + 1} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default GistTable;
