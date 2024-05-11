"use client";

import { usePathname } from 'next/navigation';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Sidebar } from '@/components/sidebar';
import { playlists } from '@/actions/playlists';
import BreadcrumbComponent from '@/components/breadcrumb';
import CartSheet from '@/components/cart-sheet';
import Image from 'next/image';
import NavMenu from '@/components/nav-menu';

interface Subject {
    id: number;
    subject_name: string;
    temp_id: number | null;
    subject_code: string;
    books: Book[];  // Define the type for books related to the subject
}

interface Book {
    id: number;
    title: string;
    author_name: string;  // Assuming author_name is included in book data
    thumbnail_url: string;  // Assuming thumbnail_url is included in book data
}


const appUrl = process.env.NEXT_PUBLIC_APP;

const TagDetails = () => {
    const pathname = usePathname();
    const id = parseInt(pathname.split("/").pop()!);
    const [subject, setSubject] = useState<Subject | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [bookTitles, setBookTitles] = useState<string[]>([]);
    const [bookTitlesCount, setBookTitlesCount] = useState<number>(0);

    useEffect(() => {
        getSubject(id);
    }, [id]);

    const getSubject = async (id: number) => {
        try {
            const response = await axios.get(`${appUrl}/api/subjects/${id}`);
            setSubject(response.data);
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


    if (!subject) return <div>Loading...</div>;

    return (
        <div className='bg-gradient-to-t from-emerald-600 via-50% to-emerald-700 to-70%'>
            <div className="mt-3 h-full ">
      <div className="grid lg:grid-cols-5">
      <Sidebar playlists={playlists} className="hidden lg:block" />
      <div className="col-span-3 lg:col-span-4 lg:border-l">
        
      <div className="h-full px-4 py-6 lg:px-8">
      <div className='flex justify-between'>
          <BreadcrumbComponent currentPage={currentPage} currentPageText={subject.subject_name} />
          <div className='mr-16'>
            <CartSheet bookTitles={bookTitles} onDeleteTitle={handleDeleteBookTitle} handleEmptyBookCart={handleEmptyBookCart} />
          </div>
      </div>  
           
      <div className='my-3'>
        <NavMenu />
      </div>  

            <h1 className='text-4xl mb-5 font-semibold'>{subject.subject_name}<span className="text-yellow-200"> {subject.books.length} ( book total tagged)</span></h1> 
         
            {subject.books.length > 0 ? (
                 <ul className="space-y-3 grid grid-cols-1 xxs:grid-cols-2 xs:grid-cols-2 md:grid-cols-4 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    {subject.books.map((book) => (
                        <li key={book.id}>
                            <p>{book.title}</p>
                            <Image
                      src={`${appUrl}${book.thumbnail_url}`|| 'https://via.placeholder.com/128x185/007bff/ffffff?text=Book'}
                      alt="book_image"
                      width={136}
                      height={56}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      priority={true}
                      className="mt-3 rounded-md w-auto xxs:size-38 md:w-48 h-56 object-cover transition-all hover:scale-105"
                    />
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No books found for this subject.</p>
            )}
        </div>
        </div>
        </div>
        </div>
        </div>

    );
};

export default TagDetails;
