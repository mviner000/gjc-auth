import { useState, useEffect } from 'react';
import axios from 'axios';
import { DataTable } from './data-table';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from '@/components/ui/button';

import Username from "@/components/username"
import { useCurrentUser } from '@/hooks/use-current-user';

interface Book {
  id: number;
  title: string;
  author_name: string;
  subject_name: string;
  thumbnail_url: string;
  publisher: string;
  pubplace: string;
  pagination: string;
  edition: string | null;
}

const BookDataTable = () => {
  
  const user = useCurrentUser();
  const [books, setBooks] = useState<Book[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [selectedBooks, setSelectedBooks] = useState<number[]>([]);
  
  
  const defaultStudent = user?.email

  useEffect(() => {
    const fetchBooksData = async () => {
      setIsPending(true);
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/books/');
        const fetchedBooks = response.data.results;
        setBooks(fetchedBooks);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setIsPending(false);
      }
    };
    fetchBooksData();
  }, []);

  const handleAddToCart = async (bookId: number) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/bookcarts/', {
        student: defaultStudent,
        books: [bookId]
      });
      console.log('Book added to cart:', response.data);
      // Optionally update UI or show a success message
    } catch (error) {
      console.error('Error adding book to cart:', error);
      // Handle error (e.g., show error message)
    }
  };

  const columns: ColumnDef<Book>[] = [
    {
      accessorKey: 'thumbnail_url',
      header: 'Thumbnail',
      // Custom render function for displaying the thumbnail as an image
      cell: ({ row }) => (
        <img
          src={row.getValue('thumbnail_url')}
          alt={`Thumbnail for ${row.getValue('title')}`}
          style={{ width: '50px', height: 'auto' }}
        />
      ),
    },
    {
      accessorKey: 'title',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Title
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: 'author_name',
      header: 'Author',
    },
    {
      accessorKey: 'subject_name',
      header: 'Subject',
    },
    {
      header: 'Actions',
      id: "actions",
      cell: ({ row }) => {
        const payment = row.original
  
        return (
          <Button onClick={() => handleAddToCart(row.original.id)}>Borrow</Button>
        )
      },
  },
    // Add more columns as needed
  ];

  return (
    <div className="h-full w-full">
      {isPending ? (
        <p>Loading...</p>
      ) : (
        <DataTable columns={columns} data={books} />
      )}
    </div>
  );
};

export default BookDataTable;
