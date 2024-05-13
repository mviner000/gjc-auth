"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';

interface Book {
  id: number;
  title: string;
  author_code: string;
}

interface Props {
  onSelect: (selectedBooks: Book[]) => void;
}

export const BookSelection: React.FC<Props> = ({ onSelect }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]); // State for selected book IDs

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get<Book[]>('http://127.0.0.1:8000/api/books/');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
        setBooks([]); // Set books to empty array on error
      }
    };

    fetchBooks();
  }, []);

  const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement>, bookId: number) => {
    const isChecked = event.target.checked;

    setSelectedIds((prevSelectedIds) => {
      if (isChecked) {
        return [...prevSelectedIds, bookId]; // Add bookId to selectedIds
      } else {
        return prevSelectedIds.filter((id) => id !== bookId); // Remove bookId from selectedIds
      }
    });
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission

    const selectedBooks = books.filter((book) => selectedIds.includes(book.id));
    onSelect(selectedBooks);
  };

  return (
    <div>
      <h2>Select Books</h2>
      <form onSubmit={handleFormSubmit}>
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book.id}>
              <input
                type="checkbox"
                id={`book-${book.id}`}
                value={book.id}
                onChange={(event) => handleSelectChange(event, book.id)}
                checked={selectedIds.includes(book.id)}
              />
              <label htmlFor={`book-${book.id}`}>{book.title}</label>
            </div>
          ))
        ) : (
          <p>No books available</p>
        )}
        <button type="submit">Add Selected Books</button>
      </form>
    </div>
  );
};
