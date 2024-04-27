import { createSlice } from "@reduxjs/toolkit";
import { ApiStates } from "../../shared/constants";
import { addVariant, deleteVariant, fetchVariants } from "../../apis/variants";

const initialState = {
  fetchVariantsApiStatus: ApiStates.idle,
  variantInfo: [],
  addVariantApiStatus: ApiStates.idle,
  error: "",
  success: "",
  deleteVariantApiStatus: ApiStates.idle,
};

const variantSlice = createSlice({
  name: "variant",
  initialState,
  reducers: {
    resetVariantFields: (state) => {
      state.error = "";
      state.addVariantApiStatus = ApiStates.idle;
      state.success = "";
    },
  },
  extraReducers: (builder) => {
    // Fetch All Brands
    builder.addCase(fetchVariants.pending, (state) => {
      state.fetchVariantsApiStatus = ApiStates.pending;
    });
    builder.addCase(fetchVariants.fulfilled, (state, action) => {
      state.fetchVariantsApiStatus = ApiStates.success;
      state.variantInfo = action.payload;
    });
    builder.addCase(fetchVariants.rejected, (state) => {
      state.fetchVariantsApiStatus = ApiStates.failed;
    });

    // Add brand
    builder.addCase(addVariant.pending, (state) => {
      state.addVariantApiStatus = ApiStates.pending;
      state.error = "";
    });
    builder.addCase(addVariant.fulfilled, (state, action) => {
      state.addVariantApiStatus = ApiStates.success;
      state.success = action.payload.message;
      state.error = "";
    });
    builder.addCase(addVariant.rejected, (state, action) => {
      state.addVariantApiStatus = ApiStates.failed;
      state.error = action.payload.message;
      state.success = "";
    });

    // delete Brand
    builder.addCase(deleteVariant.pending, (state) => {
      state.deleteVariantApiStatus = ApiStates.pending;
      state.success = "";
    });
    builder.addCase(deleteVariant.fulfilled, (state, action) => {
      state.deleteVariantApiStatus = ApiStates.success;
      state.success = action.payload.message;
    });
    builder.addCase(deleteVariant.rejected, (state) => {
      state.deleteVariantApiStatus = ApiStates.failed;
      state.success = "";
    });
  },
});

export default variantSlice;
export const { resetVariantFields } = variantSlice.actions;
