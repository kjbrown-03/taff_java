"use client"

import * as React from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import {
  ArrowUpDown,
  MoreHorizontal,
  Download,
  Filter,
  RefreshCcw,
  CreditCard,
  DollarSign,
  TrendingUp,
  AlertCircle,
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { DataTable, Checkbox } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Payment {
  id: string
  guest: string
  guestEmail: string
  amount: number
  method: "card" | "cash" | "bank_transfer" | "paypal"
  status: "completed" | "pending" | "refunded" | "failed"
  date: Date
  description: string
  room?: string
}

const initialPayments: Payment[] = [
  {
    id: "PAY-001",
    guest: "John Smith",
    guestEmail: "john@email.com",
    amount: 1250,
    method: "card",
    status: "completed",
    date: new Date(2026, 0, 11),
    description: "Room 101 - 5 nights",
    room: "101",
  },
  {
    id: "PAY-002",
    guest: "Marie Dupont",
    guestEmail: "marie@email.com",
    amount: 890,
    method: "card",
    status: "completed",
    date: new Date(2026, 0, 10),
    description: "Room 204 - 3 nights + Spa",
    room: "204",
  },
  {
    id: "PAY-003",
    guest: "Hans Mueller",
    guestEmail: "hans@email.com",
    amount: 2100,
    method: "bank_transfer",
    status: "pending",
    date: new Date(2026, 0, 9),
    description: "Suite 305 - 7 nights",
    room: "305",
  },
  {
    id: "PAY-004",
    guest: "Sophie Martin",
    guestEmail: "sophie@email.com",
    amount: 450,
    method: "paypal",
    status: "refunded",
    date: new Date(2026, 0, 8),
    description: "Room 102 - Cancelled booking",
    room: "102",
  },
  {
    id: "PAY-005",
    guest: "James Wilson",
    guestEmail: "james@email.com",
    amount: 75,
    method: "cash",
    status: "completed",
    date: new Date(2026, 0, 11),
    description: "Airport Transfer",
  },
  {
    id: "PAY-006",
    guest: "Emma Brown",
    guestEmail: "emma@email.com",
    amount: 1680,
    method: "card",
    status: "failed",
    date: new Date(2026, 0, 7),
    description: "Room 302 - Payment declined",
    room: "302",
  },
]

const statusColors: Record<Payment["status"], string> = {
  completed: "bg-success/20 text-success border-success/30",
  pending: "bg-chart-4/20 text-chart-4 border-chart-4/30",
  refunded: "bg-primary/20 text-primary border-primary/30",
  failed: "bg-destructive/20 text-destructive border-destructive/30",
}

const methodLabels: Record<Payment["method"], string> = {
  card: "Credit Card",
  cash: "Cash",
  bank_transfer: "Bank Transfer",
  paypal: "PayPal",
}

export default function PaymentsPage() {
  const [payments, setPayments] = React.useState<Payment[]>(initialPayments)
  const [statusFilter, setStatusFilter] = React.useState<string>("all")
  const [refundDialogOpen, setRefundDialogOpen] = React.useState(false)
  const [selectedPayment, setSelectedPayment] = React.useState<Payment | null>(null)
  const [refundAmount, setRefundAmount] = React.useState("")

  const filteredPayments = React.useMemo(() => {
    if (statusFilter === "all") return payments
    return payments.filter((p) => p.status === statusFilter)
  }, [payments, statusFilter])

  const stats = React.useMemo(() => {
    const completed = payments.filter((p) => p.status === "completed")
    const pending = payments.filter((p) => p.status === "pending")
    const totalRevenue = completed.reduce((sum, p) => sum + p.amount, 0)
    const pendingAmount = pending.reduce((sum, p) => sum + p.amount, 0)
    return {
      totalRevenue,
      pendingAmount,
      completedCount: completed.length,
      pendingCount: pending.length,
    }
  }, [payments])

  const handleRefund = (payment: Payment) => {
    setSelectedPayment(payment)
    setRefundAmount(payment.amount.toString())
    setRefundDialogOpen(true)
  }

  const confirmRefund = () => {
    if (selectedPayment) {
      setPayments(payments.map((p) => (p.id === selectedPayment.id ? { ...p, status: "refunded" as const } : p)))
      setSelectedPayment(null)
    }
    setRefundDialogOpen(false)
  }

  const exportToCSV = () => {
    const headers = ["ID", "Guest", "Amount", "Method", "Status", "Date", "Description"]
    const csvContent = [
      headers.join(","),
      ...payments.map((p) =>
        [p.id, p.guest, p.amount, p.method, p.status, format(p.date, "yyyy-MM-dd"), p.description].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "payments.csv"
    a.click()
  }

  const columns: ColumnDef<Payment>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: "Transaction ID",
      cell: ({ row }) => <span className="font-mono text-sm">{row.getValue("id")}</span>,
    },
    {
      accessorKey: "guest",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Guest
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div>
          <p className="font-medium">{row.getValue("guest")}</p>
          <p className="text-xs text-muted-foreground">{row.original.guestEmail}</p>
        </div>
      ),
    },
    {
      accessorKey: "amount",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <span className="font-semibold">€{row.getValue("amount")}</span>,
    },
    {
      accessorKey: "method",
      header: "Method",
      cell: ({ row }) => methodLabels[row.getValue("method") as Payment["method"]],
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as Payment["status"]
        return (
          <Badge variant="outline" className={statusColors[status]}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        )
      },
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => format(row.getValue("date"), "MMM dd, yyyy"),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => <span className="max-w-[200px] truncate">{row.getValue("description")}</span>,
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const payment = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" />
                Download Receipt
              </DropdownMenuItem>
              {payment.status === "completed" && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleRefund(payment)} className="text-destructive">
                    <RefreshCcw className="mr-2 h-4 w-4" />
                    Process Refund
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground lg:text-3xl">Payments</h1>
            <p className="text-muted-foreground">Track transactions and manage refunds.</p>
          </div>
          <Button variant="outline" onClick={exportToCSV}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>

        {/* Stats cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="glass-card">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success/10">
                <DollarSign className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">€{stats.totalRevenue.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-4/10">
                <TrendingUp className="h-6 w-6 text-chart-4" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">€{stats.pendingAmount.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{stats.completedCount}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10">
                <AlertCircle className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">{stats.pendingCount}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px] bg-muted/50">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="refunded">Refunded</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="glass-card rounded-xl p-6">
          <DataTable
            columns={columns}
            data={filteredPayments}
            searchKey="guest"
            searchPlaceholder="Search payments..."
          />
        </div>
      </div>

      <Dialog open={refundDialogOpen} onOpenChange={setRefundDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Process Refund</DialogTitle>
            <DialogDescription>
              Refund payment {selectedPayment?.id} for {selectedPayment?.guest}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="refundAmount">Refund Amount (€)</Label>
              <Input
                id="refundAmount"
                type="number"
                value={refundAmount}
                onChange={(e) => setRefundAmount(e.target.value)}
                max={selectedPayment?.amount}
              />
              <p className="text-xs text-muted-foreground">Original amount: €{selectedPayment?.amount}</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRefundDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmRefund} className="bg-destructive text-destructive-foreground">
              <RefreshCcw className="mr-2 h-4 w-4" />
              Process Refund
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
