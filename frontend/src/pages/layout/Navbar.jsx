import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { SidebarIcon, Menu, X, User, Search, ArrowBigLeft, ArrowLeft } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "../../../store/slices/userSlice";

export default function Navbar({ onSidebarToggle }) {
  const { isAuthenticated } = useSelector((state) => state.user);
  const [searchQuery, setSearchQuery] = useState(""); // State to store the search query
  const navigate = useNavigate();
  const dispatchEvent = useDispatch(); // Import useDispatch from react-redux
  const user = JSON.parse(localStorage.getItem("user"));
  const isSeller = user && user.role === "SELLER";

  const [showSearchDialog, setShowSearchDialog] = useState(false);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`); // Redirect to the search page with the query
      setShowSearchDialog(false); // Close the search input after searching
    }
  };

  const handleLogout = () => {
    // Clear user session and redirect to login
    dispatchEvent(logout());
  };

  return (
    <nav className="shadow-md border border-b-gray-400 py-4 px-6 flex items-center justify-between bg-gradient-to-r from-yellow-100 to-pink-100">
  
          {/* Logo and Sidebar Toggle */}
          <div className={`flex items-center space-x-4 ${showSearchDialog && "hidden md:flex"}`}>
            {isAuthenticated && (
              <SidebarIcon
                onClick={onSidebarToggle}
                className="hidden md:block cursor-pointer w-6 h-6 text-gray-800"
              />
            )}
            <Link
              to="/"
              className="flex text-2xl gap-4 items-center font-bold cursor-pointer"
            >
              <img
                src="/logo.png"
                alt="Logo"
                className="h-8 w-auto object-cover"
              />
              <p>Smart Market</p>
            </Link>
          </div>

          {/* Search Bar (Hidden on Small Screens) */}
          {isAuthenticated && (
            <div className={`${!showSearchDialog && "hidden"} md:flex items-center relative ${showSearchDialog? "md:w-64 w-full flex" : "w-64 "}`}>
              <ArrowLeft onClick={()=>setShowSearchDialog(false)} className="md:hidden"/>
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Update the search query
                className="w-full placeholder:text-gray-600 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
              />
              <Search
                onClick={handleSearch} // Trigger the search
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer hover:text-blue-500"
              />
            </div>
          )}

          {/* Register Button for Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {!isAuthenticated && (
              <Link
                to="/register"
                className="bg-amber-800 text-white px-3 py-2 rounded-md text-sm font-semibold hover:bg-amber-700 transition"
              >
                Register
              </Link>
            )}
          </div>

          {/* Profile Icon for Small Screens */}
          {isAuthenticated && (
            <div className={`md:hidden ${showSearchDialog && "hidden"}`}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
                    <User className="w-6 h-6 text-gray-800" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  {isSeller ? (
                    <>
                      <DropdownMenuItem>
                        <Link to="/dashboard" className="w-full text-left">
                          Dashboard
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem>
                        <Link to="/products" className="w-full text-left">
                          Manage Products
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link to="/orders" className="w-full text-left">
                          Manage Orders
                        </Link>
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem>
                        <Link to="/home" className="w-full text-left">
                          Home
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link to="/myorders" className="w-full text-left">
                          My Orders
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuItem
                    onClick={() => setShowSearchDialog(true)}
                    className="w-full text-left"
                  >
                    Search
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/profile" className="w-full text-left">
                      Profile
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-500"
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
       
    </nav>
  );
}
