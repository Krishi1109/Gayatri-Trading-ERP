import { createSlice } from "@reduxjs/toolkit";
import { ApiStates } from "../../shared/constants";
import { addParty } from "../../apis/party";

const initialState = {
  addPartyApiStatus: ApiStates.idle,
  error: "",
  success: "",
};

const partySlice = createSlice({
  name: "party",
  initialState,
  reducers: {
    resetFields: (state) => {
      state.error = "";
      state.addPartyApiStatus = ApiStates.idle;
      state.success = "";
    },
  },
  extraReducers: (builder) => {
    // Add party
    builder.addCase(addParty.pending, (state) => {
      state.addPartyApiStatus = ApiStates.pending;
      state.error = "";
    });
    builder.addCase(addParty.fulfilled, (state, action) => {
      state.addPartyApiStatus = ApiStates.success;
      state.success = action.payload.message;
      state.error = "";
    });
    builder.addCase(addParty.rejected, (state, action) => {
      state.addPartyApiStatus = ApiStates.failed;
      state.error = action.payload.message;
      state.success = "";
    });
  },
});

export default partySlice;
export const { resetFields } = partySlice.actions;
