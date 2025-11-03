export default function TokenHoldings() {
  const tokens = [
    { name: "Uniswap", symbol: "UNI", balance: "150.5", value: "$1,200.00" },
    { name: "Aave", symbol: "AAVE", balance: "5.2", value: "$850.00" },
    { name: "Chainlink", symbol: "LINK", balance: "25.0", value: "$650.00" },
  ]

  return (
    <div className="card card-full">
      <h2 className="card-title">Top 3 Token Holdings</h2>
      <div className="tokens-list">
        {tokens.map((token) => (
          <div key={token.symbol} className="token-item">
            <div className="token-info">
              <div className="token-name">{token.name}</div>
              <div className="token-symbol">{token.symbol}</div>
            </div>
            <div className="token-values">
              <div className="token-balance">{token.balance}</div>
              <div className="token-value">{token.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
