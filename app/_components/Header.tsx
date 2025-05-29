"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ChevronDown, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/auth-context";
import { useCart } from "@/contexts/cart-context";

export default function Header() {
  const {
    authState,
    showLoginModal,
    logout,
    phoneNumber,
    categoryList,
    authToken,
  } = useAuth();
  const { cartCount, setCartCount, removeAllItemsFromCart } = useCart();

  const [searchValue, setSearchValue] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    // Add scroll event listener
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [authToken]);

  // useEffect(() => {
  //   if (!authToken && authState === "authenticated") {
  //     setCartCount(0);
  //   } else if (authToken && authState === "authenticated") {
  //     removeAllItemsFromCart(authToken);
  //   }
  // }, [authToken])
  // ;
  const [index, setIndex] = useState(0);
  const items = [
    'Search "milk"',
    'Search "bread"',
    'Search "sugar"',
    'Search "butter"',
    'Search "paneer"',
    'Search "chocolate"',
    'Search "curd"',
    'Search "rice"',
    'Search "egg"',
    'Search "chips"',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-white border-b sticky top-0 z-50 w-full">
      <div className="flex flex-wrap items-center justify-between px-4 md:px-8 py-4 gap-4">
        {/* Logo */}
        <div className="flex items-center border-r pr-4">
          <p className="text-3xl md:text-5xl font-black text-yellow-500">a</p>
          <p className="text-2xl md:text-4xl font-black text-primary tracking-tighter">
            mart
          </p>
        </div>

        {/* Category Dropdown - Only on md+ */}
        <div className="hidden md:flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 py-2 px-3 md:px-5 font-medium text-base"
              >
                <span className="hidden md:inline font-extrabold text-xl">
                  Shop by Category
                </span>
                <ChevronDown className="h-4 w-4" />
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

        {/* Search Bar */}
        <div className="flex-grow w-full md:w-1/3 order-last md:order-none">
          <div className="flex items-center bg-gray-100 px-4 py-2 rounded-xl">
            <Search size={18} className="text-black mr-2" />
            <div className="relative h-6 overflow-hidden w-full">
              <div
                className="transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateY(-${index * 1.5}rem)`,
                }}
              >
                {items.map((text, i) => (
                  <div
                    key={i}
                    className="h-6 text-gray-600 text-sm font-bold"
                    style={{ lineHeight: "1.5rem" }}
                  >
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Login / Logout */}
        <div className="flex items-center space-x-4">
          {authState === "authenticated" ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="h-9 w-9 flex items-center justify-center rounded-full bg-primary text-white"
                >
                  <span className="sr-only">User menu</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </motion.button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center gap-2 p-2">
                  <div className="rounded-full bg-primary/10 p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium">User Account</p>
                    <p className="text-xs text-gray-500">{phoneNumber}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Change PIN</DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button
                onClick={showLoginModal}
                className="text-xl font-extrabold"
              >
                Login
              </button>
            </motion.div>
          )}
        </div>

        {/* Cart Button */}
        <div className="flex items-center">
          <button
            className="relative bg-gray-200 px-3 py-2 rounded-md flex items-center gap-2"
            onClick={() => setCartOpen(!cartOpen)}
          >
            <ShoppingCart className="text-white" size={20} />
            <p className="text-white font-semibold text-sm sm:text-base">
              My Cart
            </p>
          </button>
        </div>
      </div>

      {/* Cart Slide Up */}
      {cartOpen && (
        <div className="fixed bottom-0 left-0 right-0 bg-green-600 text-white p-4 shadow-lg z-40">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
            <div>
              <p>Items: 2</p>
              <p>Total: ₹250</p>
            </div>
            <button
              className="bg-white text-green-600 font-semibold px-4 py-2 rounded"
              onClick={() => setCartOpen(false)}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </header>

    // <motion.header
    //   initial={{ y: -100, opacity: 0 }}
    //   animate={{ y: 0, opacity: 1 }}
    //   transition={{ duration: 0.5 }}
    //   className={`sticky top-0 z-50 w-full transition-all duration-300
    // ${isScrolled ? "bg-white shadow-lg py-2" : "bg-[#f8f8f8] py-3"}
    // min-h-[56px] md:min-h-[72px]`}
    // >
    //   <div className="container mx-auto px-2 sm:px-3 md:px-4 flex justify-between items-center">
    //     {/* Logo and Left Section */}
    //     <div className="flex items-center gap-2 md:gap-6">
    //       <Link href="/">
    //         <Image
    //           src="/freshgo-logo.png"
    //           alt="FreshGo"
    //           width={120}
    //           height={40}
    //           className="transition-transform hover:scale-105 w-[100px] md:w-[150px]"
    //         />
    //       </Link>

    //       <DropdownMenu>
    //         <DropdownMenuTrigger asChild>
    //           <motion.button
    //             whileHover={{ scale: 1.05 }}
    //             whileTap={{ scale: 0.95 }}
    //             className="hidden sm:flex gap-2 items-center rounded-full py-2 px-3 md:px-5 bg-primary text-white font-medium text-xs md:text-base transition-colors hover:bg-primary/90"
    //           >
    //             <LayoutGrid className="h-4 w-4 mr-1" />
    //             <span className="hidden md:inline">Category</span>
    //           </motion.button>
    //         </DropdownMenuTrigger>
    //         <DropdownMenuContent className="w-56">
    //           <DropdownMenuLabel>All Categories</DropdownMenuLabel>
    //           <DropdownMenuSeparator />
    //           {categoryList?.length > 0 &&
    //             categoryList.map((cat: any, index: number) => (
    //               <DropdownMenuItem
    //                 key={cat.id}
    //                 className="font-medium cursor-pointer hover:bg-muted"
    //                 asChild
    //               >
    //                 <Link href={`/category/${cat.slug}`}>{cat.name}</Link>
    //               </DropdownMenuItem>
    //             ))}
    //         </DropdownMenuContent>
    //       </DropdownMenu>
    //     </div>

    //     {/* Search Bar */}
    //     <div className="hidden md:flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 w-[280px] lg:w-[320px] focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
    //       <Search className="h-4 w-4 text-gray-400" />
    //       <input
    //         type="text"
    //         placeholder="Search for fresh produce..."
    //         className="bg-transparent outline-none w-full text-sm"
    //         value={searchValue}
    //         onChange={(e) => setSearchValue(e.target.value)}
    //       />
    //     </div>

    //     {/* Right Section */}
    //     <div className="flex items-center gap-3 md:gap-5">
    //       {/* Mobile Search Icon - Only visible on small screens */}
    //       <button className="md:hidden">
    //         <Search className="h-5 w-5 text-gray-600" />
    //       </button>

    //       <div className="hidden md:flex items-center gap-3">
    //         <div className="bg-primary/10 p-2 rounded-full">
    //           <Phone className="h-5 w-5 text-primary" />
    //         </div>
    //         <div className="hidden lg:block">
    //           <p className="text-xs text-gray-500">CALL US 24/7</p>
    //           <p className="text-sm font-semibold">(1800)-88-66-991</p>
    //         </div>
    //       </div>

    //       <Link href="/order-the-cart-items" className="relative">
    //         <motion.div
    //           whileHover={{ scale: 1.05 }}
    //           className="flex items-center gap-2 cursor-pointer"
    //         >
    //           <div className="relative">
    //             <ShoppingBasket className="h-5 w-5 text-primary" />
    //             {cartCount > 0 && (
    //               <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-semibold rounded-full px-[6px]">
    //                 {cartCount}
    //               </span>
    //             )}
    //           </div>
    //           <span className="hidden sm:inline text-sm font-medium">
    //             {cartCount} items
    //           </span>
    //         </motion.div>
    //       </Link>

    //       {authState === "authenticated" ? (
    //         <DropdownMenu>
    //           <DropdownMenuTrigger asChild>
    //             <motion.button
    //               whileHover={{ scale: 1.05 }}
    //               whileTap={{ scale: 0.95 }}
    //               className="flex items-center justify-center h-9 w-9 rounded-full bg-primary text-white cursor-pointer"
    //             >
    //               <span className="sr-only">User menu</span>
    //               <svg
    //                 xmlns="http://www.w3.org/2000/svg"
    //                 viewBox="0 0 24 24"
    //                 fill="none"
    //                 stroke="currentColor"
    //                 strokeWidth="2"
    //                 strokeLinecap="round"
    //                 strokeLinejoin="round"
    //                 className="h-5 w-5"
    //               >
    //                 <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    //                 <circle cx="12" cy="7" r="4" />
    //               </svg>
    //             </motion.button>
    //           </DropdownMenuTrigger>
    //           <DropdownMenuContent align="end" className="w-56">
    //             <div className="flex items-center gap-2 p-2">
    //               <div className="rounded-full bg-primary/10 p-1">
    //                 <svg
    //                   xmlns="http://www.w3.org/2000/svg"
    //                   viewBox="0 0 24 24"
    //                   fill="none"
    //                   stroke="currentColor"
    //                   strokeWidth="2"
    //                   strokeLinecap="round"
    //                   strokeLinejoin="round"
    //                   className="h-5 w-5 text-primary"
    //                 >
    //                   <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    //                   <circle cx="12" cy="7" r="4" />
    //                 </svg>
    //               </div>
    //               <div>
    //                 <p className="text-sm font-medium">User Account</p>
    //                 <p className="text-xs text-gray-500">{phoneNumber}</p>
    //               </div>
    //             </div>
    //             <DropdownMenuSeparator />
    //             <DropdownMenuItem className="cursor-pointer">
    //               <svg
    //                 xmlns="http://www.w3.org/2000/svg"
    //                 viewBox="0 0 24 24"
    //                 fill="none"
    //                 stroke="currentColor"
    //                 strokeWidth="2"
    //                 strokeLinecap="round"
    //                 strokeLinejoin="round"
    //                 className="mr-2 h-4 w-4"
    //               >
    //                 <rect width="20" height="14" x="2" y="5" rx="2" />
    //                 <path d="M2 10h20" />
    //               </svg>
    //               Change PIN
    //             </DropdownMenuItem>
    //             <DropdownMenuItem onClick={logout} className="cursor-pointer">
    //               <svg
    //                 xmlns="http://www.w3.org/2000/svg"
    //                 viewBox="0 0 24 24"
    //                 fill="none"
    //                 stroke="currentColor"
    //                 strokeWidth="2"
    //                 strokeLinecap="round"
    //                 strokeLinejoin="round"
    //                 className="mr-2 h-4 w-4"
    //               >
    //                 <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    //                 <polyline points="16 17 21 12 16 7" />
    //                 <line x1="21" x2="9" y1="12" y2="12" />
    //               </svg>
    //               Log out
    //             </DropdownMenuItem>
    //           </DropdownMenuContent>
    //         </DropdownMenu>
    //       ) : (
    //         <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    //           <Button
    //             onClick={showLoginModal}
    //             className="bg-primary hover:bg-primary/90 text-white"
    //           >
    //             Sign In
    //           </Button>
    //         </motion.div>
    //       )}
    //     </div>
    //   </div>
    // </motion.header>
  );
}
