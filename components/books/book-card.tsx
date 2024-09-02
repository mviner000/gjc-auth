"use client"

import React, { useState, MouseEvent } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import AuthorTag from '@/components/books/author-tag';
import SubjectTag from '@/components/books/subject-tag';
import { Copyright } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FidgetSpinner } from 'react-loader-spinner';

interface BookCardProps {
  book: {
    id: number;
    title: string;
    author_name: string;
    subject_name: string;
    thumbnail_url: string;
    publisher: string;
    pubplace: string;
    pagination: string;
    edition: string;
    copyright: string;
  };
  onAddToCart: (title: string, thumbnailUrl: string) => void;
  setBookTitlesCount: React.Dispatch<React.SetStateAction<number>>;
}




const BookCard: React.FC<BookCardProps> = ({ book, onAddToCart, setBookTitlesCount }) => {
  const copyrightYear = book.copyright?.match(/\d+/g)?.join('');
  const router = useRouter();
  const [bookLoading, setBookLoading] = useState(false);
  const handleViewBook = (e: MouseEvent<HTMLDivElement>, bookId: number) => {
    e.preventDefault();
    setBookLoading(true);
    router.push(`/unli-book/${bookId}`);
  };

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
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 md:space-y-1">
        <div className='xs:col-span-1 col-span-2 md:col-span-2 lg:col-span-1'>
          <div
            onClick={(e) => handleViewBook(e, book.id)}
            className="cursor-pointer shadow-md dark:shadow-none bg-white dark:bg-transparent rounded-md p-0"
          >
            <Image
              src={book.thumbnail_url || 'https://via.placeholder.com/128x185/007bff/ffffff?text=Book'}
              alt="book_image"
              width={136}
              height="56"
              sizes="(max-width: 768px) 100vw, 33vw"
              priority={true}
              className="rounded-md w-auto md:w-48  h-56 object-cover transition-all hover:scale-105"
            />

          </div>
        </div>
        <div className='flex flex-col ml-2 col-span-2 md:col-span-3 lg:col-span-4'>
          <span className='font-bold text-slate-300'>{book.title}</span>
          <div className='space-x-2 my-3 mb-3'>
            <AuthorTag authorName={book.author_name} />
            <SubjectTag subjectName={book.subject_name} />
          </div>
          <span className="text-sm"><span className='font-bold'>Publisher: </span>{book.publisher}</span>
          <span className="text-sm"><span className='font-bold'>Pub Place: </span>{book.pubplace}</span>
          <span className="text-sm"><span className='font-bold'>Pagination: </span>{book.pagination}</span>
          <span className="text-sm"><span className='font-bold'>Edition: </span>{book.edition}</span>
        </div>
        {book.copyright && (
          <div className="text-sm dark:text-slate-300">
            <div className='flex gap-2'>
              <Copyright size={18} />

              {book.copyright}

              {copyrightYear ? (
                isNaN(parseInt(copyrightYear)) ? (
                  <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-400">
                    Invalid Copyright
                  </span>
                ) : parseInt(copyrightYear) <= 2014 ? (
                  <span className="bg-red-100/50 text-red-800/50 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400">
                    Phased Out
                  </span>
                ) : (
                  <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">
                    Available
                  </span>
                )
              ) : (
                <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-400">
                  Invalid Copyright
                </span>
              )}
            </div>

          </div>
        )}

      </div>
      <div className='space-x-2 my-3'>
        <Button
          onClick={() => {
            onAddToCart(book.title, book.thumbnail_url);
            setBookTitlesCount(prevCount => prevCount + 1);
          }}
        >Add To Wish List
        </Button>
        <Button variant="secondary" disabled>Copy this Book link</Button>
      </div>
      <Separator className='my-3' />
    </>
  );
};

export default BookCard;