"use client";

import { Button } from "@/components/ui/button";
import { LayoutGrid, Phone, Search, ShoppingBasket } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import GlobalApi from "@/app/_utils/GlobalApi";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/auth-context";

export default function Header() {
  const [category, setCategory] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const { authState, showLoginModal, logout } = useAuth();

  useEffect(() => {
    getCategoryList();

    // Add scroll event listener
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getCategoryList = () => {
    GlobalApi.getCategory().then((res) => {
      setCategory(res.data.data);
    });
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg py-2" : "bg-[#f8f8f8] py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo and Left Section */}
        <div className="flex items-center gap-6">
          <Link href="/">
            <Image
              src="/freshgo-logo.png"
              alt="FreshGo"
              width={150}
              height={50}
              className="transition-transform hover:scale-105"
            />
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex gap-2 items-center rounded-full py-2 px-5 bg-primary text-white font-medium text-sm md:text-base transition-colors hover:bg-primary/90"
              >
                <LayoutGrid className="h-4 w-4 mr-1" />
                <span>Category</span>
              </motion.button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>All Categories</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {category.map((cat: any, index: number) => (
                <DropdownMenuItem
                  key={index}
                  className="font-medium cursor-pointer hover:bg-muted"
                >
                  {cat.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Search Bar */}
          <div className="hidden md:flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 w-[280px] lg:w-[320px] focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
            <Search className="h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search for fresh produce..."
              className="bg-transparent outline-none w-full text-sm"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-5">
          <div className="hidden md:flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-full">
              <Phone className="h-5 w-5 text-primary" />
            </div>
            <div className="hidden lg:block">
              <p className="text-xs text-gray-500">CALL US 24/7</p>
              <p className="text-sm font-semibold">(1800)-88-66-991</p>
            </div>
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="relative">
              <ShoppingBasket className="h-5 w-5 text-primary" />
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
            </div>
            <span className="hidden sm:inline text-sm font-medium">
              0 items
            </span>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            {authState === "authenticated" ? (
              <Button
                onClick={logout}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                Logout
              </Button>
            ) : (
              <Button
                onClick={showLoginModal}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                Sign In
              </Button>
            )}
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
