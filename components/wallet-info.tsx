export default function WalletInfo() {
  return (
    <div className="card card-full">
      <h2 className="card-title">Wallet Info</h2>
      <div className="wallet-content">
        <div className="info-row">
          <span className="info-label">Address:</span>
          <span className="info-value">0x742d35Cc6634C0532925a3b844Bc0e8f6E...</span>
        </div>
        <div className="info-row">
          <span className="info-label">ETH Balance:</span>
          <span className="info-value highlighted">2.5 ETH</span>
        </div>
        <div className="info-row">
          <span className="info-label">USD Value:</span>
          <span className="info-value">$5,250.00</span>
        </div>
      </div>
    </div>
  )
}
