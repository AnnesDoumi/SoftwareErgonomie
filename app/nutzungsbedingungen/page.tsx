import Link from "next/link"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link href="/login" className="text-muted-foreground hover:text-foreground transition-colors">
            ← Zurück
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Nutzungsbedingungen</h1>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="space-y-8 text-foreground">
          <section>
            <h2 className="text-xl font-bold mb-3">1. Allgemeine Nutzungsbedingungen</h2>
            <p className="text-muted-foreground leading-relaxed">
              GroupFlow ist ein Lern- und Analysewerkzeug für interdisziplinäre Kurse an der HTW Berlin. Die Nutzung ist
              ausschließlich für registrierte Nutzer des Systems gestattet.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">2. Verantwortung der Nutzer</h2>
            <p className="text-muted-foreground leading-relaxed">
              Sie sind verantwortlich für die Korrektheit Ihrer Einträge und Selbsteinschätzungen. Missbrauch des
              Systems wird geahndet.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">3. Psychologische Sicherheit</h2>
            <p className="text-muted-foreground leading-relaxed">
              Alle Daten werden in Übereinstimmung mit Prinzipien der psychologischen Sicherheit verarbeitet. Das System
              dient der Selbstreflexion und Lernförderung, nicht der Überwachung oder Bewertung.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">4. Haftung</h2>
            <p className="text-muted-foreground leading-relaxed">
              Die HTW Berlin haftet nicht für Datenverlust oder Systemausfälle. Das System wird regelmäßig aktualisiert
              und gepflegt.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">5. Änderungen der Bedingungen</h2>
            <p className="text-muted-foreground leading-relaxed">
              Diese Bedingungen können jederzeit geändert werden. Sie werden benachrichtigt, wenn wesentliche Änderungen
              vorgenommen werden.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
