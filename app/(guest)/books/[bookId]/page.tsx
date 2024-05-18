"use client";

import axios from "axios";
import { usePathname } from "next/navigation";
import useSWR from 'swr';

interface Book {
    id: number;
    title: string;
    author_name: string;
    thumbnail_url: string;
    views: string;
}

const appUrl = process.env.NEXT_PUBLIC_APP;

const BookDetails = () => {
    const pathname = usePathname();
    const id = parseInt(pathname.split("/").pop()!);

    const { data, error } = useSWR(`${appUrl}/api/books/${id}`, fetcher);

    if (!data) return <div>Loading...</div>;

    return (
        <div>
            <h1>{data.title}</h1>
            <p>Author: {data.author_name}</p>
            <p>Views: {data.views}</p>
            <img src={data.thumbnail_url} alt={data.title} />
        </div>
    );
};

const fetcher = async (url: string) => {
    const response = await axios.get(url);
    return response.data;
};


export default BookDetails;