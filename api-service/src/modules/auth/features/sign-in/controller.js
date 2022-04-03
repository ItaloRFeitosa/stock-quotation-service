const { SignInError } = require("./errors");
const { ValidationError } = require("#core/validation");
const { UnprocessedEntity, BadRequest, Ok } = require("#core/http/response");

const SignInController = ({ usecase, validation }) => ({
  handle: async (request) => {
    const maybeValidationError = await validation.validate(request);

    if (ValidationError.isSameOf(maybeValidationError)) {
      return UnprocessedEntity(maybeValidationError);
    }

    const resultOrError = await usecase.perform(request.body);

    if (SignInError.isSameOf(resultOrError)) {
      return BadRequest(resultOrError);
    }

    return Ok(resultOrError);
  },
});

module.exports = { SignInController };
