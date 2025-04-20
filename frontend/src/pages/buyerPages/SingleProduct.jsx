import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Home } from "lucide-react";
import { toast } from "react-toastify";
const SingleProduct = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();

  const getProduct = async () => {
    await axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/product/get?productId=${id}`, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log(res);
        setProduct(res.data);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  // Inside your component function
  const navigate = useNavigate();
  return (
    <>
      <div className="flex mt-7 justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4">
        <div className="w-[100%] px-5 md:w-[1000px] pb-5">
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-10 flex flex-col gap-5">
                <div className="w-full sm:col-span-4">
                  <h1 className="text-2xl font-bold mb-4 text-black">
                    {product.title}
                  </h1>
                  <img
                    src={
                      product.mediaUrl ? product.mediaUrl : "/avatarHolder.jpg"
                    }
                    alt="productBanner"
                    className="w-full h-auto"
                  />
                </div>

                <div className="w-full sm:col-span-4">
                  <p className="text-2xl mb-2 font-bold">Description:</p>
                  <p>{product.description}</p>
                </div>

                <div className="w-full sm:col-span-4">
                  <p className="text-2xl mb-2 font-bold">Stock:</p>
                  <p className="text-black">{product.stock}</p>
                </div>

                <div className="w-full sm:col-span-4">
                  <p className="text-2xl mb-2 font-bold">Product Type:</p>
                  <p className="text-black">{product.type}</p>
                </div>

                <div className="w-full sm:col-span-4">
                  <p className="text-2xl mb-2 font-bold">Price:</p>
                  <p className="text-green-700 font-semibold text-xl">
                    Ξ {product.price || 9}
                  </p>
                </div>

                <div className="w-full sm:col-span-4">
                  <p className="text-2xl mb-2 font-bold">Expected Delivery:</p>
                  <p className="text-black">3-5 business days</p>
                </div>

                <div className="w-full sm:col-span-4 mt-4">
                  <Button
                    onClick={() => navigate(`/order/product/:${product.id}`)}
                    className="bg-blue-600 text-white hover:bg-blue-700 text-lg px-6 py-2 rounded-md"
                  >
                    Buy Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
