"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts"

interface GroupDetailPanelProps {
  groupId: string
}

const motivationTrend = [
  { day: "Mo", motivation: 75, engagement: 70, productivity: 72 },
  { day: "Di", motivation: 72, engagement: 68, productivity: 70 },
  { day: "Mi", motivation: 70, engagement: 65, productivity: 68 },
  { day: "Do", motivation: 65, engagement: 60, productivity: 62 },
  { day: "Fr", motivation: 62, engagement: 58, productivity: 60 },
  { day: "Sa", motivation: 60, engagement: 55, productivity: 55 },
  { day: "So", motivation: 58, engagement: 52, productivity: 50 },
]

const groupDynamics = [
  { category: "Beteiligung", value: 68 },
  { category: "Kommunikation", value: 72 },
  { category: "Kooperation", value: 65 },
  { category: "Produktivität", value: 70 },
  { category: "Motivation", value: 62 },
]

const temporalProductivityData = [
  { week: "W1", groupProductivity: 60, avgClass: 65 },
  { week: "W2", groupProductivity: 68, avgClass: 70 },
  { week: "W3", groupProductivity: 65, avgClass: 72 },
  { week: "W4", groupProductivity: 62, avgClass: 74 },
  { week: "W5", groupProductivity: 58, avgClass: 75 },
]

export default function GroupDetailPanel({ groupId }: GroupDetailPanelProps) {
  const groupNames: Record<string, string> = {
    "group-1": "Gruppe A (Stabil)",
    "group-2": "Gruppe B (Warnung)",
    "group-3": "Gruppe C (Exzellent)",
    "group-4": "Gruppe D (Stabil)",
  }

  return (
    <div className="space-y-6">
      {/* Status Card */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg text-foreground">{groupNames[groupId]}</h3>
          {groupId === "group-2" && (
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
              Benachrichtigung senden
            </button>
          )}
        </div>
        <p className="text-muted-foreground">Software Ergonomie • 4 Studierende • Woche 8/14</p>
      </div>

      {/* Temporal Productivity Visualization */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="font-bold text-lg mb-6 text-foreground">Zeitliche Entwicklung der Produktivität</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={temporalProductivityData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis stroke="var(--muted-foreground)" />
            <YAxis stroke="var(--muted-foreground)" />
            <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }} />
            <Legend />
            <Line
              type="monotone"
              dataKey="groupProductivity"
              stroke="var(--primary)"
              name="Diese Gruppe"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="avgClass"
              stroke="var(--muted-foreground)"
              name="Klassendurchschnitt"
              strokeDasharray="5 5"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Motivation Trend */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="font-bold text-lg mb-6 text-foreground">Motivationstrend (7 Tage)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={motivationTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis stroke="var(--muted-foreground)" />
            <YAxis stroke="var(--muted-foreground)" />
            <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }} />
            <Legend />
            <Line type="monotone" dataKey="motivation" stroke="var(--primary)" name="Motivation" strokeWidth={2} />
            <Line type="monotone" dataKey="engagement" stroke="var(--chart-2)" name="Engagement" strokeWidth={2} />
            <Line type="monotone" dataKey="productivity" stroke="var(--chart-3)" name="Produktivität" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
        {groupId === "group-2" && (
          <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 rounded-lg">
            <p className="text-sm text-red-800 dark:text-red-200">
              ⚠️ Fallende Trends erkannt: Motivation ist in 7 Tagen um 17% gefallen
            </p>
          </div>
        )}
      </div>

      {/* Group Dynamics Radar */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="font-bold text-lg mb-6 text-foreground">Gruppendynamik-Profil</h3>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={groupDynamics}>
            <PolarGrid stroke="var(--border)" />
            <PolarAngleAxis dataKey="category" stroke="var(--muted-foreground)" />
            <PolarRadiusAxis stroke="var(--border)" angle={90} domain={[0, 100]} />
            <Radar name="Score" dataKey="value" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.3} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Action Items */}
      {groupId === "group-2" && (
        <div className="bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-900/30 p-6">
          <h3 className="font-bold text-lg text-amber-900 dark:text-amber-200 mb-4">Empfohlene Maßnahmen</h3>
          <ul className="space-y-2 text-amber-800 dark:text-amber-300 text-sm">
            <li>✓ Einzelgespräche mit Gruppenmitgliedern führen</li>
            <li>✓ Aufgaben neu verteilen zur Motivationssteigerung</li>
            <li>✓ Zwischenstand in Gruppe besprechen</li>
            <li>✓ Zusätzliche Unterstützung anbieten</li>
          </ul>
        </div>
      )}

      <div className="bg-blue-50 dark:bg-blue-950/20 rounded-xl border border-blue-200 dark:border-blue-900/30 p-4 text-xs">
        <p className="text-blue-800 dark:text-blue-300">
          <strong>Transparenz & Datenschutz:</strong> Diese Daten basieren auf anonymisierten Aktivitäten und werden
          nicht für Leistungsbewertung verwendet. Studierende können ihre Datenfreigabe kontrollieren.
        </p>
      </div>
    </div>
  )
}
