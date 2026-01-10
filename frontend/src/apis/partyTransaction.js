import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../utils";
import { isAxiosError } from "axios";

/**
 * Fetch Party Transactions By Party ID
 */
export const fetchPartyTransactionsByPartyId = createAsyncThunk(
  "party/fetchPartyTransactionsByPartyId",
  async ({ partyId, page = 1, limit = 10, search = "", startDate = "", endDate = "" }, { rejectWithValue }) => {
    try {
      let query = `?page=${page}&limit=${limit}`;

      if (search) query += `&search=${search}`;
      if (startDate) query += `&startDate=${startDate}`;
      if (endDate) query += `&endDate=${endDate}`;
      console.log(partyId, "ss");
      const response = await API.GET(`/api/party_transaction/${partyId}${query}`);
      console.log(response);

      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error);
    }
  }
);
