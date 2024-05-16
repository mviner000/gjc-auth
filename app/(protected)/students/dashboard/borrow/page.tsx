"use client";

import { useCurrentUser } from '@/hooks/use-current-user';
import React, { useState, useEffect } from 'react';

interface User {
  email: string;
  studentId: number;
  image: string | null;
}

interface Book {
  id: number;
  title: string;
  thumbnail_url: string;
}

const StudentsDashBorrowPage = () => {
  const user = useCurrentUser();
  const [filteredBookCarts, setFilteredBookCarts] = useState<any[]>([]);
  const [booksMap, setBooksMap] = useState<Record<number, Book>>({});

  useEffect(() => {
    const fetchBookCarts = async () => {
      try {
        const responseCarts = await fetch('http://127.0.0.1:8000/api/bookcarts/');
        const dataCarts = await responseCarts.json();

        if (Array.isArray(dataCarts)) {
          const filteredCarts = dataCarts.filter((cart) => cart.student === user?.email);
          setFilteredBookCarts(filteredCarts);

          // Extract unique book IDs from filtered carts
          const bookIds = Array.from(new Set(filteredCarts.flatMap((cart) => cart.books)));

          // Fetch book details based on the extracted IDs
          const responseBooks = await fetch(`http://127.0.0.1:8000/api/books/?ids=${bookIds.join(',')}`);
          const dataBooks = await responseBooks.json();

          if (Array.isArray(dataBooks.results)) {
            // Create a map of book ID to book details for easy lookup
            const booksLookup: Record<number, Book> = {};
            dataBooks.results.forEach((book: Book) => {
              booksLookup[book.id] = book;
            });
            setBooksMap(booksLookup);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (user?.email) {
      fetchBookCarts();
    }
  }, [user?.email]);

  return (
    <div>
      <h1>Students Borrow Page</h1>
      <p>User Email: {user?.email}</p>
      <h2>Filtered Book Carts</h2>
      <ul>
        {filteredBookCarts.map((cart) => (
          <li key={cart.id}>
            Student: {cart.student}
            <ul>
              {cart.books.map((bookId: number) => (
                <li key={bookId}>
                  {booksMap[bookId] ? (
                    <>
                      <img
                        src={booksMap[bookId]?.thumbnail_url || 'https://via.placeholder.com/128x185/007bff/ffffff?text=Book'}
                        alt={booksMap[bookId]?.title || 'Book'}
                        style={{ width: '50px' }}
                      />

                      {booksMap[bookId].title}
                    </>
                  ) : (
                    `Book ID: ${bookId}`
                  )}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentsDashBorrowPage;
