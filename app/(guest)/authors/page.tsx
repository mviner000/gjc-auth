// page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FidgetSpinner } from 'react-loader-spinner';

import { Author } from '@/utils/types/authors';

import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

import BreadcrumbComponent from '@/components/breadcrumb';
import PaginationControls from '@/components/pagination-controls';
import CartSheet from '@/components/cart-sheet';
import AuthorCard from '@/components/authors/author-card';


const appUrl = process.env.NEXT_PUBLIC_APP;

const AuthorsPage: React.FC = () => {
  const { toast } = useToast()
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [bookTitlesCount, setBookTitlesCount] = useState<number>(0);
  const [bookTitles, setBookTitles] = useState<string[]>([]);
  const [totalAuthorsCount, setTotalAuthorsCount] = useState<number>(0);

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
      setTotalAuthorsCount(count);
      setTotalPages(totalPagesCount);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching authors:', error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
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

  const handleAddToCart = (title: string, thumbnailUrl: string | null) => {
    if (bookTitles.includes(title)) {
      // Display a toast notification for duplicate entry
      toast({
        title: "Warning!",
        variant: "destructive",
        description: `${title} already added to wishlist`,
        action: <ToastAction altText="Go to schedule to undo">Close</ToastAction>,
      });
      return;
    }

    const updatedTitles = [...bookTitles, title];
    localStorage.setItem('bookTitles', JSON.stringify(updatedTitles));
    setBookTitles(updatedTitles);
    setBookTitlesCount(updatedTitles.length);

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
          <AuthorCard
            key={author.id}
            author={author}
            handleAddToCart={handleAddToCart}
          />
        ))}
      </ul>
    );
  };

  return (
    <>
      <div className='flex justify-between'>
        <BreadcrumbComponent currentPage={currentPage} currentPageText="Authors" />
        <div className='mr-16'>
          <CartSheet bookTitles={bookTitles} onDeleteTitle={handleDeleteBookTitle} handleEmptyBookCart={handleEmptyBookCart} />
        </div>
      </div>
      <div className='mb-2'>
      </div>
      <h1 className='text-4xl mb-5 font-semibold'>Total Authors in GJCLibrary<span className="text-orange-400 dark:text-yellow-200"> ({totalAuthorsCount})</span></h1>
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
    </>
  );
};

export default AuthorsPage;