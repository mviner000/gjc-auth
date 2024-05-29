"use client";

import { useRef, useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Book } from '@/utils/types/books';
import { FidgetSpinner } from 'react-loader-spinner';
import Link from 'next/link';

import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import BookCard from '@/components/books/book-card';
import { Sidebar } from '@/components/sidebar';
import BreadcrumbComponent from '@/components/breadcrumb';
import CartSheet from '@/components/cart-sheet';
import PaginationControls from '@/components/pagination-controls';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { SideBarRight } from '@/components/sidebar-right';
import { playlists } from "@/actions/playlists"

const appUrl = process.env.NEXT_PUBLIC_APP;

const BookPage: React.FC = () => {
  const { toast } = useToast()
  const hasMounted = useRef(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [bookTitlesCount, setBookTitlesCount] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [bookTitles, setBookTitles] = useState<string[]>([]);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [totalBooksCount, setTotalBooksCount] = useState<number>(0);


  useEffect(() => {
    fetchBooks(currentPage);
  }, [currentPage]);


  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      const storedTitlesJSON = localStorage.getItem('bookTitles');
      if (storedTitlesJSON) {
        try {
          const storedTitles = JSON.parse(storedTitlesJSON.trim());
          setBookTitles(storedTitles);
          setBookTitlesCount(storedTitles.length);
        } catch (error) {
          console.error('Error parsing JSON from localStorage:', error);
        }
      }
    }
  }, []);

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

  const fetchBooks = async (page: number): Promise<void> => {
    setLoading(true);
    try {
      const response: AxiosResponse<{ count: number; results: Book[] }> = await axios.get(
        `${appUrl}api/books/?page=${page}`
      );

      const { count, results } = response.data;
      const totalPagesCount: number = Math.ceil(count / 10);

      setTotalBooksCount(count);
      setBooks(results);
      setTotalPages(totalPagesCount);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);
  };

  const handleAddToCart = (title: string, thumbnailUrl: string) => {
    if (bookTitles.includes(title)) {
      toast({
        title: "Warning!",
        variant: "destructive",
        description: `${title} already added to wishlist`,
        action: <ToastAction altText="Go to schedule to undo">Close</ToastAction>,
      });
      return;
    }

    if (bookTitlesCount >= 6) {
      setIsAlertDialogOpen(true);
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

  const renderBookList = () => {
    return (
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <BookCard
              book={book}
              onAddToCart={handleAddToCart}
              setBookTitlesCount={setBookTitlesCount}
            />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>

      <div className="grid lg:grid-cols-7">
        <Sidebar playlists={playlists} className="hidden lg:block" />
        <div className="col-span-3 lg:col-span-5 lg:border-l lg:border-r">
          <div className="h-full px-4 lg:px-8">
            <div className='flex justify-between'>
              <BreadcrumbComponent currentPage={currentPage} currentPageText={`Page ${currentPage}`} />
              <div className='mr-16'>
                <CartSheet bookTitles={bookTitles} onDeleteTitle={handleDeleteBookTitle} handleEmptyBookCart={handleEmptyBookCart} />
              </div>
            </div>
            <div className="space-y-6 mb-5">
              <h1 className='text-4xl mb-5 font-semibold'>Total Books in GJCLibrary<span className="text-orange-400 dark:text-yellow-200"> ({totalBooksCount})</span></h1>
              <h2 className="text-2xl font-bold">BookPage <span className="bg-purple-100 text-purple-800 text-lg font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-purple-400 border border-purple-400">{currentPage}</span></h2>
              {loading ? (
                <div className="h-full">
                  <FidgetSpinner />
                </div>
              ) : (
                <div>
                  <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Please log in to continue further?</AlertDialogTitle>
                        <AlertDialogDescription>
                          <div className="flex items-center p-4 mb-4 text-sm text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 dark:border-yellow-800" role="alert">
                            <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            <span className="sr-only">Info</span>
                            <div>
                              <span className="font-medium">Warning alert!</span> You Reached maximum books saved.
                            </div>
                          </div>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setIsAlertDialogOpen(false)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction>
                          <Link className="hover:text-blue-500" href="/auth/login">Continue to login</Link>
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  {renderPagination()}
                  {renderBookList()}
                </div>
              )}
            </div>
            <div>
              {renderPagination()}
            </div>
          </div>
        </div>
        <SideBarRight className="hidden lg:block" />
      </div>
    </>
  );
};

export default BookPage;
