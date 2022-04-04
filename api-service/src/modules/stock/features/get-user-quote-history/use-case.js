const GetUserQuoteHistoryUseCase = ({ stockRepository }) => ({
  perform: async ({ userId, cursor, limit }) => {
    return stockRepository.listUserQuoteHistory({ userId, cursor, limit })
  }
})

module.exports = { GetUserQuoteHistoryUseCase }
