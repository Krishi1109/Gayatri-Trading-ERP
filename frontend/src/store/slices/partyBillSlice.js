import { createSlice } from "@reduxjs/toolkit";
import { ApiStates } from "../../shared/constants";
import { addPartyBill } from "../../apis/partyBill";

const initialState = {
  addPartyBillApiStatus: ApiStates.idle,

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
  },
});

export const { resetFields } = partySlice.actions;
export default partySlice;
