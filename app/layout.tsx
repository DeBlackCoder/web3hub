import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AdminProvider } from "@/lib/admin-context"
import { WalletProvider } from "@/lib/wallet-context"
import { ProfileProvider } from "@/lib/profile-context"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Web3Hub",
  description: "Web3 dashboard",
  generator: "Web3Hub",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <WalletProvider>
          <ProfileProvider>
            <AdminProvider>{children}</AdminProvider>
          </ProfileProvider>
        </WalletProvider>
      </body>
        <Analytics />
    </html>
  )
}
