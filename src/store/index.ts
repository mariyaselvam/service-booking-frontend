import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import serviceReducer from "../features/services/serviceSlice";
import bookingReducer from "../features/bookings/bookingSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    services: serviceReducer,
    bookings: bookingReducer,
  },
});

// types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
