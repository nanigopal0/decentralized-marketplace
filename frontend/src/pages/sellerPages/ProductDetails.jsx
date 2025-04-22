import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Trash2, Edit3 } from "lucide-react";
import { toast } from "react-toastify";
import Sidebar from "../layout/Sidebar";

const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state || {};
  const [orders, setOrders] = useState([]);
  const [deliveredCount, setDeliveredCount] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-center text-gray-600">No product details found.</p>
      </div>
    );
  }

  const fetchOrdersForProduct = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/order/get-by-productId?productId=${product.productId}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setOrders(data);

        // Count delivered orders
        const deliveredOrders = data.filter(
          (order) => order.orderStatus === "Delivered"
        );
        setDeliveredCount(deliveredOrders.length);
      }
    } catch (error) {
      console.error("Error fetching orders for product:", error);
    }
  };

  const handleProductDelete = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/product/delete?productId=${product.productId}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 202) {
        toast.success("Product deleted successfully!");
        navigate("/products"); // Redirect to All Products page
      } else {
        toast.error("Failed to delete product.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    fetchOrdersForProduct();
  }, []);

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-yellow-100 to-pink-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <Card className="shadow-lg p-6 bg-gradient-to-r from-yellow-100 to-pink-100 border-gray-300">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800">
              {product.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Product Image */}
            <div className="w-full h-64 bg-gray-200 rounded-md overflow-hidden">
              <img
                src={product.mediaUrl || "/placeholder.jpg"}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Details */}
            <div className="space-y-2">
              <CardDescription className="text-gray-800 text-sm">
                <span className="font-bold">Description:</span> {product.description}
              </CardDescription>
              <CardDescription className="text-gray-800 text-sm">
                <span className="font-bold">Price:</span> {product.price} {product.priceUnit}
              </CardDescription>
              <CardDescription className="text-gray-800 text-sm">
                <span className="font-bold">Product Type:</span> {product.type}
              </CardDescription>
              <CardDescription className="text-gray-800 text-sm">
                <span className="font-bold">Stock:</span> {product.stock}
              </CardDescription>
              <CardDescription className="text-gray-800 text-sm">
                <span className="font-bold">Delivered Orders:</span> {deliveredCount}
              </CardDescription>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-4">
            <Button
              variant="outline"
              onClick={() =>
                navigate(`/product/update/${product.productId}`, {
                  state: { initialProduct: product },
                })
              }
              className="flex items-center gap-1 px-3 py-1 text-sm"
            >
              <Edit3 className="w-4 h-4" />
              Edit
            </Button>
            <Button
              variant="destructive"
              onClick={handleProductDelete}
              className="flex items-center gap-1 px-3 py-1 text-sm"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
          </CardFooter>
        </Card>

        {/* Pending/Accepted/Shipped Orders */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Pending/Accepted/Shipped Orders
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders
              .filter(
                (order) =>
                  order.orderStatus === "Pending" ||
                  order.orderStatus === "Accepted" ||
                  order.orderStatus === "Shipped"
              )
              .map((order) => (
                <Card
                  key={order.orderId}
                  className="border-gray-300 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition"
                  onClick={() =>
                    navigate(`/order/details/${order.orderId}`, {
                      state: { order },
                    })
                  }
                >
                  <CardHeader className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage
                        src={order.buyer.avatar || "/placeholder-avatar.jpg"}
                        alt={order.buyer.fullName}
                      />
                      <AvatarFallback>
                        {order.buyer.fullName
                          ? order.buyer.fullName.charAt(0).toUpperCase()
                          : "?"}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-lg font-bold text-gray-800">
                      Order ID: {order.orderId}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-800 text-sm">
                      <span className="font-bold">Buyer:</span> {order.buyer.fullName}
                    </CardDescription>
                    <CardDescription className="text-gray-800 text-sm">
                      <span className="font-bold">Quantity:</span> {order.quantity}
                    </CardDescription>
                    <CardDescription className="text-gray-800 text-sm">
                      <span className="font-bold">Status:</span> {order.orderStatus}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;