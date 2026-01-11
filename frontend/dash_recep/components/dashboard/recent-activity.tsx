import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Activity {
  id: string
  type: "check-in" | "check-out" | "payment" | "booking"
  guest: string
  room?: string
  amount?: string
  time: string
}

const activities: Activity[] = [
  {
    id: "1",
    type: "check-in",
    guest: "Marie Dupont",
    room: "204",
    time: "10 min ago",
  },
  {
    id: "2",
    type: "payment",
    guest: "John Smith",
    amount: "€1,250.00",
    time: "25 min ago",
  },
  {
    id: "3",
    type: "booking",
    guest: "Hans Mueller",
    room: "305",
    time: "1 hour ago",
  },
  {
    id: "4",
    type: "check-out",
    guest: "Sophie Martin",
    room: "102",
    time: "2 hours ago",
  },
  {
    id: "5",
    type: "payment",
    guest: "James Wilson",
    amount: "€890.00",
    time: "3 hours ago",
  },
]

const typeConfig = {
  "check-in": { label: "Check-in", color: "bg-success/20 text-success" },
  "check-out": { label: "Check-out", color: "bg-muted text-muted-foreground" },
  payment: { label: "Payment", color: "bg-primary/20 text-primary" },
  booking: { label: "Booking", color: "bg-accent/20 text-accent" },
}

export function RecentActivity() {
  return (
    <div className="glass-card rounded-xl p-6">
      <h3 className="mb-4 text-lg font-semibold text-foreground">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center gap-4 rounded-lg p-2 transition-colors hover:bg-muted/30">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={`/.jpg?height=40&width=40&query=${activity.guest} avatar`}
                alt={activity.guest}
              />
              <AvatarFallback className="bg-primary/20 text-primary">
                {activity.guest
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium text-foreground">{activity.guest}</p>
              <p className="text-xs text-muted-foreground">
                {activity.room && `Room ${activity.room}`}
                {activity.amount && activity.amount}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <Badge variant="secondary" className={cn("text-xs", typeConfig[activity.type].color)}>
                {typeConfig[activity.type].label}
              </Badge>
              <span className="text-xs text-muted-foreground">{activity.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
