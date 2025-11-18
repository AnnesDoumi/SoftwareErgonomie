// app/layout.tsx
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GroupFlow",
  description: "GroupFlow - Gruppe 9 - Software Ergonomie - HTW Berlin",
  icons: {
    icon: [
      // klassische Favicons
      {
        url: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      // optional: light/dark Varianten, falls du sie behalten willst
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/apple-icon.png",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
                                     children,
                                   }: Readonly<{ children: React.ReactNode }>) {
  return (
      <html lang="de">
      <body className="font-sans antialiased">
      {children}
      <Analytics />
      </body>
      </html>
  )
}
