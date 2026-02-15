"use client";
import {
  Mail,
  Phone,
  MapPin,
  Wallet,
  ShoppingBag,
  ShieldCheck,
  Ban,
  Edit3,
  Key,
  Clock,
  ArrowLeft,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

const UserDetails = () => {
  const navigate = useNavigate();
  const user = {
    name: "Rahul Kumar",
    email: "rahul@example.com",
    phone: "+91 98765 43210",
    status: "Active",
    joinedDate: "12 Jan 2024",
    avatar: "https://i.pravatar.cc/150?u=rahul",
    lifetimeSpend: "₹14,500",
    totalBookings: 12,
    cancelledBookings: 1,
    walletBalance: "₹450",
    tier: "Gold Member",
  };

  return (
    <div className="space-y-6 p-4 lg:p-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="h-9 w-9" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Customer Profile
            </h2>
            <p className="text-sm text-muted-foreground">
              Manage and monitor customer activity
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Key className="h-4 w-4" /> Reset Password
          </Button>
          <Button variant="destructive" size="sm" className="gap-2">
            <Ban className="h-4 w-4" /> Suspend Account
          </Button>
          <Button size="sm" className="gap-2 bg-primary">
            <Edit3 className="h-4 w-4" /> Edit Profile
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 space-y-6">
          <Card className="border-none shadow-sm ring-1 ring-border overflow-hidden">
            <div className="h-24 bg-primary/5 border-b" />
            <CardContent className="pt-0 -mt-12 text-center">
              <Avatar className="h-24 w-24 mx-auto ring-4 ring-background shadow-lg">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="text-xl">RK</AvatarFallback>
              </Avatar>
              <div className="mt-4">
                <h3 className="text-xl font-bold">{user.name}</h3>
                <Badge
                  variant="secondary"
                  className="mt-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-50"
                >
                  <ShieldCheck className="w-3 h-3 mr-1" /> {user.status}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8 py-4 border-y border-dashed">
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">
                    Member Since
                  </p>
                  <p className="text-sm font-semibold">{user.joinedDate}</p>
                </div>
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">
                    User Tier
                  </p>
                  <p className="text-sm font-semibold text-primary">
                    {user.tier}
                  </p>
                </div>
              </div>

              <div className="space-y-4 mt-6">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="flex-1 text-left">{user.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="flex-1 text-left">{user.phone}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm ring-1 ring-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                Financial Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">
                    Lifetime Spend
                  </p>
                  <p className="text-2xl font-bold tabular-nums">
                    {user.lifetimeSpend}
                  </p>
                </div>
                <Wallet className="h-8 w-8 text-primary/20" />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Wallet Balance
                </span>
                <span className="font-bold text-emerald-600">
                  {user.walletBalance}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-8">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full justify-start h-12 bg-transparent border-b rounded-none px-0 gap-1">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none font-bold"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="bookings"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none font-bold"
              >
                Bookings
              </TabsTrigger>
              <TabsTrigger
                value="wallet"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none font-bold"
              >
                Wallet Logs
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none font-bold"
              >
                Reviews Given
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-none shadow-sm ring-1 ring-border">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" /> Saved
                      Addresses
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 rounded-lg border bg-muted/30">
                      <p className="text-xs font-bold uppercase text-primary">
                        Home
                      </p>
                      <p className="text-sm mt-1">
                        204, Alpine heights, Whitefield, Bangalore - 560066
                      </p>
                    </div>
                    <div className="p-3 rounded-lg border">
                      <p className="text-xs font-bold uppercase text-muted-foreground">
                        Work
                      </p>
                      <p className="text-sm mt-1">
                        UrbanCrew HQ, Indiranagar, Bangalore - 560038
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm ring-1 ring-border bg-amber-50/30">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Clock className="h-4 w-4 text-amber-600" /> Internal
                      Admin Notes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-amber-900/80 leading-relaxed italic">
                      "Customer is a regular weekend booker. Always prefers
                      morning slots. High value VIP customer, handle support
                      tickets with priority."
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-4 h-8 text-amber-700 hover:bg-amber-100"
                    >
                      Add Note
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-none shadow-sm ring-1 ring-border">
                <CardHeader>
                  <CardTitle className="text-base">
                    Quick Booking Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-secondary/50 border text-center">
                    <p className="text-2xl font-bold">{user.totalBookings}</p>
                    <p className="text-xs text-muted-foreground">
                      Total Bookings
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-center">
                    <p className="text-2xl font-bold text-emerald-700">11</p>
                    <p className="text-xs text-emerald-600">Completed</p>
                  </div>
                  <div className="p-4 rounded-xl bg-rose-50 border border-rose-100 text-center">
                    <p className="text-2xl font-bold text-rose-700">
                      {user.cancelledBookings}
                    </p>
                    <p className="text-xs text-rose-600">Cancelled</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bookings" className="mt-6">
              <Card className="border-none shadow-sm ring-1 ring-border overflow-hidden">
                <div className="p-4 border-b bg-muted/20">
                  <h4 className="font-bold text-sm">Recent Booking History</h4>
                </div>
                <div className="divide-y">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center">
                          <ShoppingBag className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-bold">
                            #BK-992{i} - Deep Home Cleaning
                          </p>
                          <p className="text-xs text-muted-foreground">
                            15 Oct 2024 • ₹1,200 •{" "}
                            <span className="text-emerald-600 font-medium">
                              Paid
                            </span>
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Details <ExternalLink className="h-3 w-3 ml-2" />
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Additional content for other tabs would go here */}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
