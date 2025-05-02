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
import GlobalApi from "../_utils/GlobalApi";
import { useEffect, useState } from "react";

export default function Header() {
  const [Category, setCategory] = useState([]);

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = () => {
    GlobalApi.getCategory().then((res) => {
      // console.log(res?.data)
      setCategory(res.data.data);
    });
  };
  return (
    <div className="flex p-5 shadow-md justify-between">
      <div className=" flex items-center gap-8">
        <Image src="/freshgo-logo.png" alt="amart" width={150} height={100} />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <h2 className="flex gap-3 items-center border rounded-full p-2 px-10 bg-green-300 cursor-pointe">
              <LayoutGrid className="h-5 w-4" /> Category
            </h2>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>All Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {Category.map((category, index) => (
              <DropdownMenuItem key={index} className="font-xl font-semibold">
                {category.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="md:flex border rounded-full p-2 gap-3 items-center mx-5 hidden">
          <Search />
          <input type="text" placeholder="Search" className="outline-none" />
        </div>
      </div>
      <div className="flex gap-5 items-center">
        <div className="flex gap-4">
          <Phone className="text-primary" />
          <div>
            <h2>CALL US 24/7</h2>
            <h2>(1800)-88-66-991</h2>
          </div>
        </div>
        <h2 className="flex gap-2 items-center text-lg">
          <ShoppingBasket /> 0 items
        </h2>
        <Button>Login</Button>
      </div>
    </div>
  );
}
