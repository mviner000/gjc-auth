"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Image from "next/image";

import { columns } from "@/components/tasks/columns";
import { DataTable } from "@/components/tasks/data-table";
import { UserNav } from "@/components/tasks/user-nav";
import Footer from "@/components/footer";
import { Book } from "lucide-react";

dayjs.extend(relativeTime);

interface BookCart {
    id: number;
    student: string;
    books: number[];
    created_at: string;
    is_borrowed_verified: boolean | null;
    is_returned_verified: boolean | null;
}

interface Book {
    id: number;
    title: string;
    thumbnail_url: string;
    books: number[];
    status: string;
    label: string;
    email: string;
    is_borrowed_verified: boolean;
    is_returned_verified: boolean;
    set_to_return: boolean;
    created_at?: string;
    updated_at?: string;
}

const appUrl = process.env.NEXT_PUBLIC_APP;


const AdminTransactionPage = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [bookTitlesWithImages, setBookTitlesWithImages] = useState<Record<number, { title: string; thumbnail_url: string }>>({});

    useEffect(() => {
        const fetchBookCarts = async () => {
            try {
                const bookCartsResponse = await axios.get<BookCart[]>(`${appUrl}/api/bookcarts/`);
                const bookCarts = bookCartsResponse.data;

                const bookIds = bookCarts.flatMap(cart => cart.books);
                const uniqueBookIds = Array.from(new Set(bookIds));

                const bookTitlesWithImagesMap: Record<number, { title: string; thumbnail_url: string }> = {};

                const booksResponse = await axios.get<Book[]>(`${appUrl}/api/books/all`);
                const books = booksResponse.data; // Accessing the response data directly

                books.forEach(book => {
                    if (uniqueBookIds.includes(book.id)) {
                        bookTitlesWithImagesMap[book.id] = {
                            title: book.title,
                            thumbnail_url: book.thumbnail_url,
                        };
                    }
                });

                const transformedBooks: Book[] = bookCarts.map(cart => ({
                    id: cart.id,
                    title: '', // or some default title
                    thumbnail_url: '', // or some default thumbnail_url
                    books: cart.books,
                    status: "pending",
                    label: "Task Label",
                    email: cart.student,
                    is_borrowed_verified: cart.is_borrowed_verified ?? false,
                    is_returned_verified: cart.is_returned_verified ?? false,
                    set_to_return: false,
                    created_at: cart.created_at,
                }));

                setBooks(transformedBooks);
                setBookTitlesWithImages(bookTitlesWithImagesMap);
            } catch (error) {
                console.error('Error fetching book carts and related books:', error);
            }
        };

        fetchBookCarts();
    }, []);

    return (
        <>
            <div className="mb-10">
                <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
                    <div className="flex items-center justify-between space-y-2">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
                            <p className="text-muted-foreground">
                                Here&apos;s a list of your transactions!
                            </p>
                        </div>
                        {/* <div className="flex items-center space-x-2">
                            <UserNav />
                        </div> */}
                    </div>
                    <DataTable data={books} columns={columns({ bookTitlesWithImages })} />
                </div>
                <div className="h-10"></div>
            </div>
        </>
    );
};

export default AdminTransactionPage;
