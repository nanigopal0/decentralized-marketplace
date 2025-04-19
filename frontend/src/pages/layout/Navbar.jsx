import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleSearch = () => {
    console.log("Search for:", searchQuery);
  };

  const handleLogout = () => {
    console.log("Logout clicked");
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md relative">
      <h1 className="text-xl font-semibold">Smart Market</h1>

      <div className="flex items-center space-x-4">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 rounded-md text-black w-60 bg-blue-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="absolute right-0 top-0 bottom-0 bg-blue-800 px-3 rounded-r-md hover:bg-blue-900"
          >
            <FiSearch />
          </button>
        </div>

        {/* Profile Icon */}
        <div className="relative">
          <button onClick={() => setShowProfileMenu(!showProfileMenu)}>
            <FaUserCircle className="text-2xl" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 bg-white text-black rounded-md shadow-lg w-40 z-50">
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                View Profile
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
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
