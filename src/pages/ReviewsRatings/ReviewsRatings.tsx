import React, { useState, useMemo } from "react";
import {
  Search,
  Star,
  MessageSquare,
  Flag,
  MoreHorizontal,
  Eye,
  Reply,
  TrendingUp,
  Trash2,
  Award,
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

type ReviewStatus = "Published" | "Pending" | "Hidden/Flagged";

interface Review {
  id: string;
  customerName: string;
  customerAvatar: string | null;
  rating: number;
  serviceName: string;
  vendorName: string;
  comment: string;
  date: string;
  status: ReviewStatus;
  isFeatured: boolean;
}

const mockReviews: Review[] = [
  {
    id: "REV-1021",
    customerName: "Priya Sharma",
    customerAvatar: null,
    rating: 5,
    serviceName: "Deep House Cleaning",
    vendorName: "Neha Gupta",
    comment:
      "Absolutely fantastic service! Neha and her team did an incredible job cleaning every corner of my house. Very professional and thorough. Highly recommend!",
    date: "2026-01-16",
    status: "Published",
    isFeatured: true,
  },
  {
    id: "REV-1020",
    customerName: "Amit Patel",
    customerAvatar: null,
    rating: 5,
    serviceName: "AC Service & Repair",
    vendorName: "Rajesh Kumar",
    comment:
      "Excellent work! Rajesh was punctual, professional, and fixed my AC issue quickly. The service was worth every penny. Will definitely book again.",
    date: "2026-01-16",
    status: "Published",
    isFeatured: false,
  },
  {
    id: "REV-1019",
    customerName: "Lakshmi Iyer",
    customerAvatar: null,
    rating: 4,
    serviceName: "Plumbing Repair Service",
    vendorName: "Vikram Rao",
    comment:
      "Good service overall. Vikram was knowledgeable and fixed the leaking pipe efficiently. Only minor issue was he arrived 15 minutes late, but otherwise great work.",
    date: "2026-01-15",
    status: "Published",
    isFeatured: false,
  },
  {
    id: "REV-1018",
    customerName: "Rohan Verma",
    customerAvatar: null,
    rating: 3,
    serviceName: "Kitchen Chimney Repair",
    vendorName: "Suresh Reddy",
    comment:
      "Service was okay. The chimney is working now but I expected better communication. The vendor could have explained the problem more clearly.",
    date: "2026-01-15",
    status: "Published",
    isFeatured: false,
  },
  {
    id: "REV-1017",
    customerName: "Deepa Krishnan",
    customerAvatar: null,
    rating: 5,
    serviceName: "Hair Styling & Makeup",
    vendorName: "Lakshmi Iyer",
    comment:
      "Lakshmi is a true professional! She made me look absolutely stunning for my sister's wedding. Her attention to detail and friendly nature made the whole experience wonderful.",
    date: "2026-01-14",
    status: "Published",
    isFeatured: true,
  },
  {
    id: "REV-1016",
    customerName: "Karthik Menon",
    customerAvatar: null,
    rating: 2,
    serviceName: "Bathroom Deep Cleaning",
    vendorName: "Priya Sharma",
    comment:
      "Not satisfied with the service. Some areas were still dirty after cleaning. When I pointed it out, the vendor seemed rushed and didn't fix it properly.",
    date: "2026-01-14",
    status: "Hidden/Flagged",
    isFeatured: false,
  },
  {
    id: "REV-1015",
    customerName: "Sneha Kapoor",
    customerAvatar: null,
    rating: 1,
    serviceName: "Sofa Sanitization",
    vendorName: "Dinesh Singh",
    comment:
      "Terrible experience. The vendor was unprofessional and left stains on my sofa that weren't there before. Would not recommend and expecting a refund.",
    date: "2026-01-13",
    status: "Hidden/Flagged",
    isFeatured: false,
  },
  {
    id: "REV-1014",
    customerName: "Arjun Nair",
    customerAvatar: null,
    rating: 4,
    serviceName: "Plumbing Repair Service",
    vendorName: "Vikram Rao",
    comment:
      "Quick and efficient service. Vikram solved my water pressure issue in less than an hour. Prices are reasonable too. Would book again for future plumbing needs.",
    date: "2026-01-12",
    status: "Published",
    isFeatured: false,
  },
  {
    id: "REV-1013",
    customerName: "Ananya Reddy",
    customerAvatar: null,
    rating: 5,
    serviceName: "Electrician Service",
    vendorName: "Amit Patel",
    comment:
      "Outstanding service! Amit fixed all my electrical issues including faulty switches and wiring problems. Very knowledgeable and safety-conscious. Highly recommended!",
    date: "2026-01-11",
    status: "Published",
    isFeatured: false,
  },
  {
    id: "REV-1012",
    customerName: "Vikram Singh",
    customerAvatar: null,
    rating: 3,
    serviceName: "AC Deep Cleaning",
    vendorName: "Rajesh Kumar",
    comment:
      "Average service. The AC is cleaner but I expected a more thorough job for the price I paid. The vendor was polite but seemed to be in a hurry.",
    date: "2026-01-10",
    status: "Pending",
    isFeatured: false,
  },
];

const ReviewsRatings: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [ratingFilter, setRatingFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredReviews = useMemo<Review[]>(() => {
    return mockReviews.filter((review) => {
      const matchesSearch =
        review.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.vendorName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRating =
        ratingFilter === "all" ||
        (ratingFilter === "5" && review.rating === 5) ||
        (ratingFilter === "4" && review.rating === 4) ||
        (ratingFilter === "3-below" && review.rating <= 3);

      const matchesStatus =
        statusFilter === "all" || review.status === statusFilter;

      return matchesSearch && matchesRating && matchesStatus;
    });
  }, [searchTerm, ratingFilter, statusFilter]);

  const stats = useMemo(() => {
    const published = mockReviews.filter((r) => r.status === "Published");
    const avgRating =
      published.length > 0
        ? published.reduce((sum, r) => sum + r.rating, 0) / published.length
        : 0;

    return {
      averageRating: avgRating,
      totalReviews: mockReviews.length,
      flaggedReviews: mockReviews.filter((r) => r.status === "Hidden/Flagged")
        .length,
    };
  }, []);

  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getStatusBadge = (status: ReviewStatus) => {
    const variants: Record<ReviewStatus, string> = {
      Published:
        "bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-500/20 dark:text-emerald-400",
      Pending:
        "bg-amber-500/10 text-amber-700 ring-1 ring-amber-500/20 dark:text-amber-400",
      "Hidden/Flagged":
        "bg-red-500/10 text-red-700 ring-1 ring-red-500/20 dark:text-red-400",
    };

    return (
      <Badge className={`${variants[status]} border-0 font-medium text-xs`}>
        {status}
      </Badge>
    );
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? "text-amber-400 fill-amber-400"
                : "text-slate-300 dark:text-slate-600"
            }`}
          />
        ))}
      </div>
    );
  };

  const renderLargeStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-6 h-6 ${
              star <= rating
                ? "text-amber-400 fill-amber-400"
                : "text-slate-300 dark:text-slate-600"
            }`}
          />
        ))}
      </div>
    );
  };

  const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background antialiased p-4">
      <div className="space-y-6">
        {/* Summary Header */}
        {/* <div>
          <h1 className="text-3xl font-bold text-foreground">
            Customer Feedback
          </h1>
          <p className="text-muted-foreground mt-1">
            Monitor and manage service reviews and ratings
          </p>
        </div> */}

        {/* Summary Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card rounded-lg ring-1 ring-border p-6">
            <div className="flex flex-col items-center text-center">
              <p className="text-sm text-muted-foreground mb-3">
                Average Platform Rating
              </p>
              {renderLargeStars(Math.round(stats.averageRating))}
              <p className="text-4xl font-bold text-foreground mt-1 tabular-nums">
                {stats.averageRating.toFixed(1)}
              </p>
              <p className="text-sm text-muted-foreground mt-1">out of 5.0</p>
            </div>
          </div>

          <div className="bg-card rounded-lg ring-1 ring-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Reviews</p>
                <p className="text-3xl font-bold text-foreground tabular-nums mt-2">
                  {stats.totalReviews}
                </p>
                <p className="text-sm text-emerald-600 mt-1">
                  {mockReviews.filter((r) => r.status === "Published").length}{" "}
                  Published
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg ring-1 ring-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Flagged Reviews</p>
                <p className="text-3xl font-bold text-red-600 tabular-nums mt-2">
                  {stats.flaggedReviews}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Requires attention
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center">
                <Flag className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-card rounded-lg ring-1 ring-border p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by customer name or vendor name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
              </div>
            </div>
            <Select value={ratingFilter} onValueChange={setRatingFilter}>
              <SelectTrigger className="w-full md:w-52">
                <SelectValue placeholder="Rating Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
                <SelectItem value="3-below">3 Stars & Below</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-52">
                <SelectValue placeholder="Review Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Published">Published</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Hidden/Flagged">Hidden/Flagged</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Feedback Table */}
        <div className="bg-card rounded-lg ring-1 ring-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
                    Service & Vendor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
                    Comment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredReviews.map((review) => (
                  <tr
                    key={review.id}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={review.customerAvatar || undefined}
                            alt={review.customerName}
                          />
                          <AvatarFallback className="bg-purple-100 text-purple-700 font-semibold dark:bg-purple-900 dark:text-purple-300">
                            {getInitials(review.customerName)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold text-foreground">
                            {review.customerName}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {review.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        {renderStars(review.rating)}
                        <span className="text-sm font-semibold text-foreground tabular-nums">
                          {review.rating}.0
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-semibold text-foreground">
                          {review.serviceName}
                        </div>
                        <div className="text-sm text-muted-foreground mt-0.5">
                          by {review.vendorName}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 max-w-md">
                      <p className="text-sm text-foreground leading-relaxed">
                        {truncateText(review.comment, 120)}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-muted-foreground tabular-nums">
                        {formatDate(review.date)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col gap-1.5">
                        {getStatusBadge(review.status)}
                        {review.isFeatured && (
                          <Badge className="bg-amber-500/10 text-amber-700 ring-1 ring-amber-500/20 border-0 font-medium text-xs w-fit">
                            <Award className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                      </div>
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
                            View Full Conversation
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <Reply className="w-4 h-4 mr-2" />
                            Reply to Review
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <TrendingUp className="w-4 h-4 mr-2" />
                            Feature on Homepage
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete/Flag Review
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredReviews.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No reviews found matching your criteria
              </p>
            </div>
          )}
        </div>

        {/* Footer Summary */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <p>
            Showing {filteredReviews.length} of {mockReviews.length} reviews
          </p>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>
              {mockReviews.filter((r) => r.rating === 5).length} Five-Star
              Reviews
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsRatings;
