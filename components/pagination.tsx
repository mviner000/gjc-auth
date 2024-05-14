import React from 'react';
import ReactPaginate from 'react-paginate';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (selectedPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={1}
      marginPagesDisplayed={1}
      onPageChange={(data) => onPageChange(data.selected + 1)}
      forcePage={currentPage - 1}
      containerClassName="flex"
      activeLinkClassName="text-gray-900 group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 transition-all ease-in duration-75 bg-white dark:bg-gray-900 group-hover:bg-opacity-0"
      pageClassName="mx-1"
      pageLinkClassName="py-2 px-3 bg-white border border-gray-300 text-gray-500 hover:bg-gray-100"
      previousLabel="Prev"
      nextLabel="Next"
      previousClassName=""
      previousLinkClassName="py-2 px-3 bg-white border border-gray-300 text-gray-500 hover:bg-gray-100"
      nextClassName="mx-1"
      nextLinkClassName="py-2 px-3 bg-white border border-gray-300 text-gray-500 hover:bg-gray-100"
    />
  );
};

export default Pagination;