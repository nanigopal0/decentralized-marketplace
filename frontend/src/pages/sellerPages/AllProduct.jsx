import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { handleUnauthorizedStatus } from "../../util/HandleUnauthorizedStatus";
import Sidebar from "../layout/Sidebar";

const AllProduct = () => {
  const navigateTo = useNavigate();
  const [products, setProducts] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchAllProducts = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/product/get-by-sellerId?sellerId=${user.id}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      handleUnauthorizedStatus(response);
      const data = await response.json();
      if (response.status === 200) {
        setProducts(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-yellow-100 to-pink-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* <Card className="shadow-lg p-6 bg-gradient-to-r from-yellow-100 to-pink-100"> */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-2xl font-bold text-gray-800">
              Products
            </p>
            <Button
              onClick={() => navigateTo("/product/add")}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Add Product
            </Button>
          </div>

          {/* <CardContent> */}
            {products && products.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((element) => (
                  <Card
                    key={element.productId}
                    className="p-4 border-gray-400 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition"
                    onClick={() =>
                      navigateTo(`/product/details/${element.productId}`, {
                        state: { product: element },
                      })
                    }
                  >
                    {/* Product Image */}
                    <div className="w-full h-48 bg-gray-200 rounded-md overflow-hidden mb-4">
                      <img
                        src={element.mediaUrl || "/placeholder.jpg"}
                        alt={element.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="space-y-2">
                      <CardDescription className="text-gray-800 text-sm">
                        <span className="font-bold">Product Name:</span>{" "}
                        {element.title}
                      </CardDescription>
                      <CardDescription className="text-gray-800 text-sm">
                        <span className="font-bold">Price:</span> {element.price}{" "}
                        {element.priceUnit}
                      </CardDescription>
                      <CardDescription className="text-gray-800 text-sm">
                        <span className="font-bold">Stock:</span> {element.stock}
                      </CardDescription>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-600 text-lg">No Products Found!</p>
                <Button
                  onClick={() => navigateTo("/product/add")}
                  className="mt-4 bg-blue-600 text-white hover:bg-blue-700"
                >
                  Add Your First Product
                </Button>
              </div>
            )}
          {/* </CardContent> */}
        {/* </Card> */}
      </div>
    </div>
  );
};

export default AllProduct;