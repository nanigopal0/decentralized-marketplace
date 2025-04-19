import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: {},
    isAuthenticated: false, //while push make it False
    error: null,
    message: null,
    isUpdated: false,
  },
  reducers: {
    loginRequest(state, action) {
      (state.loading = true),
        (state.isAuthenticated = false),
        (state.user = {}),
        (state.error = null);
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload || {}; // Ensure user is an object, even if payload is null/undefined
      state.error = null;
      localStorage.setItem("user", JSON.stringify(action.payload)); // Store user data in localStorage
      // Optional: Log a warning if payload is invalid
      if (!action.payload || !action.payload.id) {
        console.warn(
          "Invalid user data received in loginSuccess:",
          action.payload
        );
      }
    },
    loginFailed(state, action) {
      (state.loading = false),
        (state.isAuthenticated = false),
        (state.user = {}),
        (state.error = action.payload);
    },

    logoutSuccess(state, action) {
      (state.loading = false),
        (state.isAuthenticated = false),
        (state.user = {}),
        (state.error = null),
        (state.message = action.payload);
    },
    logoutFailed(state, action) {
      (state.loading = false),
        (state.isAuthenticated = state.isAuthenticated),
        (state.user = state.user),
        (state.error = action.payload);
    },
    updatePasswordRequest(state, action) {
      (state.loading = true),
        (state.isUpdated = false),
        (state.message = null),
        (state.error = null);
    },
    updatePasswordSuccess(state, action) {
      (state.loading = false),
        (state.isUpdated = true),
        (state.message = action.payload);
      state.error = null;
    },
    updatePasswordFailed(state, action) {
      (state.loading = false),
        (state.isUpdated = false),
        (state.message = null),
        (state.error = action.payload);
    },
    updateProfileRequest(state, action) {
      (state.loading = true),
        (state.isUpdated = false),
        (state.message = null),
        (state.error = null);
    },
    updateProfileSuccess(state, action) {
      (state.loading = false),
        (state.isUpdated = true),
        (state.message = action.payload);
      state.error = null;
    },
    updateProfileFailed(state, action) {
      (state.loading = false),
        (state.isUpdated = false),
        (state.message = null),
        (state.error = action.payload);
    },
    updateProfileReset(state, action) {
      (state.error = null), state.isUpdatedfalse, (state.message = null);
    },
    clearAllErrors(state, action) {
      (state.error = null), (state.user = state.user);
    },
    loadUserRequest(state) {
      state.loading = true;
    },
    loadUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload || {}; // Set user to an empty object if no data is returned
      state.error = null;
    },
    loadUserFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    clearErrors(state) {
      state.error = null;
    },
  },
});

export const login = (email, password) => async (dispatch) => {
  dispatch(userSlice.actions.loginRequest());
  try {
    const requestData = new FormData();
    requestData.append("email", email);
    requestData.append("password", password);
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/public/login`,
      requestData,
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    if (data && data.id) {
      dispatch(userSlice.actions.loginSuccess(data));
      // console.log(data);
    } else {
      throw new Error("Invalid login response");
    }

    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.loginFailed(error.response.data.message));
    console.log(error);
  }
};

export const pingServer = () => async (dispatch) => {
  dispatch(userSlice.actions.loadUserRequest());
  try {
    const data = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/user/ping`,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    if (data.status === 200) dispatch(userSlice.actions.loadUserSuccess(null));
    else throw new Error("Not logged in!");
  } catch (error) {
    dispatch(
      userSlice.actions.loadUserFailed(
        error.response?.data?.message || "Failed to load user"
      )
    );
  }
};

export const getUser = () => async (dispatch) => {
  dispatch(userSlice.actions.loadUserRequest());
  try {
    const { data } = await axios.get(
      `${process.env.BACKEND_URL}/user/get/?id=${userSlice.user.id}`,
      { withCredentials: true }
    );
    dispatch(userSlice.actions.loadUserSuccess(data));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.loadUserFailed(error.response.data.message));
  }
};

export const logout = () => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `${process.env.BACKEND_URL}/api/v1/user/logout`,
      { withCredentials: true }
    );
    dispatch(userSlice.actions.logoutSuccess(data.message));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.logoutFailed(error.response.data.message));
    console.log(error);
  }
};

export const updatePassword =
  (currentPassword, newPassword, conformNewPassword) => async (dispatch) => {
    dispatch(userSlice.actions.updatePasswordRequest());
    try {
      const { data } = await axios.put(
        `${process.env.BACKEND_URL}/api/v1/user/update/password`,
        { currentPassword, newPassword, conformNewPassword },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      dispatch(userSlice.actions.updatePasswordSuccess(data.message));
      dispatch(userSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(
        userSlice.actions.updatePasswordFailed(error.response.data.message)
      );
    }
  };
export const updateProfile = (newData) => async (dispatch) => {
  dispatch(userSlice.actions.updateProfileRequest());
  try {
    const { data } = await axios.put(
      `${process.env.BACKEND_URL}/api/v1/user/update/profile`,
      newData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(userSlice.actions.updateProfileSuccess(data.message));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      userSlice.actions.updateProfileFailed(error.response.data.message)
    );
  }
};

export const resetProfile = () => (dispatch) => {
  dispatch(userSlice.actions.updateProfileReset());
};

export const clearAllUserErrors = () => (dispatch) => {
  dispatch(userSlice.actions.clearAllErrors());
};

export default userSlice.reducer;
