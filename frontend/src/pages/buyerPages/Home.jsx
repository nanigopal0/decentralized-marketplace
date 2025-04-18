import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { getAllProduct , deleteProduct, clearAllProductErrors, resetProduct } from '../../../store/slices/productSlice';
import {toast} from 'react-toastify'

const Home = () => {

  const navigateTo = useNavigate()
  const dispatch = useDispatch()
  const { loading , products , error , message } = useSelector((state) => state.product)

  const handleDashboard = () => {
    // e.preventDefault();
    navigateTo('/')
  };

  const handleProductDelete = (id) => {
    setProductId(id)
    dispatch(deleteProduct(id))
  }

  useEffect(() => {
    if(error) {
      toast.error(error)
      dispatch(clearAllProductErrors())  
    }
    if(message) {
      toast.success(message)
      dispatch(resetProduct())
      dispatch(getAllProduct())
    }
  },[  dispatch , loading , error , message])

 

  const [productId , setProductId] = useState('')


  return (
    <>
      <div className='min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-20 sm:pr-6'>
          <Tabs>
            <TabsContent>
              <Card>
                <CardHeader className='flex gap-4 sm:justify-between sm:flex-row sm:items-center'>
                  <CardTitle>Products</CardTitle>
                </CardHeader>
                <CardContent className='grid sm:grid-cols-2 gap-4 '>
                  {
                    products && products.length > 0 ? (
                      products.map((element) => {
                        return (
                          <Card key={element._id} className='grid gap-2'>
                              <CardDescription className='text-slate-950' >
                                <span className='font-bold mr-2' >Product Name :</span>
                                {element.title}
                              </CardDescription>
                              <CardDescription className='text-slate-950' >
                                <span className='font-bold mr-2' >Description :</span>
                                {element.description}
                              </CardDescription>
                              <CardDescription className='text-slate-950' >
                                <span className='font-bold mr-2' >Price :</span>
                                {element.price}
                              </CardDescription>
                              <CardDescription className='text-slate-950' >
                                <span className='font-bold mr-2' >Product Type :</span>
                                {element.productType}
                              </CardDescription>
                              <CardDescription className='text-slate-950' >
                                <span className='font-bold mr-2'>Stock :</span>
                                {element.stock}
                              </CardDescription>
                              <CardDescription className='text-slate-950' >
                                <span className='font-bold mr-2'>Stock :</span>
                                {element.productImage}
                              </CardDescription>
                              <CardFooter className='justify-end' >
                                {
                                  loading && (productId === element._id) ? 
                                  "Finding!": (
                                    <Button className="w-32" onClick={() => handleProductDelete(element._id)} ><Trash2 />Delete</Button>
                                  )
                                }
                              </CardFooter>
                          </Card>
                        )
                      })
                    ) : <CardHeader>No Product found!</CardHeader>
                  }
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
      </div>
    </>
  );
}

export default Home;