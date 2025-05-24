import StarIcon from '../../assets/icons/star-24.svg';
import ForkIcon from '../../assets/icons/repo-forked-24.svg';
import { Gist, GistFile } from '../../types';
import CodeBlock from '../CodeBlock';
import styles from './GistCard.module.css';
import { timeElapsed } from '../../utils/date.utils';
import { Link } from 'react-router';
import { useForkGist, useStarGist } from '../../queries/gist';

type Props = {
  gist: Gist;
  showActions?: boolean;
};

function GistCard({ gist, showActions = true }: Props) {
  const { mutate: mutateForkGist, isPending: isForking } = useForkGist();
  const { mutate: mutateStarGist, isPending: isStaring } = useStarGist();
  const gistFile = Object.values(gist.files)[0] as GistFile;

  const determineLanguage = (fileName: string): string => {
    const extension = fileName.split('.').pop() || '';
    return extension;
  };
  const handleForkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    mutateForkGist(gist.id);
  };
  const handleStarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    mutateStarGist(gist.id);
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
              <span className={styles.cardName}>{gistFile.filename}</span>
            </div>
            <div className={styles.cardTimestamp}>
              Created {timeElapsed(new Date(gist.created_at))}
            </div>
            <div className={styles.cardDescription}>{gist.description}</div>
          </div>
          {showActions && (
            <div className={styles.cardActions}>
              <button
                className={styles.actionButton}
                onClick={handleForkClick}
                disabled={isForking}
              >
                <img src={ForkIcon} alt="Fork" />
              </button>
              <button
                className={styles.actionButton}
                onClick={handleStarClick}
                disabled={isStaring}
              >
                <img src={StarIcon} alt="Star" />
              </button>
            </div>
          )}
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
