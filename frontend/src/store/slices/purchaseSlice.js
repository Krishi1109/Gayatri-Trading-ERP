import { createSlice } from "@reduxjs/toolkit";
import { ApiStates } from "../../shared/constants";
import {
  addPurchaseEntry,
  fetchPurchaseList,
  addPurchaseOrderQty,
  fetchPurchaseAnalysisByStatus,
  fetchPurchaseAmountByMonth,
  fetchPurchaseAmountByBrand,
} from "../../apis/purchase";

const initialState = {
  purchaseApiStatus: ApiStates.idle,
  purchaseInfo: [],
  purchaseEntryApiStatus: ApiStates.idle,
  addPurchaseOrderQtyApiStatus: ApiStates.idle,
  purchaseAnalysisByStatusApiStatus: ApiStates.idle,
  purchaseTotalAmountByMonthApiStatus: ApiStates.idle,
  purchaseTotalAmountByBrandApiStatus: ApiStates.idle,
  purchaseAnalysisByStatusData: [],
  purchaseAmountByMonthData: [],
  purchaseTotalAmountByBrandData: [],
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

    // Purchase analysis for the landing page - Dash board
    builder.addCase(fetchPurchaseAnalysisByStatus.pending, (state) => {
      state.purchaseAnalysisByStatusApiStatus = ApiStates.pending;
      state.error = "";
      state.success = "";
    });
    builder.addCase(fetchPurchaseAnalysisByStatus.fulfilled, (state, action) => {
      state.purchaseAnalysisByStatusApiStatus = ApiStates.success;
      state.purchaseAnalysisByStatusData = action.payload;
    });
    builder.addCase(fetchPurchaseAnalysisByStatus.rejected, (state, action) => {
      state.purchaseAnalysisByStatusApiStatus = ApiStates.failed;
      state.error = action.payload?.message;
      state.success = "";
    });

    // Purchase total amount monthly - Dash board line graph
    builder.addCase(fetchPurchaseAmountByMonth.pending, (state) => {
      state.purchaseTotalAmountByMonthApiStatus = ApiStates.pending;
      state.error = "";
      state.success = "";
    });
    builder.addCase(fetchPurchaseAmountByMonth.fulfilled, (state, action) => {
      state.purchaseTotalAmountByMonthApiStatus = ApiStates.success;
      state.purchaseAmountByMonthData = action.payload;
    });
    builder.addCase(fetchPurchaseAmountByMonth.rejected, (state, action) => {
      state.purchaseTotalAmountByMonthApiStatus = ApiStates.failed;
      state.error = action.payload?.message;
      state.success = "";
    });

    // Purchase total amount by Brand - Dash board pie graph
    builder.addCase(fetchPurchaseAmountByBrand.pending, (state) => {
      state.purchaseTotalAmountByBrandApiStatus = ApiStates.pending;
      state.error = "";
      state.success = "";
    });
    builder.addCase(fetchPurchaseAmountByBrand.fulfilled, (state, action) => {
      state.purchaseTotalAmountByBrandApiStatus = ApiStates.success;
      state.purchaseTotalAmountByBrandData = action.payload;
    });
    builder.addCase(fetchPurchaseAmountByBrand.rejected, (state, action) => {
      state.purchaseTotalAmountByBrandApiStatus = ApiStates.failed;
      state.error = action.payload?.message;
      state.success = "";
    });
  },
});

export default purchaseSlice;
export const { resetPurchaseFields } = purchaseSlice.actions;
