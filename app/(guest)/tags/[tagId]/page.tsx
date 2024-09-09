"use client";

import React, { useState, useEffect, MouseEvent } from 'react';
import { usePathname } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FidgetSpinner } from 'react-loader-spinner';

import { Book } from '@/utils/types/subjects';
import { Subject } from '@/utils/types/subjects';

import { Sidebar } from '@/components/sidebar';
import BreadcrumbComponent from '@/components/breadcrumb';
import CartSheet from '@/components/cart-sheet';
import { SideBarRight } from '@/components/sidebar-right';

import { playlists } from '@/actions/playlists';
import SubjectList from './_components/subject_list';


const appUrl = process.env.NEXT_PUBLIC_APP;

const TagDetails = () => {
    const pathname = usePathname();
    const id = parseInt(pathname.split("/").pop()!);
    const [subject, setSubject] = useState<Subject | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [bookTitles, setBookTitles] = useState<string[]>([]);
    const [bookTitlesCount, setBookTitlesCount] = useState<number>(0);

    const router = useRouter();
    const [bookLoading, setBookLoading] = useState(false);

    useEffect(() => {
        getSubject(id);
    }, [id]);

    const getSubject = async (id: number) => {
        try {
            const response = await axios.get(`${appUrl}/api/subjects/${id}/`);
            setSubject(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
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


    if (!subject) return <div>Loading...</div>;

    return (
        <>
            {bookLoading && (
                <div className="fixed inset-0 flex justify-center items-center bg-neutral-500/50 z-50">
                    <FidgetSpinner
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        ballColors={['#ff0000', '#00ff00', '#0000ff']}
                        backgroundColor="#F4442E"
                    />
                </div>
            )}
            <div className="grid lg:grid-cols-7">
                <Sidebar playlists={playlists} className="hidden lg:block" />
                <div className="col-span-3 lg:col-span-5 lg:border-l lg:border-r">
                    <div className="h-full px-4 lg:px-8">
                        <div className='flex justify-between'>
                            <BreadcrumbComponent currentPage={currentPage} currentPageText={subject.subject_name} />
                            <div className='mr-16'>
                                <CartSheet bookTitles={bookTitles} onDeleteTitle={handleDeleteBookTitle} handleEmptyBookCart={handleEmptyBookCart} />
                            </div>
                        </div>
                        <SubjectList
                            bookTotalTaggedText="book total tagged"
                            subject1_code={subject.subject_code}
                            bookTitles={bookTitles}
                            handleDeleteBookTitle={handleDeleteBookTitle}
                            handleEmptyBookCart={handleEmptyBookCart}
                            handleViewBook={handleViewBook}
                            bookLoading={bookLoading}
                        />

                    </div>
                </div>

                <SideBarRight className="hidden lg:block " />
            </div>
        </>
    );
};

export default TagDetails;
