"use client";

import { useRef, useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { BookText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import BookCart from '@/components/books/book-cart';
import BookCard from '@/components/books/book-card';
import Pagination from '@/components/books/pagination';

interface Book {
  id: number;
  title: string;
  author_code: string;
  author_name: string;
  subject1_code: string;
  subject_name: string;
}

const BookPage: React.FC = () => {
  const { toast } = useToast()
  const hasMounted = useRef(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [bookTitlesCount, setBookTitlesCount] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [bookTitles, setBookTitles] = useState<string[]>([]);

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

  const fetchBooks = async (page: number): Promise<void> => {
    try {
      const response: AxiosResponse<{ count: number; results: Book[] }> = await axios.get(
        `http://127.0.0.1:8000/api/books/?page=${page}`
      );

      const { count, results } = response.data;
      const totalPagesCount: number = Math.ceil(count / 10);

      setBooks(results);
      setTotalPages(totalPagesCount);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };
  
  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);
  };

  const handleAddToCart = (title: string) => {
    if (bookTitles.includes(title)) {
      // Display a toast notification
      toast({
        title: "Warning!",
        variant: "destructive",
        description: `"${title}" already added to storage`,
        action: <ToastAction altText="Goto schedule to undo">Close</ToastAction>,
      });
      return;
    }
  
    const updatedTitles = [...bookTitles, title];
    localStorage.setItem('bookTitles', JSON.stringify(updatedTitles));
    setBookTitles(updatedTitles);
    setBookTitlesCount(updatedTitles.length);
    toast({
      title: "Yehey! Congratulations",
      description: `"${title}" sucessfully added`,
      action: <ToastAction altText="Goto schedule to undo">Close</ToastAction>,
    });
  };

  return (
    <div className="container mx-auto h-full mt-3">
      <h2 className="text-2xl font-bold mb-4">BookPage</h2>
      <Sheet>
      <SheetTrigger asChild>
        <button type="button" className="outline-0 shadow-md relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800  focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <BookText />
          <span className="sr-only">Notifications</span>
          <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border border-white rounded-full -top-2 -end-2 dark:border-gray-900">{bookTitlesCount}</div>
        </button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Book Cart {bookTitlesCount}</SheetTitle>
          <SheetDescription>
            These are all the books from your wishlist
          </SheetDescription>
        </SheetHeader>
        <BookCart bookTitles={bookTitles} onDeleteTitle={handleDeleteBookTitle} />
        <SheetFooter className='gap-28'>
          {bookTitles.length > 0 && ( 
            <Button variant="destructive" onClick={() => {
              localStorage.removeItem('bookTitles');
              setBookTitles([]);
              setBookTitlesCount(0);
            }}>Empty BookCart</Button>
          )}
          <SheetClose asChild>
            {bookTitles.length > 0 && ( 
              <Button type="submit">Proceed</Button>
            )}
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
    <ul>
      {books.map((book) => (
        <BookCard key={book.id} book={book} onAddToCart={handleAddToCart} />
      ))}
    </ul>
      <div className="mt-4 flex justify-left items-center pb-10">
        <Pagination pageCount={totalPages} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default BookPage;
