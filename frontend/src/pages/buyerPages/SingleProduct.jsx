import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Home } from 'lucide-react';
import { toast } from 'react-toastify';

const SingleProduct = () => {
    const [title , setTitle] = useState('')
    const [description , setDescription] = useState('')
    const [price , setPrice] = useState('')
    const [productType , setProductType] = useState('')
    const [stock , setStock] = useState(0)
    const [productImage , setProductImage] = useState('')

    const {id} = useParams()

    useEffect(() => {
      const getProduct = async() => {
        const {data} = await axios.get(`/api/v1/product/getOne/${id}`,
          {
            withCredentials: true
          }
        )
        .then((res) => {
          setTitle(res.data.product.title)
          setDescription(res.data.product.description)
          setStock(res.data.product.stock)
          setProductType(res.data.product.productType)
          setProductImage(res.data.product.productImage && res.data.product.productImage.url)
        })
        .catch((error) => {
          toast.error(error.response.data.message)
        })
      }
      getProduct()
    },[id])

    const navigateTo = useNavigate()
    const handleReturnToDashboard = () => {
      navigateTo('/')
    }

    const descriptionList = description.split(" -" && ". ")
    // const technologiesList = technologies.split(", ")

  return (
    <>
       <div className="flex mt-7 justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4">
        <div className="w-[100%] px-5 md:w-[1000px] pb-5">
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <div className="flex justify-end">
                <Button onClick={handleReturnToDashboard}>
                  <Home />
                </Button>
              </div>
              <div className="mt-10 flex flex-col gap-5">
                <div className="w-full sm:col-span-4">
                  <h1 className="text-2xl font-bold mb-4 text-black">{title}</h1>
                  <img
                    src={
                      productImage
                        ? productImage
                        : "/avatarHolder.jpg"
                    }
                    alt="productBanner"
                    className="w-full h-auto"
                  />
                </div>
                <div className="w-full sm:col-span-4">
                  <p className="text-2xl mb-2 font-bold">Description:</p>
                  <ul className="list-disc text-black">
                    {descriptionList.map((item, index) => (
                      <li key={index} >{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="w-full sm:col-span-4">
                  <p className="text-2xl mb-2 font-bold">Stock:</p>
                  <p className='text-black'>{stock}</p>
                </div>
                <div className="w-full sm:col-span-4">
                  <p className="text-2xl mb-2 font-bold">Product Type:</p>
                  <p className='text-black'>{productType}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleProduct;