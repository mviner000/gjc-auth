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
import HomeWrapper from '@/components/homepage/home-wrapper';

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

const AuthBookPage: React.FC = () => {
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
      <HomeWrapper />

    </>
  );
};

export default AuthBookPage;
