"use client"

import * as React from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { ArrowUpDown, MoreHorizontal, Plus, Trash2, Edit, Download, Filter } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { DataTable, Checkbox } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ReservationModal, type Reservation } from "@/components/reservations/reservation-modal"

const initialReservations: Reservation[] = [
  {
    id: "1",
    guestName: "John Smith",
    guestEmail: "john@email.com",
    room: "101",
    checkIn: new Date(2026, 0, 12),
    checkOut: new Date(2026, 0, 15),
    status: "confirmed",
    totalAmount: 356,
  },
  {
    id: "2",
    guestName: "Marie Dupont",
    guestEmail: "marie@email.com",
    room: "204",
    checkIn: new Date(2026, 0, 10),
    checkOut: new Date(2026, 0, 13),
    status: "checked-in",
    totalAmount: 516,
  },
  {
    id: "3",
    guestName: "Hans Mueller",
    guestEmail: "hans@email.com",
    room: "305",
    checkIn: new Date(2026, 0, 8),
    checkOut: new Date(2026, 0, 11),
    status: "checked-out",
    totalAmount: 897,
  },
  {
    id: "4",
    guestName: "Sophie Martin",
    guestEmail: "sophie@email.com",
    room: "201",
    checkIn: new Date(2026, 0, 15),
    checkOut: new Date(2026, 0, 20),
    status: "pending",
    totalAmount: 1245,
  },
  {
    id: "5",
    guestName: "James Wilson",
    guestEmail: "james@email.com",
    room: "102",
    checkIn: new Date(2026, 0, 5),
    checkOut: new Date(2026, 0, 7),
    status: "cancelled",
    totalAmount: 258,
  },
  {
    id: "6",
    guestName: "Emma Brown",
    guestEmail: "emma@email.com",
    room: "302",
    checkIn: new Date(2026, 0, 18),
    checkOut: new Date(2026, 0, 22),
    status: "confirmed",
    totalAmount: 632,
  },
]

const statusColors: Record<Reservation["status"], string> = {
  confirmed: "bg-success/20 text-success border-success/30",
  pending: "bg-chart-4/20 text-chart-4 border-chart-4/30",
  "checked-in": "bg-primary/20 text-primary border-primary/30",
  "checked-out": "bg-muted text-muted-foreground border-muted-foreground/30",
  cancelled: "bg-destructive/20 text-destructive border-destructive/30",
}

export default function ReservationsPage() {
  const [reservations, setReservations] = React.useState<Reservation[]>(initialReservations)
  const [modalOpen, setModalOpen] = React.useState(false)
  const [selectedReservation, setSelectedReservation] = React.useState<Reservation | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const [reservationToDelete, setReservationToDelete] = React.useState<Reservation | null>(null)
  const [statusFilter, setStatusFilter] = React.useState<string>("all")

  const filteredReservations = React.useMemo(() => {
    if (statusFilter === "all") return reservations
    return reservations.filter((r) => r.status === statusFilter)
  }, [reservations, statusFilter])

  const handleAddReservation = () => {
    setSelectedReservation(null)
    setModalOpen(true)
  }

  const handleEditReservation = (reservation: Reservation) => {
    setSelectedReservation(reservation)
    setModalOpen(true)
  }

  const handleDeleteReservation = (reservation: Reservation) => {
    setReservationToDelete(reservation)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (reservationToDelete) {
      setReservations(reservations.filter((r) => r.id !== reservationToDelete.id))
      setReservationToDelete(null)
    }
    setDeleteDialogOpen(false)
  }

  const handleSaveReservation = (reservationData: Partial<Reservation>) => {
    if (selectedReservation) {
      setReservations(reservations.map((r) => (r.id === selectedReservation.id ? { ...r, ...reservationData } : r)))
    } else {
      const newReservation: Reservation = {
        id: Date.now().toString(),
        guestName: reservationData.guestName || "",
        guestEmail: reservationData.guestEmail || "",
        room: reservationData.room || "",
        checkIn: reservationData.checkIn || new Date(),
        checkOut: reservationData.checkOut || new Date(),
        status: reservationData.status || "pending",
        totalAmount: reservationData.totalAmount || 0,
        notes: reservationData.notes,
      }
      setReservations([...reservations, newReservation])
    }
  }

  const exportToCSV = () => {
    const headers = ["Guest", "Email", "Room", "Check-in", "Check-out", "Status", "Amount"]
    const csvContent = [
      headers.join(","),
      ...reservations.map((r) =>
        [
          r.guestName,
          r.guestEmail,
          r.room,
          format(r.checkIn, "yyyy-MM-dd"),
          format(r.checkOut, "yyyy-MM-dd"),
          r.status,
          r.totalAmount,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "reservations.csv"
    a.click()
  }

  const columns: ColumnDef<Reservation>[] = [
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
      accessorKey: "guestName",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Guest
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div>
          <p className="font-medium">{row.getValue("guestName")}</p>
          <p className="text-xs text-muted-foreground">{row.original.guestEmail}</p>
        </div>
      ),
    },
    {
      accessorKey: "room",
      header: "Room",
      cell: ({ row }) => <span className="font-medium">#{row.getValue("room")}</span>,
    },
    {
      accessorKey: "checkIn",
      header: "Check-in",
      cell: ({ row }) => format(row.getValue("checkIn"), "MMM dd, yyyy"),
    },
    {
      accessorKey: "checkOut",
      header: "Check-out",
      cell: ({ row }) => format(row.getValue("checkOut"), "MMM dd, yyyy"),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as Reservation["status"]
        return (
          <Badge variant="outline" className={statusColors[status]}>
            {status.replace("-", " ").charAt(0).toUpperCase() + status.replace("-", " ").slice(1)}
          </Badge>
        )
      },
    },
    {
      accessorKey: "totalAmount",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <span className="font-medium">€{row.getValue("totalAmount")}</span>,
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const reservation = row.original
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
              <DropdownMenuItem onClick={() => handleEditReservation(reservation)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleDeleteReservation(reservation)} className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
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
            <h1 className="text-2xl font-bold tracking-tight text-foreground lg:text-3xl">Reservations</h1>
            <p className="text-muted-foreground">Manage bookings and guest reservations.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={exportToCSV}>
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
            <Button onClick={handleAddReservation}>
              <Plus className="mr-2 h-4 w-4" />
              New Reservation
            </Button>
          </div>
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
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="checked-in">Checked In</SelectItem>
              <SelectItem value="checked-out">Checked Out</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="glass-card rounded-xl p-6">
          <DataTable
            columns={columns}
            data={filteredReservations}
            searchKey="guestName"
            searchPlaceholder="Search reservations..."
          />
        </div>
      </div>

      <ReservationModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        reservation={selectedReservation}
        onSave={handleSaveReservation}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the reservation for {reservationToDelete?.guestName}. This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  )
}
