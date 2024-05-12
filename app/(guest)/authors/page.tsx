// page.tsx
"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent, useCallback, useRef } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Author, Book } from './types';
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
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
import PaginationControls from '@/components/pagination-controls';
import CartSheet from '@/components/cart-sheet';
import Link from 'next/link';
import NavMenu from '@/components/nav-menu';

const appUrl = process.env.NEXT_PUBLIC_APP;

const AuthorsPage: React.FC = () => {
  const { toast } = useToast()
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

  const renderPagination = () => {
    return (
      <div>
        <PaginationControls
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onGoToPage={(pageNumber) => setCurrentPage(pageNumber)}
        />
      </div>
    );
  };

  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);
  };

  const handleButtonClick = (title: string, thumbnail_url: string) => {
    console.log(title);
  
    // Check if thumbnail_url is empty or undefined
    if (!thumbnail_url) {
      // If thumbnail_url is empty or undefined, use placeholder URL
      thumbnail_url = 'https://via.placeholder.com/128x185/007bff/ffffff?text=Book';
    }
  
    console.log(thumbnail_url);
  };
  

  const handleAddToCart = (title: string, thumbnailUrl: string | null) => {
    if (bookTitles.includes(title)) {
      // Display a toast notification for duplicate entry
      toast({
        title: "Warning!",
        variant: "destructive",
        description: `${title} already added to storage`,
        action: <ToastAction altText="Go to schedule to undo">Close</ToastAction>,
      });
      return;
    }
  
    const updatedTitles = [...bookTitles, title];
    localStorage.setItem('bookTitles', JSON.stringify(updatedTitles));
    setBookTitles(updatedTitles);
    setBookTitlesCount(updatedTitles.length);
  
    console.log(`Thumbnail URL: ${thumbnailUrl}`); // Log thumbnail URL before storage
    const thumbnailToSave = thumbnailUrl || 'https://via.placeholder.com/128x185/007bff/ffffff?text=Book';
    localStorage.setItem(`thumbnail_${title}`, thumbnailToSave);
  
    toast({
      title: "Yehey! Congratulations",
      description: `"${title}" successfully added`,
      action: <ToastAction altText="Go to schedule to undo">Close</ToastAction>,
    });
  };
  

  const renderAuthorList = () => {
    return (
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
                  <li key={book.id} >
                    <AccordionContent>{book.title}
                    <Button className='ml-2' onClick={() => handleAddToCart(book.title, book.thumbnail_url)}>Add</Button>
                    </AccordionContent>
                  </li>
                ))}
              </ul>
            </AccordionItem>
          </Accordion>
        </li>
        ))}
      </ul>
    );
  };


  return (
    <div className='bg-gradient-to-t from-emerald-600 via-50% to-emerald-700 to-70%'>
      <div className="mt-3 h-full ">
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
              <>
              {renderAuthorList()}
              </> 
            )}
            <div>
              {renderPagination()}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default AuthorsPage;