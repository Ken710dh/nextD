// components/Pagination.tsx
import React from 'react';
import ReactPaginate from 'react-paginate';
import SelectItem from '../selectItem';

interface PaginationProps {
  pageCount: number;
  onPageChange: (selectedPage: number) => void;
  currentPage?: number;
  pageRangeDisplayed?: number;
  marginPagesDisplayed?: number;
  className?: string;

  pageSizeOptions: { value: number; label: string }[];
  itemCount: string;
  onPageSizeChange: (pageSizer: string) => void;
}

export const PaginationWithSelect: React.FC<PaginationProps> = ({
  pageCount,
  onPageChange,
  currentPage,
  pageRangeDisplayed = 3,
  marginPagesDisplayed = 1,
  pageSizeOptions,
  itemCount,
  onPageSizeChange,
  className = '',

}) => {
  return (
    <div className={`flex items-end justify-between ${className} my-4`}>
      <div className= "w-[150px]"><SelectItem name="itemsPerPage" value={itemCount} selectOption={pageSizeOptions} onValueChange={onPageSizeChange} height='h-[33px]' /></div>
      <div className="w-1/2 h-[30px] flex items-center">
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
          activeLinkClassName="bg-[var(--background-color-2)] text-white"
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
      </div>
    </div>
  );
};
