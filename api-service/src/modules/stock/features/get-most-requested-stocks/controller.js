const { Ok } = require("#core/http/response");

const GetMostRequestedStocksController = ({ usecase }) => ({
  handle: async (request) => {
    const { limit = 5 } = request.query

    const result = await usecase.perform({ limit })

    return Ok(result)
  }
})

module.exports = { GetMostRequestedStocksController }
