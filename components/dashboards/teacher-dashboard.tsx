"use client"

import { useState } from "react"
import { AlertCircle } from "lucide-react"
import GroupDetailPanel from "@/components/teacher/group-detail-panel"
import ProblemReportsView from "@/components/teacher/problem-reports-view"

export default function TeacherDashboard() {
  const [selectedGroup, setSelectedGroup] = useState<string | null>("group-1")
  const [activeTab, setActiveTab] = useState<"overview" | "problems">("overview")

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Tab Navigation */}
      <div className="mb-8 border-b border-border flex gap-8">
        <button
          onClick={() => setActiveTab("overview")}
          className={`py-4 px-2 font-semibold text-sm transition-all border-b-2 ${
            activeTab === "overview"
              ? "text-primary border-primary"
              : "text-muted-foreground border-transparent hover:text-foreground"
          }`}
        >
          Gruppenüberblick
        </button>
        <button
          onClick={() => setActiveTab("problems")}
          className={`py-4 px-2 font-semibold text-sm transition-all border-b-2 flex items-center gap-2 ${
            activeTab === "problems"
              ? "text-primary border-primary"
              : "text-muted-foreground border-transparent hover:text-foreground"
          }`}
        >
          <AlertCircle size={18} />
          Trauerkasten
        </button>
      </div>

      {activeTab === "problems" ? (
        <ProblemReportsView />
      ) : (
        <>
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">Gruppenüberwachung</h2>
            <p className="text-muted-foreground">
              Erkennen Sie früh Motivationsdellen und unterstützen Sie Ihre Gruppen proaktiv
            </p>
          </div>

          {/* Design Customization for Classroom Use */}
          <div className="mb-8 p-4 bg-card border border-border rounded-lg">
            <div className="flex flex-wrap items-center gap-6">
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Farbschema für Unterricht:</label>
                <div className="flex gap-2">{/* Remove color scheme buttons */}</div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Gesamtauswertung exportieren:</label>
                <div className="flex gap-2">{/* Remove export format buttons */}</div>
              </div>
            </div>
          </div>

          {/* Alert Zones */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 rounded-lg p-4">
              <div className="flex gap-3">
                <div className="text-xl">⚠️</div>
                <div>
                  <div className="font-semibold text-amber-900 dark:text-amber-200">Gruppen in Motivationsdelle</div>
                  <div className="text-sm text-amber-800 dark:text-amber-300">Gruppe B zeigt sinkende Beteiligung</div>
                </div>
              </div>
            </div>
            <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/30 rounded-lg p-4">
              <div className="flex gap-3">
                <div className="text-xl">✓</div>
                <div>
                  <div className="font-semibold text-green-900 dark:text-green-200">Gruppen mit hoher Motivation</div>
                  <div className="text-sm text-green-800 dark:text-green-300">3 Gruppen zeigen stabiles Engagement</div>
                </div>
              </div>
            </div>
          </div>

          {/* Comparative Group Visualization */}
          <div className="bg-card rounded-xl border border-border p-6 mb-8">
            <h3 className="font-bold text-lg mb-4 text-foreground">Vergleich: Motivation zwischen Gruppen</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { name: "Gruppe A", motivation: 75, color: "bg-green-100 dark:bg-green-900/20" },
                { name: "Gruppe B", motivation: 58, color: "bg-red-100 dark:bg-red-900/20" },
                { name: "Gruppe C", motivation: 88, color: "bg-green-100 dark:bg-green-900/20" },
                { name: "Gruppe D", motivation: 72, color: "bg-green-100 dark:bg-green-900/20" },
              ].map((group) => (
                <div key={group.name} className={`${group.color} p-4 rounded-lg border border-border`}>
                  <p className="text-sm font-medium text-foreground mb-2">{group.name}</p>
                  <div className="text-2xl font-bold text-primary">{group.motivation}%</div>
                  <p className="text-xs text-muted-foreground mt-1">Motivation</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Groups List */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-xl border border-border overflow-hidden sticky top-24">
                <div className="bg-primary text-primary-foreground px-6 py-4">
                  <h3 className="font-semibold">Alle Gruppen</h3>
                </div>
                <div className="divide-y divide-border">
                  {["group-1", "group-2", "group-3", "group-4"].map((groupId) => (
                    <button
                      key={groupId}
                      onClick={() => setSelectedGroup(groupId)}
                      className={`w-full text-left px-6 py-4 transition-colors ${
                        selectedGroup === groupId ? "bg-primary/10 border-l-4 border-primary" : "hover:bg-muted"
                      }`}
                    >
                      <div className={`font-medium ${selectedGroup === groupId ? "text-primary" : "text-foreground"}`}>
                        {groupId === "group-1" && "Gruppe A"}
                        {groupId === "group-2" && "Gruppe B"}
                        {groupId === "group-3" && "Gruppe C"}
                        {groupId === "group-4" && "Gruppe D"}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">Software Ergonomie</div>
                      {groupId === "group-2" && (
                        <div className="mt-2 px-2 py-1 bg-warning/20 text-warning text-xs rounded font-semibold">
                          Attn: Motivation ↓
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Detail View */}
            <div className="lg:col-span-2">
              <GroupDetailPanel groupId={selectedGroup} />
            </div>
          </div>
        </>
      )}

      {/* Data Privacy Notice - always visible */}
      <div className="mt-8 p-6 bg-primary/5 border border-primary/20 rounded-xl">
        <h3 className="font-bold text-foreground mb-3">Datenschutz & Transparenz</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>✓ Alle Daten sind anonymisiert und werden nicht für Benotung einzelner Studierender verwendet</li>
          <li>✓ Analysen dienen der proaktiven Unterstützung und nicht der Überwachung</li>
          <li>✓ Studierende können ihre Daten-Sichtbarkeit kontrollieren</li>
          <li>✓ Der "Trauerkasten" zeigt Gruppen in Schwierigkeiten zur frühzeitigen Intervention</li>
        </ul>
      </div>
    </div>
  )
}
