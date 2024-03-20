import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../utils";
import { isAxiosError } from "axios";

export const fetchCategories = createAsyncThunk(
  "fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.GET(`/api/category`);
      return response.data.result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addCategory = createAsyncThunk(
  "addCategory",
  async ({ name }, { rejectWithValue }) => {
    try {
      const response = await API.POST(`/api/category`, { name });
      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "deleteCategory",
  async ({ id }, { rejectWithValue }) => {
    try {
      console.log("id => ", id)
      const response = await API.DELETE(`/api/category/${id}`);
      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error);
    }
  }
);

