import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../helper/axiosinstance";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") || false,
  role: localStorage.getItem("role") || "",
  data: localStorage.getItem("data") == undefined ? JSON.parse(localStorage.getItem("data")) : {},
};

{
  /** create account method */
}
export const createAccount = createAsyncThunk("/auth/singup", async (data) => {
  try {
    const res = axiosInstance.post("user/register", data);
    toast.promise(res, {
      loading: "Wait! creating your account",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to create account",
    });

    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

{
  /** Login Method */
}
export const login = createAsyncThunk("/auth/login", async (data) => {
  try {
    const res = axiosInstance.post("user/login", data);
    toast.promise(res, {
      loading: "Wait! Authentication in progress",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to login",
    });

    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

{
  /** Logout Method implemented */
}
export const logout = createAsyncThunk("/auth/logout", async () => {
  try {
    const res = axiosInstance.post("user/logout");
    toast.promise(res, {
      loading: "Wait ! Logout in process",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to logout",
    });
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});


export const updateProfile = createAsyncThunk("/user/update", async (data) => {
  try {
    const res = axiosInstance.put(`user/update/${data[0]}`,data[1]);
    toast.promise(res, {
      loading: "Wait ! Profile update in process",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to update profile",
    });
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const getUserData = createAsyncThunk("/user/details", async () => {
  try {
    const res = axiosInstance.get(`user/me`,);
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem("data", JSON.stringify(action?.payload?.user));
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", action?.payload?.user?.role);
        state.isLoggedIn = true;
        state.data = action?.payload?.user;
        state.role = action?.payload?.role;
      })
      .addCase(logout.fulfilled, (state) => {
        localStorage.clear();
        state.isLoggedIn = false;
        state.role = "";
        state.data = {};
      })
      .addCase(getUserData.fulfilled,(state,action) => {
        if(!action?.payload?.user) return;
        localStorage.setItem("data", JSON.stringify(action?.payload?.user));
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", action?.payload?.user?.role);
        state.isLoggedIn = true;
        state.data = action?.payload?.user;
        state.role = action?.payload?.role;
      })
  },
});

// export const {} = authSlice.actions;
export default authSlice.reducer;
