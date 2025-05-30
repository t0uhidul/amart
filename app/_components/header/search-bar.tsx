"use client";
import { searchItems } from "@/lib/variables";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

export default function SearchBar() {
  const [index, setIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % searchItems.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="group w-full max-w-md flex items-center bg-gray-100 px-3 py-2 rounded-lg border border-transparent focus-within:border-primary transition-all duration-300">
      <Search size={18} className="text-black mr-2 shrink-0" />
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={searchItems[index]}
        className="w-full bg-transparent outline-none text-sm sm:text-base text-gray-800 placeholder-gray-500 transition-all duration-300 group-focus-within:w-[110%]"
      />
    </div>
  );
}
