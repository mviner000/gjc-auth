"use client";

import axios from 'axios';
import React, { useState, useEffect, ChangeEvent } from 'react';
import debounce from 'lodash/debounce';
import Image from 'next/image';

interface Book {
    id: number;
    title: string;
    image_url: string; // Update the field name to match the backend
}

const SearchBooks: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [query, setQuery] = useState<string>('');
    const [searchClicked, setSearchClicked] = useState<boolean>(false); // Track if search button is clicked

    useEffect(() => {
        if (searchClicked && query.trim() !== '') {
            searchBooks();
            setSearchClicked(false); // Reset search button clicked status
        } else {
            setBooks([]);
        }
    }, [searchClicked]); // Run effect when search button is clicked

    const searchBooks = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/books/search/?query=${query}`);
            setBooks(response.data.results);
        } catch (error) {
            console.error('Error searching books:', error);
            setBooks([]);
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const handleSearchClick = () => {
        setSearchClicked(true); // Set search button clicked status
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search books..."
            />
            <button onClick={handleSearchClick}>Search</button>
            <div>
                {books.map((book) => (
                    <div key={book.id}>
                        <h3>{book.title}</h3>
                        <Image
                            src={book.image_url ? book.image_url.replace('image/upload/', '') : 'https://via.placeholder.com/128x185/007bff/ffffff?text=Book'}
                            alt="book_image"
                            width={136}
                            height="56"
                            sizes="(max-width: 768px) 100vw, 33vw"
                            priority={true}
                            className="mb-3 rounded-md w-auto md:w-48 h-56 object-cover transition-all hover:scale-105"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchBooks;
