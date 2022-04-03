const schema = require("yup");

const { errorOf, isError } = require("./error");

const ValidationError = errorOf("ValidationError");

const Validation = (validator) => ({
  validate: async (input) => {
    const maybeError = await validator.validate(input, { abortEarly: false }).catch((err) => err);

    if (isError(maybeError)){
      return ValidationError.error(maybeError.errors)
    };
  },
});

module.exports = { ValidationError, schema, Validation };
