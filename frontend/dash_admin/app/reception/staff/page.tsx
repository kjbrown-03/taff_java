import { ReceptionLayout } from "@/components/reception/reception-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Lock } from "lucide-react"

interface Staff {
  id: string
  name: string
  role: string
  avatar: string
  status: "on-duty" | "off-duty"
  shift: string
}

const staff: Staff[] = [
  {
    id: "1",
    name: "Pierre Dubois",
    role: "Manager",
    avatar: "/manager-man.jpg",
    status: "on-duty",
    shift: "08:00 - 16:00",
  },
  {
    id: "2",
    name: "Claire Bernard",
    role: "Receptionist",
    avatar: "/receptionist-woman.jpg",
    status: "on-duty",
    shift: "06:00 - 14:00",
  },
  {
    id: "3",
    name: "Marc Leroy",
    role: "Concierge",
    avatar: "/concierge-man.jpg",
    status: "on-duty",
    shift: "08:00 - 16:00",
  },
  {
    id: "4",
    name: "Anne Moreau",
    role: "Housekeeping",
    avatar: "/housekeeper-woman.jpg",
    status: "on-duty",
    shift: "07:00 - 15:00",
  },
  {
    id: "5",
    name: "Lucas Petit",
    role: "Bellboy",
    avatar: "/bellboy-man.jpg",
    status: "on-duty",
    shift: "10:00 - 18:00",
  },
  {
    id: "6",
    name: "Emma Roux",
    role: "Receptionist",
    avatar: "/receptionist-woman-brunette.jpg",
    status: "off-duty",
    shift: "14:00 - 22:00",
  },
]

export default function ReceptionStaff() {
  const onDutyStaff = staff.filter((s) => s.status === "on-duty")

  return (
    <ReceptionLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Staff On Duty</h1>
            <p className="text-muted-foreground">View-only access to staff information</p>
          </div>
          <Badge variant="outline" className="gap-1 border-amber-500/30 text-amber-500">
            <Lock className="h-3 w-3" />
            Read Only
          </Badge>
        </div>

        {/* Staff List */}
        <Card className="border-0 bg-card/50 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg">Currently On Duty ({onDutyStaff.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {onDutyStaff.map((member) => (
                <div key={member.id} className="flex items-center justify-between rounded-lg bg-muted/30 p-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12 border-2 border-green-500/20">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                      <AvatarFallback className="bg-green-500/20 text-green-500">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{member.name}</h3>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-green-500/20 text-green-500">On Duty</Badge>
                    <p className="mt-1 text-xs text-muted-foreground">{member.shift}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* All Staff */}
        <Card className="border-0 bg-card/50 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg">All Staff</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {staff.map((member) => (
                <div key={member.id} className="flex items-center gap-3 rounded-lg border border-border/50 p-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                    <AvatarFallback>
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.role}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className={member.status === "on-duty" ? "border-green-500/30 text-green-500" : ""}
                  >
                    {member.status === "on-duty" ? "On" : "Off"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ReceptionLayout>
  )
}
