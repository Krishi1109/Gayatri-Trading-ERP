import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiStates, BASEURL } from "../../shared/constants";

const initialState = {
  isAuth: false,
  userInfo: [],
  loginApistatus: ApiStates.idle,
};

export const userLogin = createAsyncThunk(
  "userLogin",
  async ({ username, password }) => {
    try {
      const response = await axios.post(`${BASEURL}/api/user/login`, {
        userName: username,
        password,
      });
      return response.data;
    } catch (error) {
      console.log("hello");
      console.log("error => ", error);
      return { error: error };
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => {
      state.loginApistatus = ApiStates.pending;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.loginApistatus = ApiStates.success;
      if (action.payload?.error) {
        state.userInfo = [];
        state.isAuth = false;
      }
      if (action.payload?.success) {
        state.isAuth = true;
        state.userInfo = action.payload;
      }
    });
    builder.addCase(userLogin.rejected, (state) => {
      state.loginApistatus = ApiStates.failed;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice;
