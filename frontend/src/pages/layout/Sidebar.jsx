import React from "react";
import { Link } from "react-router-dom";
import { HomeIcon, Package2, FolderPen, User2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/slices/userSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const isSeller = user && user.role === "SELLER";

  const handleLogout = () => {
    dispatch(logout());
    console.log("Logged out");
  };

  return (
    <aside className="w-64 bg-yellow-100 border-gray-400 border-r border-t flex flex-col">
      {isSeller ? (
        <nav className="flex-1 space-y-2 p-4">
          <Link
            to="/dashboard"
            className="flex items-center gap-3 p-3 rounded-md hover:bg-purple-300 transition"
          >
            <HomeIcon className="w-5 h-5" />
            Dashboard
          </Link>
          <Link
            to="/products"
            className="flex items-center gap-3 p-3 rounded-md hover:bg-purple-300 transition"
          >
            <Package2 className="w-5 h-5" />
            Manage Products
          </Link>
          <Link
            to="/orders"
            className="flex items-center gap-3 p-3 rounded-md hover:bg-purple-300 transition"
          >
            <FolderPen className="w-5 h-5" />
            Manage Orders
          </Link>
          <Link
            to="/profile"
            className="flex items-center gap-3 p-3 rounded-md hover:bg-purple-300 transition"
          >
            <User2 className="w-5 h-5" />
            Profile
          </Link>
        </nav>
      ) : (
        <nav className="flex-1 space-y-2 p-4">
          <Link
            to="/"
            className="flex items-center gap-3 p-3 rounded-md hover:bg-purple-300 transition"
          >
            <HomeIcon className="w-5 h-5" />
            Home
          </Link>
          <Link
            to="/orders"
            className="flex items-center gap-3 p-3 rounded-md hover:bg-purple-300 transition"
          >
            <FolderPen className="w-5 h-5" />
            Orders
          </Link>
          <Link
            to="/profile"
            className="flex items-center gap-3 p-3 rounded-md hover:bg-purple-300 transition"
          >
            <User2 className="w-5 h-5" />
            Profile
          </Link>
        </nav>
      )}
      <div className="p-4">
        <Button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Logout
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
