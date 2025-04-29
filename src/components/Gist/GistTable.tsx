import { Gist } from '../../types';
import StartIcon from '../../assets/icons/star-24.svg';
import ForkIcon from '../../assets/icons/repo-forked-24.svg';
import ChevronLeft from '../../assets/icons/chevron-left-24.svg';
import ChevronRight from '../../assets/icons/chevron-right-24.svg';

interface GistTableProps {
  gists?: Gist[];
}

function GistTable({ gists = [] }: GistTableProps) {
  // Mock data for demonstration since we don't have actual gists passed
  const mockGists = [
    {
      name: 'John Doe',
      notebookName: 'Notebook Name',
      keywords: ['Keyword'],
      updatedAt: 'Last updated a few hours ago',
    },
    {
      name: 'John Doe',
      notebookName: 'Notebook Name',
      keywords: ['Keyword'],
      updatedAt: 'Last updated a few hours ago',
    },
    {
      name: 'John Doe',
      notebookName: 'Notebook Name',
      keywords: ['Keyword'],
      updatedAt: 'Last updated a few hours ago',
    },
    {
      name: 'John Doe',
      notebookName: 'Notebook Name',
      keywords: ['Keyword'],
      updatedAt: 'Last updated a few hours ago',
    },
    {
      name: 'John Doe',
      notebookName: 'Notebook Name',
      keywords: ['Keyword'],
      updatedAt: 'Last updated a few hours ago',
    },
    {
      name: 'John Doe',
      notebookName: 'Notebook Name',
      keywords: ['Keyword'],
      updatedAt: 'Last updated a few hours ago',
    },
    {
      name: 'John Doe',
      notebookName: 'Notebook Name',
      keywords: ['Keyword'],
      updatedAt: 'Last updated a few hours ago',
    },
    {
      name: 'John Doe',
      notebookName: 'Notebook Name',
      keywords: ['Keyword'],
      updatedAt: 'Last updated a few hours ago',
    },
  ];

  const dataToRender = gists.length > 0 ? gists : mockGists;

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
          {dataToRender.map((gist, index) => (
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
      <div className="gist-table-pagination">
        <button className="pagination-arrow">
          <img src={ChevronLeft} alt="Previous" />
        </button>
        <div className="pagination-info">
          <span>Page</span>
          <input type="text" value="1" readOnly className="page-input" />
          <span>of 14</span>
        </div>
        <button className="pagination-arrow">
          <img src={ChevronRight} alt="Next" />
        </button>
      </div>
    </div>
  );
}

export default GistTable;
