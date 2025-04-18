import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

const userSlice = createSlice({
    name: "user",
    initialState: {
        loading: false,
        user: {},
        isAuthenticated: false,
        error: null,
        message: null,
        isUpdated: false
    },
    reducers: {
        loginRequest(state,action){
            state.loading = true,
            state.isAuthenticated = false,
            state.user = {},
            state.error = null
        },
        loginSuccess(state,action){
            state.loading = false,
            state.isAuthenticated = true,
            state.user = action.payload,
            state.error = null
        },
        loginFailed(state,action){
            state.loading = false,
            state.isAuthenticated = false,
            state.user = {},
            state.error = action.payload
        },
        registerRequest(state,action){
            state.loading = true,
            state.error = null
        },
        registerSuccess(state,action){
            state.loading = false,
            state.message = action.payload,
            state.error = null
        },
        registerFailed(state,action){
            state.loading = false,
            state.message = state.message,
            state.error = action.payload
        },
        loadUserRequest(state,action){
            state.loading = true,
            state.isAuthenticated = false,
            state.user = {},
            state.error = null
        },
        loadUserSuccess(state,action){
            state.loading = false,
            state.isAuthenticated = true,
            state.user = action.payload,
            state.error = null
        },
        loadUserFailed(state,action){
            state.loading = false,
            state.isAuthenticated = false,
            state.user = {},
            state.error = action.payload
        },
        logoutSuccess(state,action){
            state.loading = false,
            state.isAuthenticated = false,
            state.user = {},
            state.error = null,
            state.message = action.payload
        },
        logoutFailed(state,action){
            state.loading = false,
            state.isAuthenticated = state.isAuthenticated,
            state.user = state.user,
            state.error = action.payload
        },
        updatePasswordRequest(state,action){
            state.loading = true,
            state.isUpdated = false,
            state.message = null,
            state.error = null
        },
        updatePasswordSuccess(state,action){
            state.loading = false,
            state.isUpdated = true,
            state.message = action.payload
            state.error =null
        },
        updatePasswordFailed(state,action){
            state.loading = false,
            state.isUpdated = false,
            state.message = null,
            state.error =action.payload
        },
        updateProfileRequest(state,action){
            state.loading = true,
            state.isUpdated = false,
            state.message = null,
            state.error = null
        },
        updateProfileSuccess(state,action){
            state.loading = false,
            state.isUpdated = true,
            state.message = action.payload
            state.error =null
        },
        updateProfileFailed(state,action){
            state.loading = false,
            state.isUpdated = false,
            state.message = null,
            state.error =action.payload
        },
        updateProfileReset(state,action){
            state.error = null,
            state.isUpdatedfalse,
            state.message = null
        },
        clearAllErrors(state,action){
            state.error = null,
            state.user = state.user
        }
    }
})

export const login = (email,password) => async(dispatch) => {
    dispatch(userSlice.actions.loginRequest())
    try {
        const requestData = new FormData();
        requestData.append("email", email);
        requestData.append("password", password);
        const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/public/login` ,
            requestData, 
            {withCredentials:true, headers: {"Content-Type": "application/json"}}
        )
        console.log(data);
        dispatch(userSlice.actions.loginSuccess(data));
        dispatch(userSlice.actions.clearAllErrors())
    } catch (error) {
        dispatch(userSlice.actions.loginFailed(error.response.data.message))
        console.log(error);
    }
}

export const register = (registerData) => async(dispatch) => {
    dispatch(userSlice.actions.registerRequest())
    try{
        const {data} = await axios.post(`` , registerData ,
            {
                withCredentials: true,
                headers: { "Content-Type" : "application/json"}
            }
        )
        console.log(data);
        dispatch(userSlice.actions.registerSuccess(data))
        dispatch(userSlice.actions.clearAllErrors(data))

    }catch(error){
        dispatch(userSlice.actions.registerFailed(error.response.data.message))
        console.log(error);
    }
}

export const getUser = () => async(dispatch) => {
    dispatch(userSlice.actions.loadUserRequest())
    try {
        const {data} = await axios.get(`${process.env.BACKEND_URL}/api/v1/user/getUser` ,
            {withCredentials: true}
        )
        dispatch(userSlice.actions.loadUserSuccess(data.user));
        dispatch(userSlice.actions.clearAllErrors())
    } catch (error) {
        dispatch(userSlice.actions.loadUserFailed(error.response.data.message))
    }
}

export const logout = () => async(dispatch) => {
    try {
        const {data} = await axios.get(`${process.env.BACKEND_URL}/api/v1/user/logout` ,
            {withCredentials: true}
        )
        dispatch(userSlice.actions.logoutSuccess(data.message));
        dispatch(userSlice.actions.clearAllErrors())
    } catch (error) {
        dispatch(userSlice.actions.logoutFailed(error.response.data.message))
        console.log(error);
    }
}

export const updatePassword = (currentPassword, newPassword, conformNewPassword) => async(dispatch) => {
    dispatch(userSlice.actions.updatePasswordRequest())
    try {
        const {data} = await axios.put(`${process.env.BACKEND_URL}/api/v1/user/update/password`,{currentPassword, newPassword, conformNewPassword},
            {
                withCredentials: true,
                headers: {"Content-Type" : "application/json"}    
            }
        )
        dispatch(userSlice.actions.updatePasswordSuccess(data.message))
        dispatch(userSlice.actions.clearAllErrors())

    } catch (error) {
        dispatch(userSlice.actions.updatePasswordFailed(error.response.data.message))
    }
}
export const updateProfile = (newData) => async(dispatch) => {
    dispatch(userSlice.actions.updateProfileRequest())
    try {
        const {data} = await axios.put(`${process.env.BACKEND_URL}/api/v1/user/update/profile`, newData,
            {
                withCredentials: true,
                headers: {"Content-Type" : "multipart/form-data"}    
            }
        )
        dispatch(userSlice.actions.updateProfileSuccess(data.message))
        dispatch(userSlice.actions.clearAllErrors())

    } catch (error) {
        dispatch(userSlice.actions.updateProfileFailed(error.response.data.message))
    }
}

export const resetProfile = () => (dispatch) => {
    dispatch(userSlice.actions.updateProfileReset())
}

export const clearAllUserErrors = () => (dispatch) => {
    dispatch(userSlice.actions.clearAllErrors())
}

export default userSlice.reducer