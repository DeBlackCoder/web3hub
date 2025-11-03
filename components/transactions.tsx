export default function Transactions() {
  const transactions = [
    { id: 1, type: "Send", amount: "0.5 ETH", to: "0x8aE4...2cB9", date: "2 hours ago" },
    { id: 2, type: "Receive", amount: "2 UNI", from: "0x5D3B...1Fc2", date: "1 day ago" },
    { id: 3, type: "Swap", amount: "100 USDC → 0.05 ETH", to: "Uniswap", date: "3 days ago" },
  ]

  return (
    <div className="card card-full">
      <h2 className="card-title">Recent Transactions</h2>
      <div className="transactions-list">
        {transactions.map((tx) => (
          <div key={tx.id} className="transaction-item">
            <div className="tx-left">
              <div className="tx-type">{tx.type}</div>
              <div className="tx-meta">{tx.to || tx.from}</div>
            </div>
            <div className="tx-right">
              <div className="tx-amount">{tx.amount}</div>
              <div className="tx-date">{tx.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
