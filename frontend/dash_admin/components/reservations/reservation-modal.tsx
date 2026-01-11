"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"

export interface Reservation {
  id: string
  guestName: string
  guestEmail: string
  room: string
  checkIn: Date
  checkOut: Date
  status: "confirmed" | "pending" | "checked-in" | "checked-out" | "cancelled"
  totalAmount: number
  notes?: string
}

interface ReservationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  reservation?: Reservation | null
  onSave: (reservation: Partial<Reservation>) => void
}

const rooms = ["101", "102", "201", "202", "203", "301", "302", "303"]

export function ReservationModal({ open, onOpenChange, reservation, onSave }: ReservationModalProps) {
  const [checkIn, setCheckIn] = React.useState<Date | undefined>(reservation?.checkIn)
  const [checkOut, setCheckOut] = React.useState<Date | undefined>(reservation?.checkOut)

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      guestName: reservation?.guestName || "",
      guestEmail: reservation?.guestEmail || "",
      room: reservation?.room || "",
      status: reservation?.status || "pending",
      totalAmount: reservation?.totalAmount || 0,
      notes: reservation?.notes || "",
    },
  })

  React.useEffect(() => {
    if (reservation) {
      reset({
        guestName: reservation.guestName,
        guestEmail: reservation.guestEmail,
        room: reservation.room,
        status: reservation.status,
        totalAmount: reservation.totalAmount,
        notes: reservation.notes || "",
      })
      setCheckIn(reservation.checkIn)
      setCheckOut(reservation.checkOut)
    } else {
      reset({
        guestName: "",
        guestEmail: "",
        room: "",
        status: "pending",
        totalAmount: 0,
        notes: "",
      })
      setCheckIn(undefined)
      setCheckOut(undefined)
    }
  }, [reservation, reset])

  const onSubmit = (data: Record<string, unknown>) => {
    onSave({
      ...data,
      checkIn,
      checkOut,
    } as Partial<Reservation>)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>{reservation ? "Edit Reservation" : "New Reservation"}</DialogTitle>
            <DialogDescription>
              {reservation ? "Update the reservation details." : "Create a new reservation."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="guestName">Guest Name</Label>
                <Input
                  id="guestName"
                  {...register("guestName", { required: "Guest name is required" })}
                  placeholder="John Smith"
                />
                {errors.guestName && <p className="text-xs text-destructive">{errors.guestName.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="guestEmail">Email</Label>
                <Input id="guestEmail" type="email" {...register("guestEmail")} placeholder="john@email.com" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Check-in Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("justify-start text-left font-normal", !checkIn && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {checkIn ? format(checkIn, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={checkIn} onSelect={setCheckIn} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid gap-2">
                <Label>Check-out Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("justify-start text-left font-normal", !checkOut && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {checkOut ? format(checkOut, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={checkOut} onSelect={setCheckOut} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="room">Room</Label>
                <Select defaultValue={reservation?.room} onValueChange={(value) => setValue("room", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select room" />
                  </SelectTrigger>
                  <SelectContent>
                    {rooms.map((room) => (
                      <SelectItem key={room} value={room}>
                        Room #{room}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  defaultValue={reservation?.status || "pending"}
                  onValueChange={(value) => setValue("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="checked-in">Checked In</SelectItem>
                    <SelectItem value="checked-out">Checked Out</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="totalAmount">Total Amount (€)</Label>
              <Input id="totalAmount" type="number" {...register("totalAmount", { min: 0 })} placeholder="0" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="notes">Notes</Label>
              <Input id="notes" {...register("notes")} placeholder="Special requests..." />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{reservation ? "Save Changes" : "Create Reservation"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
