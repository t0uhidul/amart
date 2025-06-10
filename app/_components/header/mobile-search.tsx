"use client";
import { searchItems } from "@/lib/variables";
import { Search, X } from "lucide-react";
import { useEffect, useState, useRef } from "react";

interface MobileSearchProps {
  onClose: () => void;
}

export default function MobileSearch({ onClose }: MobileSearchProps) {
  const [index, setIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Auto-focus when component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % searchItems.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full animate-in slide-in-from-top-2 duration-200">
      <div className="relative flex items-center bg-gray-50 border border-gray-200 rounded-lg focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20">
        <div className="flex items-center pl-3 pr-2">
          <Search size={18} className="text-gray-400" />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={searchItems[index]}
          className="w-full py-3 pr-12 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-500"
        />

        <button
          onClick={onClose}
          className="absolute right-3 flex items-center justify-center w-6 h-6 rounded-full hover:bg-gray-200 transition-colors"
          aria-label="Close search"
        >
          <X size={14} className="text-gray-500" />
        </button>
      </div>

      {/* Search suggestions can be added here */}
      {inputValue && (
        <div className="mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="p-4 text-sm text-gray-500 text-center">
            Search suggestions will appear here
          </div>
        </div>
      )}
    </div>
  );
}
