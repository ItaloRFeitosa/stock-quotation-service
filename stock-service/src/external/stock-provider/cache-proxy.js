
const CacheProxy = ({ cache, stockProvider, ttl }) => ({
  fetchQuote: async (symbol) => {
    const cachedQuote = await cache.get(`quote:${symbol.toLowerCase()}`);

    if (cachedQuote) {
      return cachedQuote;
    }

    const quote = await stockProvider.fetchQuote(symbol);

    if (!quote) {
      return null;
    }

    await cache.set(`quote:${symbol.toLowerCase()}`, quote, { ttl });

    return quote;
  },
});

module.exports = { CacheProxy }
