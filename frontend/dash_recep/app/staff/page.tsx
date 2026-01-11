"use client"

import * as React from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Plus, Trash2, Edit, UserCog } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { DataTable, Checkbox } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { StaffModal, type Staff } from "@/components/staff/staff-modal"

const initialStaff: Staff[] = [
  {
    id: "1",
    name: "Alice Martin",
    email: "alice@hotel.com",
    phone: "+33 6 11 22 33 44",
    role: "manager",
    status: "active",
    shift: "morning",
    photo: "/staff-alice-avatar.jpg",
  },
  {
    id: "2",
    name: "Bob Johnson",
    email: "bob@hotel.com",
    phone: "+33 6 22 33 44 55",
    role: "receptionist",
    status: "active",
    shift: "morning",
    photo: "/staff-bob-avatar.jpg",
  },
  {
    id: "3",
    name: "Clara Dubois",
    email: "clara@hotel.com",
    phone: "+33 6 33 44 55 66",
    role: "receptionist",
    status: "active",
    shift: "afternoon",
    photo: "/staff-clara-avatar.jpg",
  },
  {
    id: "4",
    name: "David Chen",
    email: "david@hotel.com",
    phone: "+33 6 44 55 66 77",
    role: "housekeeping",
    status: "active",
    shift: "morning",
    photo: "/staff-david-avatar.jpg",
  },
  {
    id: "5",
    name: "Emma Garcia",
    email: "emma@hotel.com",
    phone: "+33 6 55 66 77 88",
    role: "maintenance",
    status: "inactive",
    shift: "afternoon",
    photo: "/staff-emma-avatar.jpg",
  },
  {
    id: "6",
    name: "Frank Weber",
    email: "frank@hotel.com",
    phone: "+33 6 66 77 88 99",
    role: "admin",
    status: "active",
    shift: "morning",
    photo: "/staff-frank-avatar.jpg",
  },
]

const roleColors: Record<Staff["role"], string> = {
  admin: "bg-destructive/20 text-destructive border-destructive/30",
  manager: "bg-primary/20 text-primary border-primary/30",
  receptionist: "bg-accent/20 text-accent border-accent/30",
  housekeeping: "bg-success/20 text-success border-success/30",
  maintenance: "bg-chart-4/20 text-chart-4 border-chart-4/30",
}

const shiftColors: Record<Staff["shift"], string> = {
  morning: "bg-chart-4/20 text-chart-4",
  afternoon: "bg-primary/20 text-primary",
  night: "bg-muted text-muted-foreground",
}

export default function StaffPage() {
  const [staff, setStaff] = React.useState<Staff[]>(initialStaff)
  const [modalOpen, setModalOpen] = React.useState(false)
  const [selectedStaff, setSelectedStaff] = React.useState<Staff | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const [staffToDelete, setStaffToDelete] = React.useState<Staff | null>(null)

  const handleAddStaff = () => {
    setSelectedStaff(null)
    setModalOpen(true)
  }

  const handleEditStaff = (member: Staff) => {
    setSelectedStaff(member)
    setModalOpen(true)
  }

  const handleDeleteStaff = (member: Staff) => {
    setStaffToDelete(member)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (staffToDelete) {
      setStaff(staff.filter((s) => s.id !== staffToDelete.id))
      setStaffToDelete(null)
    }
    setDeleteDialogOpen(false)
  }

  const handleSaveStaff = (staffData: Partial<Staff>) => {
    if (selectedStaff) {
      setStaff(staff.map((s) => (s.id === selectedStaff.id ? { ...s, ...staffData } : s)))
    } else {
      const newStaff: Staff = {
        id: Date.now().toString(),
        name: staffData.name || "",
        email: staffData.email || "",
        phone: staffData.phone || "",
        role: staffData.role || "receptionist",
        status: staffData.status || "active",
        shift: staffData.shift || "morning",
        photo: staffData.photo,
      }
      setStaff([...staff, newStaff])
    }
  }

  const columns: ColumnDef<Staff>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Staff Member
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const member = row.original
        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={member.photo || "/placeholder.svg"} alt={member.name} />
              <AvatarFallback className="bg-primary/20 text-primary">
                {member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{member.name}</p>
              <p className="text-xs text-muted-foreground">{member.email}</p>
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => {
        const role = row.getValue("role") as Staff["role"]
        return (
          <Badge variant="outline" className={roleColors[role]}>
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </Badge>
        )
      },
    },
    {
      accessorKey: "shift",
      header: "Shift",
      cell: ({ row }) => {
        const shift = row.getValue("shift") as Staff["shift"]
        return (
          <Badge variant="secondary" className={shiftColors[shift]}>
            {shift.charAt(0).toUpperCase() + shift.slice(1)}
          </Badge>
        )
      },
    },
    {
      accessorKey: "phone",
      header: "Phone",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as Staff["status"]
        return (
          <Badge
            variant={status === "active" ? "default" : "secondary"}
            className={status === "active" ? "bg-success" : ""}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        )
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const member = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleEditStaff(member)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <UserCog className="mr-2 h-4 w-4" />
                Manage Shifts
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleDeleteStaff(member)} className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground lg:text-3xl">Staff</h1>
            <p className="text-muted-foreground">Manage your team members and roles.</p>
          </div>
          <Button onClick={handleAddStaff}>
            <Plus className="mr-2 h-4 w-4" />
            Add Staff
          </Button>
        </div>

        <div className="glass-card rounded-xl p-6">
          <DataTable columns={columns} data={staff} searchKey="name" searchPlaceholder="Search staff..." />
        </div>
      </div>

      <StaffModal open={modalOpen} onOpenChange={setModalOpen} staff={selectedStaff} onSave={handleSaveStaff} />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove {staffToDelete?.name} from your team. This action cannot be undone.
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
