import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAllUserErrors, logout } from "../../../store/slices/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import {
  FolderGit2,
  FolderPen,
  History,
  HomeIcon,
  LayoutGrid,
  LogOut,
  Package2,
  PanelLeft,
  User2,
} from "lucide-react";

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import AddProduct from "./AddProduct";
import UpdateProduct from "./UpdateProduct";
import Orders from "./SellerOrders";
import AllProduct from "./AllProduct";

const SellerDashboard = () => {
  const [active, setActive] = useState("Dashboard");
  const { isAuthenticated, error, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
  };

  const navigateTo = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (!isAuthenticated) {
      navigateTo("/login");
    }
  }, [isAuthenticated]);

  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-muted/40 ">
        <aside className="fixed inset-y-0 left-0 hidden w-14 flex-col border-r bg-background sm:flex z-50">
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={`flex h-9 w-9 items-center justify-center rounded-lg 
                    ${
                      active === "Dashboard"
                        ? "text-accent-foreground bg-accent"
                        : "text-muted-foreground"
                    } 
                    transition-colors hover:text-foreground md:h-8 md:w-8`}
                    onClick={() => setActive("Dashboard")}
                  >
                    <HomeIcon className="w-5 h-5" />
                    <span className="sr-only">Dashboard</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Dashboard</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={`flex h-9 w-9 items-center justify-center rounded-lg 
                  ${
                    active === "Add Product"
                      ? "text-accent-foreground bg-accent"
                      : "text-muted-foreground"
                  } 
                    transition-colors hover:text-foreground md:h-8 md:w-8`}
                    onClick={() => setActive("Add Product")}
                  >
                    <FolderPen className="w-5 h-5" />
                    <span className="sr-only">Add Product</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Add Product</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={`flex h-9 w-9 items-center justify-center rounded-lg 
                    ${
                      active === "All Product"
                        ? "text-accent-foreground bg-accent"
                        : "text-muted-foreground"
                    } 
                    transition-colors hover:text-foreground md:h-8 md:w-8`}
                    onClick={() => setActive("All Product")}
                  >
                    <FolderGit2 className="w-5 h-5" />
                    <span className="sr-only">All Product</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">All Product</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={`flex h-9 w-9 items-center justify-center rounded-lg 
                    ${
                      active === "Update Product"
                        ? "text-accent-foreground bg-accent"
                        : "text-muted-foreground"
                    } 
                    transition-colors hover:text-foreground md:h-8 md:w-8`}
                    onClick={() => setActive("Update Product")}
                  >
                    <LayoutGrid className="w-5 h-5" />
                    <span className="sr-only">Update Product</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Update Product</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={`flex h-9 w-9 items-center justify-center rounded-lg 
                    ${
                      active === "Orders"
                        ? "text-accent-foreground bg-accent"
                        : "text-muted-foreground"
                    } 
                    transition-colors hover:text-foreground md:h-8 md:w-8`}
                    onClick={() => setActive("Orders")}
                  >
                    <History className="w-5 h-5" />
                    <span className="sr-only">Orders</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Orders</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={`flex h-9 w-9 items-center justify-center rounded-lg 
                    ${
                      active === "Account"
                        ? "text-accent-foreground bg-accent"
                        : "text-muted-foreground"
                    } 
                    transition-colors hover:text-foreground md:h-8 md:w-8`}
                    onClick={() => setActive("Account")}
                  >
                    <User2 className="w-5 h-5" />
                    <span className="sr-only">Account</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Account</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </nav>
          <nav className="mt-auto flex-col items-center gap-4 px-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={`flex h-9 w-9 items-center justify-center rounded-lg 
                    ${
                      active === "Logout"
                        ? "text-accent-foreground bg-accent"
                        : "text-muted-foreground"
                    } 
                    transition-colors hover:text-foreground md:h-8 md:w-8`}
                    onClick={handleLogout}
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="sr-only">Logout</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Logout</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </nav>
        </aside>
        <header
          className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background
            px-4 sm:static sm:h-auto sm:border-0 lg:bg-transparent sm:px-6 max-[900px]:h-[100px]"
        >
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2
                  rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <Link
                  href="#"
                  className={`flex items-center gap-4 px-2.5 
                    ${
                      active === "Dashboard"
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  onClick={() => setActive("Dashboard")}
                >
                  <HomeIcon className="h-5 w-5" /> Dashboard
                </Link>
                <Link
                  className={`flex items-center gap-4 px-2.5 
                  ${
                    active === "Add Product"
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setActive("Add Product")}
                >
                  <FolderPen className="h-5 w-5" /> Add Product
                </Link>
                <Link
                  className={`flex items-center gap-4 px-2.5 
                  ${
                    active === "All Product"
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setActive("All Product")}
                >
                  <FolderGit2 className="h-5 w-5" /> All Product
                </Link>
                <Link
                  className={`flex items-center gap-4 px-2.5 
                  ${
                    active === "Update Product"
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setActive("Update Product")}
                >
                  <LayoutGrid className="h-5 w-5" /> Update Product
                </Link>
                <Link
                  className={`flex items-center gap-4 px-2.5 
                  ${
                    active === "Orders"
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setActive("Orders")}
                >
                  <History className="h-5 w-5" /> Orders
                </Link>
                <Link
                  className={`flex items-center gap-4 px-2.5 
                  ${
                    active === "Account"
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setActive("Account")}
                >
                  <User2 className="h-5 w-5" /> Account
                </Link>
                <Link
                  className={`flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground`}
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5" /> Logout
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          <div className="flex items-center gap-4 md:grow-0 sm:ml-16 sm:mt-5">
            <img
              /*src= {user && user.avatar && user.avatar.url} */ alt="avatar"
              className="w-20 h-20 rounded-full max-[900px]:hidden"
            />
            <h1 className="text-4xl max-[900px]:text-2xl">
              {/* Welcome back , {user.fullname} */}
            </h1>
          </div>
        </header>

        {(() => {
          switch (active) {
            case "Dashboard":
              return <SellerDashboard />;
              break;
            case "Add Product":
              return <AddProduct />;
              break;
            case "Update Product":
              return <UpdateProduct />;
              break;
            case "All Product":
              return <AllProduct />;
              break;
            case "Orders":
              return <Orders />;
              break;
            case "Account":
              return <Account />;
              break;
            default:
              return <SellerDashboard />;
              break;
          }
        })()}
      </div>
    </>
  );
};

export default SellerDashboard;
