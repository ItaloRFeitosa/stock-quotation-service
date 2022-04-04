const signInResponseSchema = {
  properties: {
    accessToken: {
      type: "string",
    },
    type: {
      type: "string",
      const: "Bearer",
    },
    expiresIn: {
      type: "string",
      format: "date-time",
    },
    issuedAt: {
      type: "string",
      format: "date-time",
    },
  },
  required: ["accessToken", "type", "expiresIn", "issuedAt"],
};

module.exports = { signInResponseSchema };
