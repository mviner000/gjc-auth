"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';


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

const BookList = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [cursor, setCursor] = useState(null);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

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

            <InfiniteScroll
                dataLength={books.length}
                next={fetchBooks}
                hasMore={hasMore}
                loader={<div className="col-span-full text-center p-4"><span className="text-gray-600">Loading...</span></div>}
                endMessage={<div className="col-span-full text-center p-4"><span className="text-gray-600">No more books!</span></div>}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-6 justify-center">
                    {books.map((book) => (
                        <div key={book.id} className="bg-white rounded shadow-md p-4">
                            <img src={book.thumbnail_url ? book.thumbnail_url : 'https://via.placeholder.com/128x185/007bff/ffffff?text=Book'} alt={book.title} className="w-full h-48 object-cover rounded-t" />
                            <div className="p-4">
                                <h2 className="text-lg font-bold">{book.title}</h2>
                                <p className="text-gray-600">{book.author_name}</p>
                                <p className="text-gray-600">{book.subject_name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </InfiniteScroll>
        </>
    );
};

export default BookList;