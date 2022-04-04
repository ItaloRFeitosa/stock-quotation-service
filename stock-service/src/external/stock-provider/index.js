const { MemoryCache } = require("#external/cache/memory");
const { CacheProxy } = require("./cache-proxy");
const { StooqStockProvider } = require("./stooq");

const defaultTTL = parseInt(process.env.STOCK_PROVIDER_CACHE_TTL) || 5000; //milliseconds

const StockProvider = () =>
  CacheProxy({
    stockProvider: StooqStockProvider(),
    cache: MemoryCache(),
    ttl: defaultTTL,
  });

module.exports = { StockProvider: StockProvider };
