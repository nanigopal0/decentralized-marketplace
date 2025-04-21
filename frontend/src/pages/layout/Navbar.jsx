import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { handleUnauthorizedStatus } from "../../util/HandleUnauthorizedStatus";
import { logout } from "../../../store/slices/userSlice";

export default function Navbar() {
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const isSeller = isAuthenticated ? user && user.role === "SELLER" : false;

  const handleLogout = async () => {
   
      dispatch(logout());
   
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-600 shadow-md py-4 px-6 flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-white cursor-pointer">
        SmartMarket
      </Link>

      {/* Search Bar */}
      <div className="flex items-center space-x-4">
        <Input
          type="text"
          placeholder="Search products..."
          className="w-64 text-white placeholder:text-white border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <Button
          variant="secondary"
          className="bg-white text-blue-600 hover:bg-gray-100"
        >
          Search
        </Button>
      </div>

      {/* Profile or Login/Register */}
      <div className="relative">
        {isAuthenticated ? (
          // Profile Dropdown
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {/* Wrap the icon in a button for proper styling */}
              <button className="text-white text-3xl focus:outline-none">
                <FaUserCircle />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link to="/profile" className="text-gray-700">
                  Profile
                </Link>
              </DropdownMenuItem>
              {isSeller && (
                <DropdownMenuItem asChild>
                  <Link to="/seller/dashboard" className="text-gray-700">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem asChild>
                <Link to="/myorders" className="text-gray-700">
                  My Orders
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          // Login and Register Buttons
          <div className="flex items-center space-x-4">
            <Link
              to="/register"
              className="bg-white text-blue-600 px-3 py-2 rounded-md text-sm font-semibold hover:bg-gray-100 transition"
            >
              Register
            </Link>
            {/* <Link
              to="/login"
              className="bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-semibold hover:bg-blue-700 transition"
            >
              Login
            </Link> */}
          </div>
        )}
      </div>
    </nav>
  );
}
