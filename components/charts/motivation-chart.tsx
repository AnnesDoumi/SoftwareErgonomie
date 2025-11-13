"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { week: "W1", groupA: 85, groupB: 82, groupC: 88, groupD: 80 },
  { week: "W2", groupA: 87, groupB: 80, groupC: 90, groupD: 82 },
  { week: "W3", groupA: 86, groupB: 75, groupC: 89, groupD: 84 },
  { week: "W4", groupA: 88, groupB: 70, groupC: 91, groupD: 86 },
  { week: "W5", groupA: 87, groupB: 65, groupC: 92, groupD: 85 },
  { week: "W6", groupA: 89, groupB: 62, groupC: 94, groupD: 87 },
  { week: "W7", groupA: 88, groupB: 58, groupC: 93, groupD: 88 },
]

export default function MotivationChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis stroke="var(--muted-foreground)" />
        <YAxis stroke="var(--muted-foreground)" />
        <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }} />
        <Legend />
        <Line type="monotone" dataKey="groupA" stroke="var(--chart-1)" strokeWidth={2} name="Gruppe A" />
        <Line type="monotone" dataKey="groupB" stroke="var(--destructive)" strokeWidth={2} name="Gruppe B" />
        <Line type="monotone" dataKey="groupC" stroke="var(--chart-2)" strokeWidth={2} name="Gruppe C" />
        <Line type="monotone" dataKey="groupD" stroke="var(--chart-3)" strokeWidth={2} name="Gruppe D" />
      </LineChart>
    </ResponsiveContainer>
  )
}
