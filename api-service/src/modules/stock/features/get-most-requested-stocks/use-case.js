const GetMostRequestedStocksUseCase = ({ stockRepository }) => ({
  perform: async ({ limit }) => {
    return stockRepository.listMostRequestedStocks(limit)
  }
})

module.exports = { GetMostRequestedStocksUseCase }
