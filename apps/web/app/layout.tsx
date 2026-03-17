import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "H3 Ink | Local-first Markdown for desktop",
  description:
    "A calm desktop-first Markdown writing app for plain files, live preview, native save flows, and a restrained writing surface.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-32.svg", type: "image/svg+xml", sizes: "32x32" },
      { url: "/icon-128.svg", type: "image/svg+xml", sizes: "128x128" },
      { url: "/icon-256.svg", type: "image/svg+xml", sizes: "256x256" },
      { url: "/icon-512.svg", type: "image/svg+xml", sizes: "512x512" }
    ],
    apple: [{ url: "/icon-light.svg", type: "image/svg+xml" }],
    shortcut: ["/favicon.ico"]
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="antialiased">
      <body className="min-h-[100dvh]">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
