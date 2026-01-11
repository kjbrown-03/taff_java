"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
import {
  Plus,
  Edit,
  Trash2,
  Utensils,
  Car,
  Sparkles,
  Dumbbell,
  Wifi,
  Coffee,
  Wine,
  Shirt,
  type LucideIcon,
} from "lucide-react"

interface Service {
  id: string
  name: string
  description: string
  price: number
  category: "dining" | "wellness" | "transport" | "amenities" | "laundry"
  status: "active" | "inactive"
  icon: string
}

const iconMap: Record<string, LucideIcon> = {
  utensils: Utensils,
  car: Car,
  sparkles: Sparkles,
  dumbbell: Dumbbell,
  wifi: Wifi,
  coffee: Coffee,
  wine: Wine,
  shirt: Shirt,
}

const initialServices: Service[] = [
  {
    id: "1",
    name: "Room Service",
    description: "24/7 in-room dining experience",
    price: 25,
    category: "dining",
    status: "active",
    icon: "utensils",
  },
  {
    id: "2",
    name: "Airport Transfer",
    description: "Private car service to/from airport",
    price: 75,
    category: "transport",
    status: "active",
    icon: "car",
  },
  {
    id: "3",
    name: "Spa Treatment",
    description: "Relaxing massage and wellness services",
    price: 120,
    category: "wellness",
    status: "active",
    icon: "sparkles",
  },
  {
    id: "4",
    name: "Fitness Center",
    description: "24-hour gym access",
    price: 15,
    category: "wellness",
    status: "active",
    icon: "dumbbell",
  },
  {
    id: "5",
    name: "High-Speed WiFi",
    description: "Premium internet access",
    price: 10,
    category: "amenities",
    status: "active",
    icon: "wifi",
  },
  {
    id: "6",
    name: "Breakfast Buffet",
    description: "International breakfast selection",
    price: 35,
    category: "dining",
    status: "active",
    icon: "coffee",
  },
  {
    id: "7",
    name: "Mini Bar",
    description: "In-room refreshments and snacks",
    price: 0,
    category: "dining",
    status: "active",
    icon: "wine",
  },
  {
    id: "8",
    name: "Laundry Service",
    description: "Same-day dry cleaning",
    price: 30,
    category: "laundry",
    status: "active",
    icon: "shirt",
  },
]

const categoryColors: Record<Service["category"], string> = {
  dining: "bg-chart-4/20 text-chart-4 border-chart-4/30",
  wellness: "bg-success/20 text-success border-success/30",
  transport: "bg-primary/20 text-primary border-primary/30",
  amenities: "bg-accent/20 text-accent border-accent/30",
  laundry: "bg-chart-5/20 text-chart-5 border-chart-5/30",
}

export default function ServicesPage() {
  const [services, setServices] = React.useState<Service[]>(initialServices)
  const [modalOpen, setModalOpen] = React.useState(false)
  const [selectedService, setSelectedService] = React.useState<Service | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const [serviceToDelete, setServiceToDelete] = React.useState<Service | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      category: "amenities",
      status: "active",
      icon: "sparkles",
    },
  })

  React.useEffect(() => {
    if (selectedService) {
      reset({
        name: selectedService.name,
        description: selectedService.description,
        price: selectedService.price,
        category: selectedService.category,
        status: selectedService.status,
        icon: selectedService.icon,
      })
    } else {
      reset({
        name: "",
        description: "",
        price: 0,
        category: "amenities",
        status: "active",
        icon: "sparkles",
      })
    }
  }, [selectedService, reset])

  const handleAddService = () => {
    setSelectedService(null)
    setModalOpen(true)
  }

  const handleEditService = (service: Service) => {
    setSelectedService(service)
    setModalOpen(true)
  }

  const handleDeleteService = (service: Service) => {
    setServiceToDelete(service)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (serviceToDelete) {
      setServices(services.filter((s) => s.id !== serviceToDelete.id))
      setServiceToDelete(null)
    }
    setDeleteDialogOpen(false)
  }

  const onSubmit = (data: Record<string, unknown>) => {
    if (selectedService) {
      setServices(services.map((s) => (s.id === selectedService.id ? { ...s, ...(data as Partial<Service>) } : s)))
    } else {
      const newService: Service = {
        id: Date.now().toString(),
        ...(data as Omit<Service, "id">),
      }
      setServices([...services, newService])
    }
    setModalOpen(false)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground lg:text-3xl">Services</h1>
            <p className="text-muted-foreground">Manage hotel services and amenities.</p>
          </div>
          <Button onClick={handleAddService}>
            <Plus className="mr-2 h-4 w-4" />
            Add Service
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service) => {
            const IconComponent = iconMap[service.icon] || Sparkles
            return (
              <Card key={service.id} className="glass-card transition-all duration-300 hover:shadow-lg">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <Badge variant="outline" className={categoryColors[service.category]}>
                      {service.category}
                    </Badge>
                  </div>
                  <CardTitle className="mt-3 text-lg">{service.name}</CardTitle>
                </CardHeader>
                <CardContent className="pb-3">
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                  <p className="mt-3 text-2xl font-bold text-foreground">
                    {service.price === 0 ? "Included" : `€${service.price}`}
                    {service.price > 0 && <span className="text-sm font-normal text-muted-foreground">/service</span>}
                  </p>
                </CardContent>
                <CardFooter className="gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent"
                    onClick={() => handleEditService(service)}
                  >
                    <Edit className="mr-1 h-3 w-3" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:bg-destructive hover:text-destructive-foreground bg-transparent"
                    onClick={() => handleDeleteService(service)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-[450px]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>{selectedService ? "Edit Service" : "Add New Service"}</DialogTitle>
              <DialogDescription>
                {selectedService ? "Update service details." : "Create a new hotel service."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Service Name</Label>
                <Input id="name" {...register("name", { required: "Name is required" })} placeholder="Room Service" />
                {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Input id="description" {...register("description")} placeholder="Service description..." />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="price">Price (€)</Label>
                  <Input id="price" type="number" {...register("price", { min: 0 })} placeholder="0" />
                </div>
                <div className="grid gap-2">
                  <Label>Category</Label>
                  <Select
                    defaultValue={selectedService?.category || "amenities"}
                    onValueChange={(value) => setValue("category", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dining">Dining</SelectItem>
                      <SelectItem value="wellness">Wellness</SelectItem>
                      <SelectItem value="transport">Transport</SelectItem>
                      <SelectItem value="amenities">Amenities</SelectItem>
                      <SelectItem value="laundry">Laundry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Icon</Label>
                  <Select
                    defaultValue={selectedService?.icon || "sparkles"}
                    onValueChange={(value) => setValue("icon", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Icon" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utensils">Utensils</SelectItem>
                      <SelectItem value="car">Car</SelectItem>
                      <SelectItem value="sparkles">Sparkles</SelectItem>
                      <SelectItem value="dumbbell">Dumbbell</SelectItem>
                      <SelectItem value="wifi">WiFi</SelectItem>
                      <SelectItem value="coffee">Coffee</SelectItem>
                      <SelectItem value="wine">Wine</SelectItem>
                      <SelectItem value="shirt">Shirt</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Status</Label>
                  <Select
                    defaultValue={selectedService?.status || "active"}
                    onValueChange={(value) => setValue("status", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">{selectedService ? "Save Changes" : "Add Service"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the service &quot;{serviceToDelete?.name}&quot;. This action cannot be
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
