import { createSlice } from "@reduxjs/toolkit";
import { ApiStates } from "../../shared/constants";
import { addBrand, deleteBrand, fetchBrands } from "../../apis/brands";

const initialState = {
  fetchBrandsApiStatus: ApiStates.idle,
  brandInfo: [],
  addBrandApiStatus: ApiStates.idle,
  error: "",
  success: "",
  deleteBrandApiStatus: ApiStates.idle,
};

const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    resetFields: (state) => {
      state.error = "";
      state.addBrandApiStatus = ApiStates.idle;
      state.deleteBrandApiStatus = ApiStates.idle;
      state.success = "";
    },
  },
  extraReducers: (builder) => {
    // Fetch All Brands
    builder.addCase(fetchBrands.pending, (state) => {
      state.fetchBrandsApiStatus = ApiStates.pending;
    });
    builder.addCase(fetchBrands.fulfilled, (state, action) => {
      state.fetchBrandsApiStatus = ApiStates.success;
      state.brandInfo = action.payload;
    });
    builder.addCase(fetchBrands.rejected, (state) => {
      state.fetchBrandsApiStatus = ApiStates.failed;
    });

    // Add brand
    builder.addCase(addBrand.pending, (state) => {
      state.addBrandApiStatus = ApiStates.pending;
      state.error = "";
    });
    builder.addCase(addBrand.fulfilled, (state, action) => {
      state.addBrandApiStatus = ApiStates.success;
      state.success = action.payload.message;
      state.error = "";
    });
    builder.addCase(addBrand.rejected, (state, action) => {
      state.addBrandApiStatus = ApiStates.failed;
      state.error = action.payload.message;
      state.success = "";
    });

    // delete Brand
    builder.addCase(deleteBrand.pending, (state) => {
      state.deleteBrandApiStatus = ApiStates.pending;
      state.success = "";
    });
    builder.addCase(deleteBrand.fulfilled, (state, action) => {
      state.deleteBrandApiStatus = ApiStates.success;
      state.success = action.payload.message;
    });
    builder.addCase(deleteBrand.rejected, (state) => {
      state.deleteBrandApiStatus = ApiStates.failed;
      state.success = "";
    });
  },
});

export default brandSlice;
export const { resetFields } = brandSlice.actions;
