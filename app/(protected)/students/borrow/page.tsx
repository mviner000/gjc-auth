'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

const StudentBorrowPage: React.FC = () => {
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
    <div>
      <h1>All Books</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Thumbnail</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author_name}</td>
              <td>
                <img src={book.thumbnail_url} alt={book.title} style={{ maxWidth: '150px' }} />
              </td>
              <td>
                <button onClick={() => handleAddToCart(book.id)}>Add to Cart</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentBorrowPage;
