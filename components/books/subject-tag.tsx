import React from 'react';

interface SubjectTagProps {
  subjectName: string;
}

const SubjectTag: React.FC<SubjectTagProps> = ({ subjectName }) => {
  return (
    <span className="bg-purple-200 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
      {subjectName}
    </span>
  );
};

export default SubjectTag;