import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../utils";

export const fetchPurchaseList = createAsyncThunk("fetchPurchaseList", async (_, { rejectWithValue }) => {
  try {
    const response = await API.GET(`/api/purchase`);
    return response.data.result;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const addPurchaseEntry = createAsyncThunk("addPurchaseEntry", async (values, { rejectWithValue }) => {
  try {
    const response = await API.POST(`/api/purchase`, values);
    return response.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const addPurchaseOrderQty = createAsyncThunk("addPurchaseOrderQty", async ({ id, values }, { rejectWithValue }) => {
  try {
    console.log(values)
    const response = await API.PUT(`/api/purchase/${id}`, values);
    return response.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
