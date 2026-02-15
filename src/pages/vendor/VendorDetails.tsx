"use client";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ShieldCheck,
  Star,
  Briefcase,
  MapPin,
  Clock,
  FileText,
  Phone,
  Mail,
  ExternalLink,
  Download,
  Settings2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

const VendorDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const vendor = {
    businessName: "Royal Plumbing & Repairs",
    ownerName: "Suresh Pillai",
    status: "Active",
    isVerified: true,
    rating: "4.8",
    totalJobs: "142",
    onTimeRate: "98%",
    joinedDate: "Mar 2023",
    email: "contact@royalplumbing.in",
    phone: "+91 91234 56789",
    categories: ["Plumbing", "Water Proofing", "Clogging"],
    earnings: "₹84,200",
    commissionPaid: "₹12,630",
  };

  return (
    <div className="space-y-6 p-4 lg:p-6 max-w-400 mx-auto animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold tracking-tight">
                {vendor.businessName}
              </h2>
              {vendor.isVerified && (
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none px-2 py-0">
                  <ShieldCheck className="w-3 h-3 mr-1" /> PRO
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground font-medium flex items-center gap-1">
              Vendor ID: {id || "VND-001"} • <Clock className="h-3 w-3" />{" "}
              Member since {vendor.joinedDate}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border bg-background">
            <span className="text-xs font-bold uppercase text-muted-foreground">
              Online Status
            </span>
            <Switch checked={vendor.status === "Active"} />
          </div>
          <Button variant="outline" size="sm">
            <Settings2 className="w-4 h-4 mr-2" /> Manage
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT SIDEBAR - Business Identity */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="border-none shadow-sm ring-1 ring-border overflow-hidden">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 rounded-2xl ring-4 ring-muted shadow-sm">
                  <AvatarImage
                    src={`https://avatar.iran.liara.run/username?username=${vendor.businessName}`}
                  />
                  <AvatarFallback className="rounded-2xl bg-primary text-primary-foreground text-2xl font-bold">
                    RP
                  </AvatarFallback>
                </Avatar>
                <h3 className="mt-4 text-lg font-bold">{vendor.ownerName}</h3>
                <p className="text-sm text-muted-foreground">
                  Managing Partner
                </p>

                <div className="flex items-center gap-1 mt-2 text-amber-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-bold text-sm text-foreground">
                    {vendor.rating}
                  </span>
                  <span className="text-xs text-muted-foreground font-medium">
                    (48 reviews)
                  </span>
                </div>
              </div>

              <div className="my-7 space-y-3">
                <Button
                  className="w-full justify-start gap-3"
                  variant="secondary"
                >
                  <Phone className="w-4 h-4" /> {vendor.phone}
                </Button>
                <Button
                  className="w-full justify-start gap-3"
                  variant="secondary"
                >
                  <Mail className="w-4 h-4" /> {vendor.email}
                </Button>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold uppercase text-muted-foreground">
                    KYC Status
                  </span>
                  <Badge className="bg-emerald-100 text-emerald-700 border-none">
                    Verified
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold uppercase text-muted-foreground">
                    Service Area
                  </span>
                  <span className="text-sm font-medium">Bangalore (East)</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Business Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="border-none shadow-sm ring-1 ring-border p-4">
              <p className="text-[10px] font-bold text-muted-foreground uppercase">
                Jobs Done
              </p>
              <p className="text-xl font-bold mt-1 tabular-nums">
                {vendor.totalJobs}
              </p>
            </Card>
            <Card className="border-none shadow-sm ring-1 ring-border p-4">
              <p className="text-[10px] font-bold text-muted-foreground uppercase">
                On-Time
              </p>
              <p className="text-xl font-bold mt-1 tabular-nums text-emerald-600">
                {vendor.onTimeRate}
              </p>
            </Card>
          </div>
        </div>
        
        <div className="lg:col-span-8">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="w-full justify-start h-11 bg-transparent border-b rounded-none px-0 gap-3">
              <TabsTrigger
                value="profile"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none font-bold text-sm"
              >
                Business Profile
              </TabsTrigger>
              <TabsTrigger
                value="kyc"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none font-bold text-sm"
              >
                KYC Documents
              </TabsTrigger>
              <TabsTrigger
                value="payouts"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none font-bold text-sm"
              >
                Earnings
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none font-bold text-sm"
              >
                Reviews
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="mt-6 space-y-6">
              <Card className="border-none shadow-sm ring-1 ring-border">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Briefcase className="w-4 h-4" /> Active Services
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {vendor.categories.map((cat) => (
                    <Badge
                      key={cat}
                      variant="outline"
                      className="text-sm py-1.5 px-3 border-border bg-muted/20"
                    >
                      {cat}
                    </Badge>
                  ))}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary h-8"
                  >
                    + Assign More
                  </Button>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-none shadow-sm ring-1 ring-border">
                  <CardHeader>
                    <CardTitle className="text-base">Working Hours</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {["Monday - Friday", "09:00 AM - 07:00 PM"].map(
                      (text, i) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span
                            className={
                              i === 0 ? "font-bold" : "text-muted-foreground"
                            }
                          >
                            {text}
                          </span>
                        </div>
                      )
                    )}
                  </CardContent>
                </Card>
                <Card className="border-none shadow-sm ring-1 ring-border">
                  <CardHeader>
                    <CardTitle className="text-base">
                      Service Locations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-rose-500" />
                    <p className="text-sm font-medium">
                      HSR Layout, Bellandur, Whitefield, Sarjapur
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="kyc" className="mt-6">
              <Card className="border-none shadow-sm ring-1 ring-border">
                <div className="divide-y">
                  {[
                    {
                      label: "GST Registration",
                      date: "Uploaded 14 Mar 2024",
                      status: "Verified",
                    },
                    {
                      label: "Trade License",
                      date: "Uploaded 15 Mar 2024",
                      status: "Verified",
                    },
                    {
                      label: "Owner Identity (Aadhaar)",
                      date: "Uploaded 14 Mar 2024",
                      status: "Verified",
                    },
                  ].map((doc, idx) => (
                    <div
                      key={idx}
                      className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-primary/5">
                          <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-bold">{doc.label}</p>
                          <p className="text-xs text-muted-foreground">
                            {doc.date}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-emerald-50 text-emerald-600 border-none mr-4">
                          Verified
                        </Badge>
                        <Button variant="ghost" size="icon">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="payouts" className="mt-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-primary text-primary-foreground">
                  <CardContent className="pt-6">
                    <p className="text-xs opacity-70 font-bold uppercase">
                      Net Earnings
                    </p>
                    <p className="text-3xl font-bold mt-2 tabular-nums">
                      {vendor.earnings}
                    </p>
                    <p className="text-[10px] mt-4 opacity-70">
                      After 15% UrbanCrew Commission
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-secondary">
                  <CardContent className="pt-6">
                    <p className="text-xs text-muted-foreground font-bold uppercase">
                      Commission Deducted
                    </p>
                    <p className="text-3xl font-bold mt-2 tabular-nums">
                      {vendor.commissionPaid}
                    </p>
                    <Button variant="link" className="p-0 h-auto text-xs mt-4">
                      View Commission Invoice
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default VendorDetails;
