"use client";

import { usePathname } from 'next/navigation';
import axios from 'axios';
import React, { useState, useEffect, MouseEvent } from 'react';
import { Sidebar } from '@/components/sidebar';
import { playlists } from '@/actions/playlists';
import BreadcrumbComponent from '@/components/breadcrumb';
import CartSheet from '@/components/cart-sheet';
import Image from 'next/image';
import { SideBarRight } from '@/components/sidebar-right';

import { useRouter } from 'next/navigation';
import { FidgetSpinner } from 'react-loader-spinner';
import { index } from 'drizzle-orm/mysql-core';

interface Subject {
    id: number;
    subject_name: string;
    temp_id: number | null;
    subject_code: string;
    books: Book[];
}

interface Book {
    id: number;
    title: string;
    author_name: string;
    thumbnail_url: string;
}


const appUrl = process.env.NEXT_PUBLIC_APP;

const TagDetails = () => {
    const pathname = usePathname();
    const id = parseInt(pathname.split("/").pop()!);
    const [subject, setSubject] = useState<Subject | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [bookTitles, setBookTitles] = useState<string[]>([]);
    const [bookTitlesCount, setBookTitlesCount] = useState<number>(0);

    const router = useRouter();
    const [bookLoading, setBookLoading] = useState(false);

    useEffect(() => {
        getSubject(id);
    }, [id]);

    const getSubject = async (id: number) => {
        try {
            const response = await axios.get(`${appUrl}/api/subjects/${id}`);
            setSubject(response.data);
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


    if (!subject) return <div>Loading...</div>;

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
            <div className="grid lg:grid-cols-7">
                <Sidebar playlists={playlists} className="hidden lg:block" />
                <div className="col-span-3 lg:col-span-5 lg:border-l lg:border-r">
                    <div className="h-full px-4 lg:px-8">
                        <div className='flex justify-between'>
                            <BreadcrumbComponent currentPage={currentPage} currentPageText={subject.subject_name} />
                            <div className='mr-16'>
                                <CartSheet bookTitles={bookTitles} onDeleteTitle={handleDeleteBookTitle} handleEmptyBookCart={handleEmptyBookCart} />
                            </div>
                        </div>


                        <h1 className='text-4xl mb-5 font-semibold'>{subject.subject_name}<span className="text-yellow-200"> {subject.books.length} ( book total tagged)</span></h1>

                        {subject.books.length > 0 ? (
                            <ul className="space-y-3 grid grid-cols-1 xxs:grid-cols-2 xs:grid-cols-2 md:grid-cols-5 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
                                {subject.books.map((book) => (
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
                            <p>No books found for this subject.</p>
                        )}
                    </div>
                </div>

                <SideBarRight playlists={playlists} className="hidden lg:block " />
            </div>
        </>
    );
};

export default TagDetails;
