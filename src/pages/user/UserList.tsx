import { useState } from "react";
import {
  Search,
  MoreHorizontal,
  UserPlus,
  Filter,
  ArrowUpDown,
  Download,
  Ban,
  CheckCircle,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const users = [
  {
    id: "USR-001",
    name: "Rahul Kumar",
    email: "rahul@example.com",
    phone: "+91 98765 43210",
    status: "Active",
    totalBookings: 12,
    walletBalance: "₹450",
    joinedDate: "12 Jan 2024",
    avatar: "https://i.pravatar.cc/150?u=rahul",
  },
  {
    id: "USR-002",
    name: "Priya Sharma",
    email: "priya@example.com",
    phone: "+91 99887 76655",
    status: "Active",
    totalBookings: 5,
    walletBalance: "₹0",
    joinedDate: "05 Feb 2024",
    avatar: "https://i.pravatar.cc/150?u=priya",
  },
  {
    id: "USR-003",
    name: "Vikram Singh",
    email: "vikram@example.com",
    phone: "+91 88776 65544",
    status: "Suspended",
    totalBookings: 24,
    walletBalance: "₹1,200",
    joinedDate: "20 Nov 2023",
    avatar: "https://i.pravatar.cc/150?u=vikram",
  },
  {
    id: "USR-004",
    name: "Ananya Iyer",
    email: "ananya.i@outlook.com",
    phone: "+91 77665 54433",
    status: "Active",
    totalBookings: 2,
    walletBalance: "₹150",
    joinedDate: "10 Mar 2024",
    avatar: "https://i.pravatar.cc/150?u=ananya",
  },
  {
    id: "USR-005",
    name: "Arjun Reddy",
    email: "arjun.reddy@gmail.com",
    phone: "+91 91234 56789",
    status: "Active",
    totalBookings: 45,
    walletBalance: "₹3,400",
    joinedDate: "15 May 2023",
    avatar: "https://i.pravatar.cc/150?u=arjun",
  },
  {
    id: "USR-006",
    name: "Sanya Mirza",
    email: "sanya.m@yahoo.com",
    phone: "+91 98989 89898",
    status: "Inactive",
    totalBookings: 0,
    walletBalance: "₹0",
    joinedDate: "01 Apr 2024",
    avatar: "https://i.pravatar.cc/150?u=sanya",
  },
  {
    id: "USR-007",
    name: "Karthik Raja",
    email: "karthik.r@service.in",
    phone: "+91 70123 45678",
    status: "Active",
    totalBookings: 18,
    walletBalance: "₹890",
    joinedDate: "22 Dec 2023",
    avatar: "https://i.pravatar.cc/150?u=karthik",
  },
  {
    id: "USR-008",
    name: "Meera Das",
    email: "meera.das@domain.com",
    phone: "+91 81122 33445",
    status: "Suspended",
    totalBookings: 7,
    walletBalance: "₹210",
    joinedDate: "14 Jan 2024",
    avatar: "https://i.pravatar.cc/150?u=meera",
  },
  {
    id: "USR-009",
    name: "Rohan Verma",
    email: "rohan.v@gmail.com",
    phone: "+91 95544 33221",
    status: "Active",
    totalBookings: 31,
    walletBalance: "₹1,150",
    joinedDate: "30 Aug 2023",
    avatar: "https://i.pravatar.cc/150?u=rohan",
  },
  {
    id: "USR-010",
    name: "Ishita Paul",
    email: "ishita.paul@icloud.com",
    phone: "+91 90000 11111",
    status: "Active",
    totalBookings: 9,
    walletBalance: "₹55",
    joinedDate: "19 Feb 2024",
    avatar: "https://i.pravatar.cc/150?u=ishita",
  },
];

const UserList = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6 p-4 bg-background min-h-screen">
      <Card className="border-none shadow-sm ring-1 ring-border">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email or phone..."
                className="pl-9"
                value={searchTerm}
                onChange={(e: any) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" /> Filters
              </Button>
              <Select defaultValue="all">
                <SelectTrigger className="w-37.5 h-9 focus:ring-1 focus:ring-primary">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-emerald-500 mr-2" />
                      Active
                    </div>
                  </SelectItem>
                  <SelectItem value="suspended">
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-rose-500 mr-2" />
                      Suspended
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" /> Export CSV
                </Button>
                <Button
                  size="sm"
                  className="bg-primary shadow-lg shadow-primary/20"
                >
                  <UserPlus className="mr-2 h-4 w-4" /> Add User
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm ring-1 ring-border overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-75">Customer</TableHead>
              <TableHead>
                <div className="flex items-center cursor-pointer hover:text-primary">
                  Status <ArrowUpDown className="ml-2 h-3 w-3" />
                </div>
              </TableHead>
              <TableHead className="text-center">Bookings</TableHead>
              <TableHead>Wallet</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                className="hover:bg-muted/30 transition-colors"
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 ring-2 ring-background shadow-sm">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>
                        {user.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm leading-none">
                        {user.name}
                      </span>
                      <span className="text-xs text-muted-foreground mt-1">
                        {user.email}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={
                      user.status === "Active"
                        ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                        : "bg-rose-50 text-rose-700 hover:bg-rose-100"
                    }
                  >
                    {user.status === "Active" ? (
                      <CheckCircle className="w-3 h-3 mr-1" />
                    ) : (
                      <Ban className="w-3 h-3 mr-1" />
                    )}
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-center font-medium">
                  {user.totalBookings}
                </TableCell>
                <TableCell className="font-semibold text-sm">
                  {user.walletBalance}
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {user.joinedDate}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem className="cursor-pointer">
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        Booking History
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-rose-600 cursor-pointer">
                        Suspend User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination Footer */}
        <div className="flex items-center justify-between px-4 py-4 bg-muted/20 border-t">
          <p className="text-xs text-muted-foreground">
            Showing 3 of 1,245 customers
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UserList;
