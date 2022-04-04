const signUpResponseSchema = {
  properties: {
    email: {
      type: "string",
    },
    password: {
      type: "string",
    },
    role: {
      type: "string",
    },
  },
  required: ["email", "password", "role"],
};

module.exports = { signUpResponseSchema };
