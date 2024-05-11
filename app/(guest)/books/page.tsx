"use client";

import { useRef, useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Button } from '@/components/ui/button';
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { playlists } from "@/actions/playlists"

import BookCard from '@/components/books/book-card';
import Pagination from '@/components/pagination';
import { Input } from '@/components/ui/input';
import { Sidebar } from '@/components/sidebar';
import { FidgetSpinner } from 'react-loader-spinner';
import BreadcrumbComponent from '@/components/breadcrumb';
import CartSheet from '@/components/cart-sheet';

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
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const pageNumber = parseInt(inputPage, 10);
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber); // Update currentPage with the entered valid page number
    }
    setInputPage(''); // Clear input field after submission
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputPage(e.target.value); // Update inputPage state with user input
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
  
    const updatedTitles = [...bookTitles, title];
    localStorage.setItem('bookTitles', JSON.stringify(updatedTitles));
    setBookTitles(updatedTitles);
    setBookTitlesCount(updatedTitles.length);
  
    // Save thumbnail_url to localStorage
    localStorage.setItem(`thumbnail_${title}`, thumbnailUrl);
  
    toast({
      title: "Yehey! Congratulations",
      description: `"${title}" successfully added`,
      action: <ToastAction altText="Go to schedule to undo">Close</ToastAction>,
    });
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
                <BreadcrumbComponent currentPage={currentPage} />
                  <div className='mr-16'>
                  <CartSheet bookTitles={bookTitles} onDeleteTitle={handleDeleteBookTitle} handleEmptyBookCart={handleEmptyBookCart} />
                  </div>
                </div>
                <div className="space-y-6 mb-5">
                  <h2 className="text-2xl font-bold">BookPage <span className="bg-purple-100 text-purple-800 text-lg font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-purple-400 border border-purple-400">{currentPage}</span></h2>
                  {loading? (
                    <div className="h-full">
                      <FidgetSpinner />
                    </div>
                  ) : (
                    <div>
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
                      <div className="my-5 flex justify-left items-center">
                        <Pagination
                          totalPages={totalPages}
                          currentPage={currentPage}
                          onPageChange={handlePageChange}
                        />
                      </div>
                      <ul>
                        {books.map((book) => (
                          <li key={book.id}>
                            <BookCard book={book} onAddToCart={handleAddToCart} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              <div className="mt-4 flex justify-left items-center">
                <Pagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
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

export default BookPage;
