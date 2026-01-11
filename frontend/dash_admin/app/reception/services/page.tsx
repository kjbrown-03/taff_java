"use client"

import type React from "react"

import { useState } from "react"
import { ReceptionLayout } from "@/components/reception/reception-layout"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Utensils, Sparkles, Car, Dumbbell, Plus } from "lucide-react"

interface Service {
  id: string
  name: string
  category: string
  price: number
  icon: React.ElementType
}

const services: Service[] = [
  { id: "1", name: "Room Service Breakfast", category: "Food & Beverage", price: 25, icon: Utensils },
  { id: "2", name: "Room Service Dinner", category: "Food & Beverage", price: 45, icon: Utensils },
  { id: "3", name: "Minibar Refill", category: "Food & Beverage", price: 30, icon: Utensils },
  { id: "4", name: "Laundry Service", category: "Housekeeping", price: 35, icon: Sparkles },
  { id: "5", name: "Extra Cleaning", category: "Housekeeping", price: 20, icon: Sparkles },
  { id: "6", name: "Airport Transfer", category: "Transport", price: 50, icon: Car },
  { id: "7", name: "City Tour", category: "Transport", price: 80, icon: Car },
  { id: "8", name: "Spa Access", category: "Wellness", price: 40, icon: Dumbbell },
  { id: "9", name: "Gym Session", category: "Wellness", price: 15, icon: Dumbbell },
]

const categories = ["Food & Beverage", "Housekeeping", "Transport", "Wellness"]

const categoryColors: Record<string, string> = {
  "Food & Beverage": "bg-amber-500/20 text-amber-500",
  Housekeeping: "bg-cyan-500/20 text-cyan-500",
  Transport: "bg-primary/20 text-primary",
  Wellness: "bg-green-500/20 text-green-500",
}

export default function ReceptionServices() {
  const [addOpen, setAddOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<Service | null>(null)

  const handleAddToReservation = (service: Service) => {
    setSelectedService(service)
    setAddOpen(true)
  }

  return (
    <ReceptionLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Services</h1>
          <p className="text-muted-foreground">Add services to guest reservations</p>
        </div>

        {/* Services by Category */}
        {categories.map((category) => {
          const categoryServices = services.filter((s) => s.category === category)
          const CategoryIcon = categoryServices[0]?.icon || Sparkles

          return (
            <Card
              key={category}
              className="border-0 bg-card/50 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] backdrop-blur-sm"
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CategoryIcon className="h-5 w-5 text-primary" />
                  {category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {categoryServices.map((service) => (
                    <div
                      key={service.id}
                      className="flex items-center justify-between rounded-lg border border-border/50 p-4 transition-all hover:border-primary/30 hover:bg-muted/30"
                    >
                      <div>
                        <p className="font-medium">{service.name}</p>
                        <Badge className={`mt-1 ${categoryColors[service.category]}`}>€{service.price}</Badge>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1 bg-transparent"
                        onClick={() => handleAddToReservation(service)}
                      >
                        <Plus className="h-3 w-3" />
                        Add
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}

        {/* Add to Reservation Modal */}
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add Service to Reservation</DialogTitle>
              <DialogDescription>
                {selectedService?.name} - €{selectedService?.price}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Select Reservation</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Search guest or room..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="R002">R002 - John Smith (Room 201)</SelectItem>
                    <SelectItem value="R003">R003 - Hans Mueller (Room 412)</SelectItem>
                    <SelectItem value="R005">R005 - James Wilson (Room 102)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Quantity</Label>
                <Input type="number" defaultValue="1" min="1" />
              </div>
              <div className="grid gap-2">
                <Label>Notes (optional)</Label>
                <Input placeholder="Special instructions..." />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAddOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setAddOpen(false)}>Add Service</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </ReceptionLayout>
  )
}
