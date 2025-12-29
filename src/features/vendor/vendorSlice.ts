import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";
import type { AxiosError } from "axios";

interface VendorState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: VendorState = {
  loading: false,
  error: null,
  success: false,
};

export const registerVendorThunk = createAsyncThunk(
  "vendor/register",
  async (
    data: {
      email: string;
      password: string;
      businessName: string;
      phone: string;
      city: string;
      serviceType: string;
      basePrice: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.post("/vendor/register", data);
      return res.data;  
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return rejectWithValue(err.response?.data.message);
    }
  }
);

const vendorSlice = createSlice({
  name: "vendor",
  initialState,
  reducers: {
    resetVendorState(state) {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerVendorThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerVendorThunk.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerVendorThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetVendorState } = vendorSlice.actions;
export default vendorSlice.reducer;
