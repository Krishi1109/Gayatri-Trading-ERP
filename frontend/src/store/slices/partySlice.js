import { createSlice } from "@reduxjs/toolkit";
import { ApiStates } from "../../shared/constants";
import { addParty, fetchParties, fetchPartiesAuto } from "../../apis/party";

const initialState = {
  addPartyApiStatus: ApiStates.idle,
  fetchPartiesApiStatus: ApiStates.idle,
  fetchPartiesAutoApiStatus: ApiStates.idle,

  partyList: [],
  partyListAuto: [],

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
  name: "parties",
  initialState,
  reducers: {
    resetFields: (state) => {
      state.error = "";
      state.addPartyApiStatus = ApiStates.idle;
      state.success = "";
    },
  },
  extraReducers: (builder) => {
    // Add Party
    builder.addCase(addParty.pending, (state) => {
      state.addPartyApiStatus = ApiStates.pending;
    });
    builder.addCase(addParty.fulfilled, (state, action) => {
      state.addPartyApiStatus = ApiStates.success;
      state.success = action.payload.message;
    });
    builder.addCase(addParty.rejected, (state, action) => {
      state.addPartyApiStatus = ApiStates.failed;
      state.error = action.payload?.message;
    });

    // Fetch Parties
    builder.addCase(fetchParties.pending, (state) => {
      state.fetchPartiesApiStatus = ApiStates.pending;
    });

    builder.addCase(fetchParties.fulfilled, (state, action) => {
      state.fetchPartiesApiStatus = ApiStates.success;
      state.partyList = action.payload?.result || [];
      state.pagination = action.payload?.pagination || initialState.pagination;
    });

    builder.addCase(fetchParties.rejected, (state, action) => {
      state.fetchPartiesApiStatus = ApiStates.failed;
      state.error = action.payload;
    });

    // Fetch Parties Auto
    builder.addCase(fetchPartiesAuto.pending, (state) => {
      state.fetchPartiesAutoApiStatus = ApiStates.pending;
    });

    builder.addCase(fetchPartiesAuto.fulfilled, (state, action) => {
      state.fetchPartiesAutoApiStatus = ApiStates.success;
      state.partyListAuto = action.payload?.result || [];
      state.pagination = action.payload?.pagination || initialState.pagination;
    });

    builder.addCase(fetchPartiesAuto.rejected, (state, action) => {
      state.fetchPartiesAutoApiStatus = ApiStates.failed;
      state.error = action.payload;
    });
  },
});

export const { resetFields } = partySlice.actions;
export default partySlice;
