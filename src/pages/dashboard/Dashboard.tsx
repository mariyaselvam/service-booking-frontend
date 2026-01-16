"use client";

import React from "react";
import {
  Users,
  Store,
  CalendarCheck,
  IndianRupee,
  TrendingUp,
  ArrowUpRight,
  Wrench,
  Home,
  Zap,
  ShieldCheck,
  MapPin,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  PolarGrid,
  RadialBar,
  RadialBarChart,
  PolarRadiusAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// --- Mock Data ---
const revenueData = [
  { month: "Jan", revenue: 45000 },
  { month: "Feb", revenue: 52000 },
  { month: "Mar", revenue: 48000 },
  { month: "Apr", revenue: 61000 },
  { month: "May", revenue: 55000 },
  { month: "Jun", revenue: 72000 },
];

const completionData = [
  { name: "Completed", value: 85, fill: "var(--color-completed)" },
];

const chartConfig = {
  revenue: { label: "Revenue", color: "hsl(var(--primary))" },
  completed: { label: "Completed", color: "hsl(var(--chart-2))" },
} satisfies ChartConfig;

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 p-2 lg:p-6 space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Platform Analytics
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="hidden sm:flex shadow-sm">
            Schedule Report
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200 dark:shadow-none transition-all">
            + Register Vendor
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Users"
          value="1,245"
          change="+12.5%"
          icon={<Users />}
          color="blue"
        />
        <StatCard
          title="Active Vendors"
          value="312"
          change="+4"
          icon={<Store />}
          color="purple"
        />
        <StatCard
          title="Today's Bookings"
          value="86"
          change="-2.1%"
          icon={<CalendarCheck />}
          color="amber"
        />
        <StatCard
          title="Net Revenue"
          value="₹54,200"
          change="+18%"
          icon={<IndianRupee />}
          color="emerald"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <Card className="lg:col-span-8 border-none shadow-sm ring-1 ring-slate-200 dark:ring-slate-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Revenue Trajectory</CardTitle>
              <CardDescription>
                Visualizing platform earnings over 6 months
              </CardDescription>
            </div>
            <Badge variant="outline" className="font-mono">
              FY 2024-25
            </Badge>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80 w-full">
              <AreaChart data={revenueData} margin={{ left: -20, right: 10 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-revenue)"
                      stopOpacity={0.1}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-revenue)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="3 3"
                  className="stroke-slate-200 dark:stroke-slate-800"
                />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={15}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--color-revenue)"
                  strokeWidth={3}
                  fill="url(#colorRev)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-4 border-none shadow-sm ring-1 ring-slate-200 dark:ring-slate-800">
          <CardHeader>
            <CardTitle className="text-lg text-center">
              Completion Rate
            </CardTitle>
            <CardDescription className="text-center">
              Successful vs Cancelled bookings
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square h-50"
            >
              <RadialBarChart
                data={completionData}
                startAngle={90}
                endAngle={450}
                innerRadius={80}
                outerRadius={110}
              >
                <PolarGrid
                  gridType="circle"
                  radialLines={false}
                  stroke="none"
                  className="first:fill-muted last:fill-background"
                  polarRadius={[86, 74]}
                />
                <RadialBar dataKey="value" background cornerRadius={10} />
                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x="50%"
                      y="50%"
                      className="fill-foreground text-3xl font-bold"
                    >
                      85%
                    </tspan>
                    <tspan
                      x="50%"
                      y="65%"
                      className="fill-muted-foreground text-xs"
                    >
                      Target: 90%
                    </tspan>
                  </text>
                </PolarRadiusAxis>
              </RadialBarChart>
            </ChartContainer>
            <div className="w-full space-y-3 mt-4">
              <CategoryProgress
                label="Cleaning"
                value={75}
                icon={<Home size={14} />}
              />
              <CategoryProgress
                label="Electrical"
                value={45}
                icon={<Zap size={14} />}
              />
              <CategoryProgress
                label="Repair"
                value={90}
                icon={<Wrench size={14} />}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <Card className="lg:col-span-7 border-none shadow-sm ring-1 ring-slate-200 dark:ring-slate-800">
          <CardHeader>
            <CardTitle className="text-lg">Live Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader className="bg-slate-50 dark:bg-slate-900/50">
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <BookingRow
                  name="Rahul Sharma"
                  img="https://i.pravatar.cc/150?u=1"
                  service="AC Deep Clean"
                  area="R.S Puram"
                  status="Success"
                />
                <BookingRow
                  name="Anjali Nair"
                  img="https://i.pravatar.cc/150?u=2"
                  service="Full House Painting"
                  area="Peelamedu"
                  status="Pending"
                />
                <BookingRow
                  name="Karthik R."
                  img="https://i.pravatar.cc/150?u=3"
                  service="Socket Repair"
                  area="Gandhipuram"
                  status="Success"
                />
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="lg:col-span-5 border-none shadow-sm ring-1 ring-slate-200 dark:ring-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
              <ShieldCheck size={20} /> Top Rated Vendors
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <VendorItem name="ProClean Services" rating="4.9" jobs="128" />
            <VendorItem name="Electra Fix" rating="4.8" jobs="94" />
            <VendorItem name="Modern Plumbers" rating="4.7" jobs="210" />
            <Button
              variant="ghost"
              className="w-full text-indigo-600 dark:text-indigo-400"
            >
              View Rankings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};


