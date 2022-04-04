const request = require("supertest");
const { matchers } = require("jest-json-schema");
expect.extend(matchers);

const app = require("#application/app");
const {
  errorResponseJsonSchema,
} = require("#tests/schemas/routes/error-response-schema");
const { ValidationError } = require("#core/validation");
const {
  EnsureAuthorizationError,
} = require("#modules/auth/middlewares/ensure-authorization/errors");
const { authRoutes } = require("#tests/fixtures/auth-routes");
const { stockRoutes } = require("#tests/fixtures/stock-routes");
const { Database } = require("#tests/fixtures/database");
const {
  quoteJsonSchema,
  quoteHistoryJsonSchema,
} = require("#tests/schemas/routes/stock/quote-schema");
const { QuoteNotFound } = require("#modules/stock/features/get-quote/errors");
const {
  OnlyAdminError,
} = require("#modules/auth/middlewares/ensure-only-admin-access/errors");

const generateHistory = async (cases) =>
  await Promise.all(
    cases.map(async ({ user, queries }) => {
      for await (let symbol of queries) {
        await stockRoutes.getQuote({ symbol }, user.token);
      }
    })
  );

describe("Stock Routes", () => {
  let db;
  const testUser1 = {
    data: { email: "test1@test.com", password: "123456", role: "user" },
    token: "",
  };
  const testUser2 = {
    data: { email: "test2@test.com", password: "123456", role: "admin" },
    token: "",
  };

  beforeEach(async () => {
    db = Database();
    await db.connect();
    await db.addUser(testUser1.data);
    await db.addUser(testUser2.data);
    const response1 = await authRoutes.signIn(testUser1.data);
    testUser1.token = response1.body.accessToken;
    const response2 = await authRoutes.signIn(testUser2.data);
    testUser2.token = response2.body.accessToken;
  });
  afterEach(async () => {
    await db.teardown();
  });

  describe("when authorization header is missing or invalid", () => {
    const invalidCases = [
      "",
      "Bearer",
      "invalid-token",
      "Bearer invalid-token",
    ].flatMap((header) =>
      ["/quotes", "/history", "/stats"].map((route) => ({ route, header }))
    );
    it.each(invalidCases)(
      "should return 401 with Auth.EnsureAuthorizationError error",
      async ({ route, header }) => {
        const response = await request(app)
          .get(`/v1/stock/${route}`)
          .send({})
          .set("Authorization", header);

        expect(response.status).toBe(401);
        expect(response.body).toMatchSchema(
          errorResponseJsonSchema(EnsureAuthorizationError.error().name)
        );
      }
    );
  });
  describe("GET /stock/quotes", () => {
    describe("when query has invalid params", () => {
      const invalidCases = [{}, { symbol: "" }];
      it.each(invalidCases)(
        "should return 422 with ValidationError error",
        async (params) => {
          const response = await stockRoutes.getQuote(params, testUser1.token);

          expect(response.status).toBe(422);
          expect(response.body).toMatchSchema(
            errorResponseJsonSchema(ValidationError.error().name)
          );
        }
      );
    });
    describe("when stock quote is found", () => {
      it("should return 200 with quote data", async () => {
        const symbol = "AA.US";

        const response = await stockRoutes.getQuote(
          { symbol },
          testUser1.token
        );
        expect(response.status).toBe(200);
        expect(response.body).toMatchSchema(quoteJsonSchema);
        expect(response.body.symbol).toMatch(symbol);
      });
    });
    describe("when stock quote is not found", () => {
      it("should return 404 with Stock.QuoteNotFound error", async () => {
        const symbol = "NOT.EXIST";

        const response = await stockRoutes.getQuote(
          { symbol },
          testUser1.token
        );

        expect(response.status).toBe(404);
        expect(response.body).toMatchSchema(
          errorResponseJsonSchema(QuoteNotFound.error().name)
        );
      });
    });
  });

  const cases = [
    {
      user: testUser1,
      queries: ["AA.US", "AAP.US", "A.US", "AAPL.US", "AAC.US"],
    },
    {
      user: testUser2,
      queries: ["AA.US", "AAPL.US", "AAN.US", "A.US", "AA.US"],
    },
  ];

  describe("GET /stock/history", () => {
    it.each(cases)(
      "should return 200 with quote history",
      async ({ user, queries }) => {
        await generateHistory(cases);
        const response = await stockRoutes.getHistory(user.token);
        expect(response.status).toBe(200);
        expect(response.body).toMatchSchema(quoteHistoryJsonSchema);

        const queryHistory = response.body.data.map(({ symbol }) => symbol);

        expect(queryHistory).toEqual(queries.reverse());
      }
    );
  });
  describe("GET /stock/stats", () => {
    describe("when user hasn't admin role", () => {
      it("should return 403 with Auth.OnlyAdminError error", async () => {
        const response = await stockRoutes.getMostRequested(testUser1.token);

        expect(response.status).toBe(403);
        expect(response.body).toMatchSchema(
          errorResponseJsonSchema(OnlyAdminError.error().name)
        );
      });
    });
    it("should return 200 with top 5 most requested data", async () => {
      await generateHistory(cases);

      const expected = {
        "AA.US": 3,
        "A.US": 2,
        "AAPL.US": 2,
        "AAC.US": 1,
        "AAN.US": 1,
        "AAP.US": 1,
      };

      const response = await stockRoutes.getMostRequested(testUser2.token);

      expect(response.status).toBe(200);
      response.body.forEach(({ stock, timesRequested }) =>
        expect(timesRequested).toBe(expected[stock])
      );
    });
  });
});
