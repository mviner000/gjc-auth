import { useState, useEffect } from 'react';
import axios from 'axios';
import { DataTable } from './data-table';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from "lucide-react"
import { Button } from '@/components/ui/button';
import { useCurrentUser } from '@/hooks/use-current-user';
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

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

interface Pagination {
  count: number;
  next: string | null;
  previous: string | null;
}

const appUrl = process.env.NEXT_PUBLIC_APP;

const BookDataTable = () => {
  const { toast } = useToast()
  const user = useCurrentUser();
  const [books, setBooks] = useState<Book[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    count: 0,
    next: null,
    previous: null,
  });
  const [isPending, setIsPending] = useState(false);
  const [selectedBooks, setSelectedBooks] = useState<number[]>([]);
  const defaultStudent = user?.email;

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async (url = `${appUrl}/api/books/`) => {
    setIsPending(true);
    try {
      const response = await axios.get(url);
      setBooks(response.data.results);
      setPagination({
        count: response.data.count,
        next: response.data.next,
        previous: response.data.previous,
      });
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setIsPending(false);
    }
  };

  const handlePageChange = (url: string | null) => {
    if (url) {
      fetchBooks(url);
    }
  };

  const handleAddToCart = async (bookId: number) => {
    try {
      // Fetch the specific book by ID
      const response = await axios.get(`${appUrl}/api/books/${bookId}`);
      const book = response.data; // Assuming response contains the book details

      // Add the book to the cart
      await axios.post(`${appUrl}/api/bookcarts/`, {
        student: defaultStudent,
        books: [bookId],
      });

      // Display a toast notification for successful addition
      toast({
        title: 'Yehey! Congratulations',
        description: `"${book.title}" successfully added to cart`,
        action: <ToastAction altText="Go to schedule to undo">Close</ToastAction>,
      });

      console.log('Book added to cart:', book);
    } catch (error) {
      console.error('Error adding book to cart:', error);
      // Handle error (e.g., show error message)
    }
  };


  const columns: ColumnDef<Book>[] = [
    {
      accessorKey: 'thumbnail_url',
      header: 'Thumbnail',
      cell: ({ row }) => (
        <img
          src={
            row.getValue('thumbnail_url') ||
            'https://via.placeholder.com/128x185/007bff/ffffff?text=Book'
          }
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
        return (
          <Button onClick={() => handleAddToCart(row.original.id)}>Borrow</Button>
        )
      },
    },
  ];

  return (
    <div className='w-full'>
      <DataTable
        columns={columns}
        data={books}
        pagination={pagination}
        selectedRows={selectedBooks}
        onSelectionChange={setSelectedBooks}
        isPending={isPending}
        onPageChange={handlePageChange} // Add this line to pass handlePageChange function
      />
    </div>
  );
};

export default BookDataTable;
