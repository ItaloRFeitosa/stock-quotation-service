const GetQuoteDTO = ({ traceId, user, query }) => ({
  traceId,
  userId: user.id,
  symbol: query.symbol
})

module.exports = { GetQuoteDTO }
