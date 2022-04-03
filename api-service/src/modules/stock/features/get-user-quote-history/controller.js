const { UnprocessedEntity, Ok } = require("#core/http/response");
const { ValidationError } = require("#core/validation");
const { GetUserHistoryQuoteDTO } = require("./dto");

const GetUserQuoteHistoryController = ({ usecase, validation }) => ({
  handle: async (request) => {
    const maybeValidationError = await validation.validate(request)

    if (ValidationError.isSameOf(maybeValidationError)) {
      return UnprocessedEntity(maybeValidationError);
    }

    const dto = GetUserHistoryQuoteDTO(request)

    const result = await usecase.perform(dto)

    return Ok(result)
  }
})

module.exports = { GetUserQuoteHistoryController }
