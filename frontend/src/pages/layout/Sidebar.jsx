import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { HomeIcon, Package2, FolderPen, User2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/slices/userSlice";
import { Input } from "@/components/ui/input";

const Sidebar = ({ isOpen }) => {
  const dispatch = useDispatch();
  const location = useLocation(); // Get the current route
  const user = JSON.parse(localStorage.getItem("user"));
  const isSeller = user && user.role === "SELLER";
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Navigate to the search page with the query
      window.location.href = `/search?query=${searchQuery}`;
    }
  };

  const activeClassName =
    "flex items-center gap-3 p-3 rounded-md bg-purple-400 text-white transition";

  const defaultClassName =
    "flex items-center gap-3 p-3 rounded-md hover:bg-purple-300 transition";

  return (
    <>
      <aside
        className={` bg-yellow-100 border-r border-gray-300 shadow-md 
        z-40  transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-full sm:w-64
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <nav className="flex flex-col h-full p-4 space-y-2 overflow-y-auto">
        <div className="sm:hidden mb-4">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full placeholder:text-gray-600 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <Button
              variant="secondary"
              className="mt-2 w-full text-white bg-blue-700 hover:bg-blue-500"
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>
          {isSeller ? (
            <>
              {/* Dashboard (Default Active for Sellers) */}
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ||
                  location.pathname === "/dashboard" ||
                  location.pathname === "/home"
                    ? activeClassName
                    : defaultClassName
                }
              >
                <HomeIcon className="w-5 h-5" />
                Dashboard
              </NavLink>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  isActive ? activeClassName : defaultClassName
                }
              >
                <Package2 className="w-5 h-5" />
                Manage Products
              </NavLink>
              <NavLink
                to="/orders"
                className={({ isActive }) =>
                  isActive ? activeClassName : defaultClassName
                }
              >
                <FolderPen className="w-5 h-5" />
                Manage Orders
              </NavLink>
            </>
          ) : (
            <>

              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ||
                  location.pathname === "/" ||
                  location.pathname === "/home"
                    ? activeClassName
                    : defaultClassName
                }
              >
                <HomeIcon className="w-5 h-5" />
                Home
              </NavLink>
              <NavLink
                to="/myorders"
                className={({ isActive }) =>
                  isActive ? activeClassName : defaultClassName
                }
              >
                <FolderPen className="w-5 h-5" />
                Orders
              </NavLink>
            </>
          )}

          {/* Profile */}
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? activeClassName : defaultClassName
            }
          >
            <User2 className="w-5 h-5" />
            Profile
          </NavLink>

      
          <Button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </Button>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
