"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';

type Book = {
  id: number;
  title: string;
  thumbnail_url: string;
  // add other properties if needed
};

interface BookCart {
  id: number;
  books: number[];
  student: string;
  is_returned_verified: boolean;
  set_to_return: boolean;
}

const appUrl = process.env.NEXT_PUBLIC_APP;

const AcceptReturnersPage: React.FC = () => {
  const [filteredData, setFilteredData] = useState<BookCart[]>([]);
  const [bookData, setBookData] = useState<Record<number, Book>>({});
  const [is_returned_verified, setIsReturnedVerified] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await axios.get<Book[]>(`${appUrl}/api/books/all`);
        const bookDataMap = response.data.reduce((acc: Record<number, Book>, book: Book) => {
          acc[book.id] = book;
          return acc;
        }, {});
        setBookData(bookDataMap);
      } catch (error) {
        console.error('Error fetching book data:', error);
      }
    };

    fetchBookData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<BookCart[]>('http://127.0.0.1:8000/api/bookcarts');
        const filtered = response.data.filter((item: BookCart) => {
          return item.set_to_return === true && item.is_returned_verified === is_returned_verified;
        });
        setFilteredData(filtered);
      } catch (error) {
        setError('Error fetching data');
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [is_returned_verified, success]);

  const handleVerifyReturn = async (id: number) => {
    try {
      await axios.patch(`http://127.0.0.1:8000/api/bookcarts/${id}/`, {
        is_returned_verified: true,
      });
      setFilteredData((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, is_returned_verified: true } : item
        )
      );
      setSuccess('Return verified successfully');
      setTimeout(() => {
        setSuccess(null);
      }, 3000); // Clear success message after 3 seconds
    } catch (error) {
      setError('Error verifying return');
      console.error('Error updating data:', error);
    }
  };

  return (
    <div className="p-4 ">
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {success && <div className="text-green-500 mb-4">{success}</div>}
      <h1 className="text-2xl font-bold mb-4">Book Return Request</h1>
      <div className=''>
        <table className=" min-w-full divide-y divide-gray-200 outline outline-[1px] outline-slate-600 rounded-lg">
          <thead className="bg-gray-50 dark:bg-transparent dark:text-slate-400 ">
            <tr className="bg-transparent">
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Student</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Books</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Set to Return</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-transparent divide-y divide-slate-700">
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-black dark:text-slate-300">{item.student}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-black dark:text-slate-300">
                  {item.books.map((bookId) => (
                    <div key={bookId}>
                      <div className='flex gap-2 text-left'>
                        <img
                          src={bookData[bookId]?.thumbnail_url}
                          alt={bookData[bookId]?.title}
                          width={50}
                        />
                        <span>{bookData[bookId]?.title}</span>
                      </div>
                    </div>
                  ))}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-black dark:text-slate-300">{item.set_to_return ? 'Yes' : 'No'}</td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-black dark:text-slate-300">
                  <Button onClick={() => handleVerifyReturn(item.id)}>Verify Return</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AcceptReturnersPage;