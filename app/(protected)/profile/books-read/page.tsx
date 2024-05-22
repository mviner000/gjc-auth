"use client";


import React, { useState, useEffect, MouseEvent } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { useCurrentUser } from '@/hooks/use-current-user';
import Footer from '@/components/footer';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FidgetSpinner } from 'react-loader-spinner';

import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
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
    thumbnail_url: string;
}

const appUrl = process.env.NEXT_PUBLIC_APP;

const ProfileBooksRead: React.FC = () => {
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
                {error && <div className="text-red-500 mb-4">{error}</div>}
                {success && <div className="text-green-500 mb-4">{success}</div>}
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
                <div className="mb-10">
                    <div className="space-y-3 grid grid-cols-1 xxs:grid-cols-2 xs:grid-cols-2 md:grid-cols-5 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
                        {bookCarts.map((cart: BookCart) => (
                            <div key={cart.id} className="bg-transparent">
                                {cart.books.map((bookId) => (
                                    <div key={bookId} className="cursor-pointer shadow-md dark:shadow-none bg-white dark:bg-transparent rounded-md p-0" onClick={(e) => handleViewBook(e, bookId)}>
                                        <div className="dark:text-slate-300 px-4 py-2">
                                            {getBookTitle(bookId)}
                                        </div>
                                        <div className="px-4 py-2">
                                            <Image
                                                src={getBookImage(bookId)}
                                                width={136}
                                                height={56}
                                                alt="book_image"
                                                className="rounded-md w-auto xxs:size-38 md:w-48 h-56 object-cover transition-all hover:scale-105"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                <div className='h-1'></div>
            </div>
        </>
    );
};

export default ProfileBooksRead;
