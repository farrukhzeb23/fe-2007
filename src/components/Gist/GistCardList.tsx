import GistCard from './GistCard';
import { Gist } from '../../types';
import styles from './GistCardList.module.css';

interface GistCardListProps {
  gists?: Gist[];
}

function GistCardList({ gists = [] }: GistCardListProps) {
  return (
    <div className={styles.cardList}>
      {gists.map((gist, index) => (
        <GistCard key={index} gist={gist} />
      ))}
    </div>
  );
}

export default GistCardList;
