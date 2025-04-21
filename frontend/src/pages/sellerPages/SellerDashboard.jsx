import React from "react";
import { Link } from "react-router-dom";
import {
  HomeIcon,
  Package2,
  FolderPen,
  History,
  User2,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

const SellerDashboard = () => {
  const handleLogout = () => {
    // Add logout logic here
    console.log("Logged out");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-r from-blue-500 to-purple-600 text-white flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold">Seller Dashboard</h1>
        </div>
        <nav className="flex-1 space-y-2 p-4">
          <Link
            to="/seller/dashboard"
            className="flex items-center gap-3 p-3 rounded-md hover:bg-blue-600 transition"
          >
            <HomeIcon className="w-5 h-5" />
            Dashboard
          </Link>
          <Link
            to="/seller/products"
            className="flex items-center gap-3 p-3 rounded-md hover:bg-blue-600 transition"
          >
            <Package2 className="w-5 h-5" />
            Manage Products
          </Link>
          <Link
            to="/add/product"
            className="flex items-center gap-3 p-3 rounded-md hover:bg-blue-600 transition"
          >
            <Package2 className="w-5 h-5" />
            Add Product
          </Link>
          <Link
            to="/seller/orders"
            className="flex items-center gap-3 p-3 rounded-md hover:bg-blue-600 transition"
          >
            <FolderPen className="w-5 h-5" />
            Manage Orders
          </Link>
          <Link
            to="/seller/history"
            className="flex items-center gap-3 p-3 rounded-md hover:bg-blue-600 transition"
          >
            <History className="w-5 h-5" />
            Order History
          </Link>
          <Link
            to="/seller/profile"
            className="flex items-center gap-3 p-3 rounded-md hover:bg-blue-600 transition"
          >
            <User2 className="w-5 h-5" />
            Profile
          </Link>
        </nav>
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

      {/* Main Content */}
      <main className="flex-1 p-6">
        <header className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Welcome, Seller!</h2>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Menu</Button>
            </SheetTrigger>
            <SheetContent side="right" className="p-4">
              <nav className="space-y-2">
                <Link
                  to="/seller/dashboard"
                  className="block p-2 rounded-md hover:bg-gray-200"
                >
                  Dashboard
                </Link>
                <Link
                  to="/seller/products"
                  className="block p-2 rounded-md hover:bg-gray-200"
                >
                  Manage Products
                </Link>
                <Link
                  to="/seller/orders"
                  className="block p-2 rounded-md hover:bg-gray-200"
                >
                  Manage Orders
                </Link>
                <Link
                  to="/seller/history"
                  className="block p-2 rounded-md hover:bg-gray-200"
                >
                  Order History
                </Link>
                <Link
                  to="/seller/profile"
                  className="block p-2 rounded-md hover:bg-gray-200"
                >
                  Profile
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </header>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-gray-800">Total Products</h3>
            <p className="text-2xl font-bold text-blue-600">120</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-gray-800">Total Orders</h3>
            <p className="text-2xl font-bold text-green-600">45</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-gray-800">Pending Orders</h3>
            <p className="text-2xl font-bold text-yellow-600">8</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-gray-800">Revenue</h3>
            <p className="text-2xl font-bold text-purple-600">$12,345</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SellerDashboard;