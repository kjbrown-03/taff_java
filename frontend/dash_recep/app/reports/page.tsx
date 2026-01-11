"use client"

import * as React from "react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileSpreadsheet, FileText, Calendar } from "lucide-react"

const revenueData = [
  { month: "Jan", revenue: 85000, expenses: 32000 },
  { month: "Feb", revenue: 72000, expenses: 28000 },
  { month: "Mar", revenue: 95000, expenses: 35000 },
  { month: "Apr", revenue: 88000, expenses: 31000 },
  { month: "May", revenue: 102000, expenses: 38000 },
  { month: "Jun", revenue: 118000, expenses: 42000 },
  { month: "Jul", revenue: 135000, expenses: 48000 },
  { month: "Aug", revenue: 142000, expenses: 51000 },
  { month: "Sep", revenue: 128000, expenses: 45000 },
  { month: "Oct", revenue: 115000, expenses: 40000 },
  { month: "Nov", revenue: 98000, expenses: 36000 },
  { month: "Dec", revenue: 125000, expenses: 44000 },
]

const occupancyData = [
  { name: "Single", value: 35, color: "hsl(var(--chart-1))" },
  { name: "Double", value: 40, color: "hsl(var(--chart-2))" },
  { name: "Suite", value: 15, color: "hsl(var(--chart-3))" },
  { name: "Deluxe", value: 10, color: "hsl(var(--chart-4))" },
]

const guestSourceData = [
  { source: "Direct", guests: 450 },
  { source: "Booking.com", guests: 320 },
  { source: "Expedia", guests: 180 },
  { source: "Airbnb", guests: 120 },
  { source: "Corporate", guests: 280 },
  { source: "Travel Agents", guests: 150 },
]

const weeklyOccupancy = [
  { day: "Mon", occupancy: 72 },
  { day: "Tue", occupancy: 78 },
  { day: "Wed", occupancy: 82 },
  { day: "Thu", occupancy: 88 },
  { day: "Fri", occupancy: 95 },
  { day: "Sat", occupancy: 98 },
  { day: "Sun", occupancy: 85 },
]

const tooltipStyle = {
  backgroundColor: "hsl(var(--popover))",
  borderColor: "hsl(var(--border))",
  borderRadius: "8px",
  color: "hsl(var(--foreground))",
}

export default function ReportsPage() {
  const [dateRange, setDateRange] = React.useState("year")

  const exportPDF = () => {
    // Placeholder for PDF export
    alert("PDF export would be implemented with a library like jsPDF")
  }

  const exportExcel = () => {
    // Placeholder for Excel export
    const data = revenueData.map((item) => ({
      Month: item.month,
      Revenue: item.revenue,
      Expenses: item.expenses,
      Profit: item.revenue - item.expenses,
    }))
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Month,Revenue,Expenses,Profit", ...data.map((row) => Object.values(row).join(","))].join("\n")

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "revenue_report.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground lg:text-3xl">Reports</h1>
            <p className="text-muted-foreground">Analytics and performance insights.</p>
          </div>
          <div className="flex gap-2">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[150px] bg-muted/50">
                <Calendar className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={exportPDF}>
              <FileText className="mr-2 h-4 w-4" />
              PDF
            </Button>
            <Button variant="outline" onClick={exportExcel}>
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Excel
            </Button>
          </div>
        </div>

        {/* Revenue Chart */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue and expenses for the year</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickFormatter={(value) => `€${value / 1000}k`}
                  />
                  <Tooltip
                    contentStyle={tooltipStyle}
                    formatter={(value: number) => [`€${value.toLocaleString()}`, undefined]}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", r: 4 }}
                    name="Revenue"
                  />
                  <Line
                    type="monotone"
                    dataKey="expenses"
                    stroke="hsl(var(--destructive))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--destructive))", r: 3 }}
                    name="Expenses"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Room Type Occupancy */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Occupancy by Room Type</CardTitle>
              <CardDescription>Distribution of bookings across room categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={occupancyData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {occupancyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => [`${value}%`, "Occupancy"]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex flex-wrap justify-center gap-4">
                {occupancyData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-muted-foreground">{item.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Guest Sources */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Guest Sources</CardTitle>
              <CardDescription>Where your guests are coming from</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={guestSourceData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                    <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis
                      dataKey="source"
                      type="category"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      width={90}
                    />
                    <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => [value, "Guests"]} />
                    <Bar dataKey="guests" fill="hsl(var(--accent))" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Occupancy */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Weekly Occupancy Pattern</CardTitle>
            <CardDescription>Average occupancy rate by day of the week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyOccupancy}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(value) => `${value}%`} />
                  <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => [`${value}%`, "Occupancy"]} />
                  <Bar dataKey="occupancy" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats Summary */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="glass-card">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">Total Revenue YTD</p>
              <p className="mt-1 text-2xl font-bold text-foreground">€1,303,000</p>
              <p className="mt-1 text-sm text-success">+18.5% vs last year</p>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">Average Daily Rate</p>
              <p className="mt-1 text-2xl font-bold text-foreground">€156</p>
              <p className="mt-1 text-sm text-success">+8.2% vs last year</p>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">RevPAR</p>
              <p className="mt-1 text-2xl font-bold text-foreground">€135</p>
              <p className="mt-1 text-sm text-success">+12.1% vs last year</p>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">Avg. Length of Stay</p>
              <p className="mt-1 text-2xl font-bold text-foreground">3.2 nights</p>
              <p className="mt-1 text-sm text-muted-foreground">Stable</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
