"use client";

import { useRef, useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { PackagePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ReactPaginate from 'react-paginate';

interface Book {
  id: number;
  title: string;
  author_code: string;
  author_name: string;
  subject1_code: string;
  subject_name: string;
}

const BookPage: React.FC = () => {
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

  const addBookTitleToLocalStorage = (title: string) => {
    if (bookTitles.includes(title)) {
      alert(`"${title}" already added to storage!`);
      return;
    }
  
    const updatedTitles = [...bookTitles, title];
    localStorage.setItem('bookTitles', JSON.stringify(updatedTitles));
    setBookTitles(updatedTitles);
    setBookTitlesCount(updatedTitles.length);
    alert(`"${title}" added to local storage!`);
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

  const handlePageClick = (data: { selected: number }): void => {
    setCurrentPage(data.selected + 1);
  };

  return (
    <div className="container mx-auto h-full mt-3">
      <h2 className="text-2xl font-bold mb-4">BookPage</h2>

      <div>
        <h3 className="text-xl font-bold mb-2">Book Titles from Local Storage: {bookTitlesCount}</h3>
        <ul>
          {bookTitles.map((title, index) => (
            <li key={index}>{title}</li>
          ))}
        </ul>
      </div>

      <Button variant="destructive" onClick={() => {
        localStorage.removeItem('bookTitles');
        setBookTitles([]);
        setBookTitlesCount(0);
      }}>Delete All Book Titles</Button>

      <Button onClick={() => {
        const storedTitles = JSON.parse(localStorage.getItem('bookTitles') || '[]');
        console.log('Book Titles from Local Storage:', storedTitles.map((title: string) => title));
      }}>Show Book Titles from Local Storage</Button>

      <ul>
        {books.map((book) => (
          <li key={book.id} className="mb-2">
            <div className='flex gap-2'>
              {book.title} {book.author_code} {book.author_name} {book.subject1_code} {book.subject_name}
              <Button variant="destructive">Delete</Button>
              <Button variant="outline" size="icon" onClick={() => addBookTitleToLocalStorage(book.title)}>
                <PackagePlus className="h-[1rem] w-[1rem]" />
              </Button>
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

export default BookPage;
