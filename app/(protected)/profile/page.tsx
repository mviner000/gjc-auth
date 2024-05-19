"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { useCurrentUser } from '@/hooks/use-current-user';
import UserAvatarInfo from '@/components/user-avatar-info';

interface BookCart {
    id: number;
    books: number[];
    student: string;
    is_borrowed_verified: boolean;
    borrowed_verified_by: string | null;
    is_returned_verified: boolean;
    set_to_return: boolean;
    returned_verified_by: string | null;
    created_at: string;
    updated_at: string;
}

interface Book {
    id: number;
    title: string;
}

const appUrl = process.env.NEXT_PUBLIC_APP;

const ProfilePage: React.FC = () => {
    const [bookCarts, setBookCarts] = useState<BookCart[]>([]);
    const [books, setBooks] = useState<Book[]>([]);
    const user = useCurrentUser();
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    useEffect(() => {
        const fetchBookCarts = async () => {
            try {
                const response = await axios.get(`${appUrl}/api/bookcarts`);
                const filteredBookCarts = response.data.filter((cart: BookCart) => cart.student === user?.email);
                setBookCarts(filteredBookCarts);
            } catch (error) {
                setError('Error fetching bookcarts');
                console.error('Error fetching bookcarts:', error);
            }
        };

        const fetchBooks = async () => {
            try {
                const response = await axios.get(`${appUrl}/api/books`);
                setBooks(response.data.results);
            } catch (error) {
                setError('Error fetching books');
                console.error('Error fetching books:', error);
            }
        };

        if (user?.email) {
            fetchBookCarts();
            fetchBooks();
        }
    }, [user?.email, success]);

    const getBookTitle = (bookId: number) => {
        const book = books.find((book) => book.id === bookId);
        return book ? book.title : 'Unknown Title';
    };

    const handleReturn = async (id: number) => {
        try {
            await axios.patch(`${appUrl}/api/bookcarts/${id}/`, { set_to_return: true });
            const updatedBookCarts = bookCarts.map((cart) => {
                if (cart.id === id) {
                    return { ...cart, set_to_return: true };
                }
                return cart;
            });
            setBookCarts(updatedBookCarts);
            setSuccess('Book cart returned successfully');
            setTimeout(() => {
                setSuccess(null);
            }, 3000); // Clear success message after 3 seconds
            console.log('Book cart returned successfully!');
        } catch (error) {
            setError('Error returning book cart');
            console.error('Error returning book cart:', error);
        }
    };

    return (
        <>
            <div className='container'>
                <UserAvatarInfo />
                {error && <div className="text-red-500 mb-4">{error}</div>}
                {success && <div className="text-green-500 mb-4">{success}</div>}
                <div className="mt-10">
                    <table className="w-full border-collapse border border-gray-300">
                        <thead className="bg-transparent">
                            <tr>
                                <th className="border border-gray-300 dark:text-white px-4 py-2">ID</th>
                                <th className="border border-gray-300 dark:text-white px-4 py-2">Student</th>
                                <th className="border border-gray-300 dark:text-white px-4 py-2">Books</th>
                                {!bookCarts.some((cart) => cart.set_to_return) && (
                                    <th className="border border-gray-300 dark:text-white px-4 py-2">Actions</th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {bookCarts.map((cart) => (
                                <tr key={cart.id} className="bg-transparent">
                                    <td className="border border-gray-300 dark:text-white px-4 py-2">{cart.id}</td>
                                    <td className="border border-gray-300 dark:text-white px-4 py-2">{cart.student}</td>
                                    <td className="border border-gray-300 dark:text-white px-4 py-2">
                                        {cart.books.map((bookId) => getBookTitle(bookId)).join(', ')}
                                    </td>
                                    {!cart.set_to_return && cart.is_borrowed_verified && (
                                        <td className="border border-gray-300 px-4 py-2">
                                            <Button onClick={() => handleReturn(cart.id)}>Return</Button>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </>
    );
};

export default ProfilePage;
