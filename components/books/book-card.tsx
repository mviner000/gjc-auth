import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import AuthorTag from '@/components/books/author-tag';
import SubjectTag from '@/components/books/subject-tag';

interface BookCardProps {
  book: {
    id: string;
    title: string;
    author_name: string;
    subject_name: string;
    thumbnail_url: string;
    publisher: string;
    pubplace: string;
    pagination: string;
    edition: string;
  };
  onAddToCart: (title: string, thumbnailUrl: string) => void;
  setBookTitlesCount: React.Dispatch<React.SetStateAction<number>>;
}

const BookCard: React.FC<BookCardProps> = ({ book, onAddToCart, setBookTitlesCount }) => {
  return (
    <>
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 md:space-y-1">  
      <div className='xs:col-span-1 col-span-2 md:col-span-2 lg:col-span-1'>
        <Image
          src={book.thumbnail_url|| 'https://via.placeholder.com/128x185/007bff/ffffff?text=Book'}
          alt="book_image"
          width={136}
          height="56"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority={true}
          className="rounded-md w-auto md:w-48  h-56 object-cover transition-all hover:scale-105"
        />
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
    </div>
      <div className='space-x-2 my-3'>
        <Button
          onClick={() => {
            onAddToCart(book.title, book.thumbnail_url);
            setBookTitlesCount(prevCount => prevCount + 1);
          }}
        >Add To Borrow Cart</Button>
        <Button variant="secondary" disabled>Share this Book link</Button>
      </div>
      <Separator className='mt-2 bg-blue-500'/>
      </>
  );
};

export default BookCard;