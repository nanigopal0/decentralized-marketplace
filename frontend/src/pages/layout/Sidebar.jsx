import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  HomeIcon,
  Package2,
  FolderPen,
  User2,
  LogOut,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/slices/userSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const location = useLocation(); // Get the current route
  const user = JSON.parse(localStorage.getItem("user"));
  const isSeller = user && user.role === "SELLER";

  const handleLogout = () => {
    dispatch(logout());
    console.log("Logged out");
  };

  const activeClassName =
    "flex items-center gap-3 p-3 rounded-md bg-purple-400 text-white transition";

  const defaultClassName =
    "flex items-center gap-3 p-3 rounded-md hover:bg-purple-300 transition";

  return (
    <aside className="w-64 bg-yellow-100 border-gray-400 border-r flex flex-col">
      <nav className="flex-1 space-y-2 p-4">
        {isSeller ? (
          <>
            {/* Dashboard (Default Active for Sellers) */}
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive || location.pathname === "/dashboard" || location.pathname === "/home"
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
            {/* Home (Default Active for Buyers) */}
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive || location.pathname === "/" || location.pathname === "/home"
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

        {/* Logout Button */}
        <Button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Logout
        </Button>
      </nav>
    </aside>
  );
};

export default Sidebar;