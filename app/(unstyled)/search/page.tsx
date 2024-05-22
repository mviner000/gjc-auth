"use client";

import React, { useState, useEffect, MouseEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import SearchBar from "@/components/searchbar";

import { playlists } from "@/actions/playlists"
import { Separator } from '@/components/ui/separator';
import { Sidebar } from '@/components/sidebar';
import { UserButton } from '@/components/auth/user-button';
import { Button } from 'react-day-picker';
import { useRouter } from 'next/navigation';
import { FidgetSpinner } from 'react-loader-spinner';

type Book = {
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
};

const SearchPage = () => {

    const router = useRouter();
    const [bookLoading, setBookLoading] = useState(false);
    const [books, setBooks] = useState<Book[]>([]);
    const [error, setError] = useState<string | null>(null);

    const [isLoading, setIsLoading] = useState<boolean>(true);

    const handleSearch = async (searchResults: any[]) => {
        try {
            setBooks(searchResults);
            setIsLoading(false);
        } catch (error: any) {
            setError(error.message);
            setIsLoading(false);
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
            <div className=''>
                <div className="mt-3 h-full ">
                    <div className="grid lg:grid-cols-5">
                        <Sidebar playlists={playlists} className="hidden lg:block" />
                        <div className="col-span-3 lg:col-span-4 lg:border-l">
                            <div className="h-full px-4 py-6 lg:px-8">
                                <SearchBar onSearch={handleSearch} />
                                {error && <p>Error: {error}</p>}
                                {isLoading ? (
                                    <div className="flex justify-center items-center h-20">
                                        <svg
                                            className="animate-spin h-5 w-5 text-gray-500"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            />
                                        </svg>
                                    </div>
                                ) : (
                                    <>
                                        <h1 className='mb-4 text-3xl font-semibold'>Number of results: {books.length}</h1> {/* Displaying the count */}
                                        <ul>
                                            {books && books.map((book) => (
                                                <li key={book.id} >
                                                    <div
                                                        onClick={(e) => handleViewBook(e, book.id)}
                                                        className="cursor-pointer shadow-md dark:shadow-none bg-white dark:bg-transparent rounded-md p-0"
                                                    >
                                                        <Image
                                                            src={book.thumbnail_url || 'https://via.placeholder.com/128x185/007bff/ffffff?text=Book'}
                                                            alt="book_image"
                                                            width={136}
                                                            height="56"
                                                            sizes="(max-width: 768px) 100vw, 33vw"
                                                            priority={true}
                                                            className="mb-3 rounded-md w-auto md:w-48  h-56 object-cover transition-all hover:scale-105"
                                                        />
                                                        <p className='mb-3'>Title: {book.title}</p>
                                                        <p className='mb-3'>Author: {book.author_name}</p>
                                                        <Separator className='mb-5' />
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchPage;
