const isError = (err) => err instanceof Error;

const defaultComposeReason = (input) => input;

const errorOf = (name, composeReason = defaultComposeReason) => {
  return {
    error: (...params) => {
      const reason = composeReason(...params);
      let err = new Error("");
      err.name = name;
      if (typeof reason === "string") {
        err.message = reason;
        err.reason = [reason];

        return err;
      }

      err.reason = reason;

      return err;
    },
    isSameOf: (err) => isError(err) && err.name === name,
  };
};

module.exports = {
  isError,
  errorOf,
};
