"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface Subject {
  id: number;
  subject_name: string;
  book_count: number;
}

const appUrl = process.env.NEXT_PUBLIC_APP;

interface TagProps {
    subject: Subject;
    index: number;
  }


const Tag: React.FC<TagProps> = ({ subject, index }) => {
    return (
      <Link
        href={`/tags/${subject.id}`}
        className={`font-medium me-2 px-2.5 py-0.5 'bg-blue-100 text-slate-300 text-sm rounded bg-blue-400 text-blue-300', ${(index)} text-xs`}
      >
        {subject.subject_name}
      </Link>
    );
  };

export const TopTags: React.FC = () => {
  const [topSubjects, setTopSubjects] = useState<Subject[]>([]);


  useEffect(() => {
    const fetchTopSubjects = async () => {
      try {
        const response = await axios.get<Subject[]>(`${appUrl}/api/subjects/top/`);
        setTopSubjects(response.data);
      } catch (error) {
        console.error('Error fetching top subjects:', error);
      }
    };

    fetchTopSubjects();
  }, []);

  const findSubjectById = (subjectId: number) => {
    return topSubjects.find((subject) => subject.id === subjectId);
  };

  const handleSubjectClick = (subjectId: number) => {
    const subject = findSubjectById(subjectId);
  
    if (!subject) {
      return console.error(`Subject with ID ${subjectId} not found in topSubjects array.`);
    }
  
    console.log('Clicked Subject Data:', subject);
  
    console.log('subject id is:', subjectId);
  
    axios.get<Subject>(`${appUrl}/api/subjects/${subjectId}/`)
      .then(response => {
        console.log('Subject data:', response.data);
      })
      .catch(error => {
        console.error('Error fetching subject data:', error);
      });
  };
  

  return (
    <div className="mt-2 space-y-2">
      {topSubjects.map((subject, index) => (
       <Tag key={index} subject={subject} index={index} />
      ))}
    </div>
  );
};

export default TopTags;