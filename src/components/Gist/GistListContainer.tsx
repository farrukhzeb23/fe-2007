import { ReactNode } from 'react';
import { useSearchParams } from 'react-router';
import { Gist } from '../../types';
import GistLoader from './GistLoader';
import PaginationBar from '../PaginationBar';

export interface GistListContainerProps {
  gists?: Gist[];
  isLoading: boolean;
  error: Error | null;
  renderGists: (filteredGists: Gist[]) => ReactNode;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages?: number;
  emptyMessage?: string;
  paginationClassName?: string;
  errorClassName?: string;
  noGistsClassName?: string;
}

function GistListContainer({
  gists = [],
  isLoading,
  error,
  renderGists,
  currentPage,
  setCurrentPage,
  totalPages = 14,
  emptyMessage = 'No gists found',
  paginationClassName = 'card-pagination',
  errorClassName = '',
  noGistsClassName = '',
}: GistListContainerProps) {
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search') || '';

  if (isLoading) {
    return <GistLoader />;
  }

  if (error) {
    return <div className={errorClassName}>{error.message || 'Unable to fetch gists'}</div>;
  }

  if (!gists || gists.length === 0) {
    return <div className={noGistsClassName}>{emptyMessage}</div>;
  }

  const filteredGists = gists.filter(
    (gist) =>
      search.trim() === '' ||
      gist.owner?.login.toLowerCase().includes(search.toLowerCase()) ||
      gist.description?.toLowerCase().includes(search.toLowerCase())
  );

  const showPagination = gists && !isLoading;

  return (
    <>
      {renderGists(filteredGists)}
      {showPagination && (
        <PaginationBar
          className={paginationClassName}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </>
  );
}

export default GistListContainer;
