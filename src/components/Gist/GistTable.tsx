import { Gist } from '../../types';
import StartIcon from '../../assets/icons/star-24.svg';
import ForkIcon from '../../assets/icons/repo-forked-24.svg';

interface GistTableProps {
  gists?: Gist[];
}

function GistTable({ gists = [] }: GistTableProps) {
  return (
    <div className="gist-table-wrapper">
      <div className="gist-table">
        <div className="gist-table-header">
          <div className="gist-table-row">
            <div className="gist-table-cell">Name</div>
            <div className="gist-table-cell">Notebook Name</div>
            <div className="gist-table-cell">Keyword</div>
            <div className="gist-table-cell">Updated</div>
            <div className="gist-table-cell actions"></div>
          </div>
        </div>
        <div className="gist-table-body">
          {gists.map((gist, index) => (
            <div className="gist-table-row" key={index}>
              <div className="gist-table-cell">
                <div className="user-info">
                  <div className="avatar">
                    <img src={`https://i.pravatar.cc/40?img=${index + 1}`} alt="User Avatar" />
                  </div>
                  <span>{gist.name}</span>
                </div>
              </div>
              <div className="gist-table-cell">{gist.notebookName}</div>
              <div className="gist-table-cell">
                <span className="keyword-badge">{gist.keywords[0]}</span>
              </div>
              <div className="gist-table-cell">{gist.updatedAt}</div>
              <div className="gist-table-cell actions">
                <button className="action-button">
                  <img src={ForkIcon} alt="Fork" />
                </button>
                <button className="action-button">
                  <img src={StartIcon} alt="Star" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GistTable;
