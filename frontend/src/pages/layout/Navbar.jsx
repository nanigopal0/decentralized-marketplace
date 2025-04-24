import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { SidebarIcon, Menu, X } from "lucide-react";

export default function Navbar({ onSidebarToggle }) {
  const { isAuthenticated } = useSelector((state) => state.user);
  const [searchQuery, setSearchQuery] = useState(""); // State to store the search query
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`); // Redirect to the search page with the query
    }
  };

  return (
    <nav className="shadow-md border border-b-gray-400 py-4 px-6 flex items-center justify-between bg-gradient-to-r from-yellow-100 to-pink-100">
      {/* Logo and Sidebar Toggle */}
      <div className="flex items-center space-x-4">
        {isAuthenticated && (
          <SidebarIcon
            onClick={onSidebarToggle}
            className="cursor-pointer w-6 h-6 text-gray-800"
          />
        )}
        <Link to="/" className="text-2xl font-bold cursor-pointer">
          SmartMarket
        </Link>
      </div>

      {/* Search Bar (Hidden on Small Screens) */}
      {isAuthenticated && (
        <div className="hidden md:flex items-center space-x-4">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update the search query
            className="w-64 placeholder:text-gray-600 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <Button
            variant="secondary"
            className="text-white bg-blue-700 hover:bg-blue-500"
            onClick={handleSearch} // Trigger the search
          >
            Search
          </Button>
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
    </nav>
  );
}