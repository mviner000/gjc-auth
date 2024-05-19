"use client";

import axios from "axios";
import { usePathname } from "next/navigation";

import useSWR from 'swr';
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';
import { fill } from '@cloudinary/url-gen/actions/resize';
import copy from 'copy-to-clipboard';

import { Sidebar } from "@/components/sidebar";
import { playlists } from "@/actions/playlists"
import { BookButtons } from "./book-buttons";
import SubjectTag from "@/components/books/subject-tag";
import { useState } from "react";

interface Book {
    id: number;
    title: string;
    author_name: string;
    thumbnail_url: string;
    subject_name: string;
    publisher: string;
    pubplace: string;
    pagination: string;
    edition: string;
    copyright: string;
    views: string;
}

const appUrl = process.env.NEXT_PUBLIC_APP;

const BookDetails = () => {
    const pathname = usePathname();
    const id = parseInt(pathname.split("/").pop()!);

    const [isCopied, setIsCopied] = useState(false);

    const { data, error } = useSWR(`${appUrl}/api/books/${id}`, fetcher);

    const bookUrl = `${appUrl}/auth-book/${id}`

    const cld = new Cloudinary({ cloud: { cloudName: 'dqpzvvd0v' } });

    const handleCopy = () => {
        copy(bookUrl);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Hide the success message after 2 seconds
    };

    if (!data) return <div>Loading...</div>;

    return (
        <div>

            <div className=''>
                <div className="mt-3 h-full ">
                    <div className="grid lg:grid-cols-5">
                        <Sidebar playlists={playlists} className="hidden lg:block" />

                        <div className="col-span-3 lg:col-span-4 lg:border-l">
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
                                            <h1 className="text-3xl font-semibold">
                                                {data.title}
                                            </h1>
                                            <h1 className="text-black dark:text-slate-300">
                                                Author: {data.author_name}
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
                                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5" />
                                                            </svg>
                                                            <span className="text-xs font-semibold text-blue-700 dark:text-blue-500">Copied</span>
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="mt-3">
                                                <BookButtons />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ml-5 space-y-3">
                                        <div className="flex items-center bg-white/70 border border-gray-500 dark:bg-black/70 p-1 px-2 rounded-md">
                                            <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                            </svg>
                                            <p className="ms-2 text-sm font-bold text-gray-900 dark:text-white">4.95</p>
                                            <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                                            <span className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white">73 reviews</span>
                                        </div>
                                        <div>Views: {data.views}</div>
                                    </div>
                                </div>

                                <div className="bg-emerald-500 mt-5">
                                    list of all users borrowed this
                                </div>

                                <div className="bg-emerald-500 mt-5">
                                    Tags related to this
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const fetcher = async (url: string) => {
    const response = await axios.get(url);
    return response.data;
};


export default BookDetails;