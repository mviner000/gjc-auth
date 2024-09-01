import React, { useState, useEffect, MouseEvent } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { BookOpenCheck, Copyright } from 'lucide-react';
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
    callno: string | null;
};

const appUrl = process.env.NEXT_PUBLIC_APP;

const BookList = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [cursor, setCursor] = useState(null);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [bookLoading, setBookLoading] = useState(false);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); // State to keep track of sorting order
    const [sortBy, setSortBy] = useState<'id' | 'copyright'>('id'); // State to keep track of sorting criteria
    const router = useRouter();

    const cld = new Cloudinary({ cloud: { cloudName: 'dqpzvvd0v' } });

    useEffect(() => {
        fetchBooks();
    }, [sortOrder, sortBy]);

    const fetchBooks = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/books/paginated`, {
                params: {
                    page_size: 10,
                    cursor,
                    sortOrder,
                    sortBy, // Added sortBy parameter
                },
            });

            const newBooks = Array.isArray(response.data.results) ? response.data.results : [];

            if (newBooks.length > 0) {
                setBooks(prevBooks => [...prevBooks, ...newBooks]);
                setCursor(response.data.nextCursor);
            }

            // Stop fetching if there's no nextCursor or fewer books returned
            if (!response.data.nextCursor || newBooks.length < 10) {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Failed to fetch books:", error);
        } finally {
            setLoading(false);
            setIsLoading(false);
        }
    };

    const handleBookClick = (e: MouseEvent<HTMLDivElement>, bookId: number) => {
        e.preventDefault();
        setBookLoading(true);
        router.push(`/unli-book/${bookId}`);
    };

    const handleSortByLastId = () => {
        setSortBy('id');
        setSortOrder('desc');
        setBooks([]); // Reset the books to fetch them in new order
        setCursor(null); // Reset cursor to fetch from the beginning
    };

    const handleSortByFirstId = () => {
        setSortBy('id');
        setSortOrder('asc');
        setBooks([]); // Reset the books to fetch them in new order
        setCursor(null); // Reset cursor to fetch from the beginning
    };

    const handleSortByLastCopyright = () => {
        setSortBy('copyright');
        setSortOrder('desc');
        setBooks([]); // Reset the books to fetch them in new order
        setCursor(null); // Reset cursor to fetch from the beginning
    };

    const handleSortByFirstCopyright = () => {
        setSortBy('copyright');
        setSortOrder('asc');
        setBooks([]); // Reset the books to fetch them in new order
        setCursor(null); // Reset cursor to fetch from the beginning
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
            <div className="flex justify-between mb-4">
                <button onClick={handleSortByLastId} className="bg-blue-500 text-white px-4 py-2 rounded">Sort by Last ID Number</button>
                <button onClick={handleSortByFirstId} className="bg-blue-500 text-white px-4 py-2 rounded">Sort by First ID Number</button>
                <button onClick={handleSortByLastCopyright} className="bg-green-500 text-white px-4 py-2 rounded">Sort by Latest Copyright</button>
                <button onClick={handleSortByFirstCopyright} className="bg-green-500 text-white px-4 py-2 rounded">Sort by Oldest Copyright</button>
            </div>
            <InfiniteScroll
                dataLength={books.length}
                next={fetchBooks}
                hasMore={hasMore}
                loader={
                    <div className="col-span-full text-center p-4">
                        <span className="text-gray-600">Load More...</span>
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

                            <div className="relative">
                                <div className="rounded-lg">
                                    <div className="static">
                                        <h2 className='absolute rounded-t-md rounded-l-none text-xs bg-slate-400/50 right-0 text-white shadow-sm p-1'>{book.id}</h2>
                                        {book.thumbnail_url ? (
                                            <AdvancedImage
                                                style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                                                cldImg={cld.image(`books/${book.controlno}`)
                                                    .quality('auto')
                                                    .resize(auto().width(300).height(350))}
                                            />
                                        ) : (
                                            <AdvancedImage
                                                style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                                                cldImg={cld.image(`books/no-image`)
                                                    .quality('auto')
                                                    .resize(auto().width(300).height(350))}
                                            />
                                        )}


                                        {/* <img src={book.thumbnail_url || 'https://res.cloudinary.com/dqpzvvd0v/image/upload/q_auto/c_fill,w_230/v1/books/no-image?_a=DAJAUVWIZAA0'} alt="title" /> */}
                                    </div>
                                </div>
                                <div className="bg-black/40 absolute top-12 left-0 w-full">
                                    <div className="p-4 text-white font-semibold text-lg text-left justify-start border-l border-r">
                                        {book.title.length > 50 ? `${book.title.slice(0, 50)}...` : book.title}
                                        {/* <div className="mt-1.5 flex text-sm gap-1 text-black dark:text-slate-300">
                                            <BookOpenCheck size={18} />
                                            <span className="inline-block">{book.author_name}</span>
                                        </div> */}

                                    </div>
                                </div>
                                <div className='mx-2 mb-3'>
                                    <div className='mt-3'>
                                        {book.copyright && (
                                            <p className="text-sm dark:text-slate-300">
                                                <div className='flex gap-2'><Copyright size={18} /> {book.copyright}
                                                    {parseInt(book.copyright) <= 2014 ? (
                                                        <span className="bg-red-100/50 text-red-800/50 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400">Phased Out</span>
                                                        // <span className="text-red-500"> Phased Out</span>
                                                    ) : (

                                                        <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">Available</span>
                                                    )}
                                                </div>
                                            </p>
                                        )}
                                    </div>
                                    {book.callno}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </InfiniteScroll>
        </div>
    );
};

export default BookList;
