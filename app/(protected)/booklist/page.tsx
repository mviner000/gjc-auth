'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCurrentUser } from '@/hooks/use-current-user';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { CarouselItem } from '@/components/ui/carousel';
import { table } from 'console';
import PaginationControls from '@/components/pagination-controls';
import { toast, useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';

interface Book {
    id: number;
    title: string;
    author_name: string;
    subject_name: string;
    thumbnail_url: string;
    publisher: string;
    pubplace: string;
    pagination: string;
    edition: string | null;
}

interface User {
    email: string;
    studentId: number;
    image: string | null;
}

const appUrl = process.env.NEXT_PUBLIC_APP;

const BookListPage: React.FC = () => {
    const user = useCurrentUser();
    const { toast } = useToast()
    const [books, setBooks] = useState<Book[]>([]);
    const [selectedBooks, setSelectedBooks] = useState<number[]>([]);

    const [bookTitlesCount, setBookTitlesCount] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);
    const [bookTitles, setBookTitles] = useState<string[]>([]);
    const [inputPage, setInputPage] = useState<string>('');

    const defaultStudent = user?.email;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${appUrl}/api/books/`, {
                    params: { page: currentPage }
                });
                const { count, results } = response.data;
                setBooks(results);
                setBookTitlesCount(count);
                setTotalPages(Math.ceil(count / 10));
            } catch (error) {
                console.error('Error fetching books:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [currentPage]);

    const handleAddToCart = async (bookId: number) => {
        try {
            const response = await axios.post(`${appUrl}/api/bookcarts/`, {
                student: defaultStudent,
                books: [bookId]
            });

            // Display a toast notification for duplicate entry
            toast({
                title: "Warning!",
                variant: "destructive",
                description: ` already added to storage`,
                action: <ToastAction altText="Go to schedule to undo">Close</ToastAction>,
            });
            console.log('Book added to cart:', response.data);

            // Optionally update UI or show a success message
        } catch (error) {
            console.error('Error adding book to cart:', error);
            // Handle error (e.g., show error message)
        }
    };

    const handlePageChange = (selectedPage: number) => {
        setCurrentPage(selectedPage);
    };

    const renderPagination = () => {
        return (
            <div>
                <PaginationControls
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                    onGoToPage={(pageNumber) => setCurrentPage(pageNumber)}
                />
            </div>
        );
    };


    return (
        <div>
            <h1>All Books</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Thumbnail</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((book) => (
                                <tr key={book.id}>
                                    <td>{book.title}</td>
                                    <td>{book.author_name}</td>
                                    <td>
                                        <img src={book.thumbnail_url} alt={book.title} style={{ maxWidth: '150px' }} />
                                    </td>
                                    <td>
                                        <button onClick={() => handleAddToCart(book.id)}>Add to Cart</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <PaginationControls
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                        onGoToPage={(pageNumber) => setCurrentPage(pageNumber)}
                    />
                </div>
            )}
        </div>
    );
};

export default BookListPage;