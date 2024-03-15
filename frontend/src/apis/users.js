import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../utils";

export const userLogin = createAsyncThunk(
  "userLogin",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await API.POST(`/api/user/login`, {
        userName: username,
        password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
