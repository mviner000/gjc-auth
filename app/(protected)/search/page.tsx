"use client";

import React, { useState } from 'react';
import SearchBar from "@/components/searchbar";
import { Separator } from '@/components/ui/separator';

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
        <div>
            <SearchBar onSearch={handleSearch} />
            {error && <p>Error: {error}</p>}
            <p className='mb-4'>Number of results: {books.length}</p> {/* Displaying the count */}
            <ul>
                {books && books.map((book) => (
                    <li key={book.id}>
                        <p>Title: {book.title}</p>
                        <p>Author: {book.author_name}</p>
                        <Separator className='mb-5' />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchPage;
