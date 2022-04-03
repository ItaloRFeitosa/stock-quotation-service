const HttpError = (statusCode, defaultMessage) => (err) => {
  err.reason = err.reason || err.message || defaultMessage;

  return {
    statusCode,
    data: {
      error: {
        name: err.name,
        reason: err.reason,
      }
    },
  };
};

const HttpSuccess = (statusCode) => (data) => ({
  statusCode,
  data,
});

const Ok = HttpSuccess(200);
const UnprocessedEntity = HttpError(422, "UnprocessedEntity");
const NotFound = HttpError(404, "NotFound");

module.exports = { Ok, UnprocessedEntity, NotFound };
