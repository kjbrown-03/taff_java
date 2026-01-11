"use client"

import { useState } from "react"
import { ReceptionLayout } from "@/components/reception/reception-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { CreditCard, Euro, RefreshCw, CheckCircle } from "lucide-react"

interface Transaction {
  id: string
  guest: string
  room: string
  amount: number
  method: string
  status: "completed" | "pending" | "refunded"
  date: string
}

const transactions: Transaction[] = [
  {
    id: "T001",
    guest: "John Smith",
    room: "201",
    amount: 178,
    method: "Credit Card",
    status: "completed",
    date: "2026-01-11 09:15",
  },
  {
    id: "T002",
    guest: "Hans Mueller",
    room: "412",
    amount: 500,
    method: "Bank Transfer",
    status: "pending",
    date: "2026-01-11 08:30",
  },
  {
    id: "T003",
    guest: "Marie Dupont",
    room: "305",
    amount: 129,
    method: "Cash",
    status: "completed",
    date: "2026-01-10 16:45",
  },
  {
    id: "T004",
    guest: "James Wilson",
    room: "102",
    amount: 89,
    method: "Credit Card",
    status: "refunded",
    date: "2026-01-10 14:20",
  },
]

const statusColors = {
  completed: "bg-green-500/20 text-green-500",
  pending: "bg-amber-500/20 text-amber-500",
  refunded: "bg-red-500/20 text-red-500",
}

export default function ReceptionPayments() {
  const [refundOpen, setRefundOpen] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)

  const handleRefund = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
    setRefundOpen(true)
  }

  const todayTotal = transactions.filter((t) => t.status === "completed").reduce((sum, t) => sum + t.amount, 0)

  const pendingTotal = transactions.filter((t) => t.status === "pending").reduce((sum, t) => sum + t.amount, 0)

  return (
    <ReceptionLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Payments</h1>
          <p className="text-muted-foreground">Process and manage transactions</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Card className="border-0 bg-card/50 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] backdrop-blur-sm">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10">
                <Euro className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Today&apos;s Revenue</p>
                <p className="text-2xl font-bold text-green-500">€{todayTotal}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 bg-card/50 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] backdrop-blur-sm">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10">
                <CreditCard className="h-6 w-6 text-amber-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending Payments</p>
                <p className="text-2xl font-bold text-amber-500">€{pendingTotal}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Payment Form */}
        <Card className="border-0 bg-card/50 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg">Process Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
              <div className="grid gap-2">
                <Label>Reservation / Room</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="R002">R002 - John Smith</SelectItem>
                    <SelectItem value="R003">R003 - Hans Mueller</SelectItem>
                    <SelectItem value="R005">R005 - James Wilson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Amount (€)</Label>
                <Input type="number" placeholder="0.00" />
              </div>
              <div className="grid gap-2">
                <Label>Method</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="card">Credit Card</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="transfer">Bank Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button className="w-full gap-2 bg-green-600 hover:bg-green-700">
                  <CheckCircle className="h-4 w-4" />
                  Process
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transactions Table */}
        <Card className="border-0 bg-card/50 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Guest</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-mono text-sm">{transaction.id}</TableCell>
                    <TableCell className="font-medium">{transaction.guest}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{transaction.room}</Badge>
                    </TableCell>
                    <TableCell className="font-semibold">€{transaction.amount}</TableCell>
                    <TableCell>{transaction.method}</TableCell>
                    <TableCell>
                      <Badge className={statusColors[transaction.status]}>
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{transaction.date}</TableCell>
                    <TableCell className="text-right">
                      {transaction.status === "completed" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 gap-1 border-red-500/30 text-red-500 hover:bg-red-500/10 bg-transparent"
                          onClick={() => handleRefund(transaction)}
                        >
                          <RefreshCw className="h-3 w-3" />
                          Refund
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Refund Modal */}
        <Dialog open={refundOpen} onOpenChange={setRefundOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Process Refund</DialogTitle>
              <DialogDescription>
                Refund for {selectedTransaction?.guest} - €{selectedTransaction?.amount}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Refund Amount (€)</Label>
                <Input type="number" defaultValue={selectedTransaction?.amount} />
              </div>
              <div className="grid gap-2">
                <Label>Reason</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select reason..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cancelled">Reservation Cancelled</SelectItem>
                    <SelectItem value="overcharge">Overcharge</SelectItem>
                    <SelectItem value="complaint">Guest Complaint</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setRefundOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-red-600 hover:bg-red-700" onClick={() => setRefundOpen(false)}>
                Confirm Refund
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </ReceptionLayout>
  )
}
