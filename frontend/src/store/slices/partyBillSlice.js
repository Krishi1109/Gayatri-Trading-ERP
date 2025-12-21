import { createSlice } from "@reduxjs/toolkit";
import { ApiStates } from "../../shared/constants";
import { addPartyBill, fetchPartyBillsByPartyId } from "../../apis/partyBill";

const initialState = {
  // existing
  addPartyBillApiStatus: ApiStates.idle,
  fetchPartiesApiStatus: ApiStates.idle,

  partyList: [],

  // 🔥 NEW: Party Bills
  fetchPartyBillsApiStatus: ApiStates.idle,
  partyBillsById: [],

  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  },

  error: "",
  success: "",
};

const partySlice = createSlice({
  name: "partyBills",
  initialState,
  reducers: {
    resetFields: (state) => {
      state.error = "";
      state.addPartyBillApiStatus = ApiStates.idle;
      state.success = "";
    },
  },
  extraReducers: (builder) => {
    // Add Party
    builder.addCase(addPartyBill.pending, (state) => {
      state.addPartyBillApiStatus = ApiStates.pending;
    });
    builder.addCase(addPartyBill.fulfilled, (state, action) => {
      state.addPartyBillApiStatus = ApiStates.success;
      state.success = action.payload.message;
    });
    builder.addCase(addPartyBill.rejected, (state, action) => {
      state.addPartyBillApiStatus = ApiStates.failed;
      state.error = action.payload?.message;
    });

    // Fetch Party Bills By Party ID
    builder.addCase(fetchPartyBillsByPartyId.pending, (state) => {
      state.fetchPartyBillsApiStatus = ApiStates.pending;
    });

    builder.addCase(fetchPartyBillsByPartyId.fulfilled, (state, action) => {
      state.fetchPartyBillsApiStatus = ApiStates.success;
      state.partyBillsById = action.payload?.data || [];
      state.pagination = action.payload?.pagination || initialState.pagination;
    });

    builder.addCase(fetchPartyBillsByPartyId.rejected, (state, action) => {
      state.fetchPartyBillsApiStatus = ApiStates.failed;
      state.error = action.payload?.message;
    });
  },
});

export const { resetFields } = partySlice.actions;
export default partySlice;
