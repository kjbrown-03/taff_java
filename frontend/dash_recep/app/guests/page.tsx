"use client"

import * as React from "react"
import { Suspense } from "react"
import { format } from "date-fns"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Plus, Search, MoreVertical, Edit, Trash2, Mail, Phone, MapPin, Calendar } from "lucide-react"
import { GuestModal, type Guest } from "@/components/guests/guest-modal"

const initialGuests: Guest[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john@email.com",
    phone: "+1 555 123 4567",
    address: "New York, USA",
    visits: 12,
    lastVisit: new Date(2026, 0, 10),
    photo: "/guest-john-smith-avatar.jpg",
  },
  {
    id: "2",
    name: "Marie Dupont",
    email: "marie@email.com",
    phone: "+33 6 12 34 56 78",
    address: "Paris, France",
    visits: 8,
    lastVisit: new Date(2026, 0, 8),
    photo: "/guest-marie-dupont-avatar.jpg",
  },
  {
    id: "3",
    name: "Hans Mueller",
    email: "hans@email.com",
    phone: "+49 151 1234 5678",
    address: "Berlin, Germany",
    visits: 5,
    lastVisit: new Date(2026, 0, 5),
    photo: "/guest-hans-mueller-avatar.jpg",
  },
  {
    id: "4",
    name: "Sophie Martin",
    email: "sophie@email.com",
    phone: "+33 7 98 76 54 32",
    address: "Lyon, France",
    visits: 3,
    lastVisit: new Date(2025, 11, 20),
    photo: "/guest-sophie-martin-avatar.jpg",
  },
  {
    id: "5",
    name: "James Wilson",
    email: "james@email.com",
    phone: "+44 7911 123456",
    address: "London, UK",
    visits: 15,
    lastVisit: new Date(2026, 0, 11),
    photo: "/guest-james-wilson-avatar.jpg",
  },
  {
    id: "6",
    name: "Emma Brown",
    email: "emma@email.com",
    phone: "+1 555 987 6543",
    address: "Los Angeles, USA",
    visits: 2,
    lastVisit: new Date(2025, 10, 15),
    photo: "/guest-emma-brown-avatar.jpg",
  },
]

function GuestsContent() {
  const [guests, setGuests] = React.useState<Guest[]>(initialGuests)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [modalOpen, setModalOpen] = React.useState(false)
  const [selectedGuest, setSelectedGuest] = React.useState<Guest | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const [guestToDelete, setGuestToDelete] = React.useState<Guest | null>(null)

  const filteredGuests = guests.filter(
    (guest) =>
      guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guest.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddGuest = () => {
    setSelectedGuest(null)
    setModalOpen(true)
  }

  const handleEditGuest = (guest: Guest) => {
    setSelectedGuest(guest)
    setModalOpen(true)
  }

  const handleDeleteGuest = (guest: Guest) => {
    setGuestToDelete(guest)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (guestToDelete) {
      setGuests(guests.filter((g) => g.id !== guestToDelete.id))
      setGuestToDelete(null)
    }
    setDeleteDialogOpen(false)
  }

  const handleSaveGuest = (guestData: Partial<Guest>) => {
    if (selectedGuest) {
      setGuests(guests.map((g) => (g.id === selectedGuest.id ? { ...g, ...guestData } : g)))
    } else {
      const newGuest: Guest = {
        id: Date.now().toString(),
        name: guestData.name || "",
        email: guestData.email || "",
        phone: guestData.phone || "",
        address: guestData.address || "",
        visits: 1,
        lastVisit: new Date(),
        photo: guestData.photo,
      }
      setGuests([...guests, newGuest])
    }
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground lg:text-3xl">Guests</h1>
            <p className="text-muted-foreground">Manage guest profiles and history.</p>
          </div>
          <Button onClick={handleAddGuest}>
            <Plus className="mr-2 h-4 w-4" />
            Add Guest
          </Button>
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-muted/50 pl-9"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredGuests.map((guest) => (
            <Card key={guest.id} className="glass-card transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-14 w-14 border-2 border-primary/20">
                      <AvatarImage src={guest.photo || "/placeholder.svg"} alt={guest.name} />
                      <AvatarFallback className="bg-primary/20 text-primary">
                        {guest.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-foreground">{guest.name}</h3>
                      <p className="text-sm text-muted-foreground">{guest.visits} visits</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => handleEditGuest(guest)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleDeleteGuest(guest)} className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span className="truncate">{guest.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{guest.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{guest.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Last visit: {format(guest.lastVisit, "MMM dd, yyyy")}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredGuests.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground">No guests found.</p>
          </div>
        )}
      </div>

      <GuestModal open={modalOpen} onOpenChange={setModalOpen} guest={selectedGuest} onSave={handleSaveGuest} />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {guestToDelete?.name}&apos;s profile. This action cannot be undone.
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
    </>
  )
}

export default function GuestsPage() {
  return (
    <DashboardLayout>
      <Suspense fallback={null}>
        <GuestsContent />
      </Suspense>
    </DashboardLayout>
  )
}
