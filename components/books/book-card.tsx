import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PackagePlus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import AuthorTag from '@/components/books/author-tag';
import SubjectTag from '@/components/books/subject-tag';

interface BookCardProps {
  book: {
    id: number;
    title: string;
    author_name: string;
    subject_name: string;
  };
  onAddToCart: (title: string) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onAddToCart }) => {
  return (
    <li key={book.id} className="my-3">
      {book.title} 
      <div className='flex gap-64 mt-1'>
        <div className='flex'>
          <Image
            src={`https://via.placeholder.com/32x32/007bff/ffffff?text=Book`}
            alt="book_image"
            width={32}
            height={32}
            className="rounded-md h-9 w-9 object-cover transition-all hover:scale-105"
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            onAddToCart(book.title); // Add book title to local storage
          }}
        >
          <PackagePlus className="h-[1rem] w-[1rem]" />
        </Button>
      </div>
      <div className='space-x-2 my-2'>
        <AuthorTag authorName={book.author_name} />
        <SubjectTag subjectName={book.subject_name} />
      </div>
      <Separator className='mt-2 bg-blue-500'/>
    </li>
  );
};

export default BookCard;