const { StockQuoteNotFound } = require("#stock/errors");
const { StockService } = require("#stock/service");
const { QuoteMock } = require("#tests/mocks/quote-mock");
const { StockProviderMock } = require("#tests/mocks/stock-provider-mock");

describe("StockService", () => {
  describe("when call getQuote with given symbol", () => {
    describe("and stockProvider not found quote", () => {
      it("should return StockQuoteNotFound error", async () => {
        const symbol = "not-exist";
        const expectedResult = StockQuoteNotFound.error(symbol);
        const stockProviderMock = StockProviderMock();
        stockProviderMock.fetchQuote.mockResolvedValueOnce(null);
        const underTest = StockService({ stockProvider: stockProviderMock });
        const gotResult = await underTest.getQuote(symbol);

        expect(gotResult).toEqual(expectedResult);
        expect(stockProviderMock.fetchQuote).toBeCalledWith(symbol);
        expect(stockProviderMock.fetchQuote).toBeCalledTimes(1);
      });
    });
    describe("and stockProvider found quote", () => {
      it("should return quote", async () => {
        const quoteMock = QuoteMock();
        const stockProviderMock = StockProviderMock();
        stockProviderMock.fetchQuote.mockResolvedValueOnce(quoteMock);
        const underTest = StockService({ stockProvider: stockProviderMock });
        const gotResult = await underTest.getQuote(quoteMock.symbol);

        expect(gotResult).toEqual(quoteMock);
        expect(stockProviderMock.fetchQuote).toBeCalledWith(quoteMock.symbol);
        expect(stockProviderMock.fetchQuote).toBeCalledTimes(1);
      });
    });
  });
});
