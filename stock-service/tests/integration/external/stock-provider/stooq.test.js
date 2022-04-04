const { matchers } = require('jest-json-schema');
expect.extend(matchers);

const { StooqStockProvider } = require("#external/stock-provider/stooq");
const { quoteJsonSchema } = require('#tests/schemas/quote-schema');

const testCases = [
  { symbol: "ABVC.US" },
  { symbol: "AcA.Us" },
  { symbol: "ysac.us" },
];

const invalidSymbols = [{ symbol: "fakeSymbol1" }, { symbol: "fakeSymbol2" }];

describe("StooqStockProvider", () => {
  let underTest;

  beforeEach(() => {
    underTest = StooqStockProvider();
  });

  describe("When call fetchQuote with a valid symbol", () => {
    it.each(testCases)("should return a stock quote", async (testCase) => {
      const quote = await underTest.fetchQuote(testCase.symbol);
      expect(quote).not.toBeNull();
      expect(quote.symbol).toMatch(testCase.symbol.toUpperCase());

      expect(quote).toMatchSchema(quoteJsonSchema)
    });
  });

  describe("When call fetchQuote with a invalid symbol", () => {
    it.each(invalidSymbols)("should return null", async (testCase) => {
      const quote = await underTest.fetchQuote(testCase.symbol);
      expect(quote).toBeNull();
    });
  });
});
