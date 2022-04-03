const { schema, Validation } = require("#core/validation");
const { UserRole } = require("#modules/auth/domain/user-role");

const SignUpRequestSchema = schema.object({
  body: schema.object({
    email: schema.string().email().required(),
    role: schema.string().oneOf(Object.values(UserRole)).required()
  }),
});

const SignUpValidation = () => Validation(SignUpRequestSchema);

module.exports = { SignUpValidation };
