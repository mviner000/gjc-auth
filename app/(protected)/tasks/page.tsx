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

dayjs.extend(relativeTime);

interface Book {
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
}

interface BookCart {
    id: number;
    student: string;
    books: number[];
    created_at: string;
    is_borrowed_verified: boolean | null;
    is_returned_verified: boolean | null;
}

interface Task {
    id: number;
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


const TaskPage = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [bookTitlesWithImages, setBookTitlesWithImages] = useState<Record<number, { title: string; thumbnail_url: string }>>({});

    useEffect(() => {
        const fetchBookCarts = async () => {
            try {
                const bookCartsResponse = await axios.get<BookCart[]>(`${appUrl}/api/bookcarts/`);
                const bookCarts = bookCartsResponse.data;

                const bookIds = bookCarts.flatMap(cart => cart.books);
                const uniqueBookIds = Array.from(new Set(bookIds));

                const bookTitlesWithImagesMap: Record<number, { title: string; thumbnail_url: string }> = {};

                const booksResponse = await axios.get<{ results: Book[] }>(`${appUrl}/api/books/`);
                const books = booksResponse.data.results;

                books.forEach(book => {
                    if (uniqueBookIds.includes(book.id)) {
                        bookTitlesWithImagesMap[book.id] = {
                            title: book.title,
                            thumbnail_url: book.thumbnail_url,
                        };
                    }
                });

                const transformedTasks: Task[] = bookCarts.map(cart => ({
                    id: cart.id,
                    books: cart.books,
                    status: "pending", // or any other logic to determine status
                    label: "Task Label", // or any other logic to determine label
                    email: cart.student, // Assuming `student` field is the email
                    is_borrowed_verified: cart.is_borrowed_verified ?? false,
                    is_returned_verified: cart.is_returned_verified ?? false,
                    set_to_return: false, // or any other logic to determine set_to_return
                    created_at: cart.created_at,
                }));

                setTasks(transformedTasks);
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
                <div className="md:hidden mb-20">
                    <Image
                        src="/examples/tasks-light.png"
                        width={1280}
                        height={998}
                        alt="Playground"
                        className="block dark:hidden"
                    />
                    <Image
                        src="/examples/tasks-dark.png"
                        width={1280}
                        height={998}
                        alt="Playground"
                        className="hidden dark:block"
                    />
                </div>
                <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
                    <div className="flex items-center justify-between space-y-2">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
                            <p className="text-muted-foreground">
                                Here&apos;s a list of your tasks for this month!
                            </p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <UserNav />
                        </div>
                    </div>
                    <DataTable data={tasks} columns={columns} />
                </div>
                <div className="h-10"></div>
            </div>
        </>
    );
};

export default TaskPage;
