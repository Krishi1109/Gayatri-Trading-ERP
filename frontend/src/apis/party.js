import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../utils";
import { isAxiosError } from "axios";

export const addParty = createAsyncThunk("addParty", async (values, { rejectWithValue }) => {
  try {
    const response = await API.POST(`/api/party`, values);
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data);
    }
    return rejectWithValue(error);
  }
});

export const fetchParties = createAsyncThunk("party/fetchParties", async ({ page = 1, limit = 10, search = "" }, { rejectWithValue }) => {
  try {
    const response = await API.GET(`/api/party?page=${page}&limit=${limit}&search=${search}`);

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const fetchPartiesAuto = createAsyncThunk("parties/fetchParties", async ({ search = "", page = 1, limit = 10 }, thunkAPI) => {
  try {
    const res = await API.GET(`/api/party/auto?search=${search}&page=${page}&limit=${limit}`);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});
