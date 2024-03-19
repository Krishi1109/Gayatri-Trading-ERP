import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../utils";

export const fetchPurchaseList = createAsyncThunk(
  "fetchPurchaseList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.GET(`/api/purchase`);
      return response.data.result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
