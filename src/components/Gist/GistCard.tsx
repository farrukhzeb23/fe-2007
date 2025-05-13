import StarIcon from '../../assets/icons/star-24.svg';
import ForkIcon from '../../assets/icons/repo-forked-24.svg';
import { Gist, GistFile } from '../../types';
import CodeBlock from '../CodeBlock';
import styles from './GistCard.module.css';
import { timeElapsed } from '../../utils/date.utils';
import { Link } from 'react-router';

type Props = {
  gist: Gist;
};

function GistCard({ gist }: Props) {
  const gistFile = Object.values(gist.files)[0] as GistFile;

  const determineLanguage = (fileName: string): string => {
    const extension = fileName.split('.').pop() || '';
    return extension;
  };

  const language = determineLanguage(gistFile.filename);

  return (
    <Link className={styles.card} to={`/gists/${gist.id}`}>
      <div className={styles.cardContent}>
        <CodeBlock code={''} url={gistFile.raw_url} language={language} showLineNumbers={true} />
      </div>

      <div className={styles.cardFooter}>
        <div className={styles.cardUser}>
          <div className={styles.avatar}>
            <img src={gist.owner?.avatar_url} alt={gist.id} />
          </div>
          <div className={styles.cardInfo}>
            <div className={styles.cardTitle}>
              <span className={styles.cardAuthor}>{gist.owner?.login} / </span>
              <span className={styles.cardName}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta dicta minima est
                reprehenderit, eligendi ducimus voluptatum asperiores laboriosam rerum hic, nobis
                voluptatem odio sapiente molestias consequatur tenetur ab dolorum incidunt?
              </span>
            </div>
            <div className={styles.cardTimestamp}>
              Created {timeElapsed(new Date(gist.created_at))}
            </div>
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
          View <strong>{gistFile.filename}</strong>
        </p>
      </div>
    </Link>
  );
}

export default GistCard;
