import React from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Author, Book } from '@/app/(guest)/authors/types';
import { Button } from '@/components/ui/button';

interface AuthorCardProps {
  author: Author;
  handleAddToCart: (title: string, thumbnail_url: string) => void; // Assuming handleAddToCart function is passed as prop
}

const AuthorCard: React.FC<AuthorCardProps> = ({ author, handleAddToCart }) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={`item-${author.id}`}>
        <AccordionTrigger>
          {author.author_name} <span className="text-yellow-200"> {author.books.length} ( book published)</span>
        </AccordionTrigger>
        <ul>
          {author.books.map((book: Book) => (
            <li key={book.id}>
              <AccordionContent>
                {book.title}
                <Button className='ml-2' onClick={() => handleAddToCart(book.title, book.thumbnail_url)}>Add</Button>
              </AccordionContent>
            </li>
          ))}
        </ul>
      </AccordionItem>
    </Accordion>
  );
};

export default AuthorCard;
