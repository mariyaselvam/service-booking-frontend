import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";
import { type Service } from "../../types/service.types";

interface ServiceState {
  list: Service[];
  loading: boolean;
}

const initialState: ServiceState = {
  list: [],
  loading: false,
};

export const fetchServices = createAsyncThunk(
  "services/fetch",
  async () => {
    const res = await api.get<Service[]>("/services");
    return res.data;
  }
);

const serviceSlice = createSlice({
  name: "services",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchServices.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default serviceSlice.reducer;
