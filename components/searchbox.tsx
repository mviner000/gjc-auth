"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const SearchBox = () => {
  const searchParams = useSearchParams();
  const searchText = searchParams.get("q") || "";
  const [localSearchText, setLocalSearchText] = useState(searchText);

  const handleSearch = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const searchUrl = new URLSearchParams(window.location.search);
    searchUrl.set("q", localSearchText);
    const newPathname = `/search?${searchUrl.toString()}`; // Add /search here
    window.location.href = newPathname;
  };

  return (
    <div>
      <div className="sm:flex items-center rounded-lg bg-transparent overflow-hidden px-2 py-1 justify-between">
        <div className="flex rounded-lg border border-1">
          <input
            className="text-base  ml-3  bg-transparent text-gray-200 flex-grow outline-none dark:bg-transparent"
            type="text"
            placeholder="Search"
            value={localSearchText}
            onChange={(e) => setLocalSearchText(e.target.value)}
          />
          <button
            className="bg-indigo-500 text-white text-base rounded-r-lg px-6 py-2 font-thin"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;