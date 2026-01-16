import React, { useState, useMemo } from "react";
import {
  Search,
  Bell,
  Mail,
  Smartphone,
  Send,
  Users,
  AlertTriangle,
  MoreHorizontal,
  Eye,
  Trash2,
  RefreshCw,
  Clock,
  CheckCircle,
  XCircle,
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

type TargetAudience =
  | "All"
  | "Customers Only"
  | "Vendors Only"
  | "New Users"
  | "Specific City";
type Channel = "Push Notification" | "Email" | "In-App" | "SMS";
type NotificationStatus = "Delivered" | "Scheduled" | "Failed";

interface Notification {
  id: string;
  title: string;
  messagePreview: string;
  fullMessage: string;
  recipientGroup: TargetAudience;
  channel: Channel;
  sentCount: number;
  openRate: number;
  status: NotificationStatus;
  date: string;
}

const mockNotifications: Notification[] = [
  {
    id: "NOTIF-1045",
    title: "Rain Alert: Expect Delays",
    messagePreview:
      "Heavy rainfall expected in your area. Service providers may face delays...",
    fullMessage:
      "Heavy rainfall expected in your area. Service providers may face delays in reaching you. We appreciate your patience and understanding.",
    recipientGroup: "Specific City",
    channel: "Push Notification",
    sentCount: 3542,
    openRate: 78.5,
    status: "Delivered",
    date: "2026-01-16T09:30:00",
  },
  {
    id: "NOTIF-1044",
    title: "New Year Discount Offer",
    messagePreview:
      "Ring in 2026 with 25% off on all cleaning services! Use code NEWYEAR25...",
    fullMessage:
      "Ring in 2026 with 25% off on all cleaning services! Use code NEWYEAR25 at checkout. Offer valid till January 31st. Book now and start the year fresh!",
    recipientGroup: "Customers Only",
    channel: "Email",
    sentCount: 8921,
    openRate: 42.3,
    status: "Delivered",
    date: "2026-01-01T08:00:00",
  },
  {
    id: "NOTIF-1043",
    title: "Payout Processed Alert",
    messagePreview:
      "Your weekly payout of ₹12,450 has been successfully processed...",
    fullMessage:
      "Your weekly payout of ₹12,450 has been successfully processed and will reflect in your bank account within 2-3 business days. Thank you for your excellent service!",
    recipientGroup: "Vendors Only",
    channel: "Push Notification",
    sentCount: 156,
    openRate: 91.2,
    status: "Delivered",
    date: "2026-01-15T18:00:00",
  },
  {
    id: "NOTIF-1042",
    title: "Welcome to ServiceHub!",
    messagePreview:
      "Thank you for joining ServiceHub! Get 15% off on your first booking...",
    fullMessage:
      "Thank you for joining ServiceHub! Get 15% off on your first booking with code WELCOME15. Browse our 50+ services and book your first service today!",
    recipientGroup: "New Users",
    channel: "Email",
    sentCount: 432,
    openRate: 68.7,
    status: "Delivered",
    date: "2026-01-15T12:00:00",
  },
  {
    id: "NOTIF-1041",
    title: "System Maintenance Notice",
    messagePreview:
      "Scheduled maintenance on Jan 20, 2026 from 2 AM to 4 AM...",
    fullMessage:
      "Scheduled maintenance on Jan 20, 2026 from 2 AM to 4 AM. The platform will be temporarily unavailable. We apologize for any inconvenience.",
    recipientGroup: "All",
    channel: "In-App",
    sentCount: 12453,
    openRate: 35.8,
    status: "Scheduled",
    date: "2026-01-18T02:00:00",
  },
  {
    id: "NOTIF-1040",
    title: "New Booking Request",
    messagePreview:
      "You have a new booking request for AC Deep Cleaning on Jan 17...",
    fullMessage:
      "You have a new booking request for AC Deep Cleaning on Jan 17 at 2:00 PM in Sector 12, Noida. Please confirm availability within 2 hours.",
    recipientGroup: "Vendors Only",
    channel: "Push Notification",
    sentCount: 24,
    openRate: 95.8,
    status: "Delivered",
    date: "2026-01-16T10:15:00",
  },
  {
    id: "NOTIF-1039",
    title: "Complete Your Profile",
    messagePreview:
      "Your vendor profile is 60% complete. Add verification documents...",
    fullMessage:
      "Your vendor profile is 60% complete. Add verification documents and service photos to increase your booking chances by 300%. Complete now!",
    recipientGroup: "Vendors Only",
    channel: "Email",
    sentCount: 89,
    openRate: 52.8,
    status: "Delivered",
    date: "2026-01-14T16:30:00",
  },
  {
    id: "NOTIF-1038",
    title: "Payment Reminder",
    messagePreview: "Your payment of ₹899 for Booking #BK-9921 is pending...",
    fullMessage:
      "Your payment of ₹899 for Booking #BK-9921 is pending. Please complete the payment within 24 hours to avoid cancellation.",
    recipientGroup: "Customers Only",
    channel: "SMS",
    sentCount: 67,
    openRate: 0,
    status: "Failed",
    date: "2026-01-13T11:00:00",
  },
  {
    id: "NOTIF-1037",
    title: "Weekend Special: Plumbing Services",
    messagePreview:
      "Get flat 20% off on all plumbing services this weekend only...",
    fullMessage:
      "Get flat 20% off on all plumbing services this weekend only! From pipe repairs to full installations, we have you covered. Book before Sunday midnight!",
    recipientGroup: "Customers Only",
    channel: "Push Notification",
    sentCount: 5234,
    openRate: 58.4,
    status: "Delivered",
    date: "2026-01-12T09:00:00",
  },
  {
    id: "NOTIF-1036",
    title: "Rate Your Recent Service",
    messagePreview:
      "How was your experience with Deep House Cleaning? Share your feedback...",
    fullMessage:
      "How was your experience with Deep House Cleaning? Share your feedback and help us improve. Your review helps other customers make informed decisions!",
    recipientGroup: "Customers Only",
    channel: "In-App",
    sentCount: 1823,
    openRate: 45.2,
    status: "Delivered",
    date: "2026-01-11T14:00:00",
  },
];

const NotificationManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [audienceFilter, setAudienceFilter] = useState<string>("all");
  const [channelFilter, setChannelFilter] = useState<string>("all");

  const filteredNotifications = useMemo<Notification[]>(() => {
    return mockNotifications.filter((notification) => {
      const matchesSearch =
        notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notification.messagePreview
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesAudience =
        audienceFilter === "all" ||
        notification.recipientGroup === audienceFilter;
      const matchesChannel =
        channelFilter === "all" || notification.channel === channelFilter;

      return matchesSearch && matchesAudience && matchesChannel;
    });
  }, [searchTerm, audienceFilter, channelFilter]);

  const stats = useMemo(() => {
    return {
      totalSent: mockNotifications.reduce((sum, n) => sum + n.sentCount, 0),
      avgOpenRate: mockNotifications
        .filter((n) => n.openRate > 0)
        .reduce((sum, n, _, arr) => sum + n.openRate / arr.length, 0),
      scheduled: mockNotifications.filter((n) => n.status === "Scheduled")
        .length,
      failed: mockNotifications.filter((n) => n.status === "Failed").length,
    };
  }, []);

  const getRecipientBadge = (group: TargetAudience) => {
    const colors: Record<TargetAudience, string> = {
      All: "bg-purple-500/10 text-purple-700 ring-1 ring-purple-500/20 dark:text-purple-400",
      "Customers Only":
        "bg-blue-500/10 text-blue-700 ring-1 ring-blue-500/20 dark:text-blue-400",
      "Vendors Only":
        "bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-500/20 dark:text-emerald-400",
      "New Users":
        "bg-cyan-500/10 text-cyan-700 ring-1 ring-cyan-500/20 dark:text-cyan-400",
      "Specific City":
        "bg-amber-500/10 text-amber-700 ring-1 ring-amber-500/20 dark:text-amber-400",
    };

    return (
      <Badge className={`${colors[group]} border-0 font-medium text-xs`}>
        {group}
      </Badge>
    );
  };

  const getStatusBadge = (status: NotificationStatus) => {
    const variants: Record<NotificationStatus, string> = {
      Delivered:
        "bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-500/20 dark:text-emerald-400",
      Scheduled:
        "bg-blue-500/10 text-blue-700 ring-1 ring-blue-500/20 dark:text-blue-400",
      Failed:
        "bg-red-500/10 text-red-700 ring-1 ring-red-500/20 dark:text-red-400",
    };

    const icons: Record<NotificationStatus, React.ReactNode> = {
      Delivered: <CheckCircle className="w-3 h-3 mr-1" />,
      Scheduled: <Clock className="w-3 h-3 mr-1" />,
      Failed: <XCircle className="w-3 h-3 mr-1" />,
    };

    return (
      <Badge className={`${variants[status]} border-0 font-medium`}>
        {icons[status]}
        {status}
      </Badge>
    );
  };

  const getChannelIcon = (channel: Channel) => {
    const icons: Record<Channel, React.ReactNode> = {
      "Push Notification": <Bell className="w-4 h-4 text-purple-600" />,
      Email: <Mail className="w-4 h-4 text-blue-600" />,
      "In-App": <Smartphone className="w-4 h-4 text-cyan-600" />,
      SMS: <Send className="w-4 h-4 text-green-600" />,
    };

    return (
      <div className="flex items-center gap-2">
        {icons[channel]}
        <span className="text-sm text-foreground">{channel}</span>
      </div>
    );
  };

  const formatDateTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const handleCreateBroadcast = (): void => {
    console.log("Creating new broadcast...");
  };

  return (
    <div className="min-h-screen bg-background antialiased p-4">
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-card rounded-lg ring-1 ring-border p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Sent</p>
                <p className="text-2xl font-bold text-foreground tabular-nums mt-2">
                  {stats.totalSent.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Send className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg ring-1 ring-border p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Open Rate</p>
                <p className="text-2xl font-bold text-emerald-600 tabular-nums mt-2">
                  {stats.avgOpenRate.toFixed(1)}%
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <Eye className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg ring-1 ring-border p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Scheduled</p>
                <p className="text-2xl font-bold text-blue-600 tabular-nums mt-2">
                  {stats.scheduled}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg ring-1 ring-border p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Failed</p>
                <p className="text-2xl font-bold text-red-600 tabular-nums mt-2">
                  {stats.failed}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filter & Channel Bar */}
        <div className="bg-card rounded-lg ring-1 ring-border p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by notification title or message content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
              </div>
            </div>
            <Select value={audienceFilter} onValueChange={setAudienceFilter}>
              <SelectTrigger className="w-full md:w-52">
                <SelectValue placeholder="Target Audience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Audiences</SelectItem>
                <SelectItem value="All">All Users</SelectItem>
                <SelectItem value="Customers Only">Customers Only</SelectItem>
                <SelectItem value="Vendors Only">Vendors Only</SelectItem>
                <SelectItem value="New Users">New Users</SelectItem>
                <SelectItem value="Specific City">Specific City</SelectItem>
              </SelectContent>
            </Select>
            <Select value={channelFilter} onValueChange={setChannelFilter}>
              <SelectTrigger className="w-full md:w-52">
                <SelectValue placeholder="Channel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Channels</SelectItem>
                <SelectItem value="Push Notification">
                  Push Notification
                </SelectItem>
                <SelectItem value="Email">Email</SelectItem>
                <SelectItem value="In-App">In-App</SelectItem>
                <SelectItem value="SMS">SMS</SelectItem>
              </SelectContent>
            </Select>
            <button
              onClick={handleCreateBroadcast}
              className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 transition-colors"
            >
              <Send className="w-4 h-4 mr-2" />
              Create New Broadcast
            </button>
          </div>
        </div>

        {/* Notification Logs Table */}
        <div className="bg-card rounded-lg ring-1 ring-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
                    Message
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
                    Recipient Group
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
                    Channel
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
                    Stats
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredNotifications.map((notification) => (
                  <tr
                    key={notification.id}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    <td className="px-6 py-4 max-w-md">
                      <div>
                        <div className="font-semibold text-foreground">
                          {notification.title}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1 leading-relaxed">
                          {truncateText(notification.messagePreview, 80)}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1 tabular-nums">
                          {notification.id}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getRecipientBadge(notification.recipientGroup)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getChannelIcon(notification.channel)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-semibold text-foreground tabular-nums">
                          {notification.sentCount.toLocaleString()} sent
                        </div>
                        {notification.openRate > 0 && (
                          <div className="text-sm text-emerald-600 tabular-nums mt-1">
                            {notification.openRate.toFixed(1)}% opened
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(notification.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-muted-foreground tabular-nums">
                        {formatDateTime(notification.date)}
                      </span>
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
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Resend Notification
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <Eye className="w-4 h-4 mr-2" />
                            View Full Content
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Log
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredNotifications.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No notifications found matching your criteria
              </p>
            </div>
          )}
        </div>

        {/* Footer Summary */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <p>
            Showing {filteredNotifications.length} of {mockNotifications.length}{" "}
            notifications
          </p>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-600" />
            <span className="tabular-nums">
              {stats.totalSent.toLocaleString()} total recipients reached
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationManagement;
