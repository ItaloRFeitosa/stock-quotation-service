const { schema, Validation } = require("#core/validation");

const SignInRequestSchema = schema.object({
  body: schema.object({
    email: schema.string().email().required(),
    password: schema.string().required(),
  }).required(),
});

const SignInValidation = () => Validation(SignInRequestSchema);

module.exports = { SignInValidation };
