"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Book {
    title: string;
    thumbnail_url: string;
}

interface Author {
    id: number;
    author_name: string;
    author_code: string;
    books: Book[];
    book_count: number;
}

const appUrl = process.env.NEXT_PUBLIC_APP;

const TopAuthors: React.FC = () => {
    const [authors, setAuthors] = useState<Author[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios.get(`${appUrl}/api/authors/top_authors/`)
            .then(response => {
                setAuthors(response.data.results);
                setLoading(false);
            })
            .catch(error => {
                setError('Failed to fetch top authors');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            {authors.map(author => (
                <div key={author.id}>
                    <h2>{author.author_name}</h2>
                </div>
            ))}
        </div>
    );
};

export default TopAuthors;
