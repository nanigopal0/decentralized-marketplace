import React from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";

export default function Navbar() {
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <nav className=" shadow-md border border-b-gray-400 py-4 px-6 flex items-center justify-between bg-gradient-to-r from-yellow-100 to-pink-100 ">
      <Link to="/" className="text-2xl font-bold cursor-pointer">
        SmartMarket
      </Link>

      {/* Search Bar */}
      {isAuthenticated && (
        <div className="flex items-center space-x-4">
          <Input
            type="text"
            placeholder="Search products..."
            className="w-64  placeholder:text-gray-600 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <Button
            variant="secondary"
            className="text-white bg-blue-700 hover:bg-blue-500 "
            // style={{ backgroundColor: firstColor }}
          >
            Search
          </Button>
        </div>
      )}
      <div className="relative">
        {!isAuthenticated && (
          <div className="flex items-center space-x-4">
            <Link
              to="/register"
              className="bg-amber-800 text-white px-3 py-2 rounded-md text-sm font-semibold hover:bg-gray-100 transition"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
