import { createSlice } from "@reduxjs/toolkit";
import { ApiStates } from "../../shared/constants";
import { fetchPartyTransactionsByPartyId } from "../../apis/partyTransaction";

const initialState = {
  // 🔥 Party Transactions
  fetchPartyTransactionsApiStatus: ApiStates.idle,
  partyTransactionsById: [],

  summary: {
    totalAmount: 0,
  },

  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  },

  error: "",
};

const partyTransactionsSlice = createSlice({
  name: "partyTransactions",
  initialState,
  reducers: {
    resetPartyTransactionsFields: (state) => {
      state.error = "";
      state.fetchPartyTransactionsApiStatus = ApiStates.idle;
      state.partyTransactionsById = [];
      state.summary = { totalAmount: 0 };
      state.pagination = initialState.pagination;
    },
  },
  extraReducers: (builder) => {
    // Fetch Party Transactions By Party ID
    builder.addCase(fetchPartyTransactionsByPartyId.pending, (state) => {
      state.fetchPartyTransactionsApiStatus = ApiStates.pending;
    });

    builder.addCase(fetchPartyTransactionsByPartyId.fulfilled, (state, action) => {
      state.fetchPartyTransactionsApiStatus = ApiStates.success;
      state.partyTransactionsById = action.payload?.result || [];
      state.summary = action.payload?.summary || initialState.summary;
      state.pagination = action.payload?.pagination || initialState.pagination;
    });

    builder.addCase(fetchPartyTransactionsByPartyId.rejected, (state, action) => {
      state.fetchPartyTransactionsApiStatus = ApiStates.failed;
      state.error = action.payload?.message;
    });
  },
});

export const { resetPartyTransactionsFields } = partyTransactionsSlice.actions;

export default partyTransactionsSlice;
