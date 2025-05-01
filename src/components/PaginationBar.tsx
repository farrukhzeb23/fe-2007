import ChevronLeft from '../assets/icons/chevron-left-24.svg';
import ChevronRight from '../assets/icons/chevron-right-24.svg';

type Props = {
  className?: string;
};

function PaginationBar({ className }: Props) {
  return (
    <div className={`gist-table-pagination ${className}`}>
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
  );
}

export default PaginationBar;
