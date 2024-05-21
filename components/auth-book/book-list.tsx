"use client";

import React, { useState, useEffect, MouseEvent } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import Link from 'next/link';

import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { AdvancedImage } from '@cloudinary/react';
import { BookOpenCheck } from 'lucide-react';
import { FidgetSpinner } from 'react-loader-spinner';
import { useRouter } from 'next/navigation';

type Book = {
    id: number;
    controlno: string;
    title: string;
    author_code: number;
    author_name: string;
    subject1_code: number;
    subject_name: string;
    thumbnail_url: string;
    pubplace: string;
    pagination: string;
    edition: string | null;
    views: string;
    copyright: string;
    publisher: string;
};

const appUrl = process.env.NEXT_PUBLIC_APP;

const BookList = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [cursor, setCursor] = useState(null);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [bookLoading, setBookLoading] = useState(false);
    const router = useRouter();

    const cld = new Cloudinary({ cloud: { cloudName: 'dqpzvvd0v' } });

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${appUrl}/api/books/`, {
                params: {
                    page_size: 10,
                    cursor,
                },
            });
            const newBooks = response.data.results;
            setBooks(prevBooks => [...prevBooks, ...newBooks]);
            setCursor(newBooks[newBooks.length - 1].id);
            if (newBooks.length < 10) {
                setHasMore(false);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            setIsLoading(false);
        }
    };

    const handleBookClick = (e: MouseEvent<HTMLDivElement>, bookId: number) => {
        e.preventDefault();
        setBookLoading(true);
        router.push(`/auth-book/${bookId}`);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
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
        );
    }

    return (
        <div>
            {bookLoading && (
                <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-75 z-50">
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
            <InfiniteScroll
                dataLength={books.length}
                next={fetchBooks}
                hasMore={hasMore}
                loader={
                    <div className="col-span-full text-center p-4">
                        <span className="text-gray-600">Loading...</span>
                    </div>
                }
                endMessage={
                    <div className="col-span-full text-center p-4">
                        <span className="text-gray-600">No more books!</span>
                    </div>
                }
            >
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-8 md:gap-15 xl:gap-10 justify-center p-0 bg-transparent">
                    {books.map((book, index) => (
                        <div
                            key={index}
                            onClick={(e) => handleBookClick(e, book.id)}
                            className="cursor-pointer shadow-md dark:shadow-none bg-white dark:bg-transparent rounded-md p-0"
                        >
                            <div className="rounded-lg">
                                <div className="static">
                                    {book.thumbnail_url ? (
                                        <AdvancedImage
                                            style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                                            cldImg={cld.image(`books/${book.controlno}`)
                                                .quality('auto')
                                                .resize(auto().width(300).height(200))}
                                        />
                                    ) : (
                                        <AdvancedImage
                                            style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                                            cldImg={cld.image(`books/no-image`)
                                                .quality('auto')
                                                .resize(auto().width(300).height(200))}
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="p-4 text-left justify-start border-l border-r border-b">
                                <h2 className="text-sm font-semibold">{book.title}</h2>
                                <div className="mt-1.5 flex text-sm gap-1 text-black dark:text-slate-300">
                                    <BookOpenCheck size={18} />
                                    <span className="inline-block">{book.author_name}</span>
                                </div>
                                {book.copyright && (
                                    <p className="text-sm dark:text-slate-300">Copyright Year: {book.copyright}</p>
                                )}
                                <p className="text-sm dark:text-slate-300">{book.views} views • {book.publisher}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </InfiniteScroll>
        </div>
    );
};

export default BookList;
