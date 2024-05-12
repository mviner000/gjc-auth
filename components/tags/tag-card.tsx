// SubjectCard.tsx
import React from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Book, Subject } from '@/app/(guest)/authors/types';
import { Button } from '@/components/ui/button';

interface SubjectCardProps {
  subjects: Subject[];
  handleAddToCart: (title: string, thumbnailUrl: string) => void;
}

const SubjectCard: React.FC<SubjectCardProps> = ({ subjects, handleAddToCart }) => {
  return (
    <ul>
      {subjects.map((subject: Subject, index: number) => (
        <li key={subject.id || `subject-${index}`}>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value={`item-${subject.id}`}>
              <AccordionTrigger>
                <span className="opacity-90 bg-purple-100 text-purple-500 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-purple-400 border border-purple-500">{subject.subject_name}</span>
                <span className="text-yellow-200"> {subject.books.length} (books tagged)</span>
              </AccordionTrigger>
              <ul>
                {subject.books ? (
                  subject.books.map((book: Book, index: number) => (
                    <li key={book.id || `book-${index}`}>
                      <AccordionContent>
                        {book.title}
                        <Button className='ml-2' onClick={() => handleAddToCart(book.title, book.thumbnail_url)}>Add</Button>
                      </AccordionContent>
                    </li>
                  ))
                ) : (
                  <li key={`no-books-${subject.id}`}>No books found for this subject</li>
                )}
              </ul>
            </AccordionItem>
          </Accordion>
        </li>
      ))}
    </ul>
  );
};

export default SubjectCard;
