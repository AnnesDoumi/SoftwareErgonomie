"use client"

interface SemesterSummaryProps {
  onClose: () => void
}

export default function SemesterSummary({ onClose }: SemesterSummaryProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-card rounded-xl border border-border max-w-2xl w-full max-h-96 overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-card">
          <h2 className="text-2xl font-bold text-foreground">Dein Semester-Gesamtüberblick</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground text-2xl">
            ×
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Automatic Feedback */}
          <div className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/30 rounded-lg">
            <h3 className="font-semibold text-green-900 dark:text-green-200 mb-2">Automatisches Feedback vom System</h3>
            <p className="text-sm text-green-800 dark:text-green-300 mb-3">
              Basierend auf deinen Daten aus GitHub, Teams, Moodle und Miro:
            </p>
            <ul className="space-y-2 text-sm text-green-800 dark:text-green-300">
              <li>✓ Du zeigst konsistentes Engagement über 8 Wochen</li>
              <li>✓ Deine technischen Fähigkeiten haben sich um 28% verbessert</li>
              <li>✓ Teamfähigkeit ist deine Stärke (82% Kommunikationsqualität)</li>
              <li>⚠ Tipp: Versuche noch regelmäßiger Code Reviews zu geben</li>
            </ul>
          </div>

          {/* Learning Progress Summary */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Erreichter Lernfortschritt</h3>
            {[
              { goal: "UX-Prinzipien verstehen", achieved: 92 },
              { goal: "Technische Implementierung", achieved: 78 },
              { goal: "Projektmanagement & Kooperation", achieved: 85 },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-foreground font-medium">{item.goal}</span>
                  <span className="text-chart-2 font-bold">{item.achieved}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: `${item.achieved}%` }} />
                </div>
              </div>
            ))}
          </div>

          {/* Learnings for Future */}
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-foreground mb-3">Was du für die Zukunft mitnimmst:</h3>
            <ul className="space-y-1 text-sm text-foreground">
              <li>• Besseres Zeitmanagement führt zu besserer Code-Qualität</li>
              <li>• Regelmäßige Kommunikation verbessert Gruppendynamik</li>
              <li>• Selbstreflexion hilft, persönliche Entwicklung zu tracken</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
