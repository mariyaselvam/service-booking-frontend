import { lazy } from "react";
import { Route } from "react-router-dom";
import AdminLayout from "@/layouts/AdminLayout";
import UserList from "@/pages/user/UserList";
import UserDetails from "@/pages/user/UserDetails";
import Vendor from "@/pages/vendor/Vendor";
import Services from "@/pages/services/Services";
import BookingManagement from "@/pages/bookings/Bookings";
import FinancePayouts from "@/pages/FinanceAndPayouts/FinancePayouts";
import ReviewsRatings from "@/pages/ReviewsRatings/ReviewsRatings";
import NotificationManagement from "@/pages/Notifications/Notifications";
import SystemSettings from "@/pages/Settings/Settings";

const Dashboard = lazy(() => import("@/pages/dashboard/Dashboard"));

export const adminRoutes = (
  <Route path="/admin" element={<AdminLayout />}>
    <Route path="dashboard" element={<Dashboard />} />

    <Route path="users">
      <Route index element={<UserList />} />
      <Route path=":id" element={<UserDetails />} />
    </Route>

    <Route path="vendors">
      <Route index element={<Vendor />} />
      <Route path=":id" element={<UserDetails />} />
    </Route>

    <Route path="services">
      <Route index element={<Services />} />
      <Route path=":id" element={<UserDetails />} />
    </Route>

    <Route path="bookings">
      <Route index element={<BookingManagement />} />
      <Route path=":id" element={<UserDetails />} />
    </Route>

    <Route path="financepayouts">
      <Route index element={<FinancePayouts />} />
      <Route path=":id" element={<UserDetails />} />
    </Route>

    <Route path="reviews">
      <Route index element={<ReviewsRatings />} />
      <Route path=":id" element={<UserDetails />} />
    </Route>

    <Route path="notifications">
      <Route index element={<NotificationManagement />} />
      <Route path=":id" element={<UserDetails />} />
    </Route>

        <Route path="settings">
      <Route index element={<SystemSettings />} />
      <Route path=":id" element={<UserDetails />} />
    </Route>


  </Route>
);
