"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import StudentDashboard from "@/components/dashboards/student-dashboard"
import TeacherDashboard from "@/components/dashboards/teacher-dashboard"
import { LogOut } from "lucide-react"

export default function HomePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [userRole, setUserRole] = useState<"student" | "teacher">("student")
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const role = searchParams.get("role")

    if (role) {
      setUserRole((role as "student" | "teacher") || "student")
      setIsAuthenticated(true)
    } else {
      router.push("/login")
    }
  }, [searchParams, router])

  const handleLogout = () => {
    setIsAuthenticated(false)
    router.push("/login")
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-primary"></div>
            <h1 className="text-2xl font-bold text-foreground">
              {userRole === "student" ? "GroupFlow – Meine Gruppe" : "GroupFlow – Gruppenverwaltung"}
            </h1>
          </div>

          <div className="flex gap-3 items-center">
            <div className="flex gap-2 bg-muted rounded-lg p-1">
              <button
                onClick={() => setUserRole("student")}
                className={`px-3 py-2 rounded text-sm font-medium transition-all ${
                  userRole === "student"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Studierende
              </button>
              <button
                onClick={() => setUserRole("teacher")}
                className={`px-3 py-2 rounded text-sm font-medium transition-all ${
                  userRole === "teacher"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Lehrperson
              </button>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-muted text-muted-foreground hover:bg-border transition-colors text-sm font-medium flex items-center gap-2"
            >
              <LogOut size={16} />
              Abmelden
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {userRole === "student" ? <StudentDashboard /> : <TeacherDashboard />}
    </div>
  )
}
