// page.tsx
"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent, useCallback, useRef } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Author, AuthorsPageState } from './types';
import ReactPaginate from 'react-paginate';

const AuthorsPage: React.FC = () => {
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [state, setState] = useState<AuthorsPageState>({
    authors: [],
    newAuthorName: '',
    page: 1,
    totalPagesCount: 0,
  });

  
  useEffect(() => {
    fetchAuthors(currentPage);
  }, [currentPage]);

  const fetchAuthors = async (page: number): Promise<void> => {
    try {
      const response: AxiosResponse<{ count: number; results: Author[] }> = await axios.get(
        `http://127.0.0.1:8000/api/authors/?page=${page}`
      );

      const { count, results } = response.data;
      const totalPagesCount: number = Math.ceil(count / 10);

      setAuthors(results);
      setTotalPages(totalPagesCount);
    } catch (error) {
      console.error('Error fetching authors:', error);
    }
  };

  const handlePageClick = (data: { selected: number }): void => {
    setCurrentPage(data.selected + 1);
  };

  return (
    <div className="container mx-auto h-full mt-3">
      <h2 className="text-2xl font-bold mb-4">AuthorsPage</h2>
        <ul>
          {authors.map((authors) => (
            <li key={authors.id} className="mb-2">
              <div className='flex gap-2'>
                {authors.author_name}
              </div>
            </li>
          ))}
        </ul>
      <div className="mt-4 flex justify-left items-center">
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          onPageChange={handlePageClick}
          containerClassName="flex"
          activeLinkClassName="text-gray-900 group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 transition-all ease-in duration-75 bg-white dark:bg-gray-900 group-hover:bg-opacity-0"
          pageClassName="mx-1"
          pageLinkClassName="py-2 px-3 bg-white border border-gray-300 text-gray-500 hover:bg-gray-100"
          previousLabel="Previous"
          nextLabel="Next"
          previousClassName=""
          previousLinkClassName="py-2 px-3 bg-white border border-gray-300 text-gray-500 hover:bg-gray-100"
          nextClassName="mx-1"
          nextLinkClassName="py-2 px-3 bg-white border border-gray-300 text-gray-500 hover:bg-gray-100"
        />
      </div>
    </div>
  );
};

export default AuthorsPage;