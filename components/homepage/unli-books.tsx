"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import Link from 'next/link';

import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';
import { Sidebar } from '@/components/sidebar';

import { playlists } from "@/actions/playlists"
import Image from 'next/image';
import { BookOpenCheck, BookUser } from 'lucide-react';

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

const UnliBook = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [cursor, setCursor] = useState(null);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const cld = new Cloudinary({ cloud: { cloudName: 'dqpzvvd0v' } });

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/books/', {
                params: {
                    page_size: 10,
                    cursor,
                },
            });
            const newBooks = response.data.results;
            setBooks([...books, ...newBooks]);
            setCursor(newBooks[newBooks.length - 1].id);
            if (newBooks.length < 10) {
                setHasMore(false);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };



    return (
        <>
            <div className="mt-3 h-full ">
                <div className="grid lg:grid-cols-5">
                    <Sidebar playlists={playlists} className="hidden lg:block" />
                    <div className="col-span-3 lg:col-span-4 lg:border-l">
                        <div className="h-full px-4 py-6 lg:px-8">
                            <InfiniteScroll
                                dataLength={books.length}
                                next={fetchBooks}
                                hasMore={hasMore}
                                loader={
                                    <div className="col-span-full text-center p-4"><span className="text-gray-600">Loading...</span></div>}
                                endMessage={<div className="col-span-full text-center p-4"><span className="text-gray-600">No more books!</span></div>}
                            >
                                <div className="
                grid grid-cols-2 sm:grid-cols-2
                md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5
                gap-8 md:gap-15 xl:gap-10
                justify-center p-0 bg-transparent">
                                    {books.map((book, index) => {
                                        return (
                                            <Link key={index} href={`/books/${book.id}`}>
                                                <div className="shadow-md dark:shadow-none bg-white dark:bg-transparent rounded-md p-0">
                                                    <div className='rounded-lg'>
                                                        <div className='static'>
                                                            {book.thumbnail_url ? (
                                                                <AdvancedImage
                                                                    style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                                                                    cldImg={cld.image(`books/${book.controlno}`)
                                                                        .quality('auto')
                                                                        .resize(auto().width(300).height(200))
                                                                    }
                                                                />
                                                            ) : (
                                                                <AdvancedImage
                                                                    style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                                                                    cldImg={cld.image(`books/no-image`)
                                                                        .quality('auto')
                                                                        .resize(auto().width(300).height(200))
                                                                    }
                                                                />
                                                            )}

                                                            <div className='absolute'>
                                                                <div className='relative bottom-10 left-16'>
                                                                    <div className="flex items-center bg-white/70 border border-gray-500 dark:bg-black/70 p-1 px-2 rounded-md">
                                                                        <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                                        </svg>
                                                                        <p className="ms-2 text-sm font-bold text-gray-900 dark:text-white">4.95</p>
                                                                        <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                                                                        <span className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white">73 reviews</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="p-4 text-left justify-start border-l border-r border-b">
                                                        <h2 className="text-sm font-semibold">{book.title}</h2>
                                                        <div className="mt-1.5 flex text-sm gap-1 text-black dark:text-slate-300"><BookOpenCheck size={18} /><span className="inline-block">{book.author_name}</span></div>
                                                        {book.copyright &&
                                                            <p className="text-sm dark:text-slate-300">Copyright Year: {book.copyright}</p>
                                                        }
                                                        <p className="text-sm dark:text-slate-300">{book.views} views • {book.publisher}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </InfiniteScroll>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UnliBook;