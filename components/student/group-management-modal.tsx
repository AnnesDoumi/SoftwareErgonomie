"use client"

import { useState } from "react"

interface GroupManagementModalProps {
  currentMembers: Array<{ name: string; commits: number; reviews: number; messages: number; teamsHours: number }>
  onClose: () => void
  onAddMember: (name: string) => void
}

export default function GroupManagementModal({ currentMembers, onClose, onAddMember }: GroupManagementModalProps) {
  const [newMemberName, setNewMemberName] = useState("")
  const [activeTab, setActiveTab] = useState<"manage" | "contact">("manage")

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg border border-border max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">Gruppenmitglieder verwalten</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors text-2xl">
            ×
          </button>
        </div>

        <div className="p-6">
          {/* Tabs */}
          <div className="flex gap-4 mb-6 border-b border-border pb-4">
            {["manage", "contact"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as typeof activeTab)}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === tab
                    ? "text-primary border-b-2 border-primary pb-2"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab === "manage" ? "Mitglieder hinzufügen" : "Kontaktieren"}
              </button>
            ))}
          </div>

          {/* TAB: MANAGE MEMBERS */}
          {activeTab === "manage" && (
            <div className="space-y-4">
              <div className="bg-muted rounded-lg p-4 mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">Name des neuen Mitglieds:</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                    placeholder="z.B. Julia S."
                    className="flex-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    onClick={() => {
                      if (newMemberName.trim()) {
                        onAddMember(newMemberName)
                        setNewMemberName("")
                      }
                    }}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                  >
                    Hinzufügen
                  </button>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-foreground mb-3">Aktuelle Gruppenmitglieder:</h3>
                <div className="space-y-2">
                  {currentMembers.map((member, i) => (
                    <div key={i} className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div>
                        <p className="font-medium text-foreground">{member.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {member.commits} Commits • {member.messages} Nachrichten
                        </p>
                      </div>
                      <button className="px-3 py-1 text-xs border border-border rounded hover:bg-muted transition-colors">
                        Entfernen
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: CONTACT MEMBERS */}
          {activeTab === "contact" && (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground mb-4">
                Kontaktiere Gruppenmitglieder über verschiedene Kanäle:
              </p>
              {currentMembers.map((member, i) => (
                <div key={i} className="border border-border rounded-lg p-4">
                  <h4 className="font-bold text-foreground mb-3">{member.name}</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="px-3 py-2 text-sm bg-muted hover:bg-muted/80 rounded transition-colors text-foreground font-medium">
                      📧 E-Mail schreiben
                    </button>
                    <button className="px-3 py-2 text-sm bg-muted hover:bg-muted/80 rounded transition-colors text-foreground font-medium">
                      💬 MS Teams
                    </button>
                    <button className="px-3 py-2 text-sm bg-muted hover:bg-muted/80 rounded transition-colors text-foreground font-medium">
                      🔔 Benachrichtigung
                    </button>
                    <button className="px-3 py-2 text-sm bg-muted hover:bg-muted/80 rounded transition-colors text-foreground font-medium">
                      📅 Meeting vereinbaren
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
