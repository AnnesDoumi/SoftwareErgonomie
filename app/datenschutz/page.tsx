import Link from "next/link"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link href="/login" className="text-muted-foreground hover:text-foreground transition-colors">
            ← Zurück
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Datenschutz</h1>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="space-y-8 text-foreground">
          <section>
            <h2 className="text-xl font-bold mb-3">1. Datenschutzerklärung</h2>
            <p className="text-muted-foreground leading-relaxed">
              GroupFlow ist ein anonymes Analyse- und Feedbacksystem für Gruppendynamiken an der HTW Berlin. Wir erheben
              und verarbeiten Ihre Daten ausschließlich zur Visualisierung von Gruppendynamiken und zur Unterstützung
              des Lernprozesses.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">2. Erhobene Daten</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>• E-Mail-Adresse und Name (für Authentifizierung)</li>
              <li>• Daten aus verbundenen Tools (GitHub, Moodle, MS Teams, Miro)</li>
              <li>• Qualitative Selbsteinschätzungen und Reflexionen</li>
              <li>• Kommunikationsmuster und Beteiligungsdaten</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">3. Datenschutz & Transparenz</h2>
            <p className="text-muted-foreground leading-relaxed">
              Alle Daten werden ANONYM für Lehrende bereitgestellt. Personenidentifizierende Informationen werden nicht
              für Leistungsbewertungen verwendet. Das System dient der Lernunterstützung, nicht der Überwachung.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">4. Ihre Rechte</h2>
            <p className="text-muted-foreground leading-relaxed">
              Sie haben das Recht auf Einsicht, Berichtigung und Löschung Ihrer Daten. Kontaktieren Sie uns unter
              support@htw-berlin.de.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">5. Kontakt</h2>
            <p className="text-muted-foreground leading-relaxed">
              HTW Berlin – Hochschule für Technik und Wirtschaft
              <br />
              support@htw-berlin.de
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
