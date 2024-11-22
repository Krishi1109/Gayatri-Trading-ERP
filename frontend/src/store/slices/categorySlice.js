import { createSlice } from "@reduxjs/toolkit";
import { ApiStates } from "../../shared/constants";
import { addCategory, deleteCategory, fetchCategories } from "../../apis/categories";

const initialState = {
  fetchCategoryApiStatus: ApiStates.idle,
  categoryInto: [],
  addCategoryApiStatus: ApiStates.idle,
  error: "",
  success: "",
  deleteCategoryApiStatus: ApiStates.idle,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    resetFields: (state) => {
      state.error = "";
      state.addCategoryApiStatus = ApiStates.idle;
      state.deleteCategoryApiStatus = ApiStates.idle;
      state.success = "";
    },
  },
  extraReducers: (builder) => {
    // Fetch All Category
    builder.addCase(fetchCategories.pending, (state) => {
      state.fetchCategoryApiStatus = ApiStates.pending;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.fetchCategoryApiStatus = ApiStates.success;
      state.categoryInto = action.payload;
    });
    builder.addCase(fetchCategories.rejected, (state) => {
      state.fetchCategoryApiStatus = ApiStates.failed;
    });

    // Add category
    builder.addCase(addCategory.pending, (state) => {
      state.addCategoryApiStatus = ApiStates.pending;
      state.error = "";
    });
    builder.addCase(addCategory.fulfilled, (state, action) => {
      state.addCategoryApiStatus = ApiStates.success;
      state.success = action.payload.message;
      state.error = "";
    });
    builder.addCase(addCategory.rejected, (state, action) => {
      state.addCategoryApiStatus = ApiStates.failed;
      state.error = action.payload.message;
      state.success = "";
    });

    // delete Category
    builder.addCase(deleteCategory.pending, (state) => {
      state.deleteCategoryApiStatus = ApiStates.pending;
      state.success = "";
    });
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.deleteCategoryApiStatus = ApiStates.success;
      state.success = action.payload.message;
    });
    builder.addCase(deleteCategory.rejected, (state) => {
      state.deleteCategoryApiStatus = ApiStates.failed;
      state.success = "";
    });
  },
});

export default categorySlice;
export const { resetFields } = categorySlice.actions;
