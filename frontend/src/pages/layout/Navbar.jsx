import React, { useState, useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleOutsideClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("/api/logout");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex items-center justify-between">
      <Link to="/" className="text-2xl font-bold text-blue-600 cursor-pointer">
        SmartMarket
      </Link>

      <div className="flex items-center space-x-4 relative">
        <input
          type="text"
          placeholder="Search..."
          className="px-3 py-2 border border-gray-300 rounded-md text-sm"
        />
        <button className="bg-blue-600 text-white px-3 py-2 rounded-md text-sm hover:bg-blue-700">
          Search
        </button>

        <div className="relative">
          <button
            onClick={handleProfileClick}
            className="text-2xl text-gray-600"
          >
            <FaUserCircle />
          </button>

          {showDropdown && (
            <div
              ref={dropdownRef}
              className="absolute top-10 right-0 bg-white shadow-lg rounded-md w-40 py-2 z-50 transition-all duration-300 ease-in-out"
            >
              <Link
                to="/profile"
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
              >
                View Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-500"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
