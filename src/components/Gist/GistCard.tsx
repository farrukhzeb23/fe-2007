import StarIcon from '../../assets/icons/star-24.svg';
import ForkIcon from '../../assets/icons/repo-forked-24.svg';
import { Gist } from '../../types';
import CodeBlock from '../CodeBlock';
import styles from './GistCard.module.css';

type Props = {
  gist: Gist;
  index?: number;
};

function GistCard({ gist, index = 1 }: Props) {
  const determineLanguage = (fileName: string): string => {
    const extension = fileName.split('.').pop() || '';
    return extension;
  };

  const language = determineLanguage(gist.fileName);

  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <CodeBlock code={gist.code} language={language} showLineNumbers={true} />
      </div>

      <div className={styles.cardFooter}>
        <div className={styles.cardUser}>
          <div className={styles.avatar}>
            <img src={`https://i.pravatar.cc/40?img=${index}`} alt="User Avatar" />
          </div>
          <div className={styles.cardInfo}>
            <div className={styles.cardTitle}>
              <span className={styles.cardAuthor}>{gist.name} / </span>
              <span className={styles.cardName}>{gist.notebookName}</span>
            </div>
            <div className={styles.cardTimestamp}>{gist.createdAt}</div>
            <div className={styles.cardDescription}>{gist.description}</div>
          </div>
          <div className={styles.cardActions}>
            <button className={styles.actionButton}>
              <img src={ForkIcon} alt="Fork" />
            </button>
            <button className={styles.actionButton}>
              <img src={StarIcon} alt="Star" />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.cardViewFile}>
        <p>
          View <strong>{gist.fileName}</strong>
        </p>
      </div>
    </div>
  );
}

export default GistCard;
