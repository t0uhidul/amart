"use client";
import { searchItems } from "@/lib/variables";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

export default function SearchBar() {
  const [index, setIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isFocused) {
        setIndex((prev) => (prev + 1) % searchItems.length);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [isFocused]);

  return (
    <div className="flex-1 max-w-2xl">
      <div
        className={`
        group relative flex items-center bg-gray-50 border border-gray-200 rounded-lg
        transition-all duration-300 ease-in-out
        ${
          isFocused
            ? "bg-white border-primary shadow-sm ring-1 ring-primary/20"
            : "hover:bg-gray-100 hover:border-gray-300"
        }
      `}
      >
        <div className="flex items-center pl-4 pr-2">
          <Search
            size={18}
            className={`transition-colors duration-200 ${
              isFocused
                ? "text-primary"
                : "text-gray-400 group-hover:text-gray-600"
            }`}
          />
        </div>

        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={searchItems[index]}
          className="
            w-full py-3 pr-4 bg-transparent outline-none
            text-sm text-gray-800 placeholder-gray-500
            transition-all duration-200
          "
        />

        {/* Search suggestions overlay */}
        {isFocused && inputValue && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <div className="p-4 text-sm text-gray-500 text-center">
              Search suggestions will appear here
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
