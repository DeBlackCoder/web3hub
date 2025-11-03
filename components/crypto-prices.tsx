export default function CryptoPrices() {
  const prices = [
    { name: "Bitcoin", symbol: "BTC", price: "$45,230", change: "+2.5%" },
    { name: "Ethereum", symbol: "ETH", price: "$2,100", change: "+1.8%" },
    { name: "Solana", symbol: "SOL", price: "$130.50", change: "-0.3%" },
  ]

  return (
    <div className="card card-full">
      <h2 className="card-title">Crypto Prices</h2>
      <div className="prices-grid">
        {prices.map((crypto) => (
          <div key={crypto.symbol} className="price-item">
            <div className="price-name">{crypto.name}</div>
            <div className="price-symbol">{crypto.symbol}</div>
            <div className="price-value">{crypto.price}</div>
            <div className={`price-change ${crypto.change.startsWith("+") ? "positive" : "negative"}`}>
              {crypto.change}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
