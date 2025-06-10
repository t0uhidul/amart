"use client";
import { useAuth } from "@/contexts/auth-context";
import { X, ChevronRight, List } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

interface CategorySidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CategorySidebar({
  isOpen,
  onClose,
}: CategorySidebarProps) {
  const { categoryList } = useAuth();

  // Close sidebar on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="absolute left-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-xl animate-in slide-in-from-left duration-300">
        <div className="flex h-full flex-col">
          {/* Header - full width border */}
          <div className="border-b border-gray-300">
            <div className="flex items-center px-6 py-4">
              <div className="flex items-center gap-3 flex-1">
                <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg">
                  <List className="h-4 w-4 text-primary" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Categories
                </h2>
              </div>
              <button
                onClick={onClose}
                className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Close categories"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Categories List */}
          <div className="flex-1 overflow-y-auto">
            {categoryList?.length > 0 ? (
              <div className="py-2">
                {categoryList.map((cat: any) => (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.slug}`}
                    onClick={onClose}
                    className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors group"
                  >
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                      {cat.name}
                    </span>
                    <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-32">
                <p className="text-sm text-gray-500">No categories available</p>
              </div>
            )}
          </div>

          {/* Footer - full width border */}
          <div className="border-t border-gray-300">
            <div className="px-6 py-4">
              <p className="text-xs text-gray-500 text-center">
                Browse all our product categories
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
