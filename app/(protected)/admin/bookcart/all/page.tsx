"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { CircleCheckBig, CircleX } from 'lucide-react';
import relativeTime from 'dayjs/plugin/relativeTime';

import { Book } from '@/utils/types/authors';
import { BookCart } from '@/utils/types/bookcart';

import { Button } from '@/components/ui/button';


// Extend dayjs with the relativeTime plugin
dayjs.extend(relativeTime);

const appUrl = process.env.NEXT_PUBLIC_APP;

const BookCartTable: React.FC = () => {
    const [bookCarts, setBookCarts] = useState<BookCart[]>([]);
    const [bookTitlesWithImages, setBookTitlesWithImages] = useState<Record<number, { title: string; thumbnail_url: string }>>(
        {}
    );

    // Fetch all BookCarts and their related Book data on component mount
    useEffect(() => {
        const fetchBookCarts = async () => {
            try {
                const bookCartsResponse = await axios.get<BookCart[]>(`${appUrl}/api/bookcarts/`);
                const bookCarts = bookCartsResponse.data;

                bookCarts.sort((a: BookCart, b: BookCart) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());


                const bookIds = bookCarts.flatMap((cart) => cart.books);
                const uniqueBookIds = Array.from(new Set(bookIds)); // Get unique book IDs

                const bookTitlesWithImagesMap: Record<number, { title: string; thumbnail_url: string }> = {};

                // Instead of using booksResponse.data.results, directly use booksResponse.data
                const booksResponse = await axios.get<Book[]>(`/api/books/all`);
                const books = booksResponse.data; // Accessing the response data directly

                // Adjust the logic to handle the array directly
                books.forEach((book: Book) => { // Annotate the type of 'book' parameter explicitly
                    if (uniqueBookIds.includes(book.id)) {
                        bookTitlesWithImagesMap[book.id] = {
                            title: book.title,
                            thumbnail_url: book.thumbnail_url,
                        };
                    }
                });



                setBookCarts(bookCarts);
                setBookTitlesWithImages(bookTitlesWithImagesMap);
            } catch (error) {
                console.error('Error fetching book carts and related books:', error);
            }
        };

        fetchBookCarts();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`${appUrl}/api/bookcarts/${id}/`);
            setBookCarts((prev) => prev.filter((bookCart) => bookCart.id !== id));
        } catch (error) {
            console.error('Error deleting book cart:', error);
        }
    };

    const formatCreatedAt = (createdAt: string) => {
        return dayjs().to(dayjs(createdAt)); // Format date using Day.js to show "time ago"
    };

    return (
        <div className='p-10'>
            <table className="min-w-full divide-y divide-gray-200 outline outline-[1px] outline-slate-600 rounded-lg">
                <thead className="bg-gray-50 dark:bg-transparent dark:text-slate-400 ">
                    <tr>
                        {/* <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500  dark:text-slate-400 uppercase tracking-wider">
                            ID
                        </th> */}
                        <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                            Student
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                            Borrowed Verified
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                            Returned Verified
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                            Created Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                            Books
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-transparent divide-y divide-slate-700">
                    {bookCarts.map((bookCart) => (
                        <tr key={bookCart.id}>
                            {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-black dark:text-slate-300">{bookCart.id}</td> */}
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-black dark:text-slate-300">{bookCart.student}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-black dark:text-slate-300">{bookCart.is_borrowed_verified ? <CircleCheckBig className='text-emerald-500' /> : <CircleX className='text-red-400' />}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-black dark:text-slate-300">{bookCart.is_returned_verified ? <CircleCheckBig className='text-emerald-500' /> : <CircleX className='text-red-400' />}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-black dark:text-slate-300">{formatCreatedAt(bookCart.created_at)}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    {bookCart.books.map((bookId) => (
                                        <>
                                            <img
                                                key={bookId}
                                                src={bookTitlesWithImages[bookId]?.thumbnail_url}
                                                alt={bookTitlesWithImages[bookId]?.title}
                                                className="mr-2 w-12 h-12 object-cover"
                                            />
                                            {bookTitlesWithImages[bookId]?.title && bookTitlesWithImages[bookId].title.length > 15 ? `${bookTitlesWithImages[bookId].title.substring(0, 15)}...` : bookTitlesWithImages[bookId]?.title}


                                        </>
                                    ))}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-black dark:text-slate-300">
                                <Button onClick={() => handleDelete(bookCart.id)}>Delete</Button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookCartTable;
