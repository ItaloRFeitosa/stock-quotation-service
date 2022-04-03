const { schema, Validation } = require("#core/validation");

const GetQuoteRequestSchema = schema.object({
  traceId: schema.string().required(),
  user: schema.object({
    id: schema.string().required()
  }).required(),
  query: schema.object({
    symbol: schema.string().required(),
  }).required(),
});

const GetQuoteValidation = () => Validation(GetQuoteRequestSchema);

module.exports = { GetQuoteValidation };
