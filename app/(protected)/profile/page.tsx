"use client";


import React, { useState, useEffect, MouseEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FidgetSpinner } from 'react-loader-spinner';

import { useCurrentUser } from '@/hooks/use-current-user';

import { BookCart } from '@/utils/types/bookcart';
import { Book } from '@/utils/types/authors';

import { Button } from '@/components/ui/button';
import UserAvatarInfo from '@/components/user-avatar-info';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"


const appUrl = process.env.NEXT_PUBLIC_APP;

const ProfilePage: React.FC = () => {
    const [bookCarts, setBookCarts] = useState<BookCart[]>([]);
    const [books, setBooks] = useState<Book[]>([]);
    const user = useCurrentUser();
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const router = useRouter();
    const [bookLoading, setBookLoading] = useState(false);

    useEffect(() => {
        const fetchBookCarts = async () => {
            try {
                const response = await axios.get(`${appUrl}/api/bookcarts`);
                const filteredBookCarts = response.data.filter((cart: BookCart) => cart.student === user?.email);
                // Sort the filteredBookCarts array in descending order based on created_at property
                filteredBookCarts.sort((a: BookCart, b: BookCart) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
                setBookCarts(filteredBookCarts);
            } catch (error) {
                setError('Error fetching bookcarts');
                console.error('Error fetching bookcarts:', error);
            }
        };


        const fetchBooks = async () => {
            try {
                const response = await axios.get(`${appUrl}/api/books/all`);
                setBooks(response.data);
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

    const getBookImage = (bookId: number) => {
        const book = books.find((book) => book.id === bookId);
        return book ? book.thumbnail_url : 'https://via.placeholder.com/128x185/007bff/ffffff?text=Book';
    };

    const handleReturn = async (id: number) => {
        try {
            await axios.patch(`${appUrl}/api/bookcarts/${id}/`, { set_to_return: true });
            const bookId = bookCarts.find((cart) => cart.id === id)?.books[0]; // assuming the first book ID in the cart
            await axios.patch(`${appUrl}/api/books/${bookId}/`, { stock_quantity: 1 }); // patch the stock quantity
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
            }, 3000);
            console.log('Book cart returned successfully!');
        } catch (error) {
            setError('Error returning book cart');
            console.error('Error returning book cart:', error);
        }
    };

    const handleViewBook = (e: MouseEvent<HTMLDivElement>, bookId: number) => {
        e.preventDefault();
        setBookLoading(true);
        router.push(`/auth-book/${bookId}`);
    };

    return (
        <>

            {bookLoading && (
                <div className="fixed inset-0 flex justify-center items-center bg-neutral-500/50 z-50">
                    <FidgetSpinner
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        ballColors={['#ff0000', '#00ff00', '#0000ff']}
                        backgroundColor="#F4442E"
                    />
                </div>
            )}

            <div className='container h-full static'>
                <UserAvatarInfo />
                <Breadcrumb className='mb-5'>
                    <BreadcrumbList>

                        <BreadcrumbItem>
                            <BreadcrumbLink href="/profile">To Return</BreadcrumbLink>
                        </BreadcrumbItem>

                        <BreadcrumbSeparator />

                        <BreadcrumbItem>
                            <BreadcrumbLink href="/profile/books-read">All Books Read</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                {success && <div className="text-green-500 mb-4">{success}</div>}
                <div className="mb-10">
                    <table className="mb-[200px] w-full border-collapse border border-gray-300">
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

                <div className='h-1'></div>
            </div>
        </>
    );
};

export default ProfilePage;
