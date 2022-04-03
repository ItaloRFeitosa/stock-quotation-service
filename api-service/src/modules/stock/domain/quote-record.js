const QuoteRecord = (props) => ({
  userId: props.userId,
  name: props.name,
  symbol: props.symbol.toUpperCase(),
  open: props.open,
  high: props.high,
  low: props.low,
  close: props.close,
  createdAt: props.createdAt || new Date(),
})

module.exports = { QuoteRecord }
