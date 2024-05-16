'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCurrentUser } from '@/hooks/use-current-user';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { CarouselItem } from '@/components/ui/carousel';
import { table } from 'console';

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

interface User {
  email: string;
  studentId: number;
  image: string | null;
}

const appUrl = process.env.NEXT_PUBLIC_APP;

const StudentBorrowPage: React.FC = () => {
  const user = useCurrentUser();
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBooks, setSelectedBooks] = useState<number[]>([]);

  const defaultStudent = user?.email;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${appUrl}/api/books/`);
        setBooks(response.data.results); // Assuming results is an array of Book objects
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchData();
  }, []);

  const handleAddToCart = async (bookId: number) => {
    try {
      const response = await axios.post(`${appUrl}/api/bookcarts/`, {
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

  const IMAGES = [
    "https://i.imgur.com/6hbUxqX.jpg",
    "https://i.imgur.com/whmZ1n6.jpg",
    "https://i.imgur.com/sDD32EB.jpg",
    "https://i.imgur.com/gvZLp1w.jpg",
    "https://i.imgur.com/nFOKKTS.jpg",
  ];

  const defaultImage = `https://res.cloudinary.com/dqpzvvd0v/image/upload/fl_preserve_transparency/v1715859935/user-avatar_jyav0n.jpg?_s=public-apps`;

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