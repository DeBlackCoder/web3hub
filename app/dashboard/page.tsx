"use client"
import { useAdmin } from "@/lib/admin-context"
import WalletInfo from "@/components/wallet-info"
import TokenHoldings from "@/components/token-holdings"
import Transactions from "@/components/transactions"
import CryptoPrices from "@/components/crypto-prices"
import Navbar from "@/components/navbar"
import "../home.css"

export default function Dashboard() {
  const { isAdmin } = useAdmin()

  return (
    <div className="dashboard-container">
      <Navbar showAdmin={isAdmin} />
      <main className="main-content">
        <div className="dashboard-grid">
          <WalletInfo />
          <TokenHoldings />
          <Transactions />
          <CryptoPrices />
        </div>
      </main>
    </div>
  )
}
