"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Book {
  id: number;
  title: string;
  author: string;
}

interface BookCart {
  id: number;
  student: string;
  books: Book[];
  is_borrowed_verified: boolean;
}

const appUrl = process.env.NEXT_PUBLIC_APP_URL;

const AllPage: React.FC = () => {
  const [bookCarts, setBookCarts] = useState<BookCart[]>([]);

  useEffect(() => {
    const fetchBookCarts = async () => {
      try {
        const response = await axios.get<BookCart[]>(`${appUrl}/api/bookcart/`);
        setBookCarts(response.data);
      } catch (error) {
        console.error('Error fetching book carts:', error);
      }
    };

    fetchBookCarts();
  }, []);

  return (
    <div>
      <h1>All Book Carts</h1>
      {bookCarts.map((cart) => (
        <div key={cart.id} style={{ marginBottom: '20px' }}>
          <p>Student: {cart.student}</p>
          <p>Books:</p>
          <ul>
            {cart.books.map((book) => (
              <li key={book.id}>
                {book.title} by {book.author}
              </li>
            ))}
          </ul>
          <p>Borrowed and verified: {cart.is_borrowed_verified ? 'Yes' : 'No'}</p>
        </div>
      ))}
    </div>
  );
};

export default AllPage;
