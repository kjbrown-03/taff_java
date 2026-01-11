"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Reservation {
  id: string
  room: string
  guest: string
  startDate: Date
  endDate: Date
  status: "booked" | "checked-in" | "checked-out"
}

const mockReservations: Reservation[] = [
  {
    id: "1",
    room: "101",
    guest: "John Smith",
    startDate: new Date(2026, 0, 12),
    endDate: new Date(2026, 0, 15),
    status: "booked",
  },
  {
    id: "2",
    room: "204",
    guest: "Marie Dupont",
    startDate: new Date(2026, 0, 10),
    endDate: new Date(2026, 0, 13),
    status: "checked-in",
  },
  {
    id: "3",
    room: "305",
    guest: "Hans Mueller",
    startDate: new Date(2026, 0, 8),
    endDate: new Date(2026, 0, 11),
    status: "checked-out",
  },
]

const statusColors = {
  booked: "bg-primary/80 border-primary",
  "checked-in": "bg-success/80 border-success",
  "checked-out": "bg-muted border-muted-foreground/50",
}

export function CalendarWidget() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 11))

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const days = []
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null)
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }

  const getReservationsForDay = (day: number | null) => {
    if (!day) return []
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    return mockReservations.filter((r) => date >= r.startDate && date <= r.endDate)
  }

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  return (
    <div className="glass-card rounded-xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Reservations Calendar</h3>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="min-w-[140px] text-center font-medium">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </span>
          <Button variant="ghost" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Legend */}
      <div className="mb-4 flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-primary/80" />
          <span className="text-xs text-muted-foreground">Booked</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-success/80" />
          <span className="text-xs text-muted-foreground">Checked-in</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-muted" />
          <span className="text-xs text-muted-foreground">Checked-out</span>
        </div>
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="p-2 text-center text-xs font-medium text-muted-foreground">
            {day}
          </div>
        ))}
        {days.map((day, index) => {
          const reservations = getReservationsForDay(day)
          const isToday = day === 11 && currentDate.getMonth() === 0 && currentDate.getFullYear() === 2026

          return (
            <div
              key={index}
              className={cn(
                "min-h-[80px] rounded-lg border border-border/50 p-1 transition-colors hover:bg-muted/50",
                isToday && "border-primary bg-primary/5",
              )}
            >
              {day && (
                <>
                  <span className={cn("text-xs font-medium", isToday ? "text-primary" : "text-muted-foreground")}>
                    {day}
                  </span>
                  <div className="mt-1 space-y-1">
                    {reservations.slice(0, 2).map((r) => (
                      <div
                        key={r.id}
                        className={cn(
                          "truncate rounded px-1 py-0.5 text-[10px] font-medium text-foreground",
                          statusColors[r.status],
                        )}
                        title={`${r.room} - ${r.guest}`}
                      >
                        {r.room}
                      </div>
                    ))}
                    {reservations.length > 2 && (
                      <div className="text-[10px] text-muted-foreground">+{reservations.length - 2} more</div>
                    )}
                  </div>
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
