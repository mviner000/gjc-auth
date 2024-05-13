"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';

interface Book {
  id: number;
  title: string;
  author_code: string;
}

interface FormData {
  student: string;
  books: number[]; // Use an array of book IDs instead of strings
  is_borrowed_verified: boolean;
}

interface BookCart {
  id: number;
  student: string;
  books: number[]; // Example: Array of book IDs
  is_borrowed_verified: boolean;
}

const BookCartForm: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm<FormData>();
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get<any>('http://127.0.0.1:8000/api/books/');
        console.log('Fetched books:', response.data); // Log fetched data for inspection
  
        // Assuming 'results' is the array containing books
        const booksData = response.data.results; // Extract 'results' array from response
  
        setBooks(booksData); // Set 'books' state with the extracted array of books
      } catch (error) {
        console.error('Error fetching books:', error);
        setBooks([]); // Set books to empty array on error
      }
    };
  
    fetchBooks();
  }, []);
  
  
  const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement>, bookId: number) => {
    const isChecked = event.target.checked;

    setSelectedIds((prevSelectedIds) => {
      if (isChecked) {
        return [...prevSelectedIds, bookId]; // Add bookId to selectedIds
      } else {
        return prevSelectedIds.filter((id) => id !== bookId); // Remove bookId from selectedIds
      }
    });
  };

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    try {
      console.log('Form Data to be sent:', formData); // Log the formData before sending
  
      const response = await axios.post<BookCart>('http://127.0.0.1:8000/api/bookcart/', formData);
      console.log('New BookCart added:', response.data);
      reset(); // Reset the form after successful submission
    } catch (error) {
      console.error('Error adding new BookCart:', error);
    }
  };
  

  return (
    <div>
      <h2>Add New BookCart</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Student:</label>
          <input type="text" {...register('student', { required: true })} />
          {errors.student && <span>This field is required</span>}
        </div>
        <div>
          <h2>Select Books</h2>
          {books.length > 0 ? (
            books.map((book) => (
              <div key={book.id}>
                <input
                  type="checkbox"
                  id={`book-${book.id}`}
                  value={book.id}
                  onChange={(event) => handleSelectChange(event, book.id)}
                  checked={selectedIds.includes(book.id)}
                />
                <label htmlFor={`book-${book.id}`}>{book.title}</label>
              </div>
            ))
          ) : (
            <p>No books available</p>
          )}
        </div>
        <div>
          <label>Borrowed and Verified:</label>
          <input type="checkbox" {...register('is_borrowed_verified')} />
        </div>
        <button type="submit">Add BookCart</button>
      </form>
    </div>
  );
};

export default BookCartForm;
