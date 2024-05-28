"use client";


import React, { useState, useEffect, MouseEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FidgetSpinner } from 'react-loader-spinner';
import { Separator } from '@/components/ui/separator';
import { playlists } from '@/actions/playlists';
import { Sidebar } from '@/components/sidebar';

interface Book {
    id: number;
    title: string | null;
    thumbnail_url: string | null;
}

const SearchBooks: React.FC = () => {
    const searchParams = useSearchParams();
    const [books, setBooks] = useState<Book[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState(false); // Add loading state

    const [bookLoading, setBookLoading] = useState(false);


    const router = useRouter();

    const queryTerm = searchParams.get('q');

    useEffect(() => {
        if (queryTerm) {
            setSearchTerm(queryTerm);
            fetchBooks(queryTerm);
        }
    }, [queryTerm]);

    const fetchBooks = (query: string) => {
        setIsLoading(true); // Set loading state to true before making the request
        fetch(`/api/books?q=${encodeURIComponent(query)}`)
            .then(response => response.json())
            .then(data => {
                console.log('Fetched data:', data);
                setBooks(data.data);
                setIsLoading(false); // Set loading state to false after the request is completed
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError(error);
                setIsLoading(false); // Set loading state to false after the request is completed
            });
    };

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchButtonClick = () => {
        // Fetch books based on the search term
        fetchBooks(searchTerm);
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
            <div>

                <div className="grid lg:grid-cols-7">
                    <Sidebar playlists={playlists} className="hidden lg:block" />
                    <div className="col-span-3 lg:col-span-5 lg:border-l lg:border-r">
                        <div className="h-full px-4 lg:px-8">

                            {books.length > 0 && (
                                <h1 className='text-4xl mb-5 font-semibold'>{queryTerm} - <span className="text-black dark:text-yellow-200"> {books.length} ( books matched)</span></h1>

                            )}
                            <div className='hidden'>
                                <input
                                    type="text"
                                    placeholder="Search books..."
                                    value={searchTerm}
                                    onChange={handleSearchInputChange}
                                />
                                <button onClick={handleSearchButtonClick}>Search</button>
                            </div>
                            {error && <p>Error: {error.message}</p>}
                            {isLoading && <p>Loading...</p>} {/* Display loading state */}

                            <div>
                                {books.map((book) => (
                                    <div key={book.id}>
                                        <div
                                            onClick={(e) => handleViewBook(e, book.id)}
                                            className="cursor-pointer shadow-md dark:shadow-none bg-white dark:bg-transparent rounded-md p-0"
                                        >
                                            <h3 className='mb-2'>{book.title ?? 'No Title'}</h3>
                                            {book.thumbnail_url ? (
                                                <img
                                                    src={book.thumbnail_url.replace('image/upload/', '')}
                                                    alt={`${book.title} thumbnail`}
                                                    width={136}
                                                    height="56"
                                                    sizes="(max-width: 768px) 100vw, 33vw"
                                                    className="mb-3 rounded-md w-auto md:w-48 h-56 object-cover transition-all hover:scale-105"
                                                />
                                            ) : (
                                                <div className="w-48 h-56 bg-gray-300 rounded-md" />
                                            )}
                                            <Separator className='mb-2' />

                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchBooks;