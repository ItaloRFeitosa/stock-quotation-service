const { UnprocessedEntity, NotFound, Ok } = require("#core/http/response");
const { ValidationError } = require("#core/validation");
const { StockController } = require("#stock/controller");
const { StockQuoteNotFound } = require("#stock/errors");
const { QuoteMock } = require("#tests/mocks/quote-mock");

const StockServiceMock = () => ({ getQuote: jest.fn() });

describe("StockController", () => {
  describe("when call getQuote method", () => {
    describe("and symbol is missing in request query", () => {
      it("should return UnprocessedEntity response with ValidationError", async () => {
        const serviceMock = StockServiceMock();
        const underTest = StockController({ service: serviceMock });

        const request = { query: {} };
        const expectedResponse = UnprocessedEntity(
          ValidationError.error("query.symbol is required")
        );

        const gotResponse = await underTest.getQuote(request);

        expect(gotResponse).toEqual(expectedResponse);
        expect(serviceMock.getQuote).not.toBeCalled()
      });
    });
    describe("and service can't get quote", () => {
      it("should return NotFound response with StockQuoteNotFound", async () => {
        const symbol = "not-exist";
        const serviceMock = StockServiceMock();
        const notFoundError = StockQuoteNotFound.error(symbol);
        serviceMock.getQuote.mockResolvedValueOnce(notFoundError);
        const request = { query: { symbol } };
        const expectedResponse = NotFound(notFoundError);

        const underTest = StockController({ service: serviceMock });

        const gotResponse = await underTest.getQuote(request);

        expect(gotResponse).toEqual(expectedResponse);
        expect(serviceMock.getQuote).toBeCalledWith(symbol);
        expect(serviceMock.getQuote).toBeCalledTimes(1);
      });
    });
    describe("and service succeeded in get quote", () => {
      it("should return Ok response with quote", async () => {
        const quoteMock = QuoteMock();
        const serviceMock = StockServiceMock();
        serviceMock.getQuote.mockResolvedValueOnce(quoteMock);
        const request = { query: { symbol: quoteMock.symbol } };
        const expectedResponse = Ok(quoteMock);

        const underTest = StockController({ service: serviceMock });

        const gotResponse = await underTest.getQuote(request);

        expect(gotResponse).toEqual(expectedResponse);
        expect(serviceMock.getQuote).toBeCalledWith(quoteMock.symbol);
        expect(serviceMock.getQuote).toBeCalledTimes(1);
      });
    });
  });
});
