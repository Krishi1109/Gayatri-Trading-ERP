import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../utils";
import { isAxiosError } from "axios";

// 🔹 Add Payment for a Party Bill
export const addPartyPayment = createAsyncThunk("partyPayment/addPartyPayment", async ({ party_id, bill_id, amount, note }, { rejectWithValue }) => {
  try {
    const response = await API.POST("/api/party_transaction/payment", {
      party_id,
      transaction_module_id: bill_id, // bill id
      amount,
      note,
    });

    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data);
    }
    return rejectWithValue(error);
  }
});

// 🔹 Fetch Payments for a Bill
export const fetchPaymentsByBillId = createAsyncThunk("partyPayment/fetchPaymentsByBillId", async ({ bill_id }, { rejectWithValue }) => {
  try {
    const response = await API.GET(`/api/party_transaction/bill_payments/${bill_id}`);
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data);
    }
    return rejectWithValue(error);
  }
});
