'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookDataTable from '@/components/books/book-data-table';
import PaginationControls from '@/components/pagination-controls';

interface Book {
  id: number;
  title: string;
  author_name: string;
  subject_name: string;
  thumbnail_url: string;
  publisher: string;
  pubplace: string;
  pagination: string;
  edition: string | null;
}

const BookTable: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBooks, setSelectedBooks] = useState<number[]>([]);
  const defaultStudent = 'John Doe';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/books/');
        setBooks(response.data.results); // Assuming results is an array of Book objects
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchData();
  }, []);

  const handleAddToCart = async (bookId: number) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/bookcarts/', {
        student: defaultStudent,
        books: [bookId]
      });
      console.log('Book added to cart:', response.data);
      // Optionally update UI or show a success message
    } catch (error) {
      console.error('Error adding book to cart:', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div className='w-full'>
        <BookDataTable />
    </div>
  );
};

export default BookTable;
