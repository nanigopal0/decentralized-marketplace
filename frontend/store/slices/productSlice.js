import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const productSlice = createSlice({
    name: "product",
    initialState: {
        loading: false,
        message: null,
        products: [],
        error: null,
        isUpdated: false
    },
    reducers: {
        getAllProductRequest(state,action){
            state.loading = true,
            state.products = [],
            state.error = null
        },
        getAllProductSuccess(state,action){
            state.loading = false,
            state.products = action.payload,
            state.error = null
        },
        getAllProductFailed(state,action){
            state.error = action.payload,
            state.loading = false,
            state.message= null
        },
        addNewProductRequest(state,action){
            state.message = null,
            state.error = null,
            state.loading = true
        },
        addNewProductSuccess(state,action){
            state.message = action.payload,
            state.error = null,
            state.loading = false
        },
        addNewProductFailed(state,action){
            state.message = null,
            state.error = action.payload,
            state.loading = false,
            state.products = state.products
        },
        deleteProductRequest(state,action){
            state.message = null,
            state.error = null,
            state.loading = true
        },
        deleteProductSuccess(state,action){
            state.message = action.payload,
            state.error = null,
            state.loading = false
        },
        deleteProductFailed(state,action){
            state.message = null,
            state.error = action.payload,
            state.loading = false
        },
        updateProductRequest(state,action){
            state.loading = true,
            state.isUpdated = false,
            state.message = null,
            state.error = null
        },
        updateProductSuccess(state,action){
            state.loading = false,
            state.isUpdated = true,
            state.message = action.payload
            state.error =null
        },
        updateProductFailed(state,action){
            state.loading = false,
            state.isUpdated = false,
            state.message = null,
            state.error =action.payload
        },
        resetProductSlice(state,action){
            state.error = null,
            state.products = state.products,
            state.message = null,
            state.loading = false
        },
        clearAllErrors(state,action){
            state.error = null,
            state.products = state.products
        }
    }
})

export const getAllProduct = () => async(dispatch) => {
    dispatch(productSlice.actions.getAllProductRequest())
    try {
        const data = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/product/get-all-products` , 
            {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            }
        )
    
        dispatch(productSlice.actions.getAllProductSuccess(data.data))
        dispatch(productSlice.actions.clearAllErrors())
    } catch (error) {
        dispatch(productSlice.actions.getAllProductFailed(error.response.data.message))
    }
}

export const deleteProduct = (id) => async(dispatch) => {
    dispatch(productSlice.actions.deleteProductRequest())
    try {
        const {data} = await axios.delete(`${process.env.BACKEND_URL}/api/v1/product/delete/${id}`,
            {
                withCredentials: true
            }
        )
        dispatch(productSlice.actions.deleteProductSuccess(data.message))
        dispatch(productSlice.actions.clearAllErrors())
    } catch (error) {
        dispatch(productSlice.actions.deleteProductFailed(error.response.data.message))
    }
} 

export const addProduct = (productData) => async(dispatch) => {
    dispatch(productSlice.actions.addNewProductRequest())
    try {
        const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/product/add` , productData , 
            {
                withCredentials: true,
                headers: {
                    "Content-Type" : "application/json"
                }
            }
        )
        dispatch(productSlice.actions.addNewProductSuccess(data.message))
        dispatch(productSlice.actions.clearAllErrors())
    } catch (error) {
        dispatch(productSlice.actions.addNewProductFailed(error.response))
        console.log(error)
    }
}

export const updateProduct = (id,updatedProductData) => async(dispatch) => {
    dispatch(productSlice.actions.updateProductRequest())
    try {
        const {data} = await axios.put(`${process.env.BACKEND_URL}/api/v1/product/update/${id}` , updatedProductData ,
            {
                withCredentials: true,
                headers: {
                    headers: {"Content-Type" : "multipart/form-data"}
                }
            }
        )
        dispatch(productSlice.actions.updateProductSuccess(data.message))
        dispatch(productSlice.actions.clearAllErrors())
    } catch (error) {
        dispatch(productSlice.actions.updateProductFailed(error.response.data.message))
    }
}

export const clearAllProductErrors =  () => ( dispatch ) => {
    dispatch(productSlice.actions.clearAllErrors())
}

export const resetProduct = () => ( dispatch )=> {
    dispatch(productSlice.actions.resetProductSlice())
}

export default productSlice.reducer