const StatCard = ({ title, value, change, icon, color }: any) => (
  <Card className="relative overflow-hidden border-none shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 transition-all hover:ring-indigo-500/50 group">
    <CardContent className="p-6">
      <div
        className={`absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform`}
      >
        {React.cloneElement(icon, { size: 64 })}
      </div>
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {title}
          </p>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
            {value}
          </h3>
          <p
            className={`text-xs font-bold ${
              change.startsWith("+") ? "text-emerald-500" : "text-rose-500"
            } flex items-center gap-1`}
          >
            {change.startsWith("+") ? (
              <TrendingUp size={12} />
            ) : (
              <ArrowUpRight className="rotate-90" size={12} />
            )}{" "}
            {change}
          </p>
        </div>
        <div className={`p-3 rounded-xl bg-${color}-500/10 text-${color}-600`}>
          {React.cloneElement(icon, { size: 20 })}
        </div>
      </div>
    </CardContent>
  </Card>
);

const CategoryProgress = ({ label, value, icon }: any) => (
  <div className="w-full space-y-1">
    <div className="flex justify-between text-xs font-bold">
      <span className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
        {icon} {label}
      </span>
      <span>{value}%</span>
    </div>
    <Progress value={value} className="h-1.5" />
  </div>
);

const BookingRow = ({ name, img, service, area, status }: any) => (
  <TableRow className="group">
    <TableCell className="flex items-center gap-3">
      <Avatar className="h-9 w-9 border-2 border-background shadow-sm">
        <AvatarImage src={img} />
        <AvatarFallback>{name[0]}</AvatarFallback>
      </Avatar>
      <div className="font-bold text-sm tracking-tight">{name}</div>
    </TableCell>
    <TableCell className="font-medium text-slate-600 dark:text-slate-400">
      {service}
    </TableCell>
    <TableCell className="text-slate-500 text-xs">
      <div className="flex items-center gap-1">
        <MapPin size={12} /> {area}
      </div>
    </TableCell>
    <TableCell className="text-right">
      <Badge
        variant={status === "Success" ? "secondary" : "outline"}
        className={
          status === "Success"
            ? "bg-emerald-50 text-emerald-700"
            : "bg-amber-50 text-amber-700"
        }
      >
        {status}
      </Badge>
    </TableCell>
  </TableRow>
);

const VendorItem = ({ name, rating, jobs }: any) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-indigo-600">
        {name[0]}
      </div>
      <div>
        <div className="text-sm font-bold">{name}</div>
        <div className="text-[10px] text-slate-500 font-semibold">
          {jobs} Completed Jobs
        </div>
      </div>
    </div>
    <div className="text-right">
      <div className="text-sm font-black text-slate-900 dark:text-white">
        {rating} ⭐
      </div>
    </div>
  </div>
);

export default Dashboard;
