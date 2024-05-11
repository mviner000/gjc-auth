"use client";

import { usePathname } from 'next/navigation';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface Subject {
    id: number;
    subject_name: string;
    temp_id: number | null;
    subject_code: string;
}

const TagDetails = () => {
  const pathname = usePathname();
  const id = parseInt(pathname.split("/").pop()!);
  const [subject, setSubject] = useState<Subject | null>(null);

  useEffect(() => {
    getSubject(id);
  }, [id]);

  const getSubject = async (id: number) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/subjects/${id}`);
      setSubject(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!subject) return <div>Loading...</div>;

  return (
    <div>
      <h1>{subject.subject_name}</h1>
      <p>ID: {subject.id}</p>
      <p>Subject Code: {subject.subject_code}</p>
      <p>Temporary ID: {subject.temp_id === null ? 'N/A' : subject.temp_id}</p>
    </div>
  );
};

export default TagDetails;