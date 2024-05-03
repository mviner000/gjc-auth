import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface BookCartProps {
  bookTitles: string[];
  onDeleteTitle: (title: string) => void;
}

const BookCart: React.FC<BookCartProps> = ({ bookTitles, onDeleteTitle }) => {
  return (
    <ul className='space-y-4 my-3'>
      {bookTitles.map((title, index) => (
        <li key={index}>
          {title}
          <div className='flex justify-between my-2'>
            <Image
              src={`https://via.placeholder.com/64x80/007bff/ffffff?text=Book`}
              alt="book_image"
              width={64}
              height={80}
              className="object-cover transition-all hover:scale-105"
            />
            <Button variant="outline" size="icon" onClick={() => onDeleteTitle(title)}>
              <X className="h-[1.1rem] w-[1.1rem] text-red-500" />
            </Button>
          </div>
          <Separator />
        </li>
      ))}
    </ul>
  );
};

export default BookCart;
