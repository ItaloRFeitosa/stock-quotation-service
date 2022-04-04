const request = require("supertest");
const { matchers } = require("jest-json-schema");
expect.extend(matchers);
const { quoteJsonSchema } = require("#tests/schemas/quote-schema");

const app = require("#application/app");
const { errorResponseJsonSchema } = require("#tests/schemas/error-response-schema");

jest.setTimeout(30000);
describe("GET /quote", function () {
  it("responds with 200 and return a body with valid quote", async () => {
    const validStock = "AAPL.US";
    const expectedName = "APPLE";
    const response = await request(app)
      .get(`/quote?symbol=${validStock}`)
      .set("Accept", "application/json");

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body.symbol).toMatch(validStock);
    expect(response.body.name).toMatch(expectedName);
    expect(response.body).toMatchSchema(quoteJsonSchema);
  });

  it('responds with 422 when query.symbol is missing', async () => {
    const response = await request(app)
      .get(`/quote`)
      .set("Accept", "application/json");

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(422);
    expect(response.body).toMatchSchema(errorResponseJsonSchema);
    expect(response.body.error.name).toMatch("ValidationError");
  });

  it('responds with 404 when quote not found', async () => {
    const invalidStock = "invalid-stock";

    const response = await request(app)
      .get(`/quote?symbol=${invalidStock}`)
      .set("Accept", "application/json");

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(404);
    expect(response.body).toMatchSchema(errorResponseJsonSchema);
    expect(response.body.error.name).toMatch("StockQuoteNotFound");
  });
});
