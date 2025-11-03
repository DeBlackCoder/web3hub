import Link from "next/link"
import "./home.css"
import Navbar from "@/components/navbar"

export default function Home() {
  return (
    <div className="home-container">
      <Navbar showAdmin={false} />
      <main className="hero">
        <div className="hero-content">
          <h1>Welcome to Web3 Hub</h1>
          <p>Your gateway to decentralized finance and social connectivity</p>
          <div className="hero-buttons">
            <Link href="/dashboard" className="btn btn-primary">
              View Dashboard
            </Link>
            <Link href="/social" className="btn btn-secondary">
              Join Community
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
