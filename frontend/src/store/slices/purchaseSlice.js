import { createSlice } from "@reduxjs/toolkit";
import { ApiStates } from "../../shared/constants";
import { fetchPurchaseList } from "../../apis/purchase";

const initialState = {
  purchaseApiStatus: ApiStates.idle,
  purchaseInfo: [],
};

const purchaseSlice = createSlice({
  name: "purchase",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPurchaseList.pending, (state) => {
        state.purchaseApiStatus = ApiStates.pending;
      })
      .addCase(fetchPurchaseList.fulfilled, (state, action) => {
        (state.purchaseApiStatus = ApiStates.success);
          (state.purchaseInfo = action.payload);
      })
      .addCase(fetchPurchaseList.rejected, (state) => {
        state.purchaseApiStatus = ApiStates.failed;
      });
  },
});

export default purchaseSlice;
