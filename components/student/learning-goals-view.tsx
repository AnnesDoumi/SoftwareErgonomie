interface Goal {
  id: string
  title: string
  description: string
  targetCompletion: string
  progress: number
  evidenceFromTools: Record<string, string>
}

interface LearningGoalsViewProps {
  goals: Goal[]
}

export default function LearningGoalsView({ goals }: LearningGoalsViewProps) {
  return (
    <div className="space-y-6">
      {goals.map((goal) => (
        <div key={goal.id} className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-foreground">{goal.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{goal.description}</p>
            </div>
            <div className="text-right ml-4">
              <div className="text-2xl font-bold text-primary">{goal.progress}%</div>
              <p className="text-xs text-muted-foreground">Fortschritt</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6 h-3 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-chart-2 transition-all"
              style={{ width: `${goal.progress}%` }}
            />
          </div>

          {/* Target Date */}
          <div className="mb-4 text-sm">
            <span className="text-muted-foreground">Zielabschluss:</span>
            <span className="ml-2 font-medium text-foreground">{goal.targetCompletion}</span>
          </div>

          {/* Evidence from Tools */}
          <div className="bg-muted rounded-lg p-4">
            <h4 className="font-bold text-foreground mb-3 text-sm">Nachweise aus den Tools:</h4>
            <div className="space-y-2">
              {Object.entries(goal.evidenceFromTools).map(([tool, evidence]) => (
                <div key={tool} className="text-sm">
                  <span className="font-mono bg-background px-2 py-1 rounded text-xs text-primary mr-2">{tool}</span>
                  <span className="text-foreground">{evidence}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
