import { createSlice } from "@reduxjs/toolkit";
import { ApiStates } from "../../shared/constants";
import { addUnit, deleteUnit, fetchUnits } from "../../apis/unit";

const initialState = {
  fetchUnitsApiStatus: ApiStates.idle,
  variantInfo: [],
  addUnitApiStatus: ApiStates.idle,
  error: "",
  success: "",
  deleteUnitApiStatus: ApiStates.idle,
};

const unitSlice = createSlice({
  name: "unit",
  initialState,
  reducers: {
    resetUnitFields: (state) => {
      state.error = "";
      state.addUnitApiStatus = ApiStates.idle;
      state.deleteUnitApiStatus = ApiStates.idle;
      state.success = "";
    },
  },
  extraReducers: (builder) => {
    // Fetch All Units
    builder.addCase(fetchUnits.pending, (state) => {
      state.fetchUnitsApiStatus = ApiStates.pending;
    });
    builder.addCase(fetchUnits.fulfilled, (state, action) => {
      state.fetchUnitsApiStatus = ApiStates.success;
      state.unitInfo = action.payload;
    });
    builder.addCase(fetchUnits.rejected, (state) => {
      state.fetchUnitsApiStatus = ApiStates.failed;
    });

    // Add Unit
    builder.addCase(addUnit.pending, (state) => {
      state.addUnitApiStatus = ApiStates.pending;
      state.error = "";
    });
    builder.addCase(addUnit.fulfilled, (state, action) => {
      state.addUnitApiStatus = ApiStates.success;
      state.success = action.payload.message;
      state.error = "";
    });
    builder.addCase(addUnit.rejected, (state, action) => {
      state.addUnitApiStatus = ApiStates.failed;
      state.error = action.payload.message;
      state.success = "";
    });

    // delete Unit
    builder.addCase(deleteUnit.pending, (state) => {
      state.deleteUnitApiStatus = ApiStates.pending;
      state.success = "";
    });
    builder.addCase(deleteUnit.fulfilled, (state, action) => {
      state.deleteUnitApiStatus = ApiStates.success;
      state.success = action.payload.message;
    });
    builder.addCase(deleteUnit.rejected, (state) => {
      state.deleteUnitApiStatus = ApiStates.failed;
      state.success = "";
    });
  },
});

export default unitSlice;
export const { resetUnitFields } = unitSlice.actions;
