import React, { useState, useMemo } from "react";
import {
  Search,
  Download,
  Plus,
  MapPin,
  Star,
  ShieldCheck,
  MoreHorizontal,
  CheckCircle,
  Clock,
  XCircle,
  FileText,
  Settings,
  Ban,
  type LucideIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type VerificationStatus = "Verified" | "Pending" | "Rejected";
type ServiceCategory = "Plumbing" | "Electrician" | "Cleaning" | "Painting";

interface Vendor {
  id: number;
  businessName: string;
  ownerName: string;
  email: string;
  category: ServiceCategory;
  verificationStatus: VerificationStatus;
  rating: number;
  totalEarnings: number;
  location: string;
  avatar: string | null;
}

const mockVendors: Vendor[] = [
  {
    id: 1,
    businessName: "Kumar Plumbing Services",
    ownerName: "Rajesh Kumar",
    email: "rajesh@kumarplumbing.com",
    category: "Plumbing",
    verificationStatus: "Verified",
    rating: 4.8,
    totalEarnings: 245680,
    location: "Chennai, TN",
    avatar: null,
  },
  {
    id: 2,
    businessName: "Sparkle Home Cleaning",
    ownerName: "Priya Sharma",
    email: "priya@sparkleclean.in",
    category: "Cleaning",
    verificationStatus: "Verified",
    rating: 4.9,
    totalEarnings: 189540,
    location: "Mumbai, MH",
    avatar: null,
  },
  {
    id: 3,
    businessName: "ElectroFix Solutions",
    ownerName: "Amit Patel",
    email: "amit@electrofix.com",
    category: "Electrician",
    verificationStatus: "Pending",
    rating: 4.6,
    totalEarnings: 156320,
    location: "Ahmedabad, GJ",
    avatar: null,
  },
  {
    id: 4,
    businessName: "Rainbow Painters",
    ownerName: "Suresh Reddy",
    email: "suresh@rainbowpainters.in",
    category: "Painting",
    verificationStatus: "Verified",
    rating: 4.7,
    totalEarnings: 312450,
    location: "Hyderabad, TS",
    avatar: null,
  },
  {
    id: 5,
    businessName: "QuickFix Plumbers",
    ownerName: "Dinesh Singh",
    email: "dinesh@quickfixplumbers.com",
    category: "Plumbing",
    verificationStatus: "Verified",
    rating: 4.5,
    totalEarnings: 198760,
    location: "Delhi, DL",
    avatar: null,
  },
  {
    id: 6,
    businessName: "Shine & Clean Co.",
    ownerName: "Neha Gupta",
    email: "neha@shineandclean.in",
    category: "Cleaning",
    verificationStatus: "Rejected",
    rating: 3.8,
    totalEarnings: 45230,
    location: "Bangalore, KA",
    avatar: null,
  },
  {
    id: 7,
    businessName: "PowerLine Electricals",
    ownerName: "Vikram Rao",
    email: "vikram@powerline.com",
    category: "Electrician",
    verificationStatus: "Verified",
    rating: 4.9,
    totalEarnings: 278940,
    location: "Pune, MH",
    avatar: null,
  },
  {
    id: 8,
    businessName: "Perfect Paint Studio",
    ownerName: "Arun Kumar",
    email: "arun@perfectpaint.in",
    category: "Painting",
    verificationStatus: "Pending",
    rating: 4.4,
    totalEarnings: 167890,
    location: "Kochi, KL",
    avatar: null,
  },
  {
    id: 9,
    businessName: "Home Care Cleaning",
    ownerName: "Lakshmi Iyer",
    email: "lakshmi@homecare.in",
    category: "Cleaning",
    verificationStatus: "Verified",
    rating: 4.8,
    totalEarnings: 223450,
    location: "Chennai, TN",
    avatar: null,
  },
  {
    id: 10,
    businessName: "Expert Electricians Hub",
    ownerName: "Manoj Verma",
    email: "manoj@expertelec.com",
    category: "Electrician",
    verificationStatus: "Verified",
    rating: 4.7,
    totalEarnings: 201340,
    location: "Jaipur, RJ",
    avatar: null,
  },
];

const VendorManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredVendors = useMemo<Vendor[]>(() => {
    return mockVendors.filter((vendor) => {
      const matchesSearch =
        vendor.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        categoryFilter === "all" || vendor.category === categoryFilter;
      const matchesStatus =
        statusFilter === "all" || vendor.verificationStatus === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchTerm, categoryFilter, statusFilter]);

  const getVerificationBadge = (status: VerificationStatus) => {
    const variants: Record<
      VerificationStatus,
      { icon: LucideIcon; className: string }
    > = {
      Verified: {
        icon: CheckCircle,
        className: "bg-green-50 text-green-700 ring-1 ring-green-600/20",
      },
      Pending: {
        icon: Clock,
        className: "bg-yellow-50 text-yellow-700 ring-1 ring-yellow-600/20",
      },
      Rejected: {
        icon: XCircle,
        className: "bg-red-50 text-red-700 ring-1 ring-red-600/20",
      },
    };

    const config = variants[status];
    const Icon = config.icon;

    return (
      <Badge className={`${config.className} border-0 font-medium`}>
        <Icon className="w-3 h-3 mr-1" />
        {status}
      </Badge>
    );
  };

  const getCategoryBadge = (category: ServiceCategory) => {
    const colors: Record<ServiceCategory, string> = {
      Plumbing: "bg-blue-50 text-blue-700 ring-1 ring-blue-600/20",
      Electrician: "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20",
      Cleaning: "bg-purple-50 text-purple-700 ring-1 ring-purple-600/20",
      Painting: "bg-pink-50 text-pink-700 ring-1 ring-pink-600/20",
    };

    return (
      <Badge className={`${colors[category]} border-0 font-medium`}>
        {category}
      </Badge>
    );
  };

  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleExportCSV = (): void => {
    console.log("Exporting CSV...");
  };

  const handleAddVendor = (): void => {
    console.log("Adding new vendor...");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="space-y-6">

        <div className="bg-white rounded-lg ring-1 ring-slate-200 p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name, business name, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Service Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Plumbing">Plumbing</SelectItem>
                <SelectItem value="Electrician">Electrician</SelectItem>
                <SelectItem value="Cleaning">Cleaning</SelectItem>
                <SelectItem value="Painting">Painting</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Verification Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Verified">Verified</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-3">
              <button
                onClick={handleExportCSV}
                className="inline-flex items-center px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </button>
              <button
                onClick={handleAddVendor}
                className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-primary transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Vendor
              </button>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-lg ring-1 ring-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Vendor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Verification
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Earnings
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredVendors.map((vendor) => (
                  <tr
                    key={vendor.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={vendor.avatar!}
                            alt={vendor.ownerName}
                          />
                          <AvatarFallback className="bg-indigo-100 text-indigo-700 font-semibold">
                            {getInitials(vendor.ownerName)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold text-slate-900">
                            {vendor.businessName}
                          </div>
                          <div className="text-sm text-slate-600">
                            {vendor.ownerName}
                          </div>
                          <div className="flex items-center text-xs text-slate-500 mt-0.5">
                            <MapPin className="w-3 h-3 mr-1" />
                            {vendor.location}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getCategoryBadge(vendor.category)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getVerificationBadge(vendor.verificationStatus)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span className="font-semibold text-slate-900">
                          {vendor.rating}
                        </span>
                        <span className="text-slate-500 text-sm">/5</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className="font-semibold text-slate-900"
                        style={{ fontVariantNumeric: "tabular-nums" }}
                      >
                        ₹{vendor.totalEarnings.toLocaleString("en-IN")}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                            <MoreHorizontal className="w-4 h-4 text-slate-600" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                          <DropdownMenuItem className="cursor-pointer">
                            <FileText className="w-4 h-4 mr-2" />
                            View Documents
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <Settings className="w-4 h-4 mr-2" />
                            Manage Services
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
                            <Ban className="w-4 h-4 mr-2" />
                            Suspend Vendor
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredVendors.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-500">
                No vendors found matching your criteria
              </p>
            </div>
          )}
        </div>

        {/* Summary Footer */}
        <div className="flex items-center justify-between text-sm text-slate-600">
          <p>
            Showing {filteredVendors.length} of {mockVendors.length} vendors
          </p>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-green-600" />
            <span>
              {
                mockVendors.filter((v) => v.verificationStatus === "Verified")
                  .length
              }{" "}
              Verified Partners
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorManagement;
