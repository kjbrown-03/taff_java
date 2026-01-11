"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"

interface Reservation {
  id: string
  guest: string
  room: string
  type: "checkin" | "checkout" | "staying"
  time?: string
}

const todayReservations: Reservation[] = [
  { id: "1", guest: "Marie Dupont", room: "305", type: "checkin", time: "14:00" },
  { id: "2", guest: "John Smith", room: "201", type: "checkout", time: "11:00" },
  { id: "3", guest: "Hans Mueller", room: "412", type: "staying" },
  { id: "4", guest: "Sophie Martin", room: "508", type: "checkin", time: "15:30" },
  { id: "5", guest: "James Wilson", room: "102", type: "checkout", time: "10:00" },
  { id: "6", guest: "Emma Brown", room: "304", type: "staying" },
]

const typeColors = {
  checkin: "bg-primary/20 text-primary border-primary/30",
  checkout: "bg-amber-500/20 text-amber-500 border-amber-500/30",
  staying: "bg-muted text-muted-foreground border-muted-foreground/30",
}

const typeLabels = {
  checkin: "Check-In",
  checkout: "Check-Out",
  staying: "Staying",
}

export function TodayCalendar() {
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null)
  const [editOpen, setEditOpen] = useState(false)

  const handleEdit = (reservation: Reservation) => {
    setSelectedReservation(reservation)
    setEditOpen(true)
  }

  return (
    <>
      <Card className="border-0 bg-card/50 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calendar className="h-5 w-5 text-primary" />
            Today&apos;s Schedule
          </CardTitle>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium px-2">
              {new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
            </span>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {todayReservations.map((reservation) => (
              <button
                key={reservation.id}
                onClick={() => handleEdit(reservation)}
                className={`flex w-full items-center justify-between rounded-lg border p-3 text-left transition-all hover:scale-[1.01] hover:shadow-md ${typeColors[reservation.type]}`}
              >
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="font-mono">
                    {reservation.room}
                  </Badge>
                  <span className="font-medium">{reservation.guest}</span>
                </div>
                <div className="flex items-center gap-2">
                  {reservation.time && <span className="text-sm opacity-80">{reservation.time}</span>}
                  <Badge variant="secondary" className="text-xs">
                    {typeLabels[reservation.type]}
                  </Badge>
                </div>
              </button>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-4 flex flex-wrap gap-3 border-t border-border pt-4">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-primary" />
              <span className="text-xs text-muted-foreground">Check-In</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-amber-500" />
              <span className="text-xs text-muted-foreground">Check-Out</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-muted-foreground" />
              <span className="text-xs text-muted-foreground">Staying</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Edit Modal */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Quick Edit Reservation</DialogTitle>
            <DialogDescription>
              {selectedReservation?.guest} - Room {selectedReservation?.room}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Status</Label>
              <Select defaultValue={selectedReservation?.type}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="checkin">Check-In</SelectItem>
                  <SelectItem value="staying">Staying</SelectItem>
                  <SelectItem value="checkout">Check-Out</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Assign Room</Label>
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
          <DialogFooter className="gap-2 sm:gap-0">
            {selectedReservation?.type === "checkin" && <Button className="bg-primary">Complete Check-In</Button>}
            {selectedReservation?.type === "checkout" && (
              <Button className="bg-amber-500 hover:bg-amber-600">Complete Check-Out</Button>
            )}
            <Button variant="outline" onClick={() => setEditOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
