const { matchers } = require("jest-json-schema");
expect.extend(matchers);
const {
  errorResponseJsonSchema,
} = require("#tests/schemas/routes/error-response-schema");
const { authRoutes } = require("#tests/fixtures/auth-routes");
const { Database } = require("#tests/fixtures/database");
const {
  signInResponseSchema,
} = require("#tests/schemas/routes/auth/sign-in-response-schema");
const { ValidationError } = require("#core/validation");
const { SignInError } = require("#modules/auth/features/sign-in/errors");
const { UserAlreadyExists } = require("#modules/auth/features/sign-up/errors");
const {
  signUpResponseSchema,
} = require("#tests/schemas/routes/auth/sign-up-response-schema");
const res = require("express/lib/response");

describe("Auth Routes", () => {
  let db;
  const testUser = { email: "test@test.com", password: "123456", role: "user" };

  beforeEach(async () => {
    db = Database();
    await db.connect();
    await db.addUser(testUser);
  });
  afterEach(async () => {
    await db.teardown();
  });

  describe("POST /auth/sign-in", () => {
    describe("when body has invalid params", () => {
      const invalidParams = [
        { email: "invalidemail", password: "123456" },
        { password: "missing email" },
        { email: "missing@password.com" },
        {},
      ];
      it.each(invalidParams)(
        "should return 422 with ValidationError error",
        async (params) => {
          const response = await authRoutes.signIn(params);

          expect(response.status).toBe(422);
          expect(response.body).toMatchSchema(
            errorResponseJsonSchema(ValidationError.error().name)
          );
        }
      );
    });
    describe("when user exists", () => {
      it("should return 200 with accesToken", async () => {
        const response = await authRoutes.signIn({
          email: testUser.email,
          password: testUser.password,
        });

        expect(response.status).toBe(200);
        expect(response.body).toMatchSchema(signInResponseSchema);
      });
    });
    describe("when user not found", () => {
      it("should return 400 with Auth.SignInError error", async () => {
        const notExist = { email: "not@exists.com", password: "123456" };

        const response = await authRoutes.signIn({
          email: notExist.email,
          password: notExist.password,
        });

        expect(response.status).toBe(400);
        expect(response.body).toMatchSchema(
          errorResponseJsonSchema(SignInError.error().name)
        );
      });
    });
    describe("password doesn't match", () => {
      it("should return 400 with Auth.SignInError error", async () => {
        const response = await authRoutes.signIn({
          email: testUser.email,
          password: "wrong-password",
        });

        expect(response.status).toBe(400);
        expect(response.body).toMatchSchema(
          errorResponseJsonSchema(SignInError.error().name)
        );
      });
    });
  });
  describe("POST /auth/sign-up", () => {
    describe("when body has invalid params", () => {
      const invalidParams = [
        { role: "admin" },
        { email: "invalid@role.com", role: "test" },
        { email: "missing@role.com" },
      ];

      it.each(invalidParams)(
        "should return 422 with ValidationError error",
        async (params) => {
          const response = await authRoutes.signUp(params);

          expect(response.status).toBe(422);
          expect(response.body).toMatchSchema(
            errorResponseJsonSchema(ValidationError.error().name)
          );
        }
      );
    });
    describe("when user already exists", () => {
      it("should return 400 with Auth.UserAlreadyExists error", async () => {
        const response = await authRoutes.signUp({
          email: testUser.email,
          role: testUser.role,
        });

        expect(response.status).toBe(400);
        expect(response.body).toMatchSchema(
          errorResponseJsonSchema(UserAlreadyExists.error().name)
        );
      });
    });
    describe("when user not exists", () => {
      const validUsers = [
        { email: "user@email.com", role: "user" },
        { email: "admin@email.com", role: "admin" },
      ];
      it.each(validUsers)(
        "should return 201 with User data",
        async (newUser) => {
          const response = await authRoutes.signUp(newUser);
          const isRegistered = await db.existsUser(newUser.email);

          expect(response.status).toBe(201);
          expect(response.body).toMatchObject(newUser);
          expect(response.body).toMatchSchema(signUpResponseSchema);
          expect(isRegistered).toBeTruthy();
        }
      );
    });
  });
});
