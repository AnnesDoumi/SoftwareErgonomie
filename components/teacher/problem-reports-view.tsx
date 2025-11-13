"use client"

import { useState } from "react"
import { AlertCircle, MessageSquare, User, Calendar } from "lucide-react"

interface ProblemReport {
  id: string
  groupId: string
  groupName: string
  category: "communication" | "motivation" | "productivity" | "conflict"
  severity: "low" | "medium" | "high"
  description: string
  createdAt: string
  reportedBy: string
  status: "new" | "reviewed" | "resolved"
  studentCount: number
}

export default function ProblemReportsView() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")

  const problemReports: ProblemReport[] = [
    {
      id: "report-1",
      groupId: "group-2",
      groupName: "Gruppe B",
      category: "motivation",
      severity: "high",
      description: "Sinkende Beteiligung in den letzten zwei Wochen. Nur 2 von 4 Mitgliedern aktiv.",
      createdAt: "2024-11-13",
      reportedBy: "System-Analyse",
      status: "new",
      studentCount: 4,
    },
    {
      id: "report-2",
      groupId: "group-1",
      groupName: "Gruppe A",
      category: "communication",
      severity: "medium",
      description: "Ungleiche Beteiligung in der Kommunikation. Ein Mitglied dominiert das Gespräch.",
      createdAt: "2024-11-12",
      reportedBy: "Gruppenanalyse",
      status: "reviewed",
      studentCount: 4,
    },
    {
      id: "report-3",
      groupId: "group-3",
      groupName: "Gruppe C",
      category: "productivity",
      severity: "medium",
      description: "Verzögerte Code-Commits und weniger GitHub-Aktivität als üblich.",
      createdAt: "2024-11-11",
      reportedBy: "GitHub-Integration",
      status: "reviewed",
      studentCount: 3,
    },
    {
      id: "report-4",
      groupId: "group-4",
      groupName: "Gruppe D",
      category: "conflict",
      severity: "low",
      description: "Gelegentliche Meinungsverschiedenheiten in den Feedback-Selbsteinschätzungen.",
      createdAt: "2024-11-10",
      reportedBy: "Feedback-Modul",
      status: "resolved",
      studentCount: 4,
    },
  ]

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      communication: "Kommunikation",
      motivation: "Motivation",
      productivity: "Produktivität",
      conflict: "Konflikt",
    }
    return labels[category] || category
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-destructive/10 border-destructive text-destructive-foreground"
      case "medium":
        return "bg-warning/10 border-warning text-warning-foreground"
      case "low":
        return "bg-success/10 border-success text-success-foreground"
      default:
        return "bg-muted/10 border-muted text-muted-foreground"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-primary/10 text-primary border-primary"
      case "reviewed":
        return "bg-accent/10 text-accent border-accent"
      case "resolved":
        return "bg-success/10 text-success border-success"
      default:
        return "bg-muted/10 text-muted-foreground border-muted"
    }
  }

  const filteredReports = problemReports.filter((report) => {
    const categoryMatch = selectedCategory === "all" || report.category === selectedCategory
    const statusMatch = selectedStatus === "all" || report.status === selectedStatus
    return categoryMatch && statusMatch
  })

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <AlertCircle className="w-8 h-8 text-warning" />
          <h2 className="text-3xl font-bold text-foreground">Trauerkasten - Problemmeldungen</h2>
        </div>
        <p className="text-muted-foreground">
          Automatische Erkennung von Gruppen in Schwierigkeiten. Alle Daten bleiben anonym und unterstützen frühe
          Interventionen.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-card rounded-lg border border-border p-4">
          <div className="text-sm text-muted-foreground font-medium">Neue Meldungen</div>
          <div className="text-3xl font-bold text-warning mt-2">
            {problemReports.filter((r) => r.status === "new").length}
          </div>
        </div>
        <div className="bg-card rounded-lg border border-border p-4">
          <div className="text-sm text-muted-foreground font-medium">In Bearbeitung</div>
          <div className="text-3xl font-bold text-accent mt-2">
            {problemReports.filter((r) => r.status === "reviewed").length}
          </div>
        </div>
        <div className="bg-card rounded-lg border border-border p-4">
          <div className="text-sm text-muted-foreground font-medium">Behoben</div>
          <div className="text-3xl font-bold text-success mt-2">
            {problemReports.filter((r) => r.status === "resolved").length}
          </div>
        </div>
        <div className="bg-card rounded-lg border border-border p-4">
          <div className="text-sm text-muted-foreground font-medium">Betroffene Gruppen</div>
          <div className="text-3xl font-bold text-primary mt-2">
            {new Set(problemReports.map((r) => r.groupId)).size}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card rounded-lg border border-border p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Kategorie:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">Alle Kategorien</option>
              <option value="communication">Kommunikation</option>
              <option value="motivation">Motivation</option>
              <option value="productivity">Produktivität</option>
              <option value="conflict">Konflikt</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Status:</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">Alle Status</option>
              <option value="new">Neu</option>
              <option value="reviewed">Überprüft</option>
              <option value="resolved">Behoben</option>
            </select>
          </div>
        </div>
      </div>

      {/* Problem Reports List */}
      <div className="space-y-4">
        {filteredReports.length === 0 ? (
          <div className="bg-success/5 rounded-lg border border-success/20 p-8 text-center">
            <div className="text-4xl mb-3">✓</div>
            <p className="text-foreground font-semibold">Keine Meldungen</p>
            <p className="text-muted-foreground text-sm mt-1">Alle Gruppen laufen gut!</p>
          </div>
        ) : (
          filteredReports.map((report) => (
            <div
              key={report.id}
              className="bg-card rounded-lg border border-border p-6 hover:border-primary/30 transition-all cursor-pointer"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                {/* Left Side - Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${getSeverityColor(report.severity)}`}
                    >
                      {report.severity === "high" && "Hoch"}
                      {report.severity === "medium" && "Mittel"}
                      {report.severity === "low" && "Niedrig"}
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(report.status)}`}
                    >
                      {report.status === "new" && "Neu"}
                      {report.status === "reviewed" && "Überprüft"}
                      {report.status === "resolved" && "Behoben"}
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-foreground mb-2">{report.groupName}</h3>
                  <p className="text-sm text-muted-foreground font-medium mb-3">{getCategoryLabel(report.category)}</p>
                  <p className="text-base text-foreground mb-4">{report.description}</p>

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      {new Date(report.createdAt).toLocaleDateString("de-DE")}
                    </div>
                    <div className="flex items-center gap-1">
                      <User size={16} />
                      {report.studentCount} Studierende
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare size={16} />
                      {report.reportedBy}
                    </div>
                  </div>
                </div>

                {/* Right Side - Action */}
                <div className="flex flex-col gap-2">
                  <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors">
                    Details ansehen
                  </button>
                  {report.status !== "resolved" && (
                    <button className="px-4 py-2 rounded-lg bg-muted text-foreground font-medium text-sm hover:bg-muted/80 transition-colors">
                      Status ändern
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Help Section */}
      <div className="mt-8 bg-secondary/5 rounded-lg border border-secondary p-6">
        <h3 className="font-semibold text-foreground mb-3">Wie funktioniert der Trauerkasten?</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">Automatische Analyse:</strong> Das System erkennt automatisch Muster bei
            Motivationsdellen, ungleicher Beteiligung oder Produktivitätsrückgängen.
          </li>
          <li>
            <strong className="text-foreground">Anonyme Datenquellen:</strong> Daten werden aggregiert und anonym
            präsentiert – nie einzelne Studierende beurkundet.
          </li>
          <li>
            <strong className="text-foreground">Frühe Interventionen:</strong> Lehrende können proaktiv unterstützen,
            bevor Gruppen in größere Schwierigkeiten geraten.
          </li>
          <li>
            <strong className="text-foreground">Lernförderlich:</strong> Das Ziel ist Unterstützung und Verbesserung,
            nicht Überwachung oder Benotung.
          </li>
        </ul>
      </div>
    </div>
  )
}
