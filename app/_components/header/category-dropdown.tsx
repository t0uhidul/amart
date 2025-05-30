"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/auth-context";
import { motion } from "framer-motion";
import { List } from "lucide-react";
import Link from "next/link";

export default function CategoryDropdown() {
  const { categoryList } = useAuth();
  console.log("categoryList---------", categoryList);
  return (
    <div className="hidden md:flex py-4 px-8">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 py-2 px-3 md:px-5 font-medium text-base"
          >
            <span className="md:inline hidden font-extrabold text-xl">
              Shop by Category
            </span>
            <List className=" block h-5 w-5" />
          </motion.button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>All Categories</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {categoryList?.length > 0 &&
            categoryList.map((cat: any) => (
              <DropdownMenuItem
                key={cat.id}
                className="font-medium cursor-pointer hover:bg-muted"
                asChild
              >
                <Link href={`/category/${cat.slug}`}>{cat.name}</Link>
              </DropdownMenuItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
