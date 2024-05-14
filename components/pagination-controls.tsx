import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Pagination from '@/components/pagination';

interface PaginationControlsProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (selectedPage: number) => void;
  onGoToPage: (pageNumber: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  totalPages,
  currentPage,
  onPageChange,
  onGoToPage,
}) => {
  const [inputPage, setInputPage] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const pageNumber = parseInt(inputPage, 10);
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
      onGoToPage(pageNumber);
    }
    setInputPage('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPage(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='mt-4 flex'>
          <Input
            type="number"
            value={inputPage}
            onChange={handleInputChange}
            placeholder={`Go to page (1 - ${totalPages})`}
            min="1"
            max={totalPages}
            className="w-1/2 md:w-3/4 bg-neutral-100 border-slate-300 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-300"
          />
          <Button type="submit" className="w-1/4 py-2 px-4 ml-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
            Go
          </Button>
        </div>
      </form>
      <div className="my-5 flex justify-left items-center">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default PaginationControls;