"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Mon", revenue: 4200, occupancy: 65 },
  { name: "Tue", revenue: 5100, occupancy: 72 },
  { name: "Wed", revenue: 4800, occupancy: 68 },
  { name: "Thu", revenue: 6200, occupancy: 85 },
  { name: "Fri", revenue: 7500, occupancy: 92 },
  { name: "Sat", revenue: 8100, occupancy: 95 },
  { name: "Sun", revenue: 6800, occupancy: 88 },
]

export function QuickStats() {
  return (
    <div className="glass-card rounded-xl p-6">
      <h3 className="mb-4 text-lg font-semibold text-foreground">Weekly Overview</h3>
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                borderColor: "hsl(var(--border))",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="revenue"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={{ fill: "hsl(var(--primary))" }}
              name="Revenue (€)"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="occupancy"
              stroke="hsl(var(--accent))"
              strokeWidth={2}
              dot={{ fill: "hsl(var(--accent))" }}
              name="Occupancy (%)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
