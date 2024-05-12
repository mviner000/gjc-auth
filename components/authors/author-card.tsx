import React from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Author, Book } from '@/app/(guest)/authors/types';

interface AuthorCardProps {
  author: Author;
}

const AuthorCard: React.FC<AuthorCardProps> = ({ author }) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={`item-${author.id}`}>
        <AccordionTrigger>
          {author.author_name} <span className="text-yellow-200"> {author.books.length} ( book published)</span>
        </AccordionTrigger>
        <ul>
          {author.books.map((book: Book) => (
            <AccordionContent key={book.id}>
              {book.title}
            </AccordionContent>
            
          ))}
        </ul>
      </AccordionItem>
    </Accordion>
  );
};

export default AuthorCard;