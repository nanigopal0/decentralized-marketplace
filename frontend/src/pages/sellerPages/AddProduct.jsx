import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import SmartMarketplace from "../contracts/SmartMarketplace.json";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  clearAllProductErrors,
  getAllProduct,
  resetProduct,
} from "../../../store/slices/productSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CONTRACT_ADDRESS = "0x6eB31fDAA29735037c03f9f2f9581e01d7a89133"; //Replace with your contract_Address

const AddProduct = () => {
  const [productId, setProductId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [productType, setProductType] = useState("");
  const [stock, setStock] = useState(0);
  const [productImage, setProductImage] = useState("");
 const navigate = useNavigate();
  const [productImagePreview, setProductImagePreview] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleFileUpload = async () => {
    console.log(productImage);
    const data = new FormData();
    data.append("file", productImage);
    data.append("upload_preset", "Banner_Upload");
    data.append("cloud_name", "dckahd0gz");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dckahd0gz/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );
    const uploadedImageURL = await res.json();
    console.log(uploadedImageURL.url);
    return uploadedImageURL.url;
  };

  const handleBanner = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProductImagePreview(reader.result);
      setProductImage(file);
    };
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    const imageUrl = await handleFileUpload();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("type", productType);
    formData.append("stock", stock);
    formData.append("mediaUrl", imageUrl);
    formData.append("sellerId", user.id);
    // dispatch(addProduct(formData));
    const data = await addProductToDB(formData);
    handleAddProductToBlockchain(data.productId,data.price,data.type);

    setTitle("");
    setDescription("");
    setPrice("");
    setProductType("");
    setStock("");
    setProductImage("");
  };

  const addProductToDB = async (formData) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/product/add`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status == 201) {
        const data = await response.json();
        console.log(data);
        toast.success("Product added successfully!");
        return data;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const handleAddProductToBlockchain = async (productId,price,productType) => {
    try {
      console.log("Submitting product listing...");
      console.log("Product ID :", productId);
      console.log("Price (wei):", price);
      console.log("Product Type:", productType);

      if (!window.ethereum) throw new Error("MetaMask not detected");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      // price = ethers.parseEther(price.toString());
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        SmartMarketplace,
        signer
      );
      const tx = await contract.listProduct(
        productId,
        ethers.parseEther(price.toString()),
        productType
      );
      console.log("Transaction submitted:", tx.hash);
      await tx.wait();
      console.log("Transaction confirmed");
      toast.success("Product listed on blockchain successfully!");
      navigate("/products");
    } catch (err) {
      console.error("Blockchain listing error:", err);
      toast.error("Blockchain product listing failed.");
    }
  };

  return (
    <div className="flex mt-7 justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14 bg-gradient-to-r from-yellow-100 to-pink-100">
      <form onSubmit={handleAddProduct} className="w-[100%] px-5 md:w-[1000px]">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="font-semibold leading-7 text-gray-900 text-3xl">
              Add New Project
            </h2>
            <div className="mt-10 flex flex-col gap-5">
              <div className="w-full sm:col-span-4">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Project Title
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300">
                    <Input
                      type="text"
                      placeholder="Title of the project..."
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="w-full sm:col-span-4">
                <Label className="block text-sm font-medium leading-6 text-gray-900">
                  Description
                </Label>
                <div className="mt-2">
                  <Textarea
                    placeholder="Feature 1. Feature 2. Feature 3."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full sm:col-span-4">
                <Label className="block text-sm font-medium leading-6 text-gray-900">
                  Product ID
                </Label>
                <div className="mt-2">
                  <Input
                    type="text"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    required
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
              </div>
              <div className="w-full sm:col-span-4">
                <Label className="block text-sm font-medium leading-6 text-gray-900">
                  Stock
                </Label>
                <div className="mt-2">
                  <Input
                    placeholder="Stock count"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full sm:col-span-4">
                <Label className="block text-sm font-medium leading-6 text-gray-900">
                  Product Type
                </Label>
                <div className="mt-2">
                  <Select
                    value={productType}
                    onValueChange={(selectedValue) =>
                      setProductType(selectedValue)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Product Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Physical</SelectItem>
                      <SelectItem value="1">Digital</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="w-full sm:col-span-4">
                <Label className="block text-sm font-medium leading-6 text-gray-900">
                  Price
                </Label>
                <div className="mt-2">
                  <Input
                    type="text"
                    placeholder="Price in ETH"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full col-span-full">
                <Label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Project Banner
                </Label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    {productImagePreview ? (
                      <img
                        className="mx-auto h-[250px] w-full"
                        src={productImagePreview}
                      />
                    ) : (
                      <svg
                        className="mx-auto h-12 w-12 text-gray-300"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}

                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <Label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <Input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={handleBanner}
                        />
                      </Label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 w-56"
          >
            Add Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
