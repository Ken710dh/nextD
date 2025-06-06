// components/Pagination.tsx
import React from 'react';
import ReactPaginate from 'react-paginate';

interface PaginationProps {
  pageCount: number;
  onPageChange: (selectedPage: number) => void;
  currentPage?: number;
  pageRangeDisplayed?: number;
  marginPagesDisplayed?: number;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  pageCount,
  onPageChange,
  currentPage,
  pageRangeDisplayed = 3,
  marginPagesDisplayed = 1,
  className = '',
}) => {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="›"
      previousLabel="‹"
      pageCount={pageCount}
      forcePage={currentPage}
      onPageChange={(event) => onPageChange(event.selected)}
      pageRangeDisplayed={pageRangeDisplayed}
      marginPagesDisplayed={marginPagesDisplayed}
      containerClassName={`flex items-center gap-2 ${className}`}
      pageClassName="rounded overflow-hidden cursor-pointer"
      pageLinkClassName=" w-[30px] h-[30px] text-[12px] flex items-center justify-center px-3 py-2 hover:bg-gray-200 rounded transition-colors duration-150"
      activeClassName=""
      activeLinkClassName="bg-blue-600 text-white"
      previousClassName="rounded overflow-hidden"
      previousLinkClassName="flex items-center justify-center px-3 py-2 hover:bg-gray-200 rounded"
      nextClassName="rounded overflow-hidden"
      nextLinkClassName="flex items-center justify-center px-3 py-2 hover:bg-gray-200 rounded"
      breakClassName="rounded overflow-hidden"
      breakLinkClassName="flex items-center justify-center px-3 py-2"
      disabledClassName="opacity-50 pointer-events-none"
      disabledLinkClassName="pointer-events-none"
      renderOnZeroPageCount={null}
    />

  );
};
