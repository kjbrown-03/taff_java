import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { KpiCard } from "@/components/dashboard/kpi-card"
import { CalendarWidget } from "@/components/dashboard/calendar-widget"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { QuickStats } from "@/components/dashboard/quick-stats"
import { DollarSign, Percent, Users, CreditCard } from "lucide-react"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground lg:text-3xl">Welcome back, Admin</h1>
          <p className="text-muted-foreground">Here&apos;s what&apos;s happening with your hotel today.</p>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard
            title="Total Revenue YTD"
            value="€1,245,892"
            change="+12.5% from last year"
            changeType="positive"
            icon={DollarSign}
            iconColor="text-primary"
          />
          <KpiCard
            title="Occupancy Rate"
            value="87%"
            change="+5% from last month"
            changeType="positive"
            icon={Percent}
            iconColor="text-accent"
          />
          <KpiCard
            title="New Guests Today"
            value="24"
            change="8 check-ins pending"
            changeType="neutral"
            icon={Users}
            iconColor="text-success"
          />
          <KpiCard
            title="Pending Payments"
            value="€12,450"
            change="3 invoices due"
            changeType="negative"
            icon={CreditCard}
            iconColor="text-chart-4"
          />
        </div>

        {/* Main content grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Calendar - takes 2 columns */}
          <div className="lg:col-span-2">
            <CalendarWidget />
          </div>

          {/* Recent Activity */}
          <div>
            <RecentActivity />
          </div>
        </div>

        {/* Quick stats chart */}
        <QuickStats />
      </div>
    </DashboardLayout>
  )
}
