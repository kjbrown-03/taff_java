"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Circle,
  List,
  User,
  Users,
  CreditCard,
  FileText,
  ChevronLeft,
  Hotel,
  Wrench,
  Lock,
} from "lucide-react"

const navItems = [
  { href: "/reception", label: "Dashboard", icon: LayoutDashboard, limited: false },
  { href: "/reception/rooms", label: "Rooms", icon: Circle, limited: false },
  { href: "/reception/reservations", label: "Reservations", icon: List, limited: false },
  { href: "/reception/guests", label: "Guests", icon: User, limited: false },
  { href: "/reception/staff", label: "Staff", icon: Users, limited: true, readOnly: true },
  { href: "/reception/services", label: "Services", icon: Wrench, limited: true },
  { href: "/reception/payments", label: "Payments", icon: CreditCard, limited: false },
  { href: "/reception/reports", label: "Reports", icon: FileText, limited: true, basicOnly: true },
]

interface ReceptionSidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export function ReceptionSidebar({ collapsed, onToggle }: ReceptionSidebarProps) {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
          {!collapsed && (
            <Link href="/reception" className="flex items-center gap-2">
              <Hotel className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold text-sidebar-foreground">Hotel Reception</span>
            </Link>
          )}
          {collapsed && <Hotel className="mx-auto h-6 w-6 text-primary" />}
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg shadow-primary/20"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                )}
              >
                <item.icon className={cn("h-5 w-5 shrink-0", isActive && "text-accent")} />
                {!collapsed && (
                  <span className="flex flex-1 items-center justify-between">
                    {item.label}
                    {item.readOnly && <Lock className="h-3 w-3 text-amber-500" />}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Role indicator */}
        {!collapsed && (
          <div className="mx-3 mb-3 rounded-lg bg-amber-500/10 p-3 text-center">
            <span className="text-xs font-medium text-amber-500">Receptionist Access</span>
          </div>
        )}

        {/* Collapse button */}
        <div className="border-t border-sidebar-border p-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="w-full justify-center text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
          >
            <ChevronLeft className={cn("h-5 w-5 transition-transform duration-300", collapsed && "rotate-180")} />
          </Button>
        </div>
      </div>
    </aside>
  )
}
