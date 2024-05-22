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
import BookDetailsPage from "./book-details";
import { SideBarRight } from "@/components/sidebar-right";

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

    return (
        <div>

            <div className=''>
                <div className="mt-3 h-full ">
                    <div className="grid lg:grid-cols-7">
                        <Sidebar playlists={playlists} className="hidden lg:block" />


                        <div className="m-2 col-span-3 lg:col-span-5 lg:border-l lg:border-r">
                            <BookDetailsPage />

                        </div>

                        <SideBarRight className="hidden lg:block" />
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