"use client"

import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

export function ModeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null // verhindert Hydration-Flackern

    const isDark = theme === "dark"

    return (
        <button
            type="button"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
            aria-label="Darstellung umschalten"
        >
            {isDark ? (
                <>
                    <Sun className="h-4 w-4" />
                    <span>Hell</span>
                </>
            ) : (
                <>
                    <Moon className="h-4 w-4" />
                    <span>Dunkel</span>
                </>
            )}
        </button>
    )
}
