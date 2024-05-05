import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PackagePlus } from 'lucide-react';
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
  onAddToCart: (title: string, thumbnailUrl: string) => void; // Include thumbnailUrl parameter
}

const BookCard: React.FC<BookCardProps> = ({ book, onAddToCart }) => {
  return (
    <li key={book.id} className="my-4">
    <span>BookId: </span>{book.id}
    <div className="mt-1 grid grid-cols-3 gap-2 md:gap-0 md:grid-cols-1 md:space-y-1">  <Image
        src={book.thumbnail_url}
        alt="book_image"
        height={48}
        width={32}
        className="rounded-md h-48 w-32 object-cover transition-all hover:scale-105"
      />
      <div className='flex flex-col xxs:col-span-2 xs:col-span-1'>
      <span className="text-sm"><span className='font-bold'>Publisher: </span>{book.publisher}</span>
      <span className="text-sm"><span className='font-bold'>Pub Place: </span>{book.pubplace}</span>
      <span className="text-sm"><span className='font-bold'>Pagination: </span>{book.pagination}</span>
      <span className="text-sm"><span className='font-bold'>Edition: </span>{book.edition}</span>
      </div>
      <Button
      variant="outline"
      size="icon"
      onClick={() => {
        onAddToCart(book.title, book.thumbnail_url); // Pass title and thumbnail_url
      }}
    >
      <PackagePlus className="h-[1rem] w-[1rem]" />
    </Button>
    </div>
      {book.title} 
      <div className='space-x-2 my-2 mb-3'>
        <AuthorTag authorName={book.author_name} />
        <SubjectTag subjectName={book.subject_name} />
      </div>
      <Separator className='mt-2 bg-blue-500'/>
    </li>
  );
};

export default BookCard;