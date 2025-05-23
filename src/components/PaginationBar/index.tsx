import { useState, ChangeEvent, KeyboardEvent } from 'react';
import ChevronLeft from '../../assets/icons/chevron-left-24.svg';
import ChevronRight from '../../assets/icons/chevron-right-24.svg';
import styles from './PaginationBar.module.css';

type Props = {
  className?: string;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function PaginationBar({ className, currentPage, totalPages, onPageChange }: Props) {
  const [inputValue, setInputValue] = useState(currentPage.toString());

  const goToPage = (page: number) => {
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    onPageChange(page);
    setInputValue(page.toString());
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    const newPage = parseInt(inputValue, 10);
    if (!isNaN(newPage)) {
      goToPage(newPage);
    } else {
      setInputValue(currentPage.toString());
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleInputBlur();
    }
  };

  const paginationClass = className === 'card-pagination' ? styles.cardPagination : '';

  return (
    <div className={`${styles.pagination} ${paginationClass}`}>
      <button className={styles.paginationArrow} onClick={goToPrevPage} disabled={currentPage <= 1}>
        <img src={ChevronLeft} alt="Previous" />
      </button>
      <div className={styles.paginationInfo}>
        <span>Page</span>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          className={styles.pageInput}
        />
        <span>of {totalPages}</span>
      </div>
      <button
        className={styles.paginationArrow}
        onClick={goToNextPage}
        disabled={currentPage >= totalPages}
      >
        <img src={ChevronRight} alt="Next" />
      </button>
    </div>
  );
}

export default PaginationBar;
