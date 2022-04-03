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
const Created = HttpSuccess(201);
const BadRequest = HttpError(400, "BadRequest");
const UnprocessedEntity = HttpError(422, "UnprocessedEntity");
const Unauthorized = HttpError(401, "Unauthorized");
const Forbidden = HttpError(403, "Forbidden");
const NotFound = HttpError(404, "NotFound");

module.exports = { Ok, Created, BadRequest, UnprocessedEntity, Unauthorized, Forbidden, NotFound };
