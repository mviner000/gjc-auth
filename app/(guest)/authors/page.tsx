// page.tsx
"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent, useCallback, useRef } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Author, Book } from './types';
import ReactPaginate from 'react-paginate';
import AuthorTag from '@/components/books/author-tag';
import SubjectTag from '@/components/books/subject-tag';
import { FidgetSpinner } from 'react-loader-spinner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Sidebar } from '@/components/sidebar';

import { playlists } from "@/actions/playlists"
import BreadcrumbComponent from '@/components/breadcrumb';
import CartSheet from '@/components/cart-sheet';
import Link from 'next/link';
import NavMenu from '@/components/nav-menu';

const appUrl = process.env.NEXT_PUBLIC_APP;

const AuthorsPage: React.FC = () => {
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [inputPage, setInputPage] = useState<string>(''); 
  const [bookTitlesCount, setBookTitlesCount] = useState<number>(0);
  const [bookTitles, setBookTitles] = useState<string[]>([]);

  
  useEffect(() => {
    fetchAuthors(currentPage);
  }, [currentPage]);

  useEffect(() => {
    const storedTitlesJSON = localStorage.getItem('bookTitles');
    if (storedTitlesJSON) {
      setBookTitles(JSON.parse(storedTitlesJSON));
    }

    const storedCount = localStorage.getItem('bookTitlesCount');
    if (storedCount) {
      setBookTitlesCount(parseInt(storedCount, 10));
    }
  }, []);

  const fetchAuthors = async (page: number): Promise<void> => {
    setLoading(true);
    try {
      const response = await axios.get(`${appUrl}api/authors/?page=${page}`);
      const { count, results } = response.data;

      const totalPagesCount: number = Math.ceil(count / 10);
      setAuthors(results);
      setTotalPages(totalPagesCount);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching authors:', error);
      setLoading(false);
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

  const handleDeleteBookTitle = (titleToRemove: string) => {
    const updatedTitles = bookTitles.filter((title) => title !== titleToRemove);
    localStorage.setItem('bookTitles', JSON.stringify(updatedTitles));
    setBookTitles(updatedTitles);
    setBookTitlesCount(updatedTitles.length);
  };

  const handleEmptyBookCart = () => {
    setBookTitles([]);
    setBookTitlesCount(0);
    localStorage.removeItem('bookTitles');
  };


  return (
    <div className='bg-gradient-to-t from-emerald-600 via-50% to-emerald-700 to-70%'>
      <div className="mt-3 h-full ">
      <div className="text-white flex flex-col items-center justify-center">
      <div className="grid lg:grid-cols-5">
      <Sidebar playlists={playlists} className="hidden lg:block" />
      <div className="col-span-3 lg:col-span-4 lg:border-l">
      <div className="h-full px-4 py-6 lg:px-8">
      <div className='flex justify-between'>
          <BreadcrumbComponent currentPage={currentPage} currentPageText="Authors" />
          <div className='mr-16'>
            <CartSheet bookTitles={bookTitles} onDeleteTitle={handleDeleteBookTitle} handleEmptyBookCart={handleEmptyBookCart} />
          </div>
      </div>     
      <div className='mb-2'>
        <NavMenu />
      </div>
      <h2 className="text-2xl font-bold mb-4">AuthorsPage <span className="bg-purple-100 text-purple-800 text-lg font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-purple-400 border border-purple-400">{currentPage}</span></h2>
      {loading ? ( 
        <div className='h-full'>
          <FidgetSpinner />
        </div>
      ) : (
      <ul>
        {authors.map((author: Author) => (
          <li key={author.id}>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value={`item-${author.id}`}>
                <AccordionTrigger>
                  {author.author_name} <span className="text-yellow-200"> {author.books.length} ( book published)</span>
                </AccordionTrigger>
                <ul>
                  {author.books.map((book: Book) => (
                    <li key={book.id}>
                      <AccordionContent>{book.title}</AccordionContent>
                    </li>
                  ))}
                </ul>
              </AccordionItem>
            </Accordion>
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
        </div>
        </div>
    </div>
    </div>
    </div>
  );
};

export default AuthorsPage;