const { schema, Validation } = require("#core/validation");

const GetUserQuoteHistoryRequestSchema = schema.object({
  user: schema.object({
    id: schema.string().required()
  }).required(),
  query: schema.object({
    cursor: schema.string(),
    limit: schema.number().max(100),
  }),
});

const GetUserQuoteHistoryValidation = () => Validation(GetUserQuoteHistoryRequestSchema);

module.exports = { GetUserQuoteHistoryValidation };
