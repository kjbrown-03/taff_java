"use client"

import { useState } from "react"
import { ReceptionLayout } from "@/components/reception/reception-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, UserCheck, LogOut, Edit } from "lucide-react"

interface Reservation {
  id: string
  guest: string
  room: string
  checkIn: string
  checkOut: string
  status: "pending" | "checked-in" | "checked-out"
  total: number
}

const reservations: Reservation[] = [
  {
    id: "R001",
    guest: "Marie Dupont",
    room: "305",
    checkIn: "2026-01-11",
    checkOut: "2026-01-14",
    status: "pending",
    total: 387,
  },
  {
    id: "R002",
    guest: "John Smith",
    room: "201",
    checkIn: "2026-01-09",
    checkOut: "2026-01-11",
    status: "checked-in",
    total: 178,
  },
  {
    id: "R003",
    guest: "Hans Mueller",
    room: "412",
    checkIn: "2026-01-10",
    checkOut: "2026-01-15",
    status: "checked-in",
    total: 1245,
  },
  {
    id: "R004",
    guest: "Sophie Martin",
    room: "508",
    checkIn: "2026-01-11",
    checkOut: "2026-01-13",
    status: "pending",
    total: 378,
  },
  {
    id: "R005",
    guest: "James Wilson",
    room: "102",
    checkIn: "2026-01-08",
    checkOut: "2026-01-11",
    status: "checked-in",
    total: 267,
  },
]

const statusColors = {
  pending: "bg-amber-500/20 text-amber-500",
  "checked-in": "bg-green-500/20 text-green-500",
  "checked-out": "bg-muted text-muted-foreground",
}

export default function ReceptionReservations() {
  const [search, setSearch] = useState("")
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null)
  const [editOpen, setEditOpen] = useState(false)

  const filteredReservations = reservations.filter(
    (res) =>
      res.guest.toLowerCase().includes(search.toLowerCase()) ||
      res.id.toLowerCase().includes(search.toLowerCase()) ||
      res.room.includes(search),
  )

  const handleEdit = (reservation: Reservation) => {
    setSelectedReservation(reservation)
    setEditOpen(true)
  }

  return (
    <ReceptionLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Today&apos;s Reservations</h1>
            <p className="text-muted-foreground">Manage check-ins and check-outs</p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by guest, ID, room..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Reservations Table */}
        <Card className="border-0 bg-card/50 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg">Reservations</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Guest</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Check-In</TableHead>
                  <TableHead>Check-Out</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReservations.map((reservation) => (
                  <TableRow key={reservation.id}>
                    <TableCell className="font-mono text-sm">{reservation.id}</TableCell>
                    <TableCell className="font-medium">{reservation.guest}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{reservation.room}</Badge>
                    </TableCell>
                    <TableCell>{reservation.checkIn}</TableCell>
                    <TableCell>{reservation.checkOut}</TableCell>
                    <TableCell>
                      <Badge className={statusColors[reservation.status]}>
                        {reservation.status === "checked-in"
                          ? "Checked In"
                          : reservation.status === "checked-out"
                            ? "Checked Out"
                            : "Pending"}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-semibold">€{reservation.total}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        {reservation.status === "pending" && (
                          <Button size="sm" className="h-8 gap-1 bg-primary">
                            <UserCheck className="h-3 w-3" />
                            Check-In
                          </Button>
                        )}
                        {reservation.status === "checked-in" && (
                          <Button size="sm" className="h-8 gap-1 bg-amber-500 hover:bg-amber-600">
                            <LogOut className="h-3 w-3" />
                            Check-Out
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0"
                          onClick={() => handleEdit(reservation)}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Edit Modal */}
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Reservation {selectedReservation?.id}</DialogTitle>
              <DialogDescription>Update reservation details</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Guest</Label>
                <Input defaultValue={selectedReservation?.guest} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Check-In</Label>
                  <Input type="date" defaultValue={selectedReservation?.checkIn} />
                </div>
                <div className="grid gap-2">
                  <Label>Check-Out</Label>
                  <Input type="date" defaultValue={selectedReservation?.checkOut} />
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Room</Label>
                <Select defaultValue={selectedReservation?.room}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="201">Room 201 - Single</SelectItem>
                    <SelectItem value="305">Room 305 - Double</SelectItem>
                    <SelectItem value="412">Room 412 - Suite</SelectItem>
                    <SelectItem value="508">Room 508 - Deluxe</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setEditOpen(false)}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </ReceptionLayout>
  )
}
