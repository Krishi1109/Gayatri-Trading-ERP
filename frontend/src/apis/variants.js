import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../utils";
import { isAxiosError } from "axios";

export const fetchVariants = createAsyncThunk("fetchVariants", async (_, { rejectWithValue }) => {
  try {
    const response = await API.GET(`/api/variant`);
    return response.data.result;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const addVariant = createAsyncThunk("addVariant", async ({ variant }, { rejectWithValue }) => {
  try {
    const response = await API.POST(`/api/variant`, { variant });
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data);
    }
    return rejectWithValue(error);
  }
});

export const deleteVariant = createAsyncThunk("deleteVariant", async ({ id }, { rejectWithValue }) => {
  try {
    const response = await API.DELETE(`/api/variant/${id}`);
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data);
    }
    return rejectWithValue(error);
  }
});
