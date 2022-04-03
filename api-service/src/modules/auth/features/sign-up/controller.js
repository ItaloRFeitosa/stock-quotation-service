const { UnprocessedEntity, BadRequest, Created } = require("#core/http/response");
const { ValidationError } = require("#core/validation");
const { UserAlreadyExists } = require("./errors");

const SignUpController = ({ usecase, validation }) => ({
  handle: async (request) => {
    const maybeValidationError = await validation.validate(request);

    if (ValidationError.isSameOf(maybeValidationError)) {
      return UnprocessedEntity(maybeValidationError);
    }

    const resultOrError = await usecase.perform(request.body);

    if (UserAlreadyExists.isSameOf(resultOrError)) {
      return BadRequest(resultOrError);
    }

    return Created(resultOrError);
  },
});

module.exports = { SignUpController };
