import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../utils";
import { isAxiosError } from "axios";

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
    const response = await API.PUT(`/api/purchase/${id}`, values);
    return response.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const fetchPurchaseAnalysisByStatus = createAsyncThunk("fetchPurchaseAnalysisByStatus", async (year, { rejectWithValue }) => {
  try {
    const response = await API.GET(`/api/purchase/analysis/purchase-order-amount`, year);
    return response.data.result;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const fetchPurchaseAmountByMonth = createAsyncThunk("fetchPurchaseAmountByMonth", async (_, { rejectWithValue }) => {
  try {
    const response = await API.GET(`/api/purchase/analysis/purchase-amount-monthly`);
    return response.data.result;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const fetchPurchaseAmountByBrand = createAsyncThunk("fetchPurchaseAmountByBrand", async (_, { rejectWithValue }) => {
  try {
    const response = await API.GET(`/api/purchase/analysis/brand-purchase-amount`);
    return response.data.result;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const deletePurchaseEntry = createAsyncThunk("deletePurchaseEntry", async ({ id }, { rejectWithValue }) => {
  try {
    console.log(id, "hello");
    const response = await API.DELETE(`/api/purchase/delete/${id}`);
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data);
    }
    return rejectWithValue(error);
  }
});
