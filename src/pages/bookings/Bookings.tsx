import React, { useState, useMemo } from 'react';
import { Search, Calendar, Copy, CheckCircle, Clock, TrendingUp, IndianRupee, AlertTriangle, MoreHorizontal, Eye, UserCheck, Phone, XCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

type BookingStatus = 'Pending' | 'Confirmed' | 'On-the-way' | 'In-Progress' | 'Completed' | 'Cancelled';
type PaymentStatus = 'Paid' | 'COD';
type TimePeriod = 'Today' | 'Yesterday' | 'Last 7 Days';

interface Booking {
  id: string;
  bookingId: string;
  customerName: string;
  serviceName: string;
  providerName: string | null;
  date: string;
  timeSlot: string;
  amount: number;
  paymentStatus: PaymentStatus;
  status: BookingStatus;
  createdAt: Date;
}

const mockBookings: Booking[] = [
  {
    id: '1',
    bookingId: 'BK-9921',
    customerName: 'Priya Sharma',
    serviceName: 'AC Deep Cleaning',
    providerName: 'Rajesh Kumar',
    date: '2026-01-16',
    timeSlot: '10:00 AM - 11:00 AM',
    amount: 899,
    paymentStatus: 'Paid',
    status: 'In-Progress',
    createdAt: new Date('2026-01-16T09:30:00')
  },
  {
    id: '2',
    bookingId: 'BK-9920',
    customerName: 'Amit Patel',
    serviceName: 'Deep House Cleaning',
    providerName: 'Neha Gupta',
    date: '2026-01-16',
    timeSlot: '02:00 PM - 05:00 PM',
    amount: 2499,
    paymentStatus: 'COD',
    status: 'Confirmed',
    createdAt: new Date('2026-01-16T08:15:00')
  },
  {
    id: '3',
    bookingId: 'BK-9919',
    customerName: 'Lakshmi Iyer',
    serviceName: 'Plumbing Repair Service',
    providerName: null,
    date: '2026-01-16',
    timeSlot: '04:00 PM - 04:45 PM',
    amount: 299,
    paymentStatus: 'COD',
    status: 'Pending',
    createdAt: new Date('2026-01-16T07:45:00')
  },
  {
    id: '4',
    bookingId: 'BK-9918',
    customerName: 'Vikram Rao',
    serviceName: 'Sofa Sanitization',
    providerName: 'Dinesh Singh',
    date: '2026-01-16',
    timeSlot: '11:30 AM - 12:30 PM',
    amount: 899,
    paymentStatus: 'Paid',
    status: 'On-the-way',
    createdAt: new Date('2026-01-16T06:20:00')
  },
  {
    id: '5',
    bookingId: 'BK-9917',
    customerName: 'Ananya Reddy',
    serviceName: 'Kitchen Chimney Repair',
    providerName: 'Suresh Reddy',
    date: '2026-01-15',
    timeSlot: '03:00 PM - 03:45 PM',
    amount: 599,
    paymentStatus: 'Paid',
    status: 'Completed',
    createdAt: new Date('2026-01-15T14:30:00')
  },
  {
    id: '6',
    bookingId: 'BK-9916',
    customerName: 'Karthik Menon',
    serviceName: 'Bathroom Deep Cleaning',
    providerName: 'Priya Sharma',
    date: '2026-01-15',
    timeSlot: '09:00 AM - 10:15 AM',
    amount: 699,
    paymentStatus: 'COD',
    status: 'Completed',
    createdAt: new Date('2026-01-15T08:00:00')
  },
  {
    id: '7',
    bookingId: 'BK-9915',
    customerName: 'Deepa Krishnan',
    serviceName: 'Hair Styling & Makeup',
    providerName: 'Lakshmi Iyer',
    date: '2026-01-14',
    timeSlot: '05:00 PM - 07:00 PM',
    amount: 2199,
    paymentStatus: 'Paid',
    status: 'Completed',
    createdAt: new Date('2026-01-14T16:30:00')
  },
  {
    id: '8',
    bookingId: 'BK-9914',
    customerName: 'Rohan Verma',
    serviceName: 'AC Service & Repair',
    providerName: null,
    date: '2026-01-16',
    timeSlot: '01:00 PM - 02:30 PM',
    amount: 449,
    paymentStatus: 'COD',
    status: 'Pending',
    createdAt: new Date('2026-01-16T05:50:00')
  },
  {
    id: '9',
    bookingId: 'BK-9913',
    customerName: 'Sneha Kapoor',
    serviceName: 'Deep House Cleaning',
    providerName: 'Amit Patel',
    date: '2026-01-13',
    timeSlot: '10:00 AM - 01:00 PM',
    amount: 2499,
    paymentStatus: 'Paid',
    status: 'Cancelled',
    createdAt: new Date('2026-01-13T09:15:00')
  },
  {
    id: '10',
    bookingId: 'BK-9912',
    customerName: 'Arjun Nair',
    serviceName: 'Plumbing Repair Service',
    providerName: 'Vikram Rao',
    date: '2026-01-12',
    timeSlot: '11:00 AM - 11:45 AM',
    amount: 299,
    paymentStatus: 'COD',
    status: 'Completed',
    createdAt: new Date('2026-01-12T10:30:00')
  }
];

const BookingManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [timePeriodFilter, setTimePeriodFilter] = useState<TimePeriod>('Today');

  const getDateRange = (period: TimePeriod): { start: Date; end: Date } => {
    const now = new Date('2026-01-16'); // Current date
    const start = new Date(now);
    const end = new Date(now);
    end.setHours(23, 59, 59, 999);

    switch (period) {
      case 'Today':
        start.setHours(0, 0, 0, 0);
        break;
      case 'Yesterday':
        start.setDate(start.getDate() - 1);
        start.setHours(0, 0, 0, 0);
        end.setDate(end.getDate() - 1);
        break;
      case 'Last 7 Days':
        start.setDate(start.getDate() - 6);
        start.setHours(0, 0, 0, 0);
        break;
    }

    return { start, end };
  };

  const filteredBookings = useMemo<Booking[]>(() => {
    const { start, end } = getDateRange(timePeriodFilter);
    
    return mockBookings.filter(booking => {
      const matchesSearch = 
        booking.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.customerName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
      
      const bookingDate = new Date(booking.date);
      const matchesTimePeriod = bookingDate >= start && bookingDate <= end;
      
      return matchesSearch && matchesStatus && matchesTimePeriod;
    });
  }, [searchTerm, statusFilter, timePeriodFilter]);

  const stats = useMemo(() => {
    const { start, end } = getDateRange('Today');
    const todayBookings = mockBookings.filter(b => {
      const bookingDate = new Date(b.date);
      return bookingDate >= start && bookingDate <= end;
    });

    return {
      total: todayBookings.length,
      pending: todayBookings.filter(b => b.status === 'Pending').length,
      ongoing: todayBookings.filter(b => b.status === 'In-Progress' || b.status === 'On-the-way').length,
      revenue: todayBookings
        .filter(b => b.paymentStatus === 'Paid' && b.status !== 'Cancelled')
        .reduce((sum, b) => sum + b.amount, 0)
    };
  }, []);

  const getStatusBadge = (status: BookingStatus) => {
    const variants: Record<BookingStatus, string> = {
      'Pending': 'bg-amber-500/10 text-amber-700 ring-1 ring-amber-500/20 dark:text-amber-400',
      'Confirmed': 'bg-blue-500/10 text-blue-700 ring-1 ring-blue-500/20 dark:text-blue-400',
      'On-the-way': 'bg-purple-500/10 text-purple-700 ring-1 ring-purple-500/20 dark:text-purple-400',
      'In-Progress': 'bg-cyan-500/10 text-cyan-700 ring-1 ring-cyan-500/20 dark:text-cyan-400',
      'Completed': 'bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-500/20 dark:text-emerald-400',
      'Cancelled': 'bg-red-500/10 text-red-700 ring-1 ring-red-500/20 dark:text-red-400'
    };
    
    return (
      <Badge className={`${variants[status]} border-0 font-medium`}>
        {status}
      </Badge>
    );
  };

  const getPaymentBadge = (paymentStatus: PaymentStatus) => {
    const variants: Record<PaymentStatus, string> = {
      'Paid': 'bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-500/20 dark:text-emerald-400',
      'COD': 'bg-orange-500/10 text-orange-700 ring-1 ring-orange-500/20 dark:text-orange-400'
    };
    
    return (
      <Badge className={`${variants[paymentStatus]} border-0 font-medium text-xs`}>
        {paymentStatus}
      </Badge>
    );
  };

  const copyBookingId = (bookingId: string): void => {
    navigator.clipboard.writeText(bookingId);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-background antialiased p-4">
      <div className="space-y-6">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card rounded-lg ring-1 ring-border p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Bookings</p>
                <p className="text-2xl font-bold text-foreground tabular-nums mt-2">{stats.total}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg ring-1 ring-border p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Assignments</p>
                <p className="text-2xl font-bold text-amber-600 tabular-nums mt-2">{stats.pending}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg ring-1 ring-border p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Ongoing Services</p>
                <p className="text-2xl font-bold text-cyan-600 tabular-nums mt-2">{stats.ongoing}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-cyan-600" />
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg ring-1 ring-border p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Today's Revenue</p>
                <p className="text-2xl font-bold text-emerald-600 tabular-nums mt-2">
                  ₹{stats.revenue.toLocaleString('en-IN')}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <IndianRupee className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filter Header */}
        <div className="bg-card rounded-lg ring-1 ring-border p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by Booking ID or Customer Name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-52">
                <SelectValue placeholder="Booking Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Confirmed">Confirmed</SelectItem>
                <SelectItem value="On-the-way">On-the-way</SelectItem>
                <SelectItem value="In-Progress">In-Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={timePeriodFilter} onValueChange={(value) => setTimePeriodFilter(value as TimePeriod)}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Time Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Today">Today</SelectItem>
                <SelectItem value="Yesterday">Yesterday</SelectItem>
                <SelectItem value="Last 7 Days">Last 7 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-card rounded-lg ring-1 ring-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">Booking ID</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">Customer & Service</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">Provider</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">Schedule</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-foreground tabular-nums">#{booking.bookingId}</span>
                        <button
                          onClick={() => copyBookingId(booking.bookingId)}
                          className="p-1 hover:bg-muted rounded transition-colors"
                          title="Copy Booking ID"
                        >
                          <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-semibold text-foreground">{booking.customerName}</div>
                        <div className="text-sm text-muted-foreground mt-0.5">{booking.serviceName}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {booking.providerName ? (
                        <span className="text-foreground">{booking.providerName}</span>
                      ) : (
                        <Badge className="bg-amber-500/10 text-amber-700 ring-1 ring-amber-500/20 border-0 font-medium">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          Unassigned
                        </Badge>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-semibold text-foreground tabular-nums">{formatDate(booking.date)}</div>
                        <div className="text-sm text-muted-foreground tabular-nums mt-0.5">{booking.timeSlot}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div >
                        <div className="font-semibold text-foreground tabular-nums">₹{booking.amount.toLocaleString('en-IN')}</div>
                        <div className="mt-1">{getPaymentBadge(booking.paymentStatus)}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(booking.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                            <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                          <DropdownMenuItem className="cursor-pointer">
                            <Eye className="w-4 h-4 mr-2" />
                            View Timeline
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <UserCheck className="w-4 h-4 mr-2" />
                            Reassign Provider
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <Phone className="w-4 h-4 mr-2" />
                            Contact Customer
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                            <XCircle className="w-4 h-4 mr-2" />
                            Cancel Booking
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredBookings.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No bookings found matching your criteria</p>
            </div>
          )}
        </div>

        {/* Footer Summary */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <p>Showing {filteredBookings.length} of {mockBookings.length} bookings</p>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>{mockBookings.filter(b => b.status === 'Completed').length} Completed Today</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingManagement;