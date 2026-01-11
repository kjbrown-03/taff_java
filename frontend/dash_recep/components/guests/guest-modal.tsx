"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
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
import { Upload, X } from "lucide-react"

export interface Guest {
  id: string
  name: string
  email: string
  phone: string
  address: string
  visits: number
  lastVisit: Date
  photo?: string
}

interface GuestModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  guest?: Guest | null
  onSave: (guest: Partial<Guest>) => void
}

export function GuestModal({ open, onOpenChange, guest, onSave }: GuestModalProps) {
  const [photoPreview, setPhotoPreview] = React.useState<string | null>(guest?.photo || null)
  const [dragActive, setDragActive] = React.useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: guest?.name || "",
      email: guest?.email || "",
      phone: guest?.phone || "",
      address: guest?.address || "",
    },
  })

  React.useEffect(() => {
    if (guest) {
      reset({
        name: guest.name,
        email: guest.email,
        phone: guest.phone,
        address: guest.address,
      })
      setPhotoPreview(guest.photo || null)
    } else {
      reset({ name: "", email: "", phone: "", address: "" })
      setPhotoPreview(null)
    }
  }, [guest, reset])

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      const reader = new FileReader()
      reader.onload = () => setPhotoPreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = () => setPhotoPreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = (data: Record<string, unknown>) => {
    onSave({
      ...data,
      photo: photoPreview || undefined,
    } as Partial<Guest>)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>{guest ? "Edit Guest" : "Add New Guest"}</DialogTitle>
            <DialogDescription>
              {guest ? "Update guest profile details." : "Create a new guest profile."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* Photo upload */}
            <div className="flex justify-center">
              <div
                className={`relative flex h-24 w-24 cursor-pointer items-center justify-center rounded-full border-2 border-dashed transition-colors ${
                  dragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {photoPreview ? (
                  <>
                    <img
                      src={photoPreview || "/placeholder.svg"}
                      alt="Guest"
                      className="h-full w-full rounded-full object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute -right-1 -top-1 h-6 w-6"
                      onClick={() => setPhotoPreview(null)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </>
                ) : (
                  <Upload className="h-6 w-6 text-muted-foreground" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 cursor-pointer opacity-0"
                  onChange={handleFileChange}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" {...register("name", { required: "Name is required" })} placeholder="John Smith" />
              {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...register("email")} placeholder="john@email.com" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" {...register("phone")} placeholder="+33 6 12 34 56 78" />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" {...register("address")} placeholder="123 Main St, Paris, France" />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{guest ? "Save Changes" : "Add Guest"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
