"use client"

import * as React from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Plus, Trash2, Edit, Download } from "lucide-react"
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
import { RoomModal, type Room } from "@/components/rooms/room-modal"

const initialRooms: Room[] = [
  { id: "1", number: "101", type: "single", status: "available", price: 89, photo: "/hotel-room-single.jpg" },
  { id: "2", number: "102", type: "double", status: "occupied", price: 129, photo: "/hotel-room-double.png" },
  { id: "3", number: "201", type: "suite", status: "available", price: 249, photo: "/luxury-hotel-suite.png" },
  { id: "4", number: "202", type: "deluxe", status: "maintenance", price: 189, photo: "/hotel-deluxe-room.png" },
  { id: "5", number: "203", type: "double", status: "reserved", price: 129, photo: "/hotel-room-double-bed.jpg" },
  { id: "6", number: "301", type: "suite", status: "occupied", price: 299, photo: "/hotel-penthouse-suite.jpg" },
  { id: "7", number: "302", type: "single", status: "available", price: 79, photo: "/hotel-single-bedroom.jpg" },
  { id: "8", number: "303", type: "deluxe", status: "available", price: 199, photo: "/hotel-deluxe-bedroom.jpg" },
]

const statusColors: Record<Room["status"], string> = {
  available: "bg-success/20 text-success border-success/30",
  occupied: "bg-primary/20 text-primary border-primary/30",
  maintenance: "bg-chart-4/20 text-chart-4 border-chart-4/30",
  reserved: "bg-accent/20 text-accent border-accent/30",
}

const typeLabels: Record<Room["type"], string> = {
  single: "Single",
  double: "Double",
  suite: "Suite",
  deluxe: "Deluxe",
}

export default function RoomsPage() {
  const [rooms, setRooms] = React.useState<Room[]>(initialRooms)
  const [modalOpen, setModalOpen] = React.useState(false)
  const [selectedRoom, setSelectedRoom] = React.useState<Room | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const [roomToDelete, setRoomToDelete] = React.useState<Room | null>(null)
  const [selectedRows, setSelectedRows] = React.useState<string[]>([])

  const handleAddRoom = () => {
    setSelectedRoom(null)
    setModalOpen(true)
  }

  const handleEditRoom = (room: Room) => {
    setSelectedRoom(room)
    setModalOpen(true)
  }

  const handleDeleteRoom = (room: Room) => {
    setRoomToDelete(room)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (roomToDelete) {
      setRooms(rooms.filter((r) => r.id !== roomToDelete.id))
      setRoomToDelete(null)
    }
    setDeleteDialogOpen(false)
  }

  const handleSaveRoom = (roomData: Partial<Room>) => {
    if (selectedRoom) {
      setRooms(rooms.map((r) => (r.id === selectedRoom.id ? { ...r, ...roomData } : r)))
    } else {
      const newRoom: Room = {
        id: Date.now().toString(),
        number: roomData.number || "",
        type: roomData.type || "single",
        status: roomData.status || "available",
        price: roomData.price || 0,
        photo: roomData.photo,
      }
      setRooms([...rooms, newRoom])
    }
  }

  const handleBulkDelete = () => {
    setRooms(rooms.filter((r) => !selectedRows.includes(r.id)))
    setSelectedRows([])
  }

  const exportToCSV = () => {
    const headers = ["Room Number", "Type", "Status", "Price"]
    const csvContent = [
      headers.join(","),
      ...rooms.map((room) => [room.number, room.type, room.status, room.price].join(",")),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "rooms.csv"
    a.click()
  }

  const columns: ColumnDef<Room>[] = [
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
      accessorKey: "photo",
      header: "Photo",
      cell: ({ row }) => (
        <img
          src={row.getValue("photo") || "/placeholder.svg?height=50&width=80&query=hotel room"}
          alt={`Room ${row.getValue("number")}`}
          className="h-10 w-16 rounded object-cover"
        />
      ),
    },
    {
      accessorKey: "number",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Room Number
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <span className="font-medium">#{row.getValue("number")}</span>,
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => <span className="capitalize">{typeLabels[row.getValue("type") as Room["type"]]}</span>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as Room["status"]
        return (
          <Badge variant="outline" className={statusColors[status]}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        )
      },
    },
    {
      accessorKey: "price",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Price/Night
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <span className="font-medium">€{row.getValue("price")}</span>,
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const room = row.original
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
              <DropdownMenuItem onClick={() => handleEditRoom(room)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleDeleteRoom(room)} className="text-destructive">
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
            <h1 className="text-2xl font-bold tracking-tight text-foreground lg:text-3xl">Rooms</h1>
            <p className="text-muted-foreground">Manage your hotel rooms and availability.</p>
          </div>
          <div className="flex gap-2">
            {selectedRows.length > 0 && (
              <Button variant="destructive" onClick={handleBulkDelete}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete ({selectedRows.length})
              </Button>
            )}
            <Button variant="outline" onClick={exportToCSV}>
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
            <Button onClick={handleAddRoom}>
              <Plus className="mr-2 h-4 w-4" />
              Add Room
            </Button>
          </div>
        </div>

        <div className="glass-card rounded-xl p-6">
          <DataTable columns={columns} data={rooms} searchKey="number" searchPlaceholder="Search rooms..." />
        </div>
      </div>

      <RoomModal open={modalOpen} onOpenChange={setModalOpen} room={selectedRoom} onSave={handleSaveRoom} />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete room #{roomToDelete?.number}. This action cannot be undone.
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
