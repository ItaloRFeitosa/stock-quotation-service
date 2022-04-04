const { UnprocessedEntity, NotFound, Ok } = require("#core/http/response");
const { ValidationError } = require("#core/validation");
const { GetQuoteDTO } = require("./dto");
const { QuoteNotFound } = require("./errors")

const GetQuoteController = ({ usecase, validation }) => ({
  handle: async (request) => {
    const maybeValidationError = await validation.validate(request)

    if (ValidationError.isSameOf(maybeValidationError)) {
      return UnprocessedEntity(maybeValidationError);
    }

    const dto = GetQuoteDTO(request)

    const resultOrError = await usecase.perform(dto)

    if(QuoteNotFound.isSameOf(resultOrError)){
      return NotFound(resultOrError)
    }

    return Ok(resultOrError)
  }
})

module.exports = { GetQuoteController }
