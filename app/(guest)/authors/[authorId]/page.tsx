"use client";

import React, { useState, useEffect, MouseEvent } from 'react';
import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { FidgetSpinner } from 'react-loader-spinner';

import { Author } from '@/utils/types/authors';

import BreadcrumbComponent from '@/components/breadcrumb';
import CartSheet from '@/components/cart-sheet';


const appUrl = process.env.NEXT_PUBLIC_APP;

const AuthorDetails = () => {
    const pathname = usePathname();
    const id = parseInt(pathname.split("/").pop()!);
    const [author, setauthor] = useState<Author | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [bookTitles, setBookTitles] = useState<string[]>([]);
    const [bookTitlesCount, setBookTitlesCount] = useState<number>(0);

    const router = useRouter();
    const [bookLoading, setBookLoading] = useState(false);

    useEffect(() => {
        getauthor(id);
    }, [id]);

    const getauthor = async (id: number) => {
        try {
            const response = await axios.get(`${appUrl}/api/authors/${id}`);
            setauthor(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };


    const handleDeleteBookTitle = (titleToRemove: string) => {
        const updatedTitles = bookTitles.filter((title) => title !== titleToRemove);
        localStorage.setItem('bookTitles', JSON.stringify(updatedTitles));
        setBookTitles(updatedTitles);
        setBookTitlesCount(updatedTitles.length);
    };

    const handleEmptyBookCart = () => {
        setBookTitles([]);
        setBookTitlesCount(0);
        localStorage.removeItem('bookTitles');
    };

    const handleViewBook = (e: MouseEvent<HTMLDivElement>, bookId: number) => {
        e.preventDefault();
        setBookLoading(true);
        router.push(`/auth-book/${bookId}`);
    };


    if (!author) return <div>Loading...</div>;

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
            <div className="h-full px-4 lg:px-8">
                <div className='flex justify-between'>
                    <BreadcrumbComponent currentPage={currentPage} currentPageHead="Authors" currentPageHeadLink="/authors" currentPageText={author.author_name} />
                    <div className='mr-16'>
                        <CartSheet bookTitles={bookTitles} onDeleteTitle={handleDeleteBookTitle} handleEmptyBookCart={handleEmptyBookCart} />
                    </div>
                </div>


                <h1 className='text-4xl mb-5 font-semibold'>{author.author_name}<span className="text-yellow-200"> {author.books.length} ( book total tagged)</span></h1>

                {author.books.length > 0 ? (
                    <ul className="space-y-3 grid grid-cols-1 xxs:grid-cols-2 xs:grid-cols-2 md:grid-cols-5 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
                        {author.books.map((book) => (
                            <li key={book.id}>
                                <div
                                    onClick={(e) => handleViewBook(e, book.id)}
                                    className="cursor-pointer shadow-md dark:shadow-none bg-white dark:bg-transparent rounded-md p-0"
                                >
                                    <p>{book.title}</p>
                                    <Image
                                        src={book.thumbnail_url ? book.thumbnail_url : 'https://via.placeholder.com/128x185/007bff/ffffff?text=Book'}
                                        alt="book_image"
                                        width={136}
                                        height={56}
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        priority={true}
                                        className="mt-3 rounded-md w-auto xxs:size-38 md:w-48 h-56 object-cover transition-all hover:scale-105"
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No books found for this author.</p>
                )}
            </div>
        </>
    );
};

export default AuthorDetails;
