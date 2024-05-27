"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

interface SearchProps {
    onSearch: (books: any[]) => void;
}

const SearchBar: React.FC<SearchProps> = ({ onSearch }) => {
    const searchParams = useSearchParams();
    const initialSearchQuery = searchParams.get("q") || "";
    const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
    const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        const timeout = setTimeout(() => {
            if (searchQuery) {
                searchBooks();
            } else {
                onSearch([]);
            }
        }, 500); // Adjust the delay as needed

        setTypingTimeout(timeout);

        return () => {
            if (typingTimeout) {
                clearTimeout(typingTimeout);
            }
        };
    }, [searchQuery]);

    const searchBooks = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/books/search/?query=${searchQuery}`);
            onSearch(response.data);
        } catch (error) {
            console.error("Error fetching search results:", error);
            onSearch([]);
        }
    };

    return (
        <form>
            <input className='hidden'
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for books"
            />
        </form>
    );
};

export default SearchBar;
