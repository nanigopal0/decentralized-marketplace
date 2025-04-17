import {configureStore} from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import forgotResetPass from './slices/forgetResetSlice'
import productReducer from './slices/productSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        forgotPassword: forgotResetPass,
        product: productReducer,
    }
})

