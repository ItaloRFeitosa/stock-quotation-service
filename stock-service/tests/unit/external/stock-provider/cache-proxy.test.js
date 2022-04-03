const { CacheProxy } = require("#external/stock-provider/cache-proxy");
const { QuoteMock } = require("#tests/mocks/quote-mock");
const { StockProviderMock } = require("#tests/mocks/stock-provider-mock");

const CacheMock = () => ({ get: jest.fn(), set: jest.fn() });

const makeSut = () => {
  const ttl = 1000;
  const quoteMock = QuoteMock();
  const cacheMock = CacheMock();
  const stockProvider = StockProviderMock();

  const underTest = CacheProxy({
    cache: cacheMock,
    stockProvider: stockProvider,
    ttl,
  });

  return { quoteMock, cacheMock, stockProvider, underTest, ttl };
};

describe("CacheProxy", () => {
  describe("when call fetchQuote", () => {
    describe("and hit cache", () => {
      it("should return cached quote", async () => {
        const { quoteMock, cacheMock, stockProvider, underTest } = makeSut();
        cacheMock.get.mockResolvedValueOnce(quoteMock);

        const gotQuote = await underTest.fetchQuote(quoteMock.symbol);

        expect(gotQuote).toEqual(quoteMock);
        expect(cacheMock.get).toBeCalledTimes(1);
        expect(cacheMock.get).toBeCalledWith(
          `quote:${quoteMock.symbol.toLowerCase()}`
        );
        expect(cacheMock.set).not.toBeCalled();
        expect(stockProvider.fetchQuote).not.toBeCalled();
      });
    });

    describe("and miss cache", () => {
      describe("but found quote", () => {
        it("should set quote in cache and return quote", async () => {
          const { quoteMock, cacheMock, stockProvider, underTest, ttl } = makeSut();

          cacheMock.get.mockResolvedValueOnce(null);

          stockProvider.fetchQuote.mockResolvedValue(quoteMock);

          const gotQuote = await underTest.fetchQuote(quoteMock.symbol);

          expect(gotQuote).toEqual(quoteMock);
          expect(stockProvider.fetchQuote).toBeCalledWith(quoteMock.symbol);
          expect(stockProvider.fetchQuote).toBeCalledTimes(1);
          expect(cacheMock.set).toBeCalledWith(
            `quote:${quoteMock.symbol.toLowerCase()}`,
            quoteMock,
            { ttl }
          );
          expect(cacheMock.set).toBeCalledTimes(1);
        });
      });
      describe("and not found quote", () => {
        it("should return null", async () => {
          const { quoteMock, cacheMock, stockProvider, underTest } = makeSut();

          cacheMock.get.mockResolvedValueOnce(null);

          stockProvider.fetchQuote.mockResolvedValue(null);

          const gotResult = await underTest.fetchQuote(quoteMock.symbol);

          expect(gotResult).toBe(null);
          expect(stockProvider.fetchQuote).toBeCalledWith(quoteMock.symbol);
          expect(stockProvider.fetchQuote).toBeCalledTimes(1);
          expect(cacheMock.set).not.toBeCalled();
        });
      });
    });
  });
});
