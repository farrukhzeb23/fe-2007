import GistCard from './GistCard';
import { Gist } from '../../types';

interface GistCardListProps {
  gists: Gist[];
}

function GistCardList({ gists = [] }: GistCardListProps) {
  return (
    <div className="gist-card-list">
      {gists.map((gist, index) => (
        <GistCard key={index} gist={gist} index={index + 1} />
      ))}
    </div>
  );
}

export default GistCardList;
