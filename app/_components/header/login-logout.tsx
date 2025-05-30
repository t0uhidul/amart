"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/auth-context";
import { motion } from "framer-motion";

export default function LoginLogout() {
  const { authState, showLoginModal, logout, phoneNumber } = useAuth();
  return (
    <div className="flex items-center py-2 px-4 sm:py-4 sm:px-8">
      {authState === "authenticated" ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center rounded-full bg-gray-200 text-primary
                h-9 w-9 sm:h-10 sm:w-auto sm:px-4 sm:rounded-md"
            >
              {/* On small screens: show only icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 sm:h-6 sm:w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>

              {/* On medium+ screens: show phone number next to icon */}
              <span className="hidden sm:inline ml-2 font-medium text-base text-primary max-w-[8rem] truncate">
                {phoneNumber}
              </span>
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
                <p className="text-xs text-gray-500 truncate max-w-[10rem]">
                  {phoneNumber}
                </p>
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
            className="text-lg sm:text-xl font-extrabold px-3 py-1 rounded-md hover:bg-gray-200 transition"
          >
            Login
          </button>
        </motion.div>
      )}
    </div>
  );
}
