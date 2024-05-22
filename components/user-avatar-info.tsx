"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useCurrentUser } from '@/hooks/use-current-user';
import { auto } from '@cloudinary/url-gen/actions/resize';


import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';

interface BookCart {
    id: number;
    books: number[];
    student: string;
    is_borrowed_verified: boolean;
    set_to_return: boolean;
    borrowed_verified_by: string | null;
    is_returned_verified: boolean;
    returned_verified_by: string | null;
    created_at: string;
    updated_at: string;
}

interface Book {
    id: number;
    title: string;
    thumbnail_url: string;
}

interface User {
    email: string;
    studentId: number;
    image: string | null;
}



const UserAvatarInfo = () => {

    const cld = new Cloudinary({ cloud: { cloudName: 'dqpzvvd0v' } });

    const user = useCurrentUser();
    const [bookCarts, setBookCarts] = useState<BookCart[]>([]);
    const [bookData, setBookData] = useState<{ [key: number]: Book }>({});
    const defaultImage = `https://res.cloudinary.com/dqpzvvd0v/image/upload/fl_preserve_transparency/v1715859935/user-avatar_jyav0n.jpg?_s=public-apps`;

    useEffect(() => {
        const fetchBookCarts = async () => {
            try {
                const response = await axios.get<BookCart[]>('http://127.0.0.1:8000/api/bookcarts');
                const filteredBookCarts = response.data.filter(cart => cart.student === user?.email);
                console.log('Filtered Book Carts:', filteredBookCarts);
                setBookCarts(filteredBookCarts);
            } catch (error) {
                console.error('Error fetching book carts:', error);
            }
        };

        const fetchBookData = async () => {
            try {
                const response = await axios.get<any>('http://127.0.0.1:8000/api/books/all');
                if (response.data && Array.isArray(response.data)) {
                    const bookDataMap: { [key: number]: Book } = {};
                    response.data.forEach((book: Book) => {
                        bookDataMap[book.id] = book;
                    });
                    setBookData(bookDataMap);
                } else {
                    console.error('Error fetching book data: Invalid response data format');
                }
            } catch (error) {
                console.error('Error fetching book data:', error);
            }
        };

        fetchBookCarts();
        fetchBookData();
    }, []);

    return (
        <>
            <div className='mb-36'>
                <div className="relative">
                    <AdvancedImage
                        style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                        cldImg={cld.image(`bg_image/gjc_library_profile_bg`)
                            .quality('auto')
                            .resize(auto().width(1920).height(320))
                        }
                    />
                    <div className="absolute bottom-[-120px] left-0 bg-slate-600/20 w-full">
                        <div className='p-10 grid grid-cols-7 rounded-md'>

                            <div className='col-span-1'>
                                <Image
                                    width={168}
                                    height={168}
                                    src={user?.image || defaultImage}
                                    className='rounded-full border-[3px] border-neutral-950'
                                    alt="student"
                                />
                            </div>
                            <div className='h-full content-center col-span-6 pb-6 px-6'>
                                <ul className='space-y-2'>
                                    <li><div className='flex text-2xl font-semibold mb-[-10px]'><h1 className='mr-1'>Student ID: </h1>{user?.studentId}</div></li>
                                    <li>{user?.email}</li>
                                    <ul className="flex space-x-[-5px]">
                                        {bookCarts.map((cart, index) => (
                                            <li key={index} className="">
                                                {cart.books.map(bookId => (
                                                    <div key={bookId}>
                                                        {bookData[bookId]?.thumbnail_url ? (
                                                            <Image
                                                                className="rounded-full h-10 w-10 border-[2px] border-emerald-500 dark:border-[0px] dark:outline outline-purple-500 dark:outline-gray-950"
                                                                alt="book_thumbnail"
                                                                width={20}
                                                                height={20}
                                                                src={bookData[bookId]?.thumbnail_url || ""}
                                                            />
                                                        ) : (
                                                            <div className="rounded-full h-10 w-10 bg-gray-300" />
                                                        )}
                                                    </div>
                                                ))}
                                            </li>
                                        ))}
                                    </ul>

                                    <li>
                                        {bookCarts.length} {bookCarts.length !== 1 ? 'Books' : 'Book'} read
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserAvatarInfo;
