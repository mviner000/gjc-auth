"use client";

import { fetchUser } from '@/actions/fetch-users';
import React, { useState, useEffect } from 'react';

interface User {
  id: string;
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

interface FetchUsersProps {
  users: User[];
}

const FetchUsers: React.FC<FetchUsersProps> = ({ users }) => {
  // render the users list here
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};

const Students = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsPending(true);
      try {
        const fetchedUsers = await fetchUser();
        // Stringify the fetchedUsers data
        const usersJsonString = JSON.stringify(fetchedUsers);
        console.log('Fetched users JSON:', usersJsonString);

        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setIsPending(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className='h-full w-full'>
      <div className='grid grid-cols-3 gap-4'>
      {users.map((user) => (
        <div key={user.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
          <h4>User ID: {user.id}</h4>
          <p><strong>Name:</strong> {user.name || `${user.first_name || ''} ${user.last_name || ''}`.trim()}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Email Verified:</strong> {user.emailVerified ? new Date(user.emailVerified).toLocaleString() : 'Not verified'}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Two-Factor Authentication:</strong> {user.isTwoFactorEnabled ? 'Enabled' : 'Disabled'}</p>
          {user.image && <img src={user.image} alt="User Avatar" style={{ maxWidth: '100px', maxHeight: '100px' }} />}
          {/* You can add more details as needed */}
        </div>
      ))}
    </div>
    
    </div>
  );
};

export default Students;