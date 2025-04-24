import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { handleUnauthorizedStatus } from "../../util/HandleUnauthorizedStatus";
import ProductCard from "../layout/ProductCard";
import { pingServer } from "../../../store/slices/userSlice";
import { useDispatch } from "react-redux";

const AllProduct = () => {
  const navigateTo = useNavigate();
  const [products, setProducts] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const fetchAllProducts = async () => {
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
        dispatch(pingServer())
      }
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
    <div className="min-h-screen bg-gradient-to-r from-yellow-100 to-pink-100">
      <div className="p-4 sm:p-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <p className="text-2xl font-bold text-gray-800 text-center sm:text-left">
            Products
          </p>
          <Button
            onClick={() => navigateTo("/product/add")}
            className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md"
          >
            Add Product
          </Button>
        </div>

        {/* Product Grid */}
        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((element) => (
              <ProductCard
                key={element.productId}
                product={element}
                onClick={() =>
                  navigateTo(`/product/details/${element.productId}`, {
                    state: { product: element },
                  })
                }
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-600 text-lg">No Products Found!</p>
            <Button
              onClick={() => navigateTo("/product/add")}
              className="mt-4 bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md"
            >
              Add Your First Product
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProduct;