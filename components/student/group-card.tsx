"use client"

interface StudentGroupCardProps {
  name: string
  course: string
  teamEngagement: number
  myProductivity: number
  communicationHealth: number
  selfAssessment: "Niedrig" | "Mittel" | "Gut" | "Sehr gut"
  onClick: () => void
}

export default function StudentGroupCard({
  name,
  course,
  teamEngagement,
  myProductivity,
  communicationHealth,
  selfAssessment,
  onClick,
}: StudentGroupCardProps) {
  const getSelfAssessmentColor = (assessment: string) => {
    switch (assessment) {
      case "Niedrig":
        return "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-900"
      case "Mittel":
        return "bg-amber-100 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-900"
      case "Gut":
        return "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 border border-blue-200 dark:border-blue-900"
      case "Sehr gut":
        return "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-900"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <button
      onClick={onClick}
      className="text-left bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-all hover:border-primary/50 group"
    >
      <div className="mb-6">
        <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors mb-1">{name}</h3>
        <p className="text-sm text-muted-foreground">{course}</p>
      </div>

      {/* Metrics Grid */}
      <div className="space-y-4">
        <MetricBar label="Team-Engagement" value={teamEngagement} />
        <MetricBar label="Meine Produktivität" value={myProductivity} color="chart-2" />
        <MetricBar label="Kommunikationsgesundheit" value={communicationHealth} color="chart-3" />
      </div>

      <div className="mt-6 pt-6 border-t border-border">
        <p className="text-xs text-muted-foreground mb-2">Meine Selbsteinschätzung</p>
        <div
          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getSelfAssessmentColor(selfAssessment)}`}
        >
          {selfAssessment}
        </div>
      </div>
    </button>
  )
}

function MetricBar({ label, value, color = "primary" }: { label: string; value: number; color?: string }) {
  const colorClasses = {
    primary: "bg-primary",
    "chart-2": "bg-chart-2",
    "chart-3": "bg-chart-3",
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="text-sm font-bold text-foreground">{value}%</span>
      </div>
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full ${colorClasses[color as keyof typeof colorClasses]} transition-all duration-300`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  )
}
