import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { handleUnauthorizedStatus } from "../../util/HandleUnauthorizedStatus";
import ProductCard from "../layout/ProductCard";
import { pingServer } from "../../../store/slices/userSlice";
import { useDispatch } from "react-redux";
import { Loader2 } from "lucide-react"; // Spinner for loading indicator
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";

const AllProduct = () => {
  const navigateTo = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  const [showMetaMaskAlert, setShowMetaMaskAlert] = useState(false); // State for MetaMask alert
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();

  const fetchAllProducts = async () => {
    setLoading(true); // Start loading
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/product/get-by-sellerId?sellerId=${
          user.id
        }`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      handleUnauthorizedStatus(response);
      if (response.status === 401) {
        dispatch(pingServer());
      }
      const data = await response.json();
      if (response.status === 200) {
        setProducts(data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const handleMetaMaskCheck = (callback) => {
    if (!window.ethereum) {
      setShowMetaMaskAlert(true); // Show MetaMask alert if not installed
      return;
    }
    callback();
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-100 to-pink-100">
      <div className="p-4 sm:p-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <p className="text-2xl font-bold text-gray-800 text-center sm:text-left">
            Products
          </p>
          <Button
            onClick={() =>
              handleMetaMaskCheck(() => navigateTo("/product/add"))
            }
            className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md"
          >
            Add Product
          </Button>
        </div>

        {/* Loading Indicator */}
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
          </div>
        ) : (
          <>
            {/* Product Grid */}
            {products && products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((element) => (
                  <ProductCard
                    key={element.productId}
                    product={element}
                    onClick={() =>
                      handleMetaMaskCheck(() =>
                        navigateTo(`/product/details/${element.productId}`, {
                          state: { product: element },
                        })
                      )
                    }
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-600 text-lg">No Products Found!</p>
                <Button
                  onClick={() =>
                    handleMetaMaskCheck(() => navigateTo("/product/add"))
                  }
                  className="mt-4 bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md"
                >
                  Add Your First Product
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      {/* MetaMask Alert Dialog */}
      <AlertDialog open={showMetaMaskAlert} onOpenChange={setShowMetaMaskAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>MetaMask Not Detected</AlertDialogTitle>
            <AlertDialogDescription>
              MetaMask is required to perform this action. Please install MetaMask and try again.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button onClick={() => setShowMetaMaskAlert(false)}>Close</Button>
            <Button
              asChild
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              <a
                href="https://metamask.io/download/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Install MetaMask
              </a>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AllProduct;