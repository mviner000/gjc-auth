"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BorrowersTable from '@/components/admin/borrowers-table';

interface BookCart {
  id: number;
  books: number[];
  student: string;
  is_borrowed_verified: boolean;
}

const AcceptBorrowersPage: React.FC = () => {
  const [bookCarts, setBookCarts] = useState<BookCart[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/unverified-bookcarts/');
        setBookCarts(response.data);
      } catch (error) {
        console.error('Error fetching book carts:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <BorrowersTable />
    </div>
  );
};

export default AcceptBorrowersPage;