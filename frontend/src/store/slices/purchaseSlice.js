import { createSlice } from "@reduxjs/toolkit";
import { ApiStates } from "../../shared/constants";
import { addPurchaseEntry, fetchPurchaseList, addPurchaseOrderQty } from "../../apis/purchase";

const initialState = {
  purchaseApiStatus: ApiStates.idle,
  purchaseInfo: [],
  purchaseEntryApiStatus: ApiStates.idle,
  addPurchaseOrderQtyApiStatus: ApiStates.idle,
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
      state.addPurchaseOrderQtyApiStatus = ApiStates.idle;
      state.purchaseApiStatus = ApiStates.idle;
      state.purchaseEntryApiStatus = ApiStates.idle;
    },
  },
  extraReducers: (builder) => {
    // Get all the purchase entries
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

    // Add purchase entry
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

    // add purchase order - add purchase order qty
    builder.addCase(addPurchaseOrderQty.pending, (state) => {
      state.addPurchaseOrderQtyApiStatus = ApiStates.pending;
      state.success = "";
      state.error = "";
    });
    builder.addCase(addPurchaseOrderQty.fulfilled, (state, action) => {
      state.addPurchaseOrderQtyApiStatus = ApiStates.success;
      state.error = "";
      state.success = action.payload.message;
    });
    builder.addCase(addPurchaseOrderQty.rejected, (state, action) => {
      state.addPurchaseOrderQtyApiStatus = ApiStates.failed;
      state.error = action.payload.message;
      state.success = "";
    });
  },
});

export default purchaseSlice;
export const { resetPurchaseFields } = purchaseSlice.actions;
