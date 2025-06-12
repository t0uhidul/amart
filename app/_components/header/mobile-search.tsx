"use client";
import { searchItems } from "@/lib/variables";
import { Search, X, ChevronRight } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useProducts } from "@/hook/use-products";

interface Props {
  onClose: () => void;
}

export default function MobileSearch({ onClose }: Props) {
  const [index, setIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { products } = useProducts();
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % searchItems.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    if (!inputValue.trim()) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    debounceTimeout.current = setTimeout(() => {
      const lower = inputValue.toLowerCase();
      const matched = products
        .filter((p) => p.name.toLowerCase().includes(lower))
        .map((p) => p.name)
        .slice(0, 5);
      setSuggestions(matched);
      setLoading(false);
    }, 500);

    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [inputValue, products]);

  const handleSubmit = () => {
    const trimmed = inputValue.trim();
    if (trimmed) {
      setSuggestions([]);
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
      onClose();
    }
  };

  return (
    <div className="w-full animate-in slide-in-from-top-2 duration-200">
      <div className="relative flex items-center bg-gray-50 border border-gray-200 rounded-lg focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20">
        <div className="pl-3 pr-2">
          <Search size={18} className="text-gray-400" />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder={searchItems[index]}
          className="w-full py-3 pr-12 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-500"
        />

        <button
          onClick={onClose}
          className="absolute right-3 flex items-center justify-center w-6 h-6 rounded-full hover:bg-gray-200 transition-colors"
          aria-label="Close"
        >
          <X size={14} className="text-gray-500" />
        </button>
      </div>

      <div className="mt-2">
        {loading && (
          <div className="flex justify-center py-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary" />
          </div>
        )}

        {!loading && suggestions.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg">
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => {
                  setInputValue(s);
                  setSuggestions([]);
                  router.push(`/search?q=${encodeURIComponent(s)}`);
                  onClose();
                }}
                className="w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-100 hover:text-primary transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Search size={14} className="text-gray-400" />
                  {s}
                </div>
                <ChevronRight size={16} className="text-gray-400" />
              </button>
            ))}
          </div>
        )}

        {!loading && inputValue && suggestions.length === 0 && (
          <div className="text-sm text-center text-gray-500 mt-2">
            No results found
          </div>
        )}
      </div>
    </div>
  );
}
