import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiStates, BASEURL } from "../../shared/constants";

const initialState = {
  demo: [],
  isDemoApiStatus: ApiStates.idle,
};

export const isDemo = createAsyncThunk("isDemo", async () => {
  try {
    const response = await axios.get(`${BASEURL}/api/user/demo`);
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
});

const demoSlice = createSlice({
  name: "demo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(isDemo.pending, (state) => {
      state.isDemoApiStatus = ApiStates.pending;
    });
    builder.addCase(isDemo.fulfilled, (state, action) => {
      state.isDemoApiStatus = ApiStates.success;
      state.demo = action.payload;
    });
    builder.addCase(isDemo.rejected, (state) => {
      state.isDemoApiStatus = ApiStates.failed;
    });
  },
});

export default demoSlice;
