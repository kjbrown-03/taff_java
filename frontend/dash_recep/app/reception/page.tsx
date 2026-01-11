import { ReceptionLayout } from "@/components/reception/reception-layout"
import { QuickActions } from "@/components/reception/quick-actions"
import { DailyOverview } from "@/components/reception/daily-overview"
import { TodayCalendar } from "@/components/reception/today-calendar"

export default function ReceptionDashboard() {
  return (
    <ReceptionLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reception Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here&apos;s today&apos;s overview.</p>
        </div>

        {/* Quick Actions Bar */}
        <QuickActions />

        {/* Daily Overview KPIs */}
        <DailyOverview />

        {/* Today's Calendar */}
        <TodayCalendar />
      </div>
    </ReceptionLayout>
  )
}
