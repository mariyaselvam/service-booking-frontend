import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";
import { type Booking } from "../../types/booking.types";

interface BookingState {
  myBookings: Booking[];
  loading: boolean;
}

const initialState: BookingState = {
  myBookings: [],
  loading: false,
};

export const fetchMyBookings = createAsyncThunk(
  "bookings/my",
  async () => {
    const res = await api.get<Booking[]>("/bookings/my");
    return res.data;
  }
);

const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchMyBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyBookings.fulfilled, (state, action) => {
        state.myBookings = action.payload;
        state.loading = false;
      })
      .addCase(fetchMyBookings.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default bookingSlice.reducer;
