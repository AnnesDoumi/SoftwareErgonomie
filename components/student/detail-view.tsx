"use client"

import { useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts"
import CommitDetailView from "./commit-detail-view"
import GroupManagementModal from "./group-management-modal"
import LearningGoalsView from "./learning-goals-view"

interface StudentDetailViewProps {
  groupId: string
  onBack: () => void
}

const githubDataEnhanced = [
  {
    id: "GH-001",
    title: "UI Components Library",
    assignee: "You",
    status: "In Progress",
    commits: 8,
    lastCommit: "2h ago",
    changes: "+245 -89",
    details: [
      {
        hash: "a3f2e1c",
        message: "feat: Add Button component with loading state",
        timestamp: "2025-11-18 14:32",
        files: [{ name: "Button.tsx", added: 124, removed: 12 }],
      },
      {
        hash: "b7d4k2m",
        message: "fix: Improve accessibility for Card component",
        timestamp: "2025-11-18 13:15",
        files: [
          { name: "Card.tsx", added: 42, removed: 15 },
          { name: "Card.test.tsx", added: 67, removed: 0 },
        ],
      },
      {
        hash: "c9n1p5x",
        message: "docs: Add Storybook stories for all components",
        timestamp: "2025-11-18 11:42",
        files: [{ name: "stories/components.stories.ts", added: 156, removed: 0 }],
      },
    ],
  },
  {
    id: "GH-002",
    title: "API Integration",
    assignee: "Sarah K.",
    status: "In Review",
    commits: 12,
    lastCommit: "4h ago",
    changes: "+512 -156",
    details: [
      {
        hash: "d2q8r3y",
        message: "feat: Implement REST endpoints for user data",
        timestamp: "2025-11-18 10:05",
        files: [
          { name: "routes/users.ts", added: 187, removed: 34 },
          { name: "middleware/auth.ts", added: 89, removed: 12 },
        ],
      },
      {
        hash: "e5s9t4z",
        message: "test: Add integration tests for API endpoints",
        timestamp: "2025-11-18 09:22",
        files: [{ name: "tests/api.integration.test.ts", added: 236, removed: 0 }],
      },
    ],
  },
  {
    id: "GH-003",
    title: "Database Schema",
    assignee: "Alex M.",
    status: "Completed",
    commits: 15,
    lastCommit: "1d ago",
    changes: "+823 -412",
  },
  {
    id: "GH-004",
    title: "Testing Framework",
    assignee: "Max B.",
    status: "To Do",
    commits: 0,
    lastCommit: "—",
    changes: "—",
  },
]

const moodleAssignments = [
  {
    id: "MOOD-001",
    title: "Konzeptpapier",
    dueDate: "2025-11-15",
    submitted: "2025-11-14",
    grade: "1.3",
    status: "submitted",
  },
  {
    id: "MOOD-002",
    title: "Usability Testing Bericht",
    dueDate: "2025-11-22",
    submitted: null,
    daysLeft: 7,
    status: "pending",
  },
  {
    id: "MOOD-003",
    title: "Design System Dokumentation",
    dueDate: "2025-12-05",
    submitted: null,
    daysLeft: 20,
    status: "not-started",
  },
]

const msTeamsData = [
  { name: "Week 1", activeHours: 12, messages: 45, collaborators: 3 },
  { name: "Week 2", activeHours: 18, messages: 62, collaborators: 4 },
  { name: "Week 3", activeHours: 15, messages: 38, collaborators: 3 },
  { name: "Week 4", activeHours: 22, messages: 71, collaborators: 4 },
  { name: "Week 5", activeHours: 19, messages: 54, collaborators: 4 },
]

const miroCollaborations = [
  { date: "Nov 10", title: "Wireframing Session", participants: 4, elements: 42, duration: "2h 15m" },
  { date: "Nov 12", title: "Brainstorming: User Flows", participants: 4, elements: 28, duration: "1h 30m" },
  { date: "Nov 15", title: "Design System Planning", participants: 3, elements: 56, duration: "2h 45m" },
]

const learningProgressData = [
  { week: "W1", progress: 20, target: 30 },
  { week: "W2", progress: 35, target: 40 },
  { week: "W3", progress: 45, target: 50 },
  { week: "W4", progress: 55, target: 60 },
  { week: "W5", progress: 68, target: 70 },
]

const learningGoals = [
  {
    id: "LG-001",
    title: "UX-Prinzipien verstehen",
    description: "Nutzerforschung, Usability Testing, Human-Centered Design",
    targetCompletion: "2025-11-30",
    progress: 75,
    evidenceFromTools: {
      miro: "6 Collaborative Sessions, 156 Board-Elemente",
      moodle: "Design System Dokumentation 85%",
      github: "UI Components Library completed",
    },
  },
  {
    id: "LG-002",
    title: "Technische Implementierung",
    description: "Frontend-Entwicklung, API-Integration, Testing",
    targetCompletion: "2025-12-15",
    progress: 55,
    evidenceFromTools: {
      github: "API Integration (12 commits), Testing Framework",
      moodle: "Konzeptpapier 1.3 Note",
      teams: "22 Stunden aktiv, 71 Nachrichten",
    },
  },
  {
    id: "LG-003",
    title: "Projektmanagement & Kommunikation",
    description: "Agile Methoden, Teamkommunikation, Zeitmanagement",
    targetCompletion: "2025-11-20",
    progress: 82,
    evidenceFromTools: {
      teams: "Konsistent aktiv, schnelle Antworten (15min avg)",
      miro: "Aktive Teilnahme in 3 Sessions",
      github: "Code Reviews, 6 Feedback-Runden",
    },
  },
]

export default function StudentDetailView({ groupId, onBack }: StudentDetailViewProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "commits" | "goals" | "team">("overview")
  const [selectedCommit, setSelectedCommit] = useState<string | null>(null)
  const [showGroupManagement, setShowGroupManagement] = useState(false)
  const [teamMembers, setTeamMembers] = useState([
    { name: "Alex M.", commits: 24, reviews: 8, messages: 156, teamsHours: 16 },
    { name: "Sarah K.", commits: 18, reviews: 12, messages: 198, teamsHours: 22 },
    { name: "Max B.", commits: 12, reviews: 4, messages: 89, teamsHours: 11 },
    { name: "You", commits: 20, reviews: 6, messages: 145, teamsHours: 19 },
  ])

  const selectedCommitData = selectedCommit
    ? githubDataEnhanced.flatMap((task) => task.details || []).find((c) => c.hash === selectedCommit)
    : null

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
      >
        ← Zurück zu Gruppen
      </button>

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Software Ergonomie - Gruppe A</h2>
          <p className="text-muted-foreground mt-2">Integrierte Datenvisualisierung: GitHub, Moodle, MS Teams, Miro</p>
        </div>
        <button
          onClick={() => setShowGroupManagement(true)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
        >
          + Mitglied hinzufügen
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-4 mb-8 border-b border-border pb-4">
        {["overview", "commits", "goals", "team"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as typeof activeTab)}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === tab
                ? "text-primary border-b-2 border-primary pb-2"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab === "overview" && "Überblick"}
            {tab === "commits" && "GitHub Commits"}
            {tab === "goals" && "Lernziele"}
            {tab === "team" && "Teamanalyse"}
          </button>
        ))}
      </div>

      {/* COMMIT DETAILS VIEW */}
      {selectedCommit && selectedCommitData && (
        <CommitDetailView commit={selectedCommitData} onClose={() => setSelectedCommit(null)} />
      )}

      {/* TAB: OVERVIEW */}
      {activeTab === "overview" && (
        <>
          {/* Top Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Mein Lernfortschritt", value: "68%", color: "text-primary" },
              { label: "Commits diese Woche", value: "8", color: "text-chart-2" },
              { label: "Teams Aktivität", value: "19h", color: "text-chart-3" },
              { label: "Moodle Abgaben", value: "1/3", color: "text-chart-4" },
            ].map((stat, i) => (
              <div key={i} className="bg-card rounded-xl border border-border p-6">
                <div className="text-sm text-muted-foreground mb-2">{stat.label}</div>
                <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
              </div>
            ))}
          </div>

          {/* GitHub Tasks Section */}
          <div className="bg-card rounded-xl border border-border p-6 mb-8">
            <h3 className="font-bold text-lg mb-4 text-foreground">GitHub Tasks & Commits</h3>
            <div className="space-y-3">
              {githubDataEnhanced.map((task) => (
                <div
                  key={task.id}
                  onClick={() => task.details && setSelectedCommit(task.details[0]?.hash || null)}
                  className={`border border-border rounded-lg p-4 transition-colors ${
                    task.details ? "hover:bg-muted/50 cursor-pointer" : ""
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs text-primary font-medium">{task.id}</span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            task.status === "In Progress"
                              ? "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200"
                              : task.status === "In Review"
                                ? "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200"
                                : task.status === "Completed"
                                  ? "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200"
                                  : "bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-200"
                          }`}
                        >
                          {task.status}
                        </span>
                      </div>
                      <h4 className="font-medium text-foreground">{task.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">Zugewiesen: {task.assignee}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-xs pt-2 border-t border-border">
                    <div>
                      <span className="text-muted-foreground">Commits:</span>{" "}
                      <span className="font-bold text-foreground">{task.commits}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Letzter Commit:</span>{" "}
                      <span className="font-bold text-foreground">{task.lastCommit}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Änderungen:</span>{" "}
                      <span className="font-bold text-chart-2">{task.changes}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Moodle Assignments Section */}
          <div className="bg-card rounded-xl border border-border p-6 mb-8">
            <h3 className="font-bold text-lg mb-4 text-foreground">Moodle Abgaben & Deadlines</h3>
            <div className="space-y-3">
              {moodleAssignments.map((assignment) => (
                <div key={assignment.id} className="border border-border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs text-primary font-medium">{assignment.id}</span>
                        {assignment.status === "submitted" && (
                          <span className="text-xs px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200">
                            ✓ Eingereicht
                          </span>
                        )}
                        {assignment.status === "pending" && (
                          <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200">
                            ⏳ Ausstehend
                          </span>
                        )}
                        {assignment.status === "not-started" && (
                          <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-200">
                            ○ Nicht begonnen
                          </span>
                        )}
                      </div>
                      <h4 className="font-medium text-foreground">{assignment.title}</h4>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-xs pt-2 border-t border-border text-muted-foreground">
                    <div>
                      Deadline: <span className="text-foreground font-medium">{assignment.dueDate}</span>
                    </div>
                    {assignment.status === "submitted" && (
                      <>
                        <div>
                          Eingereicht: <span className="text-foreground font-medium">{assignment.submitted}</span>
                        </div>
                        <div>
                          Note: <span className="text-chart-2 font-bold">{assignment.grade}</span>
                        </div>
                      </>
                    )}
                    {assignment.status !== "submitted" && (
                      <div className={assignment.daysLeft! <= 7 ? "text-red-600 dark:text-red-400" : ""}>
                        Verbleibend: <span className="font-medium">{assignment.daysLeft} Tage</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MS Teams Activity Section */}
          <div className="bg-card rounded-xl border border-border p-6 mb-8">
            <h3 className="font-bold text-lg mb-4 text-foreground">MS Teams Aktivität & Kommunikation</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={msTeamsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }} />
                <Legend />
                <Bar dataKey="activeHours" fill="var(--primary)" name="Aktive Stunden" />
                <Bar dataKey="messages" fill="var(--chart-2)" name="Nachrichten" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="text-sm text-foreground mb-3">
                <strong>Diese Woche:</strong>
              </p>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Aktiv:</span>
                  <p className="font-bold text-foreground">19h 30m</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Kommunikationspartner:</span>
                  <p className="font-bold text-foreground">4 Personen</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Durchschn. Antwortzeit:</span>
                  <p className="font-bold text-foreground">15 Minuten</p>
                </div>
              </div>
            </div>
          </div>

          {/* Miro Collaboration Section */}
          <div className="bg-card rounded-xl border border-border p-6 mb-8">
            <h3 className="font-bold text-lg mb-4 text-foreground">Miro Collaborative Sessions</h3>
            <div className="space-y-3">
              {miroCollaborations.map((session, i) => (
                <div key={i} className="border border-border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground mb-1">{session.date}</p>
                      <h4 className="font-medium text-foreground">{session.title}</h4>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-xs pt-2 border-t border-border text-muted-foreground">
                    <div>
                      Teilnehmer: <span className="text-foreground font-bold">{session.participants}</span>
                    </div>
                    <div>
                      Board Elemente: <span className="text-foreground font-bold">{session.elements}</span>
                    </div>
                    <div>
                      Dauer: <span className="text-foreground font-bold">{session.duration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Learning Progress */}
          <div className="bg-card rounded-xl border border-border p-6 mb-8">
            <h3 className="font-bold text-lg mb-6 text-foreground">Mein Lernfortschritt</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={learningProgressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="progress"
                  stroke="var(--primary)"
                  name="Mein Fortschritt"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="var(--muted-foreground)"
                  name="Zielwert"
                  strokeDasharray="5 5"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Team Productivity Comparison */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="font-bold text-lg mb-6 text-foreground">Gruppenmitglieder - Datenübersicht</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-border">
                  <tr>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Name</th>
                    <th className="text-center py-3 px-4 text-muted-foreground font-medium">GitHub Commits</th>
                    <th className="text-center py-3 px-4 text-muted-foreground font-medium">Code Reviews</th>
                    <th className="text-center py-3 px-4 text-muted-foreground font-medium">Teams Nachrichten</th>
                    <th className="text-center py-3 px-4 text-muted-foreground font-medium">Teams Aktiv (h)</th>
                  </tr>
                </thead>
                <tbody>
                  {teamMembers.map((member, i) => (
                    <tr key={i} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="py-4 px-4 font-medium text-foreground">{member.name}</td>
                      <td className="py-4 px-4 text-center">{member.commits}</td>
                      <td className="py-4 px-4 text-center">{member.reviews}</td>
                      <td className="py-4 px-4 text-center">{member.messages}</td>
                      <td className="py-4 px-4 text-center">{member.teamsHours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* TAB: GITHUB COMMITS */}
      {activeTab === "commits" && (
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="font-bold text-lg mb-6 text-foreground">Alle GitHub Commits</h3>
          <div className="space-y-4">
            {githubDataEnhanced.flatMap(
              (task) =>
                task.details?.map((commit) => (
                  <div
                    key={commit.hash}
                    onClick={() => setSelectedCommit(commit.hash)}
                    className="border border-border rounded-lg p-4 hover:bg-muted/50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <code className="text-xs bg-muted px-2 py-1 rounded text-primary font-mono">
                            {commit.hash}
                          </code>
                          <span className="text-xs text-muted-foreground">{commit.timestamp}</span>
                        </div>
                        <p className="font-medium text-foreground">{commit.message}</p>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {commit.files.length} file{commit.files.length !== 1 ? "s" : ""} changed
                      <span className="ml-4 text-chart-2 font-bold">
                        +{commit.files.reduce((sum, f) => sum + f.added, 0)}
                      </span>
                      <span className="ml-2 text-red-600 font-bold">
                        -{commit.files.reduce((sum, f) => sum + f.removed, 0)}
                      </span>
                    </div>
                  </div>
                )) || [],
            )}
          </div>
        </div>
      )}

      {/* TAB: LEARNING GOALS */}
      {activeTab === "goals" && <LearningGoalsView goals={learningGoals} />}

      {/* TAB: TEAM */}
      {activeTab === "team" && (
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="font-bold text-lg mb-6 text-foreground">Teamanalyse & Kooperation</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teamMembers.map((member, i) => (
              <div key={i} className="border border-border rounded-lg p-4">
                <h4 className="font-bold mb-4 text-foreground">{member.name}</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">GitHub Commits:</span>
                    <span className="font-bold">{member.commits}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Code Reviews:</span>
                    <span className="font-bold">{member.reviews}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Teams Nachrichten:</span>
                    <span className="font-bold">{member.messages}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Aktive Stunden:</span>
                    <span className="font-bold">{member.teamsHours}h</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Group Management Modal */}
      {showGroupManagement && (
        <GroupManagementModal
          currentMembers={teamMembers}
          onClose={() => setShowGroupManagement(false)}
          onAddMember={(name) => {
            setTeamMembers([...teamMembers, { name, commits: 0, reviews: 0, messages: 0, teamsHours: 0 }])
            setShowGroupManagement(false)
          }}
        />
      )}
    </div>
  )
}
