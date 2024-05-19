"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

interface Book {
    id: number;
    title: string;
    author_code: number;
    author_name: string;
    subject1_code: number;
    subject_name: string;
    thumbnail_url: string;
    publisher: string;
    pubplace: string;
    pagination: string;
    edition: string | null;
}

interface BookCart {
    id: number;
    student: string;
    books: number[];
    created_at: string;
    is_borrowed_verified: boolean | null;
    is_returned_verified: boolean | null;
}

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

                const bookIds = bookCarts.flatMap((cart) => cart.books);
                const uniqueBookIds = Array.from(new Set(bookIds)); // Get unique book IDs

                const bookTitlesWithImagesMap: Record<number, { title: string; thumbnail_url: string }> = {};

                const booksResponse = await axios.get<{ results: Book[] }>(`${appUrl}/api/books/`);
                const books = booksResponse.data.results;

                books.forEach((book) => {
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
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Student
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Borrowed Verified
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Returned Verified
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Books
                    </th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {bookCarts.map((bookCart) => (
                    <tr key={bookCart.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{bookCart.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{bookCart.student}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{bookCart.is_borrowed_verified ? 'Yes' : 'No'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{bookCart.is_returned_verified ? 'Yes' : 'No'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCreatedAt(bookCart.created_at)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                                {bookCart.books.map((bookId) => (
                                    <img
                                        key={bookId}
                                        src={bookTitlesWithImages[bookId]?.thumbnail_url}
                                        alt={bookTitlesWithImages[bookId]?.title}
                                        className="w-12 h-12 object-cover"
                                    />
                                ))}
                            </div>
                        </td>

                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default BookCartTable;
