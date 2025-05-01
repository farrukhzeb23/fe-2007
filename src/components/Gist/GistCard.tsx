import StarIcon from '../../assets/icons/star-24.svg';
import ForkIcon from '../../assets/icons/repo-forked-24.svg';
import { Gist } from '../../types';

type Props = {
  gist: Gist;
  index?: number;
};

function GistCard({ gist, index = 1 }: Props) {
  return (
    <div className="gist-card">
      <div className="gist-card-content">
        <pre className="gist-card-code">
          <code>{gist.code}</code>
        </pre>
      </div>

      <div className="gist-card-footer">
        <div className="gist-card-user">
          <div className="avatar">
            <img src={`https://i.pravatar.cc/40?img=${index}`} alt="User Avatar" />
          </div>
          <div className="gist-card-info">
            <div className="gist-card-title">
              <span className="gist-card-author">{gist.name} / </span>
              <span className="gist-card-name">{gist.notebookName}</span>
            </div>
            <div className="gist-card-timestamp">{gist.createdAt}</div>
            <div className="gist-card-description">{gist.description}</div>
          </div>
          <div className="gist-card-actions">
            <button className="action-button">
              <img src={ForkIcon} alt="Fork" />
            </button>
            <button className="action-button">
              <img src={StarIcon} alt="Star" />
            </button>
          </div>
        </div>
      </div>

      <div className="gist-card-view-file">
        <p>
          View <strong>{gist.fileName}</strong>
        </p>
      </div>
    </div>
  );
}

export default GistCard;
