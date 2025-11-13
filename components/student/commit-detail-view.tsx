"use client"

interface CommitFile {
  name: string
  added: number
  removed: number
}

interface CommitDetail {
  hash: string
  message: string
  timestamp: string
  files: CommitFile[]
}

interface CommitDetailViewProps {
  commit: CommitDetail
  onClose: () => void
}

const codeChanges: Record<string, { before: string; after: string }> = {
  "Button.tsx": {
    before: `export function Button({ children }) {
  return <button className="px-4 py-2">{children}</button>
}`,
    after: `export function Button({ children, loading }) {
  return (
    <button className="px-4 py-2 disabled:opacity-50" disabled={loading}>
      {loading ? "Loading..." : children}
    </button>
  )
}`,
  },
  "Card.tsx": {
    before: `export function Card({ children }) {
  return <div className="border p-4">{children}</div>
}`,
    after: `export function Card({ children, elevated }) {
  return (
    <div className={elevated ? "shadow-lg" : "border"} role="article">
      {children}
    </div>
  )
}`,
  },
}

export default function CommitDetailView({ commit, onClose }: CommitDetailViewProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg border border-border max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
          <div>
            <code className="text-sm bg-muted px-2 py-1 rounded text-primary font-mono">{commit.hash}</code>
            <h2 className="text-xl font-bold mt-2 text-foreground">{commit.message}</h2>
            <p className="text-sm text-muted-foreground mt-1">{commit.timestamp}</p>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors text-2xl">
            ×
          </button>
        </div>

        <div className="p-6 space-y-6">
          {commit.files.map((file) => (
            <div key={file.name} className="border border-border rounded-lg overflow-hidden">
              <div className="bg-muted px-4 py-2 flex items-center justify-between border-b border-border">
                <span className="font-mono text-sm font-bold text-foreground">{file.name}</span>
                <span className="text-xs">
                  <span className="text-chart-2 font-bold">+{file.added}</span>
                  <span className="mx-2 text-muted-foreground">|</span>
                  <span className="text-red-600 font-bold">-{file.removed}</span>
                </span>
              </div>

              {codeChanges[file.name] && (
                <div className="grid grid-cols-2 divide-x divide-border">
                  <div className="p-4">
                    <div className="text-xs font-bold text-red-600 mb-2">VORHER:</div>
                    <pre className="text-xs bg-red-50 dark:bg-red-900/10 p-2 rounded text-foreground overflow-x-auto">
                      <code>{codeChanges[file.name].before}</code>
                    </pre>
                  </div>
                  <div className="p-4">
                    <div className="text-xs font-bold text-chart-2 mb-2">NACHHER:</div>
                    <pre className="text-xs bg-green-50 dark:bg-green-900/10 p-2 rounded text-foreground overflow-x-auto">
                      <code>{codeChanges[file.name].after}</code>
                    </pre>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
