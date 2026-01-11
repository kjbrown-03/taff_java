"use client"

import { useState } from "react"
import { ReceptionLayout } from "@/components/reception/reception-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Search, UserPlus, Mail, Phone, Upload, Edit } from "lucide-react"

interface Guest {
  id: string
  name: string
  email: string
  phone: string
  avatar: string
  stays: number
  status: "current" | "upcoming" | "past"
}

const guests: Guest[] = [
  {
    id: "1",
    name: "Marie Dupont",
    email: "marie@email.com",
    phone: "+33 6 12 34 56 78",
    avatar: "/guest-marie-dupont-avatar.jpg",
    stays: 3,
    status: "upcoming",
  },
  {
    id: "2",
    name: "John Smith",
    email: "john@email.com",
    phone: "+1 555 123 4567",
    avatar: "/guest-john-smith-avatar.jpg",
    stays: 5,
    status: "current",
  },
  {
    id: "3",
    name: "Hans Mueller",
    email: "hans@email.com",
    phone: "+49 123 456 789",
    avatar: "/guest-hans-mueller-avatar.jpg",
    stays: 2,
    status: "current",
  },
  {
    id: "4",
    name: "Sophie Martin",
    email: "sophie@email.com",
    phone: "+33 6 98 76 54 32",
    avatar: "/guest-sophie-martin-avatar.jpg",
    stays: 1,
    status: "upcoming",
  },
  {
    id: "5",
    name: "James Wilson",
    email: "james@email.com",
    phone: "+44 20 7123 4567",
    avatar: "/guest-james-wilson-avatar.jpg",
    stays: 8,
    status: "current",
  },
]

const statusColors = {
  current: "bg-green-500/20 text-green-500",
  upcoming: "bg-primary/20 text-primary",
  past: "bg-muted text-muted-foreground",
}

export default function ReceptionGuests() {
  const [search, setSearch] = useState("")
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null)
  const [editOpen, setEditOpen] = useState(false)
  const [createOpen, setCreateOpen] = useState(false)

  const filteredGuests = guests.filter(
    (guest) =>
      guest.name.toLowerCase().includes(search.toLowerCase()) ||
      guest.email.toLowerCase().includes(search.toLowerCase()),
  )

  const handleEdit = (guest: Guest) => {
    setSelectedGuest(guest)
    setEditOpen(true)
  }

  return (
    <ReceptionLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Guests</h1>
            <p className="text-muted-foreground">Quick access to guest profiles</p>
          </div>
          <div className="flex gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search guests..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Dialog open={createOpen} onOpenChange={setCreateOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <UserPlus className="h-4 w-4" />
                  Add Guest
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>New Guest</DialogTitle>
                  <DialogDescription>Add a new guest to the system</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="flex justify-center">
                    <div className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-full border-2 border-dashed border-muted-foreground/25 transition-colors hover:border-primary/50">
                      <Upload className="h-6 w-6 text-muted-foreground" />
                      <span className="mt-1 text-xs text-muted-foreground">Photo</span>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label>Full Name</Label>
                    <Input placeholder="Enter full name" />
                  </div>
                  <div className="grid gap-2">
                    <Label>Email</Label>
                    <Input type="email" placeholder="email@example.com" />
                  </div>
                  <div className="grid gap-2">
                    <Label>Phone</Label>
                    <Input placeholder="+33 6 00 00 00 00" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setCreateOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setCreateOpen(false)}>Create Guest</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Guests Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredGuests.map((guest) => (
            <Card
              key={guest.id}
              className="group overflow-hidden border-0 bg-card/50 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] backdrop-blur-sm transition-all hover:shadow-lg"
              style={{
                background: "linear-gradient(145deg, hsl(var(--card)) 0%, hsl(var(--card)/0.8) 100%)",
                boxShadow: "6px 6px 12px hsl(var(--background)/0.5), -6px -6px 12px hsl(var(--card)/0.3)",
              }}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-14 w-14 border-2 border-primary/20">
                      <AvatarImage src={guest.avatar || "/placeholder.svg"} alt={guest.name} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {guest.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{guest.name}</h3>
                      <Badge className={`mt-1 ${statusColors[guest.status]}`}>
                        {guest.status === "current"
                          ? "Currently Staying"
                          : guest.status === "upcoming"
                            ? "Upcoming"
                            : "Past Guest"}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                    onClick={() => handleEdit(guest)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>{guest.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>{guest.phone}</span>
                  </div>
                </div>
                <div className="mt-4 border-t border-border pt-3">
                  <span className="text-xs text-muted-foreground">{guest.stays} previous stays</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Edit Modal */}
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Guest</DialogTitle>
              <DialogDescription>Update guest information</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex justify-center">
                <div className="relative">
                  <Avatar className="h-24 w-24 border-2 border-primary/20">
                    <AvatarImage src={selectedGuest?.avatar || "/placeholder.svg"} alt={selectedGuest?.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                      {selectedGuest?.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <Button size="icon" variant="secondary" className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Full Name</Label>
                <Input defaultValue={selectedGuest?.name} />
              </div>
              <div className="grid gap-2">
                <Label>Email</Label>
                <Input type="email" defaultValue={selectedGuest?.email} />
              </div>
              <div className="grid gap-2">
                <Label>Phone</Label>
                <Input defaultValue={selectedGuest?.phone} />
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
