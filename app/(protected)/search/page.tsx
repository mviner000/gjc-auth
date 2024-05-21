"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import SearchBar from "@/components/searchbar";

import { playlists } from "@/actions/playlists"
import { Separator } from '@/components/ui/separator';
import { Sidebar } from '@/components/sidebar';

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
    const [books, setBooks] = useState<Book[]>([]);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async (searchResults: any[]) => {
        try {
            setBooks(searchResults);
            console.log("Data after search query:", searchResults);
        } catch (error: any) { // Specify the type of error as 'any'
            setError(error.message);
            console.error("Error after search query:", error);
        }
    };

    return (

        <div className=''>
            <div className="mt-3 h-full ">
                <div className="grid lg:grid-cols-5">
                    <Sidebar playlists={playlists} className="hidden lg:block" />

                    <div className="col-span-3 lg:col-span-4 lg:border-l">
                        <div className="h-full px-4 py-6 lg:px-8">
                            <SearchBar onSearch={handleSearch} />
                            {error && <p>Error: {error}</p>}
                            <h1 className='mb-4 text-3xl font-semibold'>Number of results: {books.length}</h1> {/* Displaying the count */}
                            <ul>
                                {books && books.map((book) => (
                                    <li key={book.id} >
                                        <Link className="hover:text-blue-500" href={`/auth-book/${book.id}`}>
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
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
