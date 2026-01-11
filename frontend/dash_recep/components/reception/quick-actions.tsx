"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserPlus, CalendarPlus, CreditCard, Camera, Upload } from "lucide-react"

export function QuickActions() {
  const [checkInOpen, setCheckInOpen] = useState(false)
  const [reservationOpen, setReservationOpen] = useState(false)
  const [paymentOpen, setPaymentOpen] = useState(false)
  const [photoOpen, setPhotoOpen] = useState(false)

  return (
    <div className="mb-6 flex flex-wrap gap-3">
      {/* New Check-In */}
      <Dialog open={checkInOpen} onOpenChange={setCheckInOpen}>
        <DialogTrigger asChild>
          <Button className="gap-2 bg-gradient-to-r from-primary to-cyan-500 shadow-lg shadow-primary/25 hover:shadow-primary/40">
            <UserPlus className="h-4 w-4" />
            New Check-In
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Quick Check-In</DialogTitle>
            <DialogDescription>Process a new guest check-in</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="guest-search">Search Guest</Label>
              <Input id="guest-search" placeholder="Search by name or reservation ID..." />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="room-assign">Assign Room</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select available room" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="201">Room 201 - Single</SelectItem>
                  <SelectItem value="305">Room 305 - Double</SelectItem>
                  <SelectItem value="412">Room 412 - Suite</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="id-number">ID Number</Label>
              <Input id="id-number" placeholder="Passport / ID card number" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCheckInOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setCheckInOpen(false)}>Complete Check-In</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Reservation */}
      <Dialog open={reservationOpen} onOpenChange={setReservationOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="gap-2 border-primary/30 hover:bg-primary/10 bg-transparent">
            <CalendarPlus className="h-4 w-4" />
            New Reservation
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Quick Reservation</DialogTitle>
            <DialogDescription>Create a new reservation</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="guest-name">Guest Name</Label>
                <Input id="guest-name" placeholder="Full name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="guest-email">Email</Label>
                <Input id="guest-email" type="email" placeholder="email@example.com" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="check-in-date">Check-In</Label>
                <Input id="check-in-date" type="date" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="check-out-date">Check-Out</Label>
                <Input id="check-out-date" type="date" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="room-type">Room Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select room type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single - €89/night</SelectItem>
                  <SelectItem value="double">Double - €129/night</SelectItem>
                  <SelectItem value="suite">Suite - €249/night</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReservationOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setReservationOpen(false)}>Create Reservation</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Process Payment */}
      <Dialog open={paymentOpen} onOpenChange={setPaymentOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="gap-2 border-amber-500/30 hover:bg-amber-500/10 bg-transparent">
            <CreditCard className="h-4 w-4 text-amber-500" />
            Process Payment
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Process Payment</DialogTitle>
            <DialogDescription>Quick payment processing</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="reservation-id">Reservation / Room</Label>
              <Input id="reservation-id" placeholder="Search reservation or room..." />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="amount">Amount (€)</Label>
              <Input id="amount" type="number" placeholder="0.00" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="payment-method">Payment Method</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="card">Credit Card</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="transfer">Bank Transfer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPaymentOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-amber-500 hover:bg-amber-600" onClick={() => setPaymentOpen(false)}>
              Process
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Upload Guest Photo */}
      <Dialog open={photoOpen} onOpenChange={setPhotoOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground">
            <Camera className="h-4 w-4" />
            Upload Guest Photo
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Guest Photo</DialogTitle>
            <DialogDescription>Add or update guest profile photo</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="photo-guest">Select Guest</Label>
              <Input id="photo-guest" placeholder="Search guest by name..." />
            </div>
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 p-8 transition-colors hover:border-primary/50">
              <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Drag & drop photo here</p>
              <p className="text-xs text-muted-foreground">or click to browse</p>
              <Input type="file" accept="image/*" className="mt-3 max-w-[200px]" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPhotoOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setPhotoOpen(false)}>Upload</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
