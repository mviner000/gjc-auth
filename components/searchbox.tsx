"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import SearchIcon from "@/components/icons/search-icon";

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(e as any);
    }
  };

  return (
    <div>
      <div className="xs:hidden hidden md:hidden lg:block sm:flex items-center rounded-lg  bg-transparent overflow-hidden px-2 py-1 justify-between">
        <div className="flex rounded-lg border-[1.5px] border-emerald-500 mt-[-3px]">
          <input
            className="text-base ml-3 w-100 bg-transparent text-gray-200 flex-grow outline-none  dark:bg-transparent"
            type="text"
            placeholder="Search"
            value={localSearchText}
            onChange={(e) => setLocalSearchText(e.target.value)}

            onKeyDown={handleKeyDown}
          />
          <button
            className="bg-indigo-500 text-white text-base rounded-r-lg px-6 py-2 font-thin"
            onClick={handleSearch}
          >
            <SearchIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;