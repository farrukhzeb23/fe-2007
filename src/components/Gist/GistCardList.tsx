import GistCard from './GistCard';
import { Gist } from '../../types';
import styles from './GistCardList.module.css';

interface GistCardListProps {
  gists?: Gist[];
  showActions?: boolean;
}

function GistCardList({ gists = [], showActions }: GistCardListProps) {
  return (
    <div className={styles.cardList}>
      {gists.map((gist, index) => (
        <GistCard key={index} gist={gist} showActions={showActions} />
      ))}
    </div>
  );
}

export default GistCardList;
