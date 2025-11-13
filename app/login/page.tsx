"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userRole, setUserRole] = useState<"student" | "teacher">("student")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      router.push(`/?role=${userRole}`)
    }, 800)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <h1 className="text-3xl font-bold text-foreground">GroupFlow</h1>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Transparente Gruppendynamiken für besseres Lernen an der HTW Berlin. Analysieren Sie Ihre Gruppenarbeit,
              dokumentieren Sie Lernfortschritte und verbessern Sie die Zusammenarbeit.
            </p>
          </div>

          {/* Role Selection */}
          <div className="mb-8">
            <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-3">Rolle auswählen</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: "student", title: "Studierende" },
                { id: "teacher", title: "Lehrperson" },
              ].map((role) => (
                <button
                  key={role.id}
                  onClick={() => setUserRole(role.id as any)}
                  className={`px-4 py-3 rounded-lg font-medium text-sm transition-all border-2 ${
                    userRole === role.id
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-foreground hover:border-primary/50"
                  }`}
                >
                  {role.title}
                </button>
              ))}
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                E-Mail-Adresse
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@htw-berlin.de"
                className="w-full px-4 py-3 rounded-lg border border-input bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Passwort
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border border-input bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? "Wird angemeldet..." : "Anmelden"}
              {!isLoading && <ChevronRight size={18} />}
            </button>
          </form>

          {/* Help Text */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Noch kein Konto?{" "}
              <a href="#" className="text-primary font-medium hover:underline">
                Jetzt registrieren
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">© 2025 HTW Berlin – Hochschule für Technik und Wirtschaft</p>
          <div className="flex gap-6 text-xs">
            <Link href="/datenschutz" className="text-muted-foreground hover:text-foreground transition-colors">
              Datenschutz
            </Link>
            <Link href="/nutzungsbedingungen" className="text-muted-foreground hover:text-foreground transition-colors">
              Nutzungsbedingungen
            </Link>
            <a
              href="mailto:support@htw-berlin.de"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Hilfe
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
