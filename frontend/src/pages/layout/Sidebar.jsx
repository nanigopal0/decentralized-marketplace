import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  HomeIcon,
  Package2,
  FolderPen,
  User2,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/slices/userSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const isSeller = user && user.role === "SELLER";
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    console.log("Logged out");
  };

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const navClass = (isActive) =>
    isActive
      ? "flex items-center gap-3 p-3 rounded-md bg-purple-400 text-white transition"
      : "flex items-center gap-3 p-3 rounded-md hover:bg-purple-300 transition";

  const navItems = (
    <>
      {isSeller ? (
        <>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              navClass(isActive || location.pathname === "/home")
            }
          >
            <HomeIcon className="w-5 h-5" /> Dashboard
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) => navClass(isActive)}
          >
            <Package2 className="w-5 h-5" /> Manage Products
          </NavLink>
          <NavLink
            to="/orders"
            className={({ isActive }) => navClass(isActive)}
          >
            <FolderPen className="w-5 h-5" /> Manage Orders
          </NavLink>
        </>
      ) : (
        <>
          <NavLink
            to="/"
            className={({ isActive }) =>
              navClass(isActive || location.pathname === "/home")
            }
          >
            <HomeIcon className="w-5 h-5" /> Home
          </NavLink>
          <NavLink
            to="/myorders"
            className={({ isActive }) => navClass(isActive)}
          >
            <FolderPen className="w-5 h-5" /> Orders
          </NavLink>
        </>
      )}

      <NavLink to="/profile" className={({ isActive }) => navClass(isActive)}>
        <User2 className="w-5 h-5" /> Profile
      </NavLink>

      <Button
        onClick={handleLogout}
        className="w-full bg-red-500 hover:bg-red-600 text-white mt-2"
      >
        <LogOut className="w-5 h-5 mr-2" />
        Logout
      </Button>
    </>
  );

  return (
    <>
      {/* Mobile menu toggle */}
      <div className="md:hidden p-4 bg-yellow-100 border-b border-gray-400 flex justify-between items-center">
        <h2 className="text-lg font-bold text-purple-700">SmartMarket</h2>
        <button onClick={toggleSidebar}>
          {sidebarOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Sidebar for desktop */}
      <aside className="hidden md:flex w-64 bg-yellow-100 border-r border-gray-400 flex-col">
        <nav className="flex-1 space-y-2 p-4">{navItems}</nav>
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            onClick={toggleSidebar}
          />
          <aside className="fixed top-0 left-0 w-4/5 h-full bg-yellow-100 z-50 p-4 shadow-lg overflow-y-auto transition-transform">
            <nav className="space-y-2">{navItems}</nav>
          </aside>
        </>
      )}
    </>
  );
};

export default Sidebar;
