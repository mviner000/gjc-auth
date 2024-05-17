"use client";

import React, { useState } from 'react';
import axios from 'axios';

interface SearchProps {
    onSearch: (books: any[]) => void;
}

const SearchBar: React.FC<SearchProps> = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchQuery) {
            const response = await axios.get(`http://127.0.0.1:8000/api/books/search/?q=${searchQuery}`);
            onSearch(response.data);
        } else {
            onSearch([]);
        }
    };

    return (
        <form onSubmit={handleSearch}>
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for books"
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchBar;