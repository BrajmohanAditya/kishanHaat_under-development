"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
  Star,
  Gift,
  Zap,
  Crown,
} from "lucide-react";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "@/app/lib/store/store";
import Link from "next/link";
import { logout } from "@/app/lib/store/features/authSlice";
import { useRouter } from "next/navigation";
import { selectCartItemsCount } from "@/app/lib/store/features/cartSlice";
import { brandName } from "@/app/contants";
import { fetchCategories } from "@/app/lib/store/features/categorySlice";
import DropdownCategory from "@/app/commonComponents/renderCategory";
import { productService } from "@/app/sercices/user/product.service";
import { slugify } from "@/app/utils/slugify";

export default function EcommerceNavbar() {
  const dispatch = useAppDispatch(); // ✅ typed dispatch
  const { isAuthenticated, user, status } = useAppSelector(
    (state: RootState) => state.auth, // ✅ typed state
  );
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  const cartCount = useAppSelector(selectCartItemsCount);

  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [wishlistCount] = useState(7);
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | "all">(
    "all",
  );
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlighted, setHighlighted] = useState(-1);
  const suggestionsRef = useRef<HTMLDivElement | null>(null);
  const debounceRef = useRef<number | null>(null);
  const handleSearch = () => {
    if (searchInput.trim() !== "") {
      router.push(`/products?search=${encodeURIComponent(searchInput)}`);
    }
  };
  const { categories } = useAppSelector((state: RootState) => state.category);

  const fetchSuggestions = useCallback(async (query: string) => {
    if (!query || query.trim().length === 0) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await productService.getAllProducts({
        search: query,
        limit: 6,
      });
      // try to extract array of items from response
      const items = Array.isArray(res) ? res : res?.products || res?.data || [];
      setSuggestions(items.slice(0, 6));
    } catch (err) {
      setSuggestions([]);
    }
  }, []);

  useEffect(() => {
    // debounced fetch
    if (debounceRef.current) {
      window.clearTimeout(debounceRef.current);
    }
    if (searchInput.trim() === "") {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    debounceRef.current = window.setTimeout(() => {
      fetchSuggestions(searchInput.trim());
      setShowSuggestions(true);
      setHighlighted(-1);
    }, 250);

    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
  }, [searchInput, fetchSuggestions]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!suggestionsRef.current) return;
      if (!(e.target instanceof Node)) return;
      if (!suggestionsRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className=" shadow-lg sticky top-0 z-50 border-b bg-white border-gray-100">
      {/* Top Bar */}

      {/* Main Navbar */}
      <div className=" mx-auto px-2 md:px-4 drop-shadow-lg">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-1 md:space-x-8">
            <div className="flex-shrink-0">
              <Link href="/">
                <img
                  src="/logo.png"
                  alt="Kishan Haat"
                  className="w-32 h-auto"
                />
                {/* <h1 className="text-2xl font-bold bg-gradient-to-r from-green-700 via-green-600 to-lime-500 bg-clip-text text-transparent">
                 Kishan Haat
                </h1> */}
              </Link>
            </div>

            {/* Desktop Categories */}
            <div className="hidden lg:flex items-center space-x-8">
              {categories.map((category: any) => (
                <DropdownCategory key={category.id} category={category} />
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-3xl mx-8 hidden md:block">
            <div
              className="flex items-center h-11 rounded-md bg-white border-2 border-transparent focus-within:border-[#e77600] focus-within:ring-2 focus-within:ring-[#e77600] focus-within:ring-opacity-50 transition-all shadow-sm"
              ref={suggestionsRef}
              style={{ overflow: "visible" }} // Allow suggestions to overflow
            >


              <div className="relative flex-1 h-full bg-white">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => {
                    setSearchInput(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      if (highlighted >= 0 && suggestions[highlighted]) {
                        const item = suggestions[highlighted];
                        const id = item?.id || item?._id;
                        const name = item?.name || item?.title || "product";
                        router.push(`/products/${slugify(name)}/${id}`);
                      } else {
                        handleSearch();
                      }
                    } else if (e.key === "ArrowDown") {
                      setHighlighted((h) =>
                        Math.min(h + 1, suggestions.length - 1),
                      );
                      setShowSuggestions(true);
                    } else if (e.key === "ArrowUp") {
                      setHighlighted((h) => Math.max(h - 1, 0));
                    } else if (e.key === "Escape") {
                      setShowSuggestions(false);
                    }
                  }}
                  placeholder="Search for products, brands, categories..."
                  className="w-full h-full px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none"
                />

                {/* Clear button */}
                {searchInput && (
                  <button
                    aria-label="clear"
                    onClick={() => {
                      setSearchInput("");
                      setSuggestions([]);
                      setShowSuggestions(false);
                    }}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                  >
                    ✕
                  </button>
                )}

                {/* Suggestions dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-96 overflow-y-auto w-full">
                    {suggestions.map((s, idx) => {
                      const name = s?.name || s?.title || s?.productName || "";
                      const id = s?.id || s?._id;
                      return (
                        <div
                          key={id || idx}
                          onMouseDown={() => {
                            // navigate on click
                            if (id)
                              router.push(`/products/${slugify(name)}/${id}`);
                          }}
                          onMouseEnter={() => setHighlighted(idx)}
                          className={`px-4 py-2 text-sm cursor-pointer ${highlighted === idx ? "bg-gray-100" : "hover:bg-gray-50"}`}
                        >
                          {name}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <button
                onClick={() => handleSearch()}
                className="h-full w-12 bg-[#febd69] hover:bg-[#f3a847] rounded-r-md flex items-center justify-center transition-colors border-l border-gray-300"
              >
                <Search className="text-gray-800 w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-6">
            {/* Mobile Search */}
            <button className="md:hidden text-gray-600 hover:text-lime-500 transition-colors">
              <Search
                className="w-6 h-6"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />
            </button>

            {/* Wishlist */}
            {/* <div className="relative hidden sm:block">
              <button className="text-gray-600 hover:text-red-500 transition-colors duration-200 group">
                <Heart className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {wishlistCount}
                  </span>
                )}
              </button>
            </div> */}

            {/* Cart */}
            <div className="relative">
              <Link href={"/cart"}>
                <button className="text-gray-600 hover:text-lime-500 transition-colors duration-200 group">
                  <img src="/cart1.png" className="w-12 h-auto" />
                  {/* <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" /> */}
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-gradient-to-r from-green-700 via-green-600 to-lime-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                      {cartCount}
                    </span>
                  )}
                </button>
              </Link>
            </div>

            {/* Profile Dropdown */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-lime-500 transition-colors duration-200"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-green-700 via-green-600 to-lime-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="hidden lg:block font-medium">
                    {user?.fullname}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 hidden lg:block transition-transform duration-200 ${isProfileOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2">
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-lime-500 transition-colors"
                    >
                      My Account
                    </a>
                    <Link
                      href="/orderhistory"
                      onClick={() => setIsProfileOpen(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-lime-500 transition-colors"
                    >
                      Order History
                    </Link>

                    {user?.role == "driver" && (
                      <Link
                        href="/orderhistory/rider"
                        onClick={() => setIsProfileOpen(false)}
                        className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-lime-500 transition-colors"
                      >
                        Order for you (Associate)
                      </Link>
                    )}
                    {/* <a
                      href="#"
                      onClick={() => setIsProfileOpen(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-lime-500 transition-colors"
                    >
                      Settings
                    </a> */}
                    <hr className="my-2" />
                    <button
                      onClick={() => dispatch(logout())}
                      className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-lime-500 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div>
                {" "}
                <Link href="/authentication/login">
                  <button className="px-5 py-2 text-white bg-gradient-to-r from-green-700 via-green-600 to-lime-500 rounded-full">
                    Login
                  </button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-gray-600 hover:text-lime-500 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-6 space-y-4">
            {/* Mobile Search */}
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#e77600] focus:border-[#e77600] focus:outline-none transition-colors"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>

            {/* Mobile Categories */}
            {categories.map((category: any) => (
              <div key={category.id} className="space-y-2">
                <Link
                  href={`/products?category=${category.id}`}
                  className="flex items-center space-x-3 py-3 text-gray-700 hover:text-lime-500 transition-colors border-b border-gray-100"
                >
                  <span className="font-medium">{category.name}</span>
                </Link>

                {category.subcategories?.length > 0 && (
                  <div className="ml-6 space-y-1">
                    {category.subcategories.map((sub: any) => (
                      <Link
                        key={sub.id}
                        href={`/products?category=${sub.id}`}
                        className="block text-gray-600 hover:text-lime-500"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile Wishlist */}
            {/* <a
              href="#"
              className="flex items-center space-x-3 py-3 text-gray-700 hover:text-red-500 transition-colors"
            >
              <Heart className="w-5 h-5" />
              <span>Wishlist ({wishlistCount})</span>
            </a> */}
          </div>
        </div>
      )}
    </nav>
  );
}
