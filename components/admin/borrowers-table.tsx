"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { ColumnDef } from '@tanstack/react-table';
import { CircleCheck, CircleX } from 'lucide-react';
import { DataTable } from './data-table';

interface Book {
  id: number;
  title: string;
  thumbnail_url: string;
}

interface BookCart {
  id: number;
  books: number[];
  student: string;
  is_borrowed_verified: boolean;
}

const appUrl = process.env.NEXT_PUBLIC_APP;

const BorrowersTable = () => {
  const [isPending, setIsPending] = useState(false);
  const [bookCarts, setBookCarts] = useState<BookCart[]>([]);
  const [bookTitlesWithImages, setBookTitlesWithImages] = useState<Record<number, { title: string; thumbnail_url: string }>>({});

  useEffect(() => {
    const fetchData = async () => {
      setIsPending(true);
      try {
        const response = await axios.get(`${appUrl}/api/unverified-bookcarts/`);
        setBookCarts(response.data);
      } catch (error) {
        console.error('Error fetching book carts:', error);
      }
      setIsPending(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchBookTitlesWithImages = async () => {
      const bookIds = bookCarts.flatMap((cart) => cart.books);
      const uniqueBookIds = Array.from(new Set(bookIds)); // Get unique book IDs

      const bookTitlesWithImagesMap: Record<number, { title: string; thumbnail_url: string }> = {};
      try {
        const response = await axios.get(`${appUrl}/api/books/`);
        const books = response.data.results as Book[];
        books.forEach((book) => {
          if (uniqueBookIds.includes(book.id)) {
            bookTitlesWithImagesMap[book.id] = {
              title: book.title,
              thumbnail_url: book.thumbnail_url,
            };
          }
        });
        setBookTitlesWithImages(bookTitlesWithImagesMap);
      } catch (error) {
        console.error('Error fetching book titles and images:', error);
      }
    };

    if (bookCarts.length > 0) {
      fetchBookTitlesWithImages();
    }
  }, [bookCarts]);

  const truncateString = (str: string, maxLength: number) => {
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + '...';
    }
    return str;
  };

  const handleVerifyBorrowing = async (cartId: number) => {
    try {
      const response = await axios.put(`${appUrl}api/bookcarts/${cartId}/`, {
        is_borrowed_verified: true // Update is_borrowed_verified to true
      });
      // Assuming successful update, update local state to reflect the change
      setBookCarts((prevBookCarts) =>
        prevBookCarts.map((cart) =>
          cart.id === cartId ? { ...cart, is_borrowed_verified: true } : cart
        )
      );
    } catch (error) {
      console.error('Error updating verification status:', error);
    }
  };

  const columns: ColumnDef<BookCart>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'student',
      header: 'Student',
    },
    {
      accessorKey: 'books',
      header: 'Books',
      cell: ({ row }) => {
        const bookIds = row.getValue('books') as number[];
        return (
          <div>
            {bookIds.map((bookId) => {
              const bookData = bookTitlesWithImages[bookId];
              if (bookData) {
                const { title, thumbnail_url } = bookData;
                return (
                  <div key={bookId} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                    <img
                      src={
                        thumbnail_url ||
                        'https://via.placeholder.com/128x185/007bff/ffffff?text=Book'
                      }
                      alt={`Thumbnail for ${row.getValue('title')}`}
                      style={{ width: '50px', height: 'auto' }}
                    />
                    <span>{truncateString(title, 30)}</span>
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>
        );
      },
    },
    {
      accessorKey: 'is_borrowed_verified',
      header: 'Borrowed Verified',
      cell: ({ row }) => (
        <div className="capitalize">
          {row.getValue('is_borrowed_verified') ? (
            <CircleCheck className="text-emerald-600" />
          ) : (
            <CircleX className="text-rose-400/80" />
          )}
        </div>
      ),
    },
    {
      header: 'Action',
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const cartId = row.getValue('id') as number;
        return (
          <button onClick={() => handleVerifyBorrowing(cartId)} disabled={isPending}>
            Verify
          </button>
        );
      },
    },
  ];

  return (
    <div className="h-full w-full">
      {isPending ? (
        <p>Loading...</p>
      ) : (
        <DataTable columns={columns} data={bookCarts} />
      )}
    </div>
  );
};

export default BorrowersTable;
