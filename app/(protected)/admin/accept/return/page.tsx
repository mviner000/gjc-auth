"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';

const AcceptReturnersPage: React.FC = () => {
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [is_returned_verified, setIsReturnedVerified] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/bookcarts');
        const filtered = response.data.filter((item: any) => {
          return item.set_to_return === true && item.is_returned_verified === is_returned_verified;
        });
        setFilteredData(filtered);
      } catch (error) {
        setError('Error fetching data');
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [is_returned_verified, success]);

  const handleVerifyReturn = async (id: number) => {
    try {
      await axios.patch(`http://127.0.0.1:8000/api/bookcarts/${id}/`, {
        is_returned_verified: true,
      });
      setFilteredData((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, is_returned_verified: true } : item
        )
      );
      setSuccess('Return verified successfully');
      setTimeout(() => {
        setSuccess(null);
      }, 3000); // Clear success message after 3 seconds
    } catch (error) {
      setError('Error verifying return');
      console.error('Error updating data:', error);
    }
  };

  return (
    <div className="p-4 ">
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {success && <div className="text-green-500 mb-4">{success}</div>}
      <h1 className="text-2xl font-bold mb-4">Book Return Request</h1>
      <table className="text-center justify-center w-full table-auto border border-gray-300">
        <thead>
          <tr className="bg-transparent">
            <th className="border border-gray-300 py-2 px-4">ID</th>
            <th className="border border-gray-300 py-2 px-4">Student</th>
            <th className="border border-gray-300 py-2 px-4">Books</th>
            <th className="border border-gray-300 py-2 px-4">Set to Return</th>
            <th className="border border-gray-300 py-2 px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id}>
              <td className="border border-gray-300 py-2 px-4">{item.id}</td>
              <td className="border border-gray-300 py-2 px-4">{item.student}</td>
              <td className="border border-gray-300 py-2 px-4">{item.books.join(', ')}</td>
              <td className="border border-gray-300 py-2 px-4">{item.set_to_return ? 'Yes' : 'No'}</td>

              <td className="border border-gray-300 py-2 px-4">
                <Button onClick={() => handleVerifyReturn(item.id)}>Verify Return</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AcceptReturnersPage;