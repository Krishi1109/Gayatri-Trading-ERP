import { createSlice } from "@reduxjs/toolkit";
import { ApiStates } from "../../shared/constants";
import { addPartyPayment, fetchPaymentsByBillId } from "../../apis/partyPayment";

const initialState = {
  payments: [],
  addPaymentApiStatus: ApiStates.idle,
  fetchPaymentsApiStatus: ApiStates.idle,
  error: "",
  success: "",
};

const partyPaymentSlice = createSlice({
  name: "partyPayment",
  initialState,
  reducers: {
    resetPaymentState: (state) => {
      state.addPaymentApiStatus = ApiStates.idle;
      state.fetchPaymentsApiStatus = ApiStates.idle;
      state.error = "";
      state.success = "";
      state.payments = [];
    },
  },
  extraReducers: (builder) => {
    // 🔹 Add Payment
    builder.addCase(addPartyPayment.pending, (state) => {
      state.addPaymentApiStatus = ApiStates.pending;
    });
    builder.addCase(addPartyPayment.fulfilled, (state, action) => {
      state.addPaymentApiStatus = ApiStates.success;
      state.success = action.payload.message;
      // Push the new payment to the list
      state.payments.unshift(action.payload.data);
    });
    builder.addCase(addPartyPayment.rejected, (state, action) => {
      state.addPaymentApiStatus = ApiStates.failed;
      state.error = action.payload?.message;
    });

    // 🔹 Fetch Payments
    builder.addCase(fetchPaymentsByBillId.pending, (state) => {
      state.fetchPaymentsApiStatus = ApiStates.pending;
    });
    builder.addCase(fetchPaymentsByBillId.fulfilled, (state, action) => {
      state.fetchPaymentsApiStatus = ApiStates.success;
      state.payments = action.payload.data.payments || [];
      state.billInfo = action.payload.data.bill;
    });
    builder.addCase(fetchPaymentsByBillId.rejected, (state, action) => {
      state.fetchPaymentsApiStatus = ApiStates.failed;
      state.error = action.payload?.message;
    });
  },
});

export const { resetPaymentState } = partyPaymentSlice.actions;
export default partyPaymentSlice;
