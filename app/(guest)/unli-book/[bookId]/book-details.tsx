"use client";

import axios from "axios";
import { usePathname, useRouter } from "next/navigation";

import useSWR from 'swr';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { fill } from '@cloudinary/url-gen/actions/resize';
import copy from 'copy-to-clipboard';

import { useEffect, useState, MouseEvent } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";

import SubjectTag from "@/components/books/subject-tag";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast"
import { Button } from "@/components/ui/button";
import BookStockUpdateForm from "@/components/auth-book/book-stock-update";
import TagPage from "../../tags/page";
import TagDetails from "../../tags/[tagId]/page";
import SubjectList from "../../tags/[tagId]/_components/subject_list";
import { Separator } from "@/components/ui/separator";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";



const appUrl = process.env.NEXT_PUBLIC_APP;
const copyUrl = process.env.NEXT_PUBLIC_APP_URL;

type Role = "USER" | "ADMIN";

const BookDetailsPage = () => {

    const [bookTitles, setBookTitles] = useState<string[]>([]);
    const [bookTitlesCount, setBookTitlesCount] = useState<number>(0);
    const router = useRouter();
    const [bookLoading, setBookLoading] = useState(false);

    const [isLoggedIn, setIsLoggedIn] = useState(false);


    const [userRole, setUserRole] = useState<Role>();
    const user = useCurrentUser();
    const { toast } = useToast()

    const pathname = usePathname();
    const id = parseInt(pathname.split("/").pop()!);
    const defaultStudent = user?.email;

    const [isCopied, setIsCopied] = useState(false);

    const { data, error } = useSWR(`${appUrl}/api/books/${id}`, fetcher);

    const bookUrl = `${copyUrl}/unli-book/${id}`

    const generateBookUrl = (offset: number) => `${copyUrl}/unli-book/${id + offset}`;

    const cld = new Cloudinary({ cloud: { cloudName: 'dqpzvvd0v' } });

    useEffect(() => {
        setIsLoggedIn(!!user);
        setUserRole(user?.role as Role);
    }, [user]);

    const handleCopy = () => {
        copy(bookUrl);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Hide the success message after 2 seconds
    };


    const handleDeleteBookTitle = (titleToRemove: string) => {
        const updatedTitles = bookTitles.filter((title) => title !== titleToRemove);
        localStorage.setItem('bookTitles', JSON.stringify(updatedTitles));
        setBookTitles(updatedTitles);
        setBookTitlesCount(updatedTitles.length);
    };


    const handleEmptyBookCart = () => {
        setBookTitles([]);
        setBookTitlesCount(0);
        localStorage.removeItem('bookTitles');
    };


    const handleViewBook = (e: MouseEvent<HTMLDivElement>, bookId: number) => {
        e.preventDefault();
        setBookLoading(true);
        router.push(`/unli-book/${bookId}`);
    };

    const handleAddToCart = async (bookId: number) => {
        try {
            // Fetch the specific book by ID
            const response = await axios.get(`${appUrl}/api/books/${bookId}`);
            const book = response.data; // Assuming response contains the book details

            // Add the book to the cart
            await axios.post(`${appUrl}/api/bookcarts/`, {
                student: defaultStudent,
                books: [bookId],
            });

            // Display a toast notification for successful addition
            toast({
                title: 'Yehey! Congratulations',
                description: `"${book.title}" successfully added to cart`,
                action: <ToastAction altText="Go to schedule to undo">Close</ToastAction>,
            });

            console.log('Book added to cart:', book);
        } catch (error) {
            console.error('Error adding book to cart:', error);
            // Handle error (e.g., show error message)
        }
    };

    if (!data) return <div>Loading...</div>;
    return (
        <>
            <div className="h-full px-4 py-6 lg:px-8 dark:bg-slate-900 dark:text-white">
                <div className="grid grid-flow-row-dense grid-cols-3">
                    <div className="col-span-2 flex">

                        <div>{data.thumbnail_url ? (
                            <AdvancedImage
                                cldImg={cld.image(`books/${data.controlno}`)
                                    .quality('auto')
                                    .resize(fill().height(230))
                                }
                            />
                        ) : (
                            <AdvancedImage
                                cldImg={cld.image(`books/no-image`)
                                    .quality('auto')
                                    .resize(fill().width(230))
                                }
                            />
                        )}</div>

                        <div className="ml-5">
                            <h1 className="text-4xl font-semibold mb-5">
                                {data.title}
                            </h1>
                            <h1 className="text-black dark:text-slate-300">
                                Author: {data.author_name}
                            </h1>
                            <h1 className="text-black dark:text-slate-300">
                                Callno. <span className="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"> {data.callno}</span>
                            </h1>
                            <h1 className="text-black dark:text-slate-300">
                                Copyright: {data.copyright}
                            </h1>
                            <h1 className="text-black dark:text-slate-300">
                                Publisher: {data.publisher}
                            </h1>
                            <h1 className="text-black dark:text-slate-300">
                                Publication Place: {data.pubplace}
                            </h1>
                            <h1 className="text-black dark:text-slate-300">
                                Pages: {data.pagination}
                            </h1>
                            <h1 className="text-black dark:text-slate-300">
                                Edition: {data.edition}
                            </h1>
                            <h1 className="gap-2 text-black dark:text-slate-300">
                                Tags: <SubjectTag subjectName={data.subject_name} />
                            </h1>
                            <div className="w-full max-w mt-3">
                                <div className="relative">
                                    <label className="sr-only">Label</label>
                                    <input
                                        id="npm-install-copy-text"
                                        type="text"
                                        className="col-span-6 bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        value={bookUrl}
                                        disabled
                                        readOnly
                                    />
                                    <button
                                        onClick={handleCopy}
                                        className="absolute end-2.5 top-1/2 -translate-y-1/2 text-gray-900 dark:text-gray-400 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 rounded-lg py-2 px-2.5 inline-flex items-center justify-center bg-white border-gray-200 border"
                                    >
                                        <span id="default-message" className={`inline-flex items-center ${isCopied ? 'hidden' : 'block'}`}>
                                            <svg className="w-3 h-3 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                                <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                                            </svg>
                                            <span className="text-xs font-semibold">Copy Link</span>
                                        </span>
                                        <span id="success-message" className={`inline-flex items-center ${isCopied ? 'block' : 'hidden'}`}>
                                            <svg className="w-3 h-3 text-blue-700 dark:text-blue-500 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                                            </svg>
                                            <span className="text-xs font-semibold text-blue-700 dark:text-blue-500">Copied</span>
                                        </span>
                                    </button>
                                </div>
                            </div>
                            {/* <div className="mt-3">
                                <div className="w-full grid grid-cols-1 gap-y-2 md:gap-y-2 md:grid-cols-1 lg:gap-y-2 lg:grid-cols-1 xl:grid-cols-2  items-center gap-x-2">
                                    <Button
                                        size="lg"
                                        className={`w-full bg-gradient-to-r from-purple-500 to-neutral-950 hover:bg-gradient-to-l text-white outline-2 shadow-md outline-black ${data.stock_quantity <= 0 ? 'cursor-no-drop from-red-500' : ''}`}
                                        variant="outline"
                                        onClick={(stroke) => handleAddToCart(data.id)}
                                        disabled={data.stock_quantity <= 0}
                                    >
                                        {data.stock_quantity > 0 ? "Add To Book Cart" : "Out of stock"}
                                    </Button>

                                </div>
                            </div> */}
                        </div>
                    </div>
                    <div className="ml-5 space-y-3">

                        <div className="text-lg text-slate-400/90 font-thin">Views: {data.views}</div>
                        <div className="text-lg text-slate-400/90 font-thin">Stock Quantity: {data.stock_quantity}</div>


                        {userRole === 'ADMIN' && (
                            <BookStockUpdateForm id={data.id} quantity={data.stock_quantity} />
                        )}

                    </div>
                </div>
                {/* Navigation Buttons */}
                <div className="mt-10 justify-between w-full flex">
                    <button
                        onClick={() => router.push(generateBookUrl(-1))}
                        type="button"
                        className="flex items-center justify-center text-white bg-gradient-to-r from-blue-500 to-cyan-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                        <ArrowBigLeft /> Previous
                    </button>
                    <button
                        onClick={() => router.push(generateBookUrl(1))}
                        type="button"
                        className="flex items-center justify-center text-white bg-gradient-to-r from-cyan-500 to-blue-500  hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                        Next <ArrowBigRight />
                    </button>
                </div>
                <Separator className="mt-10" />
                <div className="mt-10">
                    <SubjectList
                        bookTotalTaggedText="book related"
                        subject1_code={data.subject1_code}
                        bookTitles={bookTitles}
                        handleDeleteBookTitle={handleDeleteBookTitle}
                        handleEmptyBookCart={handleEmptyBookCart}
                        handleViewBook={handleViewBook}
                        bookLoading={bookLoading}
                    />
                </div>

            </div>
        </>
    );


}

const fetcher = async (url: string) => {
    const response = await axios.get(url);
    return response.data;
};

export default BookDetailsPage;