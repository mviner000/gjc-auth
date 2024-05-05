// page.tsx
"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent, useCallback, useRef } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Author } from './types';
import ReactPaginate from 'react-paginate';
import AuthorTag from '@/components/books/author-tag';
import SubjectTag from '@/components/books/subject-tag';
import { FidgetSpinner } from 'react-loader-spinner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';


const AuthorsPage: React.FC = () => {
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [inputPage, setInputPage] = useState<string>(''); 

  
  useEffect(() => {
    fetchAuthors(currentPage);
  }, [currentPage]);

  const fetchAuthors = async (page: number): Promise<void> => {
    setLoading(true); // Set loading state to true before fetching
    try {

      const response: AxiosResponse<{ count: number; results: Author[] }> = await axios.get(
        `https://gjclibrary.com/api/authors/?page=${page}`
      );

      const { count, results } = response.data;
      const totalPagesCount: number = Math.ceil(count / 10);

      setAuthors(results);
      setTotalPages(totalPagesCount);
      setLoading(false); // Set loading state to false after fetching
    } catch (error) {
      console.error('Error fetching authors:', error);
    } finally {
      setLoading(false); // Always set loading state to false after fetching
    }
  };
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputPage(e.target.value); // Update inputPage state with user input
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const pageNumber = parseInt(inputPage, 10);
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber); // Update currentPage with the entered valid page number
    }
    setInputPage(''); // Clear input field after submission
  };


  const handlePageClick = (data: { selected: number }): void => {
    setLoading(true);
    setCurrentPage(data.selected + 1);
  };

  return (
    <div className="container mx-auto h-full mt-3">
      <h2 className="text-2xl font-bold mb-4">AuthorsPage <span className="bg-purple-100 text-purple-800 text-lg font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-purple-400 border border-purple-400">{currentPage}</span></h2>
      {loading ? ( // Render loading spinner if loading is true
        <div className='h-full'>
          <FidgetSpinner />
        </div>
      ) : (
      <ul>
          {authors.map((authors) => (
            <li key={authors.id} className="mb-2">
              <div className='flex gap-2'>
                <SubjectTag subjectName={authors.id} />
                {authors.author_name}
                <AuthorTag authorName={authors.author_code} />
              </div>
            </li>
          ))}
        </ul>
      )}
      {/* Pagination */}
      <div className="mt-4 flex justify-left items-center">
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          onPageChange={handlePageClick}
          forcePage={currentPage - 1} 
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
        <form onSubmit={handleSubmit}>
          <div className='mt-4 flex'>
              <Input
                type="number"
                value={inputPage}
                onChange={handleInputChange}
                placeholder={`Go to page (1 - ${totalPages})`}
                min="1"
                max={totalPages}
                className="w-3/4 bg-neutral-100 border-slate-300 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-300"
              />
              <Button
                type="submit"
                className="w-1/4 py-2 px-4 ml-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Go
              </Button>
          </div>
        </form>
    </div>
  );
};

export default AuthorsPage;