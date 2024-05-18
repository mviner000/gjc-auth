"use client";

import { useState, useEffect, useMemo } from 'react';
import { fetchUser } from '@/actions/fetch-users';
import { DataTable } from './data-table';
import { ColumnDef } from '@tanstack/react-table';
import { CircleCheck, CircleX } from 'lucide-react';

interface User {
  id: string;
  student_id: string | null;
  name: string | null;
  first_name: string | null;
  last_name: string | null;
  email: string;
  emailVerified: Date | null;
  tokenUsedForVerification: string | null;
  image: string | null;
  password: string | null;
  role: "USER" | "ADMIN" | null;
  isTwoFactorEnabled: boolean | null;
}


const UsersTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isPending, setIsPending] = useState(false);


  useEffect(() => {
    const fetchUsers = async () => {
      setIsPending(true);
      try {
        const fetchedUsers = await fetchUser();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setIsPending(false);
      }
    };
    fetchUsers();
  }, []);

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "first_name",
      header: "First Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "student_id",
      header: "Student Id",
    },
    {
      accessorKey: "emailVerified",
      header: "Verified",
      // Custom render function to display 'true' or 'false' based on emailVerified
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('emailVerified') ? <CircleCheck className='text-emerald-600' /> : <CircleX className='text-rose-400/80' />}</div>
      ),
    },
  ]

  return (
    <div className="h-full w-full">
      {isPending ? (
        <p>Loading...</p>
      ) : (
        <DataTable columns={columns} data={users} />
      )}
    </div>
  );
};

export default UsersTable;