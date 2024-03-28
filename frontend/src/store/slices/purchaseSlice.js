import { createSlice } from "@reduxjs/toolkit";
import { ApiStates } from "../../shared/constants";
import { addPurchaseEntry, fetchPurchaseList } from "../../apis/purchase";

const initialState = {
  purchaseApiStatus: ApiStates.idle,
  purchaseInfo: [],
  purchaseEntryApiStatus: ApiStates.idle,
  success: "",
  error: "",
};

const purchaseSlice = createSlice({
  name: "purchase",
  initialState,
  reducers: {
    resetPurchaseFields: (state) => {
      state.error = "";
      state.success = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPurchaseList.pending, (state) => {
        state.purchaseApiStatus = ApiStates.pending;
      })
      .addCase(fetchPurchaseList.fulfilled, (state, action) => {
        state.purchaseApiStatus = ApiStates.success;
        state.purchaseInfo = action.payload;
      })
      .addCase(fetchPurchaseList.rejected, (state) => {
        state.purchaseApiStatus = ApiStates.failed;
      });

    builder.addCase(addPurchaseEntry.pending, (state) => {
      state.purchaseEntryApiStatus = ApiStates.pending;
      state.success = "";
      state.error = "";
    });
    builder.addCase(addPurchaseEntry.fulfilled, (state, action) => {
      state.purchaseEntryApiStatus = ApiStates.success;
      state.error = "";
      state.success = action.payload.message;
    });
    builder.addCase(addPurchaseEntry.rejected, (state, action) => {
      state.purchaseEntryApiStatus = ApiStates.failed;
      state.error = action.payload.message;
      state.success = "";
    });
  },
});

export default purchaseSlice;
