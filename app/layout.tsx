import "../public/style/globals.css"
import "../public/style/card.css"
import "../public/style/toggle.css"

import type { Metadata } from "next"
import { Roboto } from "next/font/google"

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] })

export const metadata: Metadata = {
  title: "Frontend - Nongnapat J.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  )
}
