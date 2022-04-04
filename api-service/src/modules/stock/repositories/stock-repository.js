const { Pageable } = require("#core/pageable");
const { withTransaction, documentsToObject } = require("#external/database/mongoose/helpers");
const { QuoteRecord } = require("#external/database/mongoose/models/stock/quote-record");
const { StockStats } = require("#external/database/mongoose/models/stock/stock-stats");

const PageableById = Pageable("id")

const StockRepository = () => {
  return {
    saveQuoteRecord: async (quoteRecord) => {
      await QuoteRecord.create(quoteRecord);
      await StockStats.updateOne(
        { stock: quoteRecord.symbol },
        {
          $inc: {
            timesRequested: 1,
          },
        },
        { upsert: true }
      );
    },

    listMostRequestedStocks: async (limit) => {
      const options = { limit, sort: { timesRequested: -1 } }

      const records = await StockStats.find({}, {}, options)

      return documentsToObject(records)
    },

    listUserQuoteHistory: async ({ userId, cursor, limit }) => {
      const withCursor = cursor && { _id: { $lt: cursor } }
      const query = { userId, ...withCursor }
      const projection = { userId: 0 }
      const options = { limit, sort: { $natural: -1 } }

      const records = await QuoteRecord.find(query, projection, options)

      return PageableById(documentsToObject(records), limit)
    },
  };
};

module.exports = { StockRepository };
