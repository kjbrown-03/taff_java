"use client"

import { Card, CardContent } from "@/components/ui/card"
import { DoorOpen, UserCheck, LogOut } from "lucide-react"

const kpis = [
  {
    label: "Available Rooms",
    value: 12,
    total: 45,
    icon: DoorOpen,
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
  },
  {
    label: "Expected Arrivals",
    value: 8,
    subtitle: "Today",
    icon: UserCheck,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    label: "Pending Check-Outs",
    value: 5,
    subtitle: "Before 11:00",
    icon: LogOut,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
]

export function DailyOverview() {
  return (
    <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
      {kpis.map((kpi) => (
        <Card
          key={kpi.label}
          className="group relative overflow-hidden border-0 bg-card/50 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] backdrop-blur-sm transition-all duration-300 hover:shadow-lg"
          style={{
            background: "linear-gradient(145deg, hsl(var(--card)) 0%, hsl(var(--card)/0.8) 100%)",
            boxShadow: "8px 8px 16px hsl(var(--background)/0.5), -8px -8px 16px hsl(var(--card)/0.3)",
          }}
        >
          <CardContent className="flex items-center gap-4 p-6">
            <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${kpi.bgColor}`}>
              <kpi.icon className={`h-7 w-7 ${kpi.color}`} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{kpi.label}</p>
              <div className="flex items-baseline gap-1">
                <span className={`text-3xl font-bold ${kpi.color}`}>{kpi.value}</span>
                {kpi.total && <span className="text-sm text-muted-foreground">/ {kpi.total}</span>}
                {kpi.subtitle && <span className="text-xs text-muted-foreground ml-1">{kpi.subtitle}</span>}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
