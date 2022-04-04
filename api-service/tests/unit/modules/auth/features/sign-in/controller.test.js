const { Ok, UnprocessedEntity, BadRequest } = require("#core/http/response");
const { ValidationError } = require("#core/validation");
const {
  SignInController,
} = require("#modules/auth/features/sign-in/controller");
const { SignInError } = require("#modules/auth/features/sign-in/errors");

describe("modules/auth/features/sign-in/controller", () => {
  describe("when call SignInController.handle with", () => {
    describe("a valid request", () => {
      it("should return an Ok response when usecase successfully performs", async () => {
        const request = {
          body: { email: "test@test.com", password: "123456" },
        };

        const usecaseResult = {
          type: "Bearer",
          token: "fake-token",
          issuedAt: new Date().toISOString(),
          expiresIn: new Date().toISOString(),
        };

        const expected = Ok(usecaseResult);
        const usecase = {
          perform: jest.fn().mockResolvedValueOnce(usecaseResult),
        };
        const validation = { validate: jest.fn().mockResolvedValueOnce() };
        const underTest = SignInController({ usecase, validation });

        const got = await underTest.handle(request);

        expect(validation.validate).toBeCalledWith(request);
        expect(validation.validate).toBeCalledTimes(1);
        expect(usecase.perform).toBeCalledWith(request.body);
        expect(usecase.perform).toBeCalledTimes(1);
        expect(got).toEqual(expected);
      });
    });
    describe("an invalid request", () => {
      it("should return an UnprocessedEntity response when got ValidationError", async () => {
        const request = {
          body: { email: "invalidEmail", password: "invalidPassword" },
        };

        const validationError = ValidationError.error("some validation error");

        const expected = UnprocessedEntity(validationError);

        const validation = {
          validate: jest.fn().mockResolvedValueOnce(validationError),
        };

        const usecase = {
          perform: jest.fn(),
        };

        const underTest = SignInController({ usecase, validation });

        const got = await underTest.handle(request);

        expect(validation.validate).toBeCalledWith(request);
        expect(validation.validate).toBeCalledTimes(1);
        expect(got).toEqual(expected);
      });
      it("should return an BadRequest response when got SignInError", async () => {
        const request = {
          body: { email: "not@exists.email", password: "1324678" },
        };

        const signInError = SignInError.error();

        const expected = BadRequest(signInError);

        const validation = {
          validate: jest.fn().mockResolvedValueOnce(),
        };

        const usecase = {
          perform: jest.fn().mockResolvedValueOnce(signInError),
        };

        const underTest = SignInController({ usecase, validation });

        const got = await underTest.handle(request);

        expect(got).toEqual(expected);
      });
    });
  });
});
