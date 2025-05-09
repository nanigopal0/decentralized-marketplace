import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-toastify";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { handleUnauthorizedStatus } from "../../util/HandleUnauthorizedStatus";
import { useDispatch } from "react-redux";
import { pingServer } from "../../../store/slices/userSlice";
import { handleFileUpload } from "../../util/CloudinaryFileUpload";
import { Loader2 } from "lucide-react"; // Spinner for loading indicator

const UpdateProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [productType, setProductType] = useState("");
  const [stock, setStock] = useState(0);
  const [productImage, setProductImage] = useState("");
  const [productImagePreview, setProductImagePreview] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const handleBanner = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProductImagePreview(reader.result);
      setProductImage(file);
    };
  };

  const updateProduct = async (formData) => {
    setLoading(true); // Start loading
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/product/update`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      handleUnauthorizedStatus(response);

      if (response.status === 401) {
        dispatch(pingServer());
      }
      if (response.status === 204) {
        toast.success("Product updated successfully");
        navigate("/products");
      } else {
        toast.error("Failed to update product. Please try again.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    const reqData = {
      productId: id,
      title,
      description,
      price,
      stock,
    };

    if (productImage) {
      const url = await handleFileUpload(productImage);
      reqData.mediaUrl = url;
    }

    updateProduct(reqData);
  };

  useEffect(() => {
    const { initialProduct } = location.state || {};
    setTitle(initialProduct.title);
    setDescription(initialProduct.description);
    setPrice(initialProduct.price);
    setProductType(initialProduct.type);
    setStock(initialProduct.stock);
    setProductImage(initialProduct.mediaUrl);
    setProductImagePreview(initialProduct.mediaUrl);
  }, [location.state]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-yellow-100 to-pink-100 px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={handleUpdateProduct}
        className="w-full max-w-3xl bg-white p-6 sm:p-8 lg:p-10 rounded-lg shadow-lg space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Update Product
        </h2>

        {/* Product Title */}
        <div>
          <Label className="block text-sm font-medium text-gray-700">
            Product Title
          </Label>
          <Input
            type="text"
            placeholder="Enter product title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-2 w-full"
          />
        </div>

        {/* Description */}
        <div>
          <Label className="block text-sm font-medium text-gray-700">
            Description
          </Label>
          <Textarea
            placeholder="Enter product description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-2 w-full"
          />
        </div>

        {/* Stock */}
        <div>
          <Label className="block text-sm font-medium text-gray-700">
            Stock
          </Label>
          <Input
            type="number"
            placeholder="Enter stock count..."
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="mt-2 w-full"
          />
        </div>

        {/* Product Type */}
        <div>
          <Label className="block text-sm font-medium text-gray-700">
            Product Type
          </Label>
          <Select disabled value={productType} className="mt-2">
            <SelectTrigger>
              <SelectValue placeholder="Select Product Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={productType}>{productType}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Price */}
        <div>
          <Label className="block text-sm font-medium text-gray-700">
            Price (ETH)
          </Label>
          <Input
            type="number"
            placeholder="Enter price in ETH..."
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-2 w-full"
          />
        </div>

        {/* Product Image */}
        <div>
          <Label className="block text-sm font-medium text-gray-700">
            Product Image
          </Label>
          <div className="mt-2 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4">
            {productImagePreview ? (
              <img
                src={productImagePreview}
                alt="Product Preview"
                className="h-48 w-full object-cover rounded-lg"
              />
            ) : (
              <p className="text-gray-500">No image selected</p>
            )}
            <Input
              type="file"
              onChange={handleBanner}
              className="mt-4 w-full"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 rounded-md flex items-center justify-center ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Updating Product...
              </>
            ) : (
              "Update Product"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;