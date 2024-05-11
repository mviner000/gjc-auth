"use client";

import { useEffect, useState } from "react";

const ShowPage: React.FC = () => {
    const [bookTitles, setBookTitles] = useState<string[]>([]);
    const [bookTitlesCount, setBookTitlesCount] = useState<number>(0);
  
    useEffect(() => {
      const storedTitlesJSON = localStorage.getItem('bookTitles');
      if (storedTitlesJSON) {
        setBookTitles(JSON.parse(storedTitlesJSON));
      }
  
      const storedCount = localStorage.getItem('bookTitlesCount');
      if (storedCount) {
        setBookTitlesCount(parseInt(storedCount, 10));
      }
    }, []);
  
    return (
      <div>
        <h1>Show Page</h1>
        <p>Book Titles:</p>
        <ul>
          {bookTitles.map((title, index) => (
            <li key={index}>{title}</li>
          ))}
        </ul>
        <p>Book Titles Count: {bookTitlesCount}</p>
      </div>
    );
  };

export default ShowPage