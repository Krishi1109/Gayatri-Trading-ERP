import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../utils";
import { isAxiosError } from "axios";

export const fetchBrands = createAsyncThunk(
  "fetchBrands",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.GET(`/api/brand`);
      return response.data.result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addBrand = createAsyncThunk(
  "addBrand",
  async ({ name }, { rejectWithValue }) => {
    try {
      const response = await API.POST(`/api/brand`, { name });
      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error);
    }
  }
);

export const deleteBrand = createAsyncThunk(
  "deleteBrand",
  async ({ id }, { rejectWithValue }) => {
    try {
      console.log("id => ", id)
      const response = await API.DELETE(`/api/brand/${id}`);
      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error);
    }
  }
);

