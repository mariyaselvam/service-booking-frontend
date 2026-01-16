"use client";

import { Menu } from "lucide-react";
import AdminSidebar from "@/components/sidebar/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Outlet, useLocation } from "react-router-dom"; // Added useLocation

// We need the labels here to match them with the path
const sidebarItems = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Users", href: "/admin/users" },
  { label: "Vendors", href: "/admin/vendors" },
  { label: "Services", href: "/admin/services" },
  { label: "Bookings", href: "/admin/bookings" },
  { label: "Payments & Commission", href: "/admin/FinancePayouts" },
  { label: "Reviews", href: "/admin/reviews" },
  { label: "Notifications", href: "/admin/notifications" },
  { label: "Settings", href: "/admin/settings" },
];

export default function AdminLayout() {
  const location = useLocation();

  // Find the label based on current path
  const currentItem = sidebarItems.find((item) => item.href === location.pathname);
  const pageTitle = currentItem ? currentItem.label : "Admin";

  return (
    <div className="min-h-screen flex bg-muted/40">
      {/* Sidebar Desktop */}
      <div className="hidden md:block">
        <AdminSidebar />
      </div>

      <div className="flex-1 flex flex-col h-screen">
        <header className="h-16 border-b bg-background flex items-center px-4 md:px-6 gap-4 sticky top-0 z-10">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64 border-none">
              <AdminSidebar />
            </SheetContent>
          </Sheet>

          {/* Dynamic Title */}
          <h1 className="text-lg font-bold tracking-tight text-foreground transition-all">
            {pageTitle}
          </h1>

          {/* Right side profile info */}
          <div className="ml-auto flex items-center gap-3">
            <div className="flex flex-col items-end hidden sm:flex">
              <span className="text-sm font-semibold leading-none">Super Admin</span>
              <span className="text-[10px] text-muted-foreground uppercase mt-1">UrbanCrew Team</span>
            </div>
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold ring-2 ring-background">
              AD
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth">
          <div className="p-4 lg:p-1 max-w-[1600px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}