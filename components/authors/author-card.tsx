import React, { useState, MouseEvent } from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Author, Book } from '@/app/(guest)/authors/types';
import { Button } from '@/components/ui/button';
import AuthorTag from '@/components/books/author-tag';

import { useRouter } from 'next/navigation';
import { FidgetSpinner } from 'react-loader-spinner';


interface AuthorCardProps {
  author: Author;
  handleAddToCart: (title: string, thumbnail_url: string) => void; // Assuming handleAddToCart function is passed as prop
}

const AuthorCard: React.FC<AuthorCardProps> = ({ author, handleAddToCart }) => {

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
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value={`item-${author.id}`}>
          <AccordionTrigger>
            <AuthorTag authorName={author.author_name}></AuthorTag>
            <span className="text-black dark:text-white"> {author.books.length} ( book published)</span>
          </AccordionTrigger>
          <ul>
            {author.books.map((book: Book, index: number) => (
              <li key={`${author.id}-${index}`}>

                <AccordionContent>
                  <div className='flex'>
                    <div
                      onClick={(e) => handleViewBook(e, book.id)}
                      className=" p-2 cursor-pointer shadow-md dark:shadow-none 
                      bg-purple-500 dark:bg-transparent rounded-md"
                    >
                      <span className='rounded-md hover:bg-emerald-500/90 p-2'>
                        {book.title}
                      </span>
                    </div>
                    <Button
                      className='ml-2'
                      onClick={() => {
                        handleAddToCart(book.title, book.thumbnail_url);
                      }}
                    >
                      Add to Wishlist
                    </Button>
                  </div>
                </AccordionContent>
              </li>
            ))}
          </ul>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default AuthorCard;
