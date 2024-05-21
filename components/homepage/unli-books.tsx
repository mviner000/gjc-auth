"use client";

import { Sidebar } from '@/components/sidebar';

import { playlists } from "@/actions/playlists";
import BookList from '@/components/auth-book/book-list';

const UnliBook = () => {


    return (
        <>
            <div className="mt-3 h-full ">
                <div className="grid lg:grid-cols-5">
                    <Sidebar playlists={playlists} className="hidden lg:block" />
                    <div className="col-span-3 lg:col-span-4 lg:border-l">
                        <div className="h-full px-4 py-6 lg:px-8">
                            <BookList />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UnliBook;