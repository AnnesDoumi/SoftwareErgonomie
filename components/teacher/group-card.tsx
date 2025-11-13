"use client"

interface TeacherGroupCardProps {
  name: string
  motivation: number
  engagement: number
  riskLevel: "low" | "medium" | "high"
}

export default function TeacherGroupCard({ name, motivation, engagement, riskLevel }: TeacherGroupCardProps) {
  const riskColors = {
    low: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200",
    medium: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200",
    high: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200",
  }

  const riskLabels = {
    low: "Gering",
    medium: "Mittel",
    high: "Hoch",
  }

  return (
    <div className="bg-card rounded-xl border border-border p-4">
      <div className="flex justify-between items-start mb-4">
        <h4 className="font-bold text-foreground">{name}</h4>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${riskColors[riskLevel]}`}>
          {riskLabels[riskLevel]}
        </span>
      </div>
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-muted-foreground">Motivation</span>
            <span className="font-bold text-foreground">{motivation}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary" style={{ width: `${motivation}%` }}></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-muted-foreground">Engagement</span>
            <span className="font-bold text-foreground">{engagement}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-chart-2" style={{ width: `${engagement}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
