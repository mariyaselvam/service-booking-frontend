"use client";

import {
  Home,
  Users,
  Wrench,
  Package,
  ClipboardList,
  IndianRupee,
  Star,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import Logo from '../../assets/logo/ChatGPT Image Jan 16, 2026, 02_56_43 PM.png';

const sidebarItems = [
  { label: "Dashboard", icon: Home, href: "/admin/dashboard" },
  { label: "Users", icon: Users, href: "/admin/users" },
  { label: "Vendors", icon: Wrench, href: "/admin/vendors" },
  { label: "Services", icon: Package, href: "/admin/services" },
  { label: "Bookings", icon: ClipboardList, href: "/admin/bookings" },
  {
    label: "Payments & Commission",
    icon: IndianRupee,
    href: "/admin/FinancePayouts",
  },
  { label: "Reviews", icon: Star, href: "/admin/reviews" },
  { label: "Notifications", icon: Bell, href: "/admin/notifications" },
  { label: "Settings", icon: Settings, href: "/admin/settings" },
];

export default function AdminSidebar() {
  return (
    <aside className="h-screen w-64 border-r bg-background flex flex-col sticky top-0">
      <div className="h-16 flex items-center px-6 border-b">
        <img className="m-auto" width="170px" src={Logo} alt="UrbanCrew Logo" />
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {sidebarItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.href}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium group",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20" 
                  : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon 
                  className={cn(
                    "h-5 w-5",
                    isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-secondary-foreground"
                  )} 
                />
                <span>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t">
        <Button variant="outline" className="w-full gap-2">
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
}