"use client"

import { useState , useEffect} from "react"
import StudentGroupCard from "@/components/student/group-card"
import StudentDetailView from "@/components/student/detail-view"

export default function StudentDashboard() {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null)
  const [showProblemReport, setShowProblemReport] = useState(false)
  const [motivation, setMotivation] = useState(70)
  const [engagement, setEngagement] = useState(70)
  const [reflection, setReflection] = useState("")
  const [language, setLanguage] = useState<"de" | "en">("de")

  const handleSubmit = () => {
    console.log("Motivation:", motivation)
    console.log("Reflexion:", reflection)
    alert("Selbsteinschätzung gespeichert!")
  }

  
  useEffect(() => {
    // gespeicherte Sprache laden
    if (typeof window !== "undefined") {
      const stored = window.localStorage.getItem("groupflow-language")
      if (stored === "de" || stored === "en") {
        setLanguage(stored)
      }
    }
  }, [])

  useEffect(() => {
    // html lang setzen + speichern
    if (typeof document !== "undefined") {
      document.documentElement.lang = language
    }
    if (typeof window !== "undefined") {
      window.localStorage.setItem("groupflow-language", language)
    }
  }, [language])


  if (selectedGroup) {
    return <StudentDetailView groupId={selectedGroup} onBack={() => setSelectedGroup(null)} />
  }


  if (selectedGroup) {
    return <StudentDetailView groupId={selectedGroup} onBack={() => setSelectedGroup(null)} />
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Meine Gruppen</h2>
        <p className="text-muted-foreground">Visualisiere deine Beteiligung, Produktivität und Lernfortschritt</p>
      </div>

      <div className="mb-8 p-6 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/30 rounded-xl">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">Probleme in der Gruppenarbeit?</h3>
            <p className="text-sm text-blue-800 dark:text-blue-300 mb-3">
              Falls Gruppenmitglieder nicht erreichbar sind oder Kommunikationsprobleme bestehen, nutze den
              "Kummerkasten" um anonym Probleme zu melden.
            </p>
            <button
              onClick={() => setShowProblemReport(!showProblemReport)}
              className="text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
            >
              Problem melden
            </button>
          </div>
        </div>
        {showProblemReport && (
          <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-900/30">
            <textarea
              placeholder="Beschreibe die Probleme in deiner Gruppe (anonym, wird nicht für Benotung verwendet)..."
              className="w-full p-3 rounded-lg border border-blue-300 dark:border-blue-800 bg-white dark:bg-slate-950 text-foreground text-sm"
              rows={3}
            />
            <button className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
              Absenden
            </button>
          </div>
        )}
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-card rounded-xl p-6 border border-border">
          <div className="text-sm font-medium text-muted-foreground mb-2">Aktive Gruppen</div>
          <div className="text-4xl font-bold text-primary">3</div>
        </div>
        <div className="bg-card rounded-xl p-6 border border-border">
          <div className="text-sm font-medium text-muted-foreground mb-2">Meine Selbsteinschätzung</div>
          <div className="text-4xl font-bold text-chart-2">Hoch</div>
          <div className="text-xs text-muted-foreground mt-1">Engagement & Motivation</div>
        </div>
        <div className="bg-card rounded-xl p-6 border border-border">
          <div className="text-sm font-medium text-muted-foreground mb-2">Durchschn. Commits/Woche</div>
          <div className="text-4xl font-bold text-chart-3">12</div>
        </div>
        <div className="bg-card rounded-xl p-6 border border-border">
          <div className="text-sm font-medium text-muted-foreground mb-2">Semester Abgaben</div>
          <div className="text-4xl font-bold text-chart-4">5/5</div>
          <div className="text-xs text-muted-foreground mt-1">Alle Deadlines eingehalten</div>
        </div>
      </div>

      <div className="mb-8 p-6 bg-card border border-border rounded-xl">
        <h3 className="text-xl font-bold text-foreground mb-4">
          Meine Selbsteinschätzung
        </h3>

        {/* Motivation Slider */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-foreground">
              Motivation (0–100%)
            </label>
            <span className="text-sm font-semibold text-primary">
            {motivation}%
          </span>
          </div>

          <input
              type="range"
              min={0}
              max={100}
              value={motivation}
              onChange={(e) => setMotivation(Number(e.target.value))}
              className="w-full accent-primary cursor-pointer"
          />
        </div>


        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-foreground">
              Engagement (0–100%)
            </label>
            <span className="text-sm font-semibold text-primary">
            {engagement}%
          </span>
          </div>

          <input
              type="range"
              min={0}
              max={100}
              value={engagement}
              onChange={(e) => setEngagement(Number(e.target.value))}
              className="w-full accent-primary cursor-pointer"
          />
        </div>

        {/* Reflection Textarea */}
        <div className="mb-6">
          <label className="text-sm font-medium text-foreground mb-2 block">
            Reflexion (optional)
          </label>
          <textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="Wie fühle ich mich gerade? Was lief gut? Was würde ich verbessern?"
              className="w-full p-3 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              rows={3}
          />
        </div>

        {/* Submit Button */}
        <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium w-full"
        >
          Selbsteinschätzung speichern
        </button>
      </div>

      <div className="bg-card rounded-xl border border-border p-6 mb-8">
        <h3 className="font-bold text-lg mb-4 text-foreground">Mein Lernfortschritt über Kurse</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { course: "Software Ergonomie", progress: 68, weeks: "5/8 Wochen", status: "On Track" },
            { course: "UX/UI Design", progress: 55, weeks: "4/8 Wochen", status: "On Track" },
            { course: "Projektmanagement", progress: 82, weeks: "7/8 Wochen", status: "Ahead" },
          ].map((course, i) => (
            <div key={i} className="p-4 border border-border rounded-lg">
              <p className="text-sm font-medium text-foreground mb-2">{course.course}</p>
              <div className="w-full bg-muted rounded-full h-2 mb-2">
                <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${course.progress}%` }} />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{course.progress}%</span>
                <span>{course.weeks}</span>
              </div>
              <p className="text-xs text-chart-2 font-medium mt-1">{course.status}</p>
            </div>
          ))}
        </div>
      </div>



      {/* Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StudentGroupCard
          name="Software Ergonomie - Gruppe A"
          course="Software Ergonomie"
          teamEngagement={78}
          myProductivity={85}
          communicationHealth={82}
          selfAssessment="Gut"
          onClick={() => setSelectedGroup("group-1")}
        />
        <StudentGroupCard
          name="UX/UI Design - Gruppe B"
          course="UX/UI Design"
          teamEngagement={65}
          myProductivity={72}
          communicationHealth={68}
          selfAssessment="Mittel"
          onClick={() => setSelectedGroup("group-2")}
        />
        <StudentGroupCard
          name="Projektmanagement - Gruppe C"
          course="Projektmanagement"
          teamEngagement={88}
          myProductivity={91}
          communicationHealth={85}
          selfAssessment="Sehr gut"
          onClick={() => setSelectedGroup("group-3")}
        />
      </div>
    </div>
  )
}
