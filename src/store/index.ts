import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import serviceReducer from "../features/services/serviceSlice";
import bookingReducer from "../features/bookings/bookingSlice";
import vendorReducer from "../features/vendor/vendorSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    services: serviceReducer,
    bookings: bookingReducer,
    vendor: vendorReducer,
  },
});

// types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
