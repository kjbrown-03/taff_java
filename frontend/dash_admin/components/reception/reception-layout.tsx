"use client"

import type React from "react"
import { useState } from "react"
import { ReceptionSidebar } from "./reception-sidebar"
import { ReceptionHeader } from "./reception-header"
import { cn } from "@/lib/utils"

interface ReceptionLayoutProps {
  children: React.ReactNode
}

export function ReceptionLayout({ children }: ReceptionLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={cn("hidden lg:block", mobileMenuOpen && "block")}>
        <ReceptionSidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      </div>

      {/* Main content */}
      <div className={cn("transition-all duration-300 ease-in-out", sidebarCollapsed ? "lg:ml-16" : "lg:ml-64")}>
        <ReceptionHeader onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)} />
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}
