import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../utils";
import { isAxiosError } from "axios";

export const addPartyBill = createAsyncThunk("addPartyBill", async (values, { rejectWithValue }) => {
  try {
    const response = await API.POST(`/api/party_bill`, values);
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data);
    }
    return rejectWithValue(error);
  }
});
