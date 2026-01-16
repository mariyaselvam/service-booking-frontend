import React, { useState, useMemo } from "react";
import {
  Search,
  DollarSign,
  TrendingUp,
  Clock,
  Receipt,
  MoreHorizontal,
  FileText,
  Eye,
  CheckCircle,
  Wallet,
  PiggyBank,
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

type PaymentStatus = "Paid" | "Refunded" | "Pending";
type PayoutStatus = "Paid" | "Processing" | "On-Hold" | "Failed";

interface Transaction {
  id: string;
  bookingId: string;
  transactionDate: string;
  vendorName: string;
  serviceName: string;
  orderAmount: number;
  commissionRate: number;
  commissionAmount: number;
  netVendorPayout: number;
  gstAmount: number;
  paymentStatus: PaymentStatus;
  payoutStatus: PayoutStatus;
}

const mockTransactions: Transaction[] = [
  {
    id: "TXN-10291",
    bookingId: "BK-9921",
    transactionDate: "2026-01-16",
    vendorName: "Rajesh Kumar",
    serviceName: "AC Deep Cleaning",
    orderAmount: 899,
    commissionRate: 15,
    commissionAmount: 134.85,
    netVendorPayout: 764.15,
    gstAmount: 161.82,
    paymentStatus: "Paid",
    payoutStatus: "Processing",
  },
  {
    id: "TXN-10290",
    bookingId: "BK-9920",
    transactionDate: "2026-01-16",
    vendorName: "Neha Gupta",
    serviceName: "Deep House Cleaning",
    orderAmount: 2499,
    commissionRate: 12,
    commissionAmount: 299.88,
    netVendorPayout: 2199.12,
    gstAmount: 449.82,
    paymentStatus: "Pending",
    payoutStatus: "On-Hold",
  },
  {
    id: "TXN-10289",
    bookingId: "BK-9918",
    transactionDate: "2026-01-16",
    vendorName: "Dinesh Singh",
    serviceName: "Sofa Sanitization",
    orderAmount: 899,
    commissionRate: 15,
    commissionAmount: 134.85,
    netVendorPayout: 764.15,
    gstAmount: 161.82,
    paymentStatus: "Paid",
    payoutStatus: "Paid",
  },
  {
    id: "TXN-10288",
    bookingId: "BK-9917",
    transactionDate: "2026-01-15",
    vendorName: "Suresh Reddy",
    serviceName: "Kitchen Chimney Repair",
    orderAmount: 599,
    commissionRate: 18,
    commissionAmount: 107.82,
    netVendorPayout: 491.18,
    gstAmount: 107.82,
    paymentStatus: "Paid",
    payoutStatus: "Paid",
  },
  {
    id: "TXN-10287",
    bookingId: "BK-9916",
    transactionDate: "2026-01-15",
    vendorName: "Priya Sharma",
    serviceName: "Bathroom Deep Cleaning",
    orderAmount: 699,
    commissionRate: 15,
    commissionAmount: 104.85,
    netVendorPayout: 594.15,
    gstAmount: 125.82,
    paymentStatus: "Paid",
    payoutStatus: "Paid",
  },
  {
    id: "TXN-10286",
    bookingId: "BK-9915",
    transactionDate: "2026-01-14",
    vendorName: "Lakshmi Iyer",
    serviceName: "Hair Styling & Makeup",
    orderAmount: 2199,
    commissionRate: 20,
    commissionAmount: 439.8,
    netVendorPayout: 1759.2,
    gstAmount: 395.82,
    paymentStatus: "Paid",
    payoutStatus: "Paid",
  },
  {
    id: "TXN-10285",
    bookingId: "BK-9913",
    transactionDate: "2026-01-13",
    vendorName: "Amit Patel",
    serviceName: "Deep House Cleaning",
    orderAmount: 2499,
    commissionRate: 12,
    commissionAmount: 299.88,
    netVendorPayout: 2199.12,
    gstAmount: 449.82,
    paymentStatus: "Refunded",
    payoutStatus: "Failed",
  },
  {
    id: "TXN-10284",
    bookingId: "BK-9912",
    transactionDate: "2026-01-12",
    vendorName: "Vikram Rao",
    serviceName: "Plumbing Repair Service",
    orderAmount: 299,
    commissionRate: 18,
    commissionAmount: 53.82,
    netVendorPayout: 245.18,
    gstAmount: 53.82,
    paymentStatus: "Paid",
    payoutStatus: "Paid",
  },
  {
    id: "TXN-10283",
    bookingId: "BK-9908",
    transactionDate: "2026-01-11",
    vendorName: "Arun Kumar",
    serviceName: "AC Service & Repair",
    orderAmount: 449,
    commissionRate: 15,
    commissionAmount: 67.35,
    netVendorPayout: 381.65,
    gstAmount: 80.82,
    paymentStatus: "Paid",
    payoutStatus: "Processing",
  },
  {
    id: "TXN-10282",
    bookingId: "BK-9905",
    transactionDate: "2026-01-10",
    vendorName: "Manoj Verma",
    serviceName: "Kitchen Chimney Repair",
    orderAmount: 599,
    commissionRate: 18,
    commissionAmount: 107.82,
    netVendorPayout: 491.18,
    gstAmount: 107.82,
    paymentStatus: "Paid",
    payoutStatus: "Paid",
  },
];

const FinancePayouts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [payoutStatusFilter, setPayoutStatusFilter] = useState<string>("all");

  const filteredTransactions = useMemo<Transaction[]>(() => {
    return mockTransactions.filter((transaction) => {
      const matchesSearch =
        transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.vendorName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        transaction.bookingId.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        payoutStatusFilter === "all" ||
        transaction.payoutStatus === payoutStatusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, payoutStatusFilter]);

  const financialSummary = useMemo(() => {
    const filtered = filteredTransactions.filter(
      (t) => t.paymentStatus !== "Refunded"
    );

    return {
      totalGTV: filtered.reduce((sum, t) => sum + t.orderAmount, 0),
      platformCommission: filtered.reduce(
        (sum, t) => sum + t.commissionAmount,
        0
      ),
      pendingPayouts: filtered
        .filter(
          (t) => t.payoutStatus === "Processing" || t.payoutStatus === "On-Hold"
        )
        .reduce((sum, t) => sum + t.netVendorPayout, 0),
      gstCollected: filtered.reduce((sum, t) => sum + t.gstAmount, 0),
    };
  }, [filteredTransactions]);

  const getPaymentStatusBadge = (status: PaymentStatus) => {
    const variants: Record<PaymentStatus, string> = {
      Paid: "bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-500/20 dark:text-emerald-400",
      Refunded:
        "bg-red-500/10 text-red-700 ring-1 ring-red-500/20 dark:text-red-400",
      Pending:
        "bg-amber-500/10 text-amber-700 ring-1 ring-amber-500/20 dark:text-amber-400",
    };

    return (
      <Badge className={`${variants[status]} border-0 font-medium`}>
        {status}
      </Badge>
    );
  };

  const getPayoutStatusBadge = (status: PayoutStatus) => {
    const variants: Record<PayoutStatus, string> = {
      Paid: "bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-500/20 dark:text-emerald-400",
      Processing:
        "bg-blue-500/10 text-blue-700 ring-1 ring-blue-500/20 dark:text-blue-400",
      "On-Hold":
        "bg-amber-500/10 text-amber-700 ring-1 ring-amber-500/20 dark:text-amber-400",
      Failed:
        "bg-red-500/10 text-red-700 ring-1 ring-red-500/20 dark:text-red-400",
    };

    return (
      <Badge className={`${variants[status]} border-0 font-medium text-xs`}>
        {status}
      </Badge>
    );
  };

  const formatCurrency = (amount: number): string => {
    return amount.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const handleSettlePayouts = (): void => {
    console.log("Initiating bulk payout settlement...");
  };

  return (
    <div className="min-h-screen bg-background antialiased p-6">
      <div className="space-y-6">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card rounded-lg ring-1 ring-border p-5">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Total GTV</p>
                <p className="text-2xl font-bold text-foreground tabular-nums mt-2">
                  ₹{formatCurrency(financialSummary.totalGTV)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Gross Transaction Value
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg ring-1 ring-border p-5">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">
                  Platform Commission
                </p>
                <p className="text-2xl font-bold text-emerald-600 tabular-nums mt-2">
                  ₹{formatCurrency(financialSummary.platformCommission)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Platform profit earned
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg ring-1 ring-border p-5">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Pending Payouts</p>
                <p className="text-2xl font-bold text-amber-600 tabular-nums mt-2">
                  ₹{formatCurrency(financialSummary.pendingPayouts)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Awaiting settlement
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg ring-1 ring-border p-5">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">
                  Tax/GST Collected
                </p>
                <p className="text-2xl font-bold text-purple-600 tabular-nums mt-2">
                  ₹{formatCurrency(financialSummary.gstCollected)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Total tax held
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Receipt className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg ring-1 ring-border p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by Transaction ID or Vendor Name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
              </div>
            </div>
            <Select
              value={payoutStatusFilter}
              onValueChange={setPayoutStatusFilter}
            >
              <SelectTrigger className="w-full md:w-52">
                <SelectValue placeholder="Payout Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Paid">Paid</SelectItem>
                <SelectItem value="Processing">Processing</SelectItem>
                <SelectItem value="On-Hold">On-Hold</SelectItem>
                <SelectItem value="Failed">Failed</SelectItem>
              </SelectContent>
            </Select>

            <button
              onClick={handleSettlePayouts}
              className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 transition-colors"
            >
              <Wallet className="w-4 h-4 mr-2" />
              Settle Payouts
            </button>
          </div>
        </div>

        {/* Financial Data Table */}
        <div className="bg-card rounded-lg ring-1 ring-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
                    Transaction Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
                    Vendor
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-foreground uppercase tracking-wider">
                    Order Amount
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-foreground uppercase tracking-wider">
                    Commission
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-foreground uppercase tracking-wider">
                    Net Payout
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
                    Payment Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
                    Payout Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredTransactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-semibold text-foreground tabular-nums">
                          {transaction.id}
                        </div>
                        <div className="text-sm text-muted-foreground tabular-nums mt-0.5">
                          {transaction.bookingId} •{" "}
                          {formatDate(transaction.transactionDate)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-semibold text-foreground">
                          {transaction.vendorName}
                        </div>
                        <div className="text-sm text-muted-foreground mt-0.5">
                          {transaction.serviceName}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <span className="font-semibold text-foreground tabular-nums">
                        ₹{formatCurrency(transaction.orderAmount)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div>
                        <div className="font-semibold text-emerald-600 tabular-nums">
                          ₹{formatCurrency(transaction.commissionAmount)}
                        </div>
                        <div className="text-xs text-muted-foreground tabular-nums mt-0.5">
                          {transaction.commissionRate}%
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <span className="font-bold text-foreground tabular-nums">
                        ₹{formatCurrency(transaction.netVendorPayout)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getPaymentStatusBadge(transaction.paymentStatus)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getPayoutStatusBadge(transaction.payoutStatus)}
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
                            <FileText className="w-4 h-4 mr-2" />
                            View Invoice
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <Eye className="w-4 h-4 mr-2" />
                            Transaction Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Mark as Settled
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-muted/30 border-t-2 border-border">
                <tr className="font-bold">
                  <td className="px-6 py-4 text-foreground" colSpan={2}>
                    Totals (Filtered Results)
                  </td>
                  <td className="px-6 py-4 text-right text-foreground tabular-nums">
                    ₹{formatCurrency(financialSummary.totalGTV)}
                  </td>
                  <td className="px-6 py-4 text-right text-emerald-600 tabular-nums">
                    ₹{formatCurrency(financialSummary.platformCommission)}
                  </td>
                  <td className="px-6 py-4 text-right text-foreground tabular-nums">
                    ₹
                    {formatCurrency(
                      financialSummary.totalGTV -
                        financialSummary.platformCommission
                    )}
                  </td>
                  <td colSpan={3}></td>
                </tr>
              </tfoot>
            </table>
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No transactions found matching your criteria
              </p>
            </div>
          )}
        </div>

        {/* Footer Summary */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <p>
            Showing {filteredTransactions.length} of {mockTransactions.length}{" "}
            transactions
          </p>
          <div className="flex items-center gap-2">
            <PiggyBank className="w-4 h-4 text-emerald-600" />
            <span>
              Platform Revenue: ₹
              {formatCurrency(financialSummary.platformCommission)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancePayouts;
