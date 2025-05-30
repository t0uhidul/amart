"use client";
import Logo from "./header/logo";
import CategoryDropdown from "./header/category-dropdown";
import SearchBar from "./header/search-bar";
import LoginLogout from "./header/login-logout";
import CartButton from "./header/cart-button";

export default function Header() {
  return (
    <header className="bg-white border-b sticky top-0 z-50 w-full flex flex-wrap items-center justify-between gap-3">
      {/* Logo + Icons container on mobile */}
      <div className="flex items-center justify-between w-full md:w-auto">
        <Logo />

        {/* Mobile: show only icons (Category, Cart, Login) */}
        <div className="md:hidden flex items-center gap-3">
          <CategoryDropdown /> {/* Should show icon only on mobile */}
          <CartButton /> {/* Should show icon only on mobile */}
          <LoginLogout /> {/* Should show icon only on mobile */}
        </div>
      </div>

      {/* Desktop and tablet navigation */}
      <div className="hidden md:flex items-center gap-6 flex-1 justify-end">
        <CategoryDropdown /> {/* Full dropdown with text */}
        <SearchBar /> {/* Full search bar */}
        <LoginLogout /> {/* Full user with text */}
        <CartButton /> {/* Full cart button with text */}
      </div>

      {/* Mobile search bar below icons, full width */}
      <div className="w-full md:hidden mt-2 px-0">
        <SearchBar /> {/* Full width on mobile */}
      </div>
    </header>
  );
}
