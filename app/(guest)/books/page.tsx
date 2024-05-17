"use client";

import { useRef, useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { playlists } from "@/actions/playlists"

import BookCard from '@/components/books/book-card';
import { Sidebar } from '@/components/sidebar';
import { FidgetSpinner } from 'react-loader-spinner';
import BreadcrumbComponent from '@/components/breadcrumb';
import CartSheet from '@/components/cart-sheet';
import PaginationControls from '@/components/pagination-controls';
import { TopTags } from '@/components/top-tags';
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
import { Button } from "@/components/ui/button";
import Link from 'next/link';

interface Book {
  id: string;
  title: string;
  author_name: string;
  subject_name: string;
  thumbnail_url: string;
  publisher: string;
  pubplace: string;
  pagination: string;
  edition: string;
}

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
  const [inputPage, setInputPage] = useState<string>('');
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);



  useEffect(() => {
    fetchBooks(currentPage);
  }, [currentPage]);


  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      // Code that should run only once when the component mounts
      const storedTitlesJSON = localStorage.getItem('bookTitles');
      if (storedTitlesJSON) {
        try {
          const storedTitles = JSON.parse(storedTitlesJSON.trim()); // Trim whitespace characters
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

      setBooks(results);
      setTotalPages(totalPagesCount);
      setLoading(false); // Set loading state to false after fetching
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false); // Always set loading state to false after fetching
    }
  };

  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);
  };

  const handleAddToCart = (title: string, thumbnailUrl: string) => {
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

      <div className=''>
        <div className="mt-3 h-full ">
          <div className="grid lg:grid-cols-5">
            <Sidebar playlists={playlists} className="hidden lg:block" />
            <div className="col-span-3 lg:col-span-4 lg:border-l">
              <div className="h-full px-4 py-6 lg:px-8">
                <div className='flex justify-between'>
                  <BreadcrumbComponent currentPage={currentPage} currentPageText="Books" />
                  <div className='mr-16'>
                    <CartSheet bookTitles={bookTitles} onDeleteTitle={handleDeleteBookTitle} handleEmptyBookCart={handleEmptyBookCart} />
                  </div>
                </div>
                <div className='py-3 mb-2'>

                  <TopTags />
                </div>
                <div className="space-y-6 mb-5">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default BookPage;
