import { createSlice } from "@reduxjs/toolkit";
import { ApiStates } from "../../shared/constants";
import { userLogin } from "../../apis/users";

const initialState = {
  isAuth: false,
  userInfo: [],
  loginApiStatus: ApiStates.idle,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loginApiStatus = ApiStates.pending;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loginApiStatus = ApiStates.success;
        state.isAuth = true;
        state.userInfo = action.payload;
        localStorage.setItem("token", action.payload.result.token)
      })
      .addCase(userLogin.rejected, (state) => {
        state.loginApiStatus = ApiStates.failed;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice;
