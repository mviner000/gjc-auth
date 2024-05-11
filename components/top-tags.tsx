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

const generateTagColor = (index: number) => {
    const colors = [
        'bg-blue-100 text-blue-800 text-sm font-medium rounded dark:bg-blue-900 dark:text-blue-300',
        'bg-blue-100 text-blue-800 text-sm font-medium rounded dark:bg-blue-900 dark:text-blue-300',
        'bg-gray-100 text-gray-800 text-sm font-medium rounded dark:bg-gray-700 dark:text-gray-300',
        'bg-red-100 text-red-800 text-sm font-medium rounded dark:bg-red-900 dark:text-red-300',
        'bg-green-100 text-green-800 text-sm font-medium rounded dark:bg-green-900 dark:text-green-300',
        'bg-yellow-100 text-yellow-800 text-sm font-medium rounded dark:bg-yellow-900 dark:text-yellow-300',
        'bg-indigo-100 text-indigo-800 text-sm font-medium rounded dark:bg-indigo-900 dark:text-indigo-300',
        'bg-purple-100 text-purple-800 text-sm font-medium rounded dark:bg-purple-900 dark:text-purple-300',
        'bg-pink-100 text-pink-800 text-sm font-medium rounded dark:bg-pink-900 dark:text-pink-300',
        'bg-gray-100 text-gray-800 text-sm font-medium rounded dark:bg-gray-700 dark:text-gray-300'
    ];
    return `bg-${colors[index % colors.length]}-100 text-${colors[index % colors.length]}-800 text-sm font-medium rounded dark:bg-${colors[index % colors.length]}-900 dark:text-${colors[index % colors.length]}-300`;
  };

const Tag: React.FC<TagProps> = ({ subject, index }) => {
    return (
      <Link
        href={`/tags/${subject.id}`}
        className={`font-medium me-2 px-2.5 py-0.5 rounded-full ${generateTagColor(index)} text-xs`}
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
        const response = await axios.get<Subject[]>(`${appUrl}/api/subjects/top`);
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
  
    axios.get<Subject>(`${appUrl}/api/subjects/${subjectId}`)
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