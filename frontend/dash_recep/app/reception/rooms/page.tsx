"use client"

import { useState } from "react"
import { ReceptionLayout } from "@/components/reception/reception-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Search, Bed, Upload } from "lucide-react"

interface Room {
  id: string
  number: string
  type: string
  status: "available" | "occupied" | "cleaning" | "maintenance"
  floor: number
  price: number
  image: string
}

const rooms: Room[] = [
  {
    id: "1",
    number: "201",
    type: "Single",
    status: "available",
    floor: 2,
    price: 89,
    image: "/hotel-single-bedroom.jpg",
  },
  {
    id: "2",
    number: "202",
    type: "Single",
    status: "occupied",
    floor: 2,
    price: 89,
    image: "/hotel-single-bedroom.jpg",
  },
  {
    id: "3",
    number: "305",
    type: "Double",
    status: "available",
    floor: 3,
    price: 129,
    image: "/hotel-room-double.png",
  },
  { id: "4", number: "306", type: "Double", status: "cleaning", floor: 3, price: 129, image: "/hotel-room-double.png" },
  { id: "5", number: "412", type: "Suite", status: "occupied", floor: 4, price: 249, image: "/luxury-hotel-suite.png" },
  {
    id: "6",
    number: "508",
    type: "Deluxe",
    status: "maintenance",
    floor: 5,
    price: 189,
    image: "/hotel-deluxe-room.png",
  },
]

const statusColors = {
  available: "bg-green-500/20 text-green-500 border-green-500/30",
  occupied: "bg-primary/20 text-primary border-primary/30",
  cleaning: "bg-amber-500/20 text-amber-500 border-amber-500/30",
  maintenance: "bg-red-500/20 text-red-500 border-red-500/30",
}

export default function ReceptionRooms() {
  const [search, setSearch] = useState("")
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [editOpen, setEditOpen] = useState(false)

  const filteredRooms = rooms.filter(
    (room) =>
      room.number.toLowerCase().includes(search.toLowerCase()) ||
      room.type.toLowerCase().includes(search.toLowerCase()),
  )

  const handleEdit = (room: Room) => {
    setSelectedRoom(room)
    setEditOpen(true)
  }

  return (
    <ReceptionLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Rooms</h1>
            <p className="text-muted-foreground">View and update room status</p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search rooms..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredRooms.map((room) => (
            <Card
              key={room.id}
              className="group cursor-pointer overflow-hidden border-0 bg-card/50 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] backdrop-blur-sm transition-all hover:shadow-lg"
              onClick={() => handleEdit(room)}
            >
              <div className="relative h-32 overflow-hidden">
                <img
                  src={room.image || "/placeholder.svg"}
                  alt={`Room ${room.number}`}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
                <Badge className={`absolute right-2 top-2 ${statusColors[room.status]}`}>
                  {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
                </Badge>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bed className="h-4 w-4 text-muted-foreground" />
                    <span className="font-bold">Room {room.number}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">Floor {room.floor}</span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{room.type}</span>
                  <span className="font-semibold text-primary">€{room.price}/night</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Edit Modal */}
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Room {selectedRoom?.number}</DialogTitle>
              <DialogDescription>Update room status</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Status</Label>
                <Select defaultValue={selectedRoom?.status}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="occupied">Occupied</SelectItem>
                    <SelectItem value="cleaning">Cleaning</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Upload Room Photo</Label>
                <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 p-6">
                  <div className="text-center">
                    <Upload className="mx-auto h-6 w-6 text-muted-foreground" />
                    <p className="mt-1 text-xs text-muted-foreground">Drag & drop or click</p>
                    <Input type="file" accept="image/*" className="mt-2 max-w-[160px]" />
                  </div>
                </div>
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
