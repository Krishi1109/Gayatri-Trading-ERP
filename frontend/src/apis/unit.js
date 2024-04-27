import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../utils";
import { isAxiosError } from "axios";

export const fetchUnits = createAsyncThunk("fetchUnits", async (_, { rejectWithValue }) => {
  try {
    const response = await API.GET(`/api/unit`);
    return response.data.result;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const addUnit = createAsyncThunk("addUnit", async ({ unit }, { rejectWithValue }) => {
  try {
    const response = await API.POST(`/api/unit`, { unit });
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data);
    }
    return rejectWithValue(error);
  }
});

export const deleteUnit = createAsyncThunk("deleteUnit", async ({ id }, { rejectWithValue }) => {
  try {
    const response = await API.DELETE(`/api/unit/${id}`);
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data);
    }
    return rejectWithValue(error);
  }
});